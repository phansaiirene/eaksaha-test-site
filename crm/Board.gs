/**
 * EAKSAHA MARKETING BOARD · shared data (Google Apps Script)
 * ---------------------------------------------------------------
 * Makes admin.html a shared board: every teammate, on any phone or computer,
 * sees and edits the same projects, team calendar and OEM claims. The data lives in a Google Sheet that
 * belongs to the company, so the manager can also open it directly.
 *
 * Paste this whole file into Extensions → Apps Script of a NEW Google Sheet,
 * run `setup` once, set a team passcode in the Settings tab, then deploy as
 * a Web app (see BOARD-SETUP.md).
 */

var COLLECTIONS = {
  projects: ["id", "Updated", "Title", "Team", "Brand", "Status", "Due", "People", "data (do not edit)"],
  team: ["id", "Updated", "Name", "Team", "Role", "Responsible for", "data (do not edit)"],
  activities: ["id", "Updated", "Who", "What", "Date", "Until", "Where", "Note", "data (do not edit)"],
  claims: ["id", "Updated", "What for", "Brand", "PO number", "Status", "We used (THB)", "OEM pays back (THB)", "Send docs by", "data (do not edit)"]
};
var TABS = { projects: "Projects", team: "Team", activities: "Team calendar", claims: "OEM claims" };

/* ------------------------------------------------------------------
 * RUN ONCE: builds the Projects, Team, Team calendar, OEM claims and Settings tabs
 * (safe to run again after an update: it only adds the tabs that are missing)
 * ------------------------------------------------------------------ */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(COLLECTIONS).forEach(function (c) {
    var sh = ss.getSheetByName(TABS[c]) || ss.insertSheet(TABS[c]);
    if (sh.getLastRow() < 1) sh.appendRow(COLLECTIONS[c]);
    sh.getRange(1, 1, 1, COLLECTIONS[c].length).setFontWeight("bold").setBackground("#0f1b33").setFontColor("#ffffff");
    sh.setFrozenRows(1);
    sh.hideColumns(1);                                   // the id column
    sh.hideColumns(COLLECTIONS[c].length);               // the raw data column
    sh.getRange("B:B").setNumberFormat("dd/mm/yyyy hh:mm");
  });
  var st = ss.getSheetByName("Settings") || ss.insertSheet("Settings", 0);
  if (st.getLastRow() < 1) {
    st.getRange("A1:B1").setValues([["Team passcode", ""]]);
    st.getRange("A2").setValue("Type a passcode in B1 (e.g. 6+ letters/numbers) and share it only with the marketing team. Leave it empty to allow anyone with the link.");
    st.getRange("A1").setFontWeight("bold");
    st.setColumnWidth(1, 160); st.setColumnWidth(2, 220);
  }
  SpreadsheetApp.getUi().alert("Board setup done. Set the team passcode in the Settings tab, then Deploy → New deployment → Web app.");
}

/* ------------------------------------------------------------------
 * READ: the board asks for everything (every ~15 seconds)
 * ------------------------------------------------------------------ */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === "ping") return reply({ ok: true, service: "Eaksaha marketing board" });
  if (!passOk(p.key)) return reply({ ok: false, error: "passcode" });
  var out = { ok: true, serverTime: Date.now() };
  Object.keys(COLLECTIONS).forEach(function (c) { out[c] = readAll(c); });
  return reply(out);
}

/* ------------------------------------------------------------------
 * WRITE: create / change / delete one project or teammate
 * body: {key, action: "set"|"update"|"delete", col: "projects"|"team"|"activities"|"claims", id, data}
 * ------------------------------------------------------------------ */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var b = JSON.parse(e.postData.contents);
    if (!passOk(b.key)) return reply({ ok: false, error: "passcode" });
    if (!COLLECTIONS[b.col]) return reply({ ok: false, error: "unknown collection" });
    var id = String(b.id || "").replace(/[^A-Za-z0-9_\-]/g, "").slice(0, 60);
    if (!id) return reply({ ok: false, error: "missing id" });

    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[b.col]);
    if (!sh) return reply({ ok: false, error: "missing tab: run setup again" });
    var row = findRow(sh, id);

    if (b.action === "delete") {
      if (row) sh.deleteRow(row);
      return reply({ ok: true, serverTime: Date.now() });
    }

    var data = b.data || {};
    if (b.action === "update" && row) {
      var old = JSON.parse(sh.getRange(row, COLLECTIONS[b.col].length).getValue() || "{}");
      Object.keys(data).forEach(function (k) { old[k] = data[k]; });
      data = old;
    }
    var json = JSON.stringify(data);
    if (json.length > 45000) return reply({ ok: false, error: "too big" });   // one Sheets cell holds 50,000 characters

    var values = rowValues(b.col, id, data, json);
    if (row) sh.getRange(row, 1, 1, values.length).setValues([values]);
    else sh.appendRow(values);
    return reply({ ok: true, serverTime: Date.now() });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */
function passOk(key) {
  var st = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var pass = st ? String(st.getRange("B1").getValue()).trim() : "";
  return !pass || String(key || "") === pass;
}

function readAll(col) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS[col]);
  if (!sh || sh.getLastRow() < 2) return [];
  var n = COLLECTIONS[col].length;
  return sh.getRange(2, 1, sh.getLastRow() - 1, n).getValues()
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      var d = {};
      try { d = JSON.parse(r[n - 1] || "{}"); } catch (e) {}
      d.id = String(r[0]);
      return d;
    });
}

function findRow(sh, id) {
  if (sh.getLastRow() < 2) return 0;
  var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return i + 2;
  return 0;
}

// Readable columns so the manager can also scan the board in Google Sheets
function rowValues(col, id, d, json) {
  var team = { content: "Content", claims: "Admin claims", offline: "Offline marketing", other: "Other" };
  if (col === "projects") {
    return [id, new Date(), safe(d.title), team[d.workstream] || "", safe(d.brand), safe(d.status), safe(d.due),
      (d.members || []).length + " people", json];
  }
  if (col === "activities") {
    var what = { office: "In office", shoot: "Out shooting", event: "Event / booth", meeting: "Meeting outside", wfh: "Work from home", leave: "Leave" };
    return [id, new Date(), personName(d.person), what[d.type] || safe(d.type), safe(d.date), safe(d.end), safe(d.location), safe(d.note), json];
  }
  if (col === "claims") {
    var st = { todo: "To claim", claimed: "Claimed", received: "Money received", collecting: "To claim", submitted: "Claimed", approved: "Claimed", paid: "Money received", rejected: "Rejected" };
    var n = function (v) { var x = Number(v); return (v !== "" && v != null && isFinite(x)) ? x : ""; };
    var back = n(d.claimable) !== "" ? n(d.claimable) : Math.round((Number(d.spent) || 0) * (Number(d.rate) || 0) / 100);
    if (d.status === "rejected") back = 0;
    return [id, new Date(), safe(d.title), safe(d.brand), safe(d.poNumber), st[d.status] || safe(d.status), n(d.spent), back, safe(d.docsDue), json];
  }
  return [id, new Date(), safe(d.name), team[d.workstream] || "", safe(d.role), safe(d.areas), json];
}

// Team member's name for the readable "Who" column
function personName(id) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.team);
  var row = sh ? findRow(sh, String(id || "")) : 0;
  return row ? safe(sh.getRange(row, 3).getValue()) : "";
}

function safe(v) {
  var s = String(v == null ? "" : v).slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;   // never let text become a spreadsheet formula
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
