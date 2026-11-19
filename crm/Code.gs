/**
 * EAKSAHA GROUP · TEST-DRIVE CRM (Google Apps Script)
 * ---------------------------------------------------------------
 * Paste this whole file into Extensions → Apps Script of your Google Sheet.
 * Then follow CRM-SETUP.md (run setup once, deploy as a Web app).
 *
 * What it does
 *  - Every booking from the website lands in that brand's tab (FORD, MG, …)
 *  - The brand's CRO(s) get an email straight away (emails set in the "Settings" tab)
 *  - Optional: a brand can also copy its bookings into its own separate spreadsheet,
 *    so that CRO only sees their own customers
 *  - "Dashboard" tab counts bookings per brand and status
 *  - Staff update Status / Assigned CRO / Notes in the brand tab
 */

// Columns in every brand tab (do not reorder after you start collecting data)
var HEADERS = [
  "Reference", "Received", "Status", "Assigned CRO", "Contacted on",
  "Customer name", "Phone", "LINE ID", "Contact by",
  "Model", "Showroom", "Preferred date", "Preferred time",
  "Customer note", "Staff notes", "Consent (PDPA)", "Page"
];

var STATUSES = ["New", "Contacted", "Test drive booked", "Test drive done", "Purchased", "Not interested", "No answer"];

// The brands the website can send (key → tab name)
var BRANDS = {
  "ford": "FORD", "nissan": "NISSAN", "mitsubishi": "MITSUBISHI", "mg": "MG", "gwm": "GWM",
  "geely": "GEELY", "changan": "CHANGAN", "omoda-jaecoo": "OMODA & JAECOO",
  "gac-aion": "GAC AION", "riddara": "RIDDARA", "lepas": "LEPAS", "wuling": "WULING",
  "chery": "CHERY", "avatr": "AVATR"
};

/* ------------------------------------------------------------------
 * RUN ONCE: builds the Settings, Dashboard and brand tabs
 * ------------------------------------------------------------------ */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Settings tab: one row per brand
  var settings = ss.getSheetByName("Settings") || ss.insertSheet("Settings", 0);
  if (settings.getLastRow() < 2) {
    settings.clear();
    settings.getRange(1, 1, 1, 5).setValues([[
      "Brand key (do not change)", "Brand tab", "CRO name(s)", "CRO email(s) – comma separated", "Separate spreadsheet ID (optional)"
    ]]);
    var rows = Object.keys(BRANDS).map(function (k) { return [k, BRANDS[k], "", "", ""]; });
    settings.getRange(2, 1, rows.length, 5).setValues(rows);
    styleHeader(settings, 5);
    settings.setColumnWidths(1, 5, 220);
  }

  // One tab per brand
  Object.keys(BRANDS).forEach(function (k) { getBrandSheet(ss, BRANDS[k]); });

  // Dashboard tab with live counts
  var dash = ss.getSheetByName("Dashboard") || ss.insertSheet("Dashboard", 0);
  dash.clear();
  var head = ["Brand", "Total"].concat(STATUSES).concat(["Last 7 days"]);
  dash.getRange(1, 1, 1, head.length).setValues([head]);
  var r = 2;
  Object.keys(BRANDS).forEach(function (k) {
    var tab = "'" + BRANDS[k].replace(/'/g, "''") + "'";
    var row = [BRANDS[k], "=MAX(0,COUNTA(" + tab + "!A:A)-1)"];
    STATUSES.forEach(function (s) { row.push('=COUNTIF(' + tab + '!C:C,"' + s + '")'); });
    row.push("=COUNTIFS(" + tab + "!B:B,\">=\"&(TODAY()-7))");
    dash.getRange(r, 1, 1, row.length).setValues([row]);
    r++;
  });
  dash.getRange(r, 1).setValue("All brands").setFontWeight("bold");
  for (var c = 2; c <= head.length; c++) {
    var col = columnLetter(c);
    dash.getRange(r, c).setFormula("=SUM(" + col + "2:" + col + (r - 1) + ")").setFontWeight("bold");
  }
  styleHeader(dash, head.length);
  dash.setColumnWidth(1, 170);

  SpreadsheetApp.getUi().alert("Setup done. Add CRO emails in the Settings tab, then deploy as a Web app (see CRM-SETUP.md).");
}

/* ------------------------------------------------------------------
 * WEBSITE SENDS BOOKINGS HERE
 * ------------------------------------------------------------------ */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var b = JSON.parse(e.postData.contents);

    // Basic checks (the website also checks)
    if (!b || !BRANDS[b.brandKey]) return reply({ ok: false, error: "unknown brand" });
    var phone = String(b.phone || "").replace(/\D/g, "");
    if (!b.name || !/^0\d{8,9}$/.test(phone) || b.consent !== "Yes") return reply({ ok: false, error: "missing details" });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tabName = BRANDS[b.brandKey];
    var row = [
      clean(b.ref), new Date(), "New", "", "",
      clean(b.name), "'" + phone, clean(b.lineId), clean(b.contactBy),
      clean(b.model), clean(b.branch), clean(b.date), clean(b.time),
      clean(b.note), "", "Yes · " + new Date().toLocaleString("th-TH"), clean(b.page)
    ];
    getBrandSheet(ss, tabName).appendRow(row);

    var setting = findSetting(ss, b.brandKey);

    // Optional: copy into the brand's own spreadsheet
    if (setting.sheetId) {
      try {
        var own = SpreadsheetApp.openById(setting.sheetId);
        getBrandSheet(own, tabName).appendRow(row);
      } catch (err) { console.warn("Could not write to separate sheet for " + tabName + ": " + err); }
    }

    // Email the brand's CRO(s)
    if (setting.emails) {
      var subject = "New test drive · " + tabName + " · " + clean(b.name) + " (" + clean(b.ref) + ")";
      var body =
        "มีลูกค้าจองทดลองขับใหม่ / New test-drive request\n\n" +
        "Reference: " + clean(b.ref) + "\n" +
        "Customer: " + clean(b.name) + "\n" +
        "Phone: " + phone + "\n" +
        "LINE ID: " + (clean(b.lineId) || "-") + "\n" +
        "Contact by: " + clean(b.contactBy) + "\n" +
        "Model: " + clean(b.model) + "\n" +
        "Showroom: " + clean(b.branch) + "\n" +
        "Preferred: " + (clean(b.date) || "any day") + " · " + clean(b.time) + "\n" +
        "Note: " + (clean(b.note) || "-") + "\n\n" +
        "Please call within 1 business hour and update the Status in the '" + tabName + "' tab:\n" +
        ss.getUrl();
      MailApp.sendEmail({ to: setting.emails, subject: subject, body: body });
    }

    return reply({ ok: true, ref: b.ref });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web app address in a browser just shows that it works
function doGet() {
  return reply({ ok: true, service: "Eaksaha test-drive CRM" });
}

/* ------------------------------------------------------------------
 * OPTIONAL: every morning, email each CRO the bookings still "New"
 * (Apps Script → Triggers → Add trigger → sendMorningReminder → Time-driven → Day timer 8–9am)
 * ------------------------------------------------------------------ */
function sendMorningReminder() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(BRANDS).forEach(function (k) {
    var setting = findSetting(ss, k);
    if (!setting.emails) return;
    var sh = ss.getSheetByName(BRANDS[k]);
    if (!sh || sh.getLastRow() < 2) return;
    var data = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
    var waiting = data.filter(function (r) { return r[2] === "New"; });
    if (!waiting.length) return;
    var lines = waiting.map(function (r) { return "• " + r[0] + " · " + r[5] + " · " + r[6] + " · " + r[9] + " · " + r[10]; });
    MailApp.sendEmail({
      to: setting.emails,
      subject: BRANDS[k] + " · " + waiting.length + " test-drive request(s) still waiting",
      body: "ลูกค้าที่ยังไม่ได้ติดต่อกลับ / Customers not contacted yet:\n\n" + lines.join("\n") + "\n\n" + ss.getUrl()
    });
  });
}

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */
function getBrandSheet(ss, name) {
  var sh = ss.getSheetByName(name);
  if (sh) return sh;
  sh = ss.insertSheet(name);
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  styleHeader(sh, HEADERS.length);
  sh.setFrozenRows(1);
  // Status dropdown
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
  sh.getRange(2, 3, 1000, 1).setDataValidation(rule);
  // "Contacted on" date picker
  sh.getRange(2, 5, 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireDate().build());
  // Highlight rows still "New"
  var range = sh.getRange(2, 1, 1000, HEADERS.length);
  var cf = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$C2="New"').setBackground("#fff4d6").setRanges([range]).build();
  var done = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=OR($C2="Purchased",$C2="Test drive done")').setBackground("#e7f6ec").setRanges([range]).build();
  sh.setConditionalFormatRules([cf, done]);
  sh.getRange("B:B").setNumberFormat("dd/mm/yyyy hh:mm");
  sh.setColumnWidths(1, HEADERS.length, 140);
  sh.setColumnWidth(14, 260);
  sh.setColumnWidth(15, 260);
  return sh;
}

function findSetting(ss, key) {
  var sh = ss.getSheetByName("Settings");
  if (!sh || sh.getLastRow() < 2) return {};
  var data = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === key) return { emails: String(data[i][3]).trim(), sheetId: String(data[i][4]).trim() };
  }
  return {};
}

function styleHeader(sh, n) {
  sh.getRange(1, 1, 1, n).setFontWeight("bold").setBackground("#0b1530").setFontColor("#ffffff");
}

function clean(v) {
  // keep text short and stop spreadsheet formulas being injected
  var s = String(v == null ? "" : v).slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function columnLetter(n) {
  var s = "";
  while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
