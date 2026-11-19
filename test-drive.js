// =====================================================================
// TEST-DRIVE BOOKING FORM
// Fills the brand / model / showroom lists from brands-data.js and
// showrooms-data.js, checks the answers, then sends the booking to the
// Google Sheet CRM (address in crm-config.js).
// Links can pre-select things: test-drive.html?b=ford&model=Everest&branch=ปากช่อง
// =====================================================================

const form = document.getElementById("td-form");

if (form) {
  const params = new URLSearchParams(window.location.search);
  const brandSel = document.getElementById("td-brand");
  const modelSel = document.getElementById("td-model");
  const branchSel = document.getElementById("td-branch");
  const dateInput = document.getElementById("td-date");
  const errorsBox = document.getElementById("td-errors");
  const doneBox = document.getElementById("td-done");
  const submitBtn = document.getElementById("td-submit");
  const LINE_LINK = "https://lin.ee/zeSHGfB";

  // ----- Brand list (car brands first, then AVATR) -----
  const brandKeys = brandOrder.filter(function (k) { return brands[k]; });
  if (brands.avatr && brandKeys.indexOf("avatr") === -1) brandKeys.push("avatr");
  brandSel.innerHTML = '<option value="">Choose a brand · เลือกแบรนด์</option>' +
    brandKeys.map(function (k) { return '<option value="' + k + '">' + brands[k].name + "</option>"; }).join("");

  // ----- Models and showrooms follow the chosen brand -----
  function fillForBrand(key, wantModel, wantBranch) {
    const b = brands[key];
    modelSel.innerHTML = '<option value="">Not sure yet · ยังไม่แน่ใจ</option>' +
      (b ? b.models.map(function (m) { return "<option>" + m.name + "</option>"; }).join("") : "");
    const rooms = showrooms.filter(function (s) { return s.brand === key; });
    branchSel.innerHTML = (rooms.length ? '<option value="">Choose a showroom · เลือกโชว์รูม</option>' : '<option value="">Choose a brand first · เลือกแบรนด์ก่อน</option>') +
      rooms.map(function (s) {
        const label = s.name + " · " + s.province;
        return '<option value="' + label + '">' + label + "</option>";
      }).join("");
    if (rooms.length === 1) branchSel.selectedIndex = 1;   // only one showroom: choose it
    if (wantModel) modelSel.value = wantModel;
    if (wantBranch) {
      const match = Array.prototype.find.call(branchSel.options, function (o) { return o.value.indexOf(wantBranch) === 0; });
      if (match) branchSel.value = match.value;
    }
  }

  brandSel.addEventListener("change", function () { fillForBrand(brandSel.value); clearError(brandSel); });

  const startBrand = params.get("b");
  if (startBrand && brands[startBrand]) brandSel.value = startBrand;
  fillForBrand(brandSel.value, params.get("model"), params.get("branch"));

  // No dates in the past
  const today = new Date();
  dateInput.min = today.toISOString().slice(0, 10);

  // ----- Checking answers -----
  function cleanPhone(v) { return v.replace(/[^\d]/g, ""); }

  const rules = [
    { el: brandSel, msg: "Please choose a brand · กรุณาเลือกแบรนด์", ok: function (v) { return !!v; } },
    { el: branchSel, msg: "Please choose a showroom · กรุณาเลือกโชว์รูม", ok: function (v) { return !!v; } },
    { el: document.getElementById("td-name"), err: "td-name-err", msg: "Please enter your name · กรุณากรอกชื่อ", ok: function (v) { return v.trim().length >= 2; } },
    { el: document.getElementById("td-phone"), err: "td-phone-err", msg: "Please enter a Thai mobile number, e.g. 081-234-5678 · กรุณากรอกเบอร์โทร 10 หลัก", ok: function (v) { return /^0\d{8,9}$/.test(cleanPhone(v)); } },
    { el: document.getElementById("td-consent"), err: "td-consent-err", msg: "Please tick the consent box so we can contact you · กรุณายืนยันการให้ความยินยอม", ok: function (v, el) { return el.checked; } }
  ];

  function showError(rule) {
    rule.el.setAttribute("aria-invalid", "true");
    if (rule.err) {
      const p = document.getElementById(rule.err);
      p.textContent = rule.msg;
      rule.el.setAttribute("aria-describedby", rule.err);
    }
  }

  function clearError(el) {
    el.removeAttribute("aria-invalid");
    const rule = rules.find(function (r) { return r.el === el; });
    if (rule && rule.err) document.getElementById(rule.err).textContent = "";
  }

  // Check a field when the customer leaves it
  rules.forEach(function (rule) {
    rule.el.addEventListener("blur", function () {
      if (rule.el.type === "checkbox") return;
      if (rule.el.value && !rule.ok(rule.el.value, rule.el)) showError(rule);
    });
    rule.el.addEventListener("input", function () { if (rule.ok(rule.el.value, rule.el)) clearError(rule.el); });
    rule.el.addEventListener("change", function () { if (rule.ok(rule.el.value, rule.el)) clearError(rule.el); });
  });

  // ----- Sending -----
  function makeRef() {
    // e.g. TD-261119-4821 (date + 4 random digits)
    const d = new Date();
    const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
    return "TD-" + ymd + "-" + Math.floor(1000 + Math.random() * 9000);
  }

  function contactButtons() {
    return '<div class="td-done-actions">' +
      '<a class="btn btn-primary" href="tel:044049888">Call 044-049888 · โทร</a>' +
      '<a class="btn btn-dark" href="' + LINE_LINK + '" target="_blank" rel="noopener">Chat on LINE</a>' +
    "</div>";
  }

  function showDone(html) {
    form.hidden = true;
    doneBox.innerHTML = html;
    doneBox.hidden = false;
    doneBox.focus();
    doneBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Check everything
    const failed = rules.filter(function (r) { return !r.ok(r.el.value, r.el); });
    rules.forEach(function (r) { clearError(r.el); });
    if (failed.length) {
      failed.forEach(showError);
      errorsBox.innerHTML = "<strong>Please check " + failed.length + (failed.length > 1 ? " items" : " item") + " · กรุณาตรวจสอบข้อมูล</strong><ul>" +
        failed.map(function (r) { return '<li><a href="#' + r.el.id + '">' + r.msg + "</a></li>"; }).join("") + "</ul>";
      errorsBox.hidden = false;
      errorsBox.focus();
      return;
    }
    errorsBox.hidden = true;

    // Spam trap filled = a robot; pretend it worked
    if (document.getElementById("td-website").value) { showDone("<h2>Thank you · ขอบคุณค่ะ</h2>"); return; }

    const data = new FormData(form);
    const brandKey = data.get("brand");
    const booking = {
      ref: makeRef(),
      brandKey: brandKey,
      brand: brands[brandKey] ? brands[brandKey].name : brandKey,
      model: data.get("model") || "Not sure yet",
      branch: data.get("branch"),
      date: data.get("date") || "",
      time: data.get("time") || "Any time",
      name: data.get("name").trim(),
      phone: cleanPhone(data.get("phone")),
      lineId: (data.get("lineId") || "").trim(),
      contactBy: data.get("contactBy"),
      note: (data.get("note") || "").trim(),
      consent: "Yes",
      page: window.location.href,
      submittedAt: new Date().toISOString()
    };

    const summary =
      '<dl class="td-summary">' +
        "<div><dt>Reference · เลขอ้างอิง</dt><dd>" + booking.ref + "</dd></div>" +
        "<div><dt>Car · รถ</dt><dd>" + booking.brand + " · " + booking.model + "</dd></div>" +
        "<div><dt>Showroom · โชว์รูม</dt><dd>" + booking.branch + "</dd></div>" +
        (booking.date ? "<div><dt>Date · วันที่</dt><dd>" + booking.date + " · " + booking.time + "</dd></div>" : "") +
      "</dl>";

    // 2. CRM not connected yet: never pretend it was sent
    if (typeof CRM_ENDPOINT === "undefined" || !CRM_ENDPOINT) {
      console.warn("Test-drive CRM is not connected: add the Web app URL in crm-config.js");
      showDone(
        '<p class="eyebrow">Almost there · อีกนิดเดียว</p>' +
        "<h2>Please call or LINE us to confirm</h2>" +
        "<p>Online booking is being set up. Tell our team the details below and we will book your test drive straight away. · ระบบจองออนไลน์กำลังเปิดใช้งาน กรุณาโทรหรือแชท LINE แจ้งรายละเอียดด้านล่าง</p>" +
        summary + contactButtons());
      return;
    }

    // 3. Send to the Google Sheet
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    fetch(CRM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",                                   // Google Apps Script accepts this simple form
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(booking)
    })
      .then(function () {
        showDone(
          '<span class="td-check" aria-hidden="true">✓</span>' +
          '<p class="eyebrow">Booking received · ได้รับคำขอแล้ว</p>' +
          "<h2>ขอบคุณค่ะ คุณ" + booking.name.split(" ")[0] + "</h2>" +
          "<p>" + CRM_REPLY_TIME_TH + "<br>" + CRM_REPLY_TIME_EN + "</p>" +
          summary +
          '<p class="td-small">Need it sooner? · ต้องการด่วน?</p>' + contactButtons());
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
        errorsBox.innerHTML = "<strong>We couldn't send your booking. Please check your internet, or call / LINE us. · ส่งไม่สำเร็จ กรุณาลองใหม่หรือติดต่อเรา</strong>" + contactButtons();
        errorsBox.hidden = false;
        errorsBox.focus();
      });
  });
}
