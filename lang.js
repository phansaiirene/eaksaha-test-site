// =====================================================================
// THAI / ENGLISH SWITCH (TH | EN in the top menu)
// The pages are written in both languages, e.g. "Book a test drive · จองทดลองขับ",
// or an English heading with a Thai line under it (<span class="th">).
// This script shows only the chosen language. Sentences that exist only in
// English are translated with the list below; add more lines the same way.
// =====================================================================

const TRANSLATIONS = {
  // Menu and footer
  "Brands": "แบรนด์",
  "Promotions": "โปรโมชั่น",
  "Showrooms": "โชว์รูม",
  "Services": "บริการ",
  "About": "เกี่ยวกับเรา",
  "Contact": "ติดต่อเรา",
  "Book a Test Drive": "จองทดลองขับ",
  "Book a test drive": "จองทดลองขับ",
  // Hero
  "From Korat to the whole country: 13 car brands and 46 showrooms in 12 provinces, with sales, service, insurance and finance in one place.":
    "จากโคราชสู่ทั่วประเทศ 13 แบรนด์รถยนต์ 46 โชว์รูมใน 12 จังหวัด ครบทั้งงานขาย ศูนย์บริการ ประกันภัย และสินเชื่อในที่เดียว",
  "Authorized": "ตัวแทนจำหน่าย",
  "dealer": "อย่างเป็นทางการ",
  "Free": "ทดลองขับ",
  "test drive": "ฟรี",
  "Full service": "ศูนย์บริการ",
  "centres": "ครบวงจร",
  // About
  "13 brands in one group": "13 แบรนด์ในเครือเดียว",
  "Pickups, family SUVs and EVs": "กระบะ SUV ครอบครัว และรถไฟฟ้า",
  "Fair, clear prices": "ราคาชัดเจน ยุติธรรม",
  "Official prices and monthly offers": "ราคาอย่างเป็นทางการ และโปรโมชั่นทุกเดือน",
  "Easy to reach": "ติดต่อง่าย",
  "Call, LINE or book online": "โทร แชท LINE หรือจองออนไลน์",
  "See our brands": "ดูแบรนด์ทั้งหมด",
  // Offer banner
  "Try any of our 13 brands at the showroom nearest you. Book online in under a minute.":
    "ลองขับได้ทุกแบรนด์ที่โชว์รูมใกล้บ้านคุณ จองออนไลน์ได้ในไม่ถึงนาที",
  // Services
  "New cars from 13 brands, with expert advice and test drives.": "รถใหม่ 13 แบรนด์ พร้อมคำแนะนำจากผู้เชี่ยวชาญและบริการทดลองขับ",
  "Car insurance plans to protect you on every drive.": "ประกันภัยรถยนต์ คุ้มครองทุกการเดินทาง",
  "Flexible payment plans to fit your budget.": "แผนผ่อนชำระยืดหยุ่น เหมาะกับงบประมาณของคุณ",
  // Related businesses
  "See models →": "ดูรุ่นรถ →",
  "Visit website ↗": "เข้าชมเว็บไซต์ ↗",
  "AVATR Korat": "AVATR โคราช",
  // Showroom list
  "approximate": "โดยประมาณ",
  // Contact
  "Add us on LINE": "เพิ่มเพื่อนใน LINE",
  "View map · ดูแผนที่ →": "ดูแผนที่ →",
  // Test-drive page
  "Book a test drive in under a minute": "จองทดลองขับได้ในไม่ถึงนาที",
  "Prefer to talk now?": "คุยกับเราได้ทันที",
  "Call 044-049888": "โทร 044-049888",
  "Chat on LINE": "แชทผ่าน LINE",
  "Visit a showroom": "ไปที่โชว์รูม"
};

// Thai-only text shown in English mode
const TRANSLATIONS_EN = {
  "เครือข่ายรถยนต์": "Nationwide car",
  "จำหน่ายทั่วประเทศ": "dealer network",
  "ลองขับก่อน": "Try it",
  "ตัดสินใจ": "before you decide",
  "จองทดลองขับ": "Book a test drive",
  "ค้นหาโชว์รูม": "Find a showroom"
};


// Showroom, province and region names shown in English mode
const PLACES_EN = {
  "โคราช (จอหอ)": "Korat (Jo Ho)",
  "ราชสีมา (สำนักงานใหญ่)": "Ratchasima (Head office)",
  "บางนา (โชว์รูมชั่วคราว)": "Bang Na (temporary showroom)",
  "เอกสหออโต สุรินทร์": "Eaksaha Auto Surin",
  "เอกสหออโต บุรีรัมย์": "Eaksaha Auto Buriram",
  "เอกสพลัส บุรีรัมย์": "Eaksaha Plus Buriram",
  "พัทยา - นาจอมเทียน": "Pattaya - Na Jomtien",
  "เกษตร - นวมินทร์": "Kaset - Nawamin",
  "พหลโยธิน กม.25": "Phahonyothin Km 25",
  "บางนา กม.13": "Bang Na Km 13",
  "รังสิต คลอง 9": "Rangsit Khlong 9",
  "ภาคตะวันออกเฉียงเหนือ": "Northeast",
  "กรุงเทพฯ และปริมณฑล": "Bangkok & Vicinity",
  "ภาคตะวันออก": "East",
  "ภาคใต้": "South",
  "กรุงเทพมหานคร": "Bangkok",
  "นครราชสีมา": "Nakhon Ratchasima",
  "สมุทรปราการ": "Samut Prakan",
  "สุวินทวงศ์": "Suwinthawong",
  "บุรีรัมย์": "Buriram",
  "ปทุมธานี": "Pathum Thani",
  "จันทบุรี": "Chanthaburi",
  "เพชรเกษม": "Phetkasem",
  "นครนายก": "Nakhon Nayok",
  "สุรินทร์": "Surin",
  "ราชสีมา": "Ratchasima",
  "พระราม 2": "Rama 2",
  "ปากช่อง": "Pak Chong",
  "นนทบุรี": "Nonthaburi",
  "ตลาดไท": "Talad Thai",
  "ชลบุรี": "Chonburi",
  "ภูเก็ต": "Phuket",
  "พิมาย": "Phimai",
  "ระยอง": "Rayong",
  "โคราช": "Korat",
  "บางนา": "Bang Na",
  "ตราด": "Trat"
};
// longest first, so "โคราช (จอหอ)" wins over "โคราช"
const PLACE_KEYS = Object.keys(PLACES_EN).sort(function (a, b) { return b.length - a.length; });

(function () {
  const THAI = /[฀-๿]/;
  const LATIN = /[A-Za-z]/;
  const original = new WeakMap();          // text node → its original text
  const originalAttr = new WeakMap();      // element → {attr: original}
  let lang = "th";
  try { lang = localStorage.getItem("eaksaha-lang") || "th"; } catch (e) { /* private mode */ }

  // "Book a test drive · จองทดลองขับ" → keep only the chosen language
  function pickLanguage(text) {
    if (text.indexOf("·") === -1 || !THAI.test(text) || !LATIN.test(text)) return null;
    const parts = text.split("·");
    const keep = parts.filter(function (p) {
      const hasThai = THAI.test(p);
      return lang === "th" ? hasThai : !hasThai;
    });
    if (!keep.length || keep.length === parts.length) return null;
    // keep the leading/trailing spaces of the original
    const lead = text.match(/^\s*/)[0];
    const trail = text.match(/\s*$/)[0];
    return lead + keep.map(function (p) { return p.trim(); }).join(" · ") + trail;
  }

  function englishPlaces(text) {
    if (!THAI.test(text)) return null;
    let out = text;
    PLACE_KEYS.forEach(function (k) { if (out.indexOf(k) !== -1) out = out.split(k).join(PLACES_EN[k]); });
    return out === text ? null : out;
  }

  function translateText(text, node) {
    const trimmed = text.trim();
    if (!trimmed) return null;
    if (lang === "th" && TRANSLATIONS[trimmed]) return text.replace(trimmed, TRANSLATIONS[trimmed]);
    if (lang === "en" && TRANSLATIONS_EN[trimmed]) return text.replace(trimmed, TRANSLATIONS_EN[trimmed]);
    const picked = pickLanguage(text);
    if (lang !== "en") return picked;
    // English mode: also turn Thai place names into English (street addresses stay Thai)
    const parent = node && node.parentNode;
    if (parent && parent.closest && parent.closest(".detail-address, .address")) return picked;
    const placed = englishPlaces(picked === null ? text : picked);
    return placed === null ? picked : placed;
  }

  function processNode(root) {
    // 1. Text
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        const p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest(".lang-switch, .leaflet-container .leaflet-control-attribution")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      if (!original.has(n)) original.set(n, n.nodeValue);
      const base = original.get(n);
      const out = translateText(base, n);
      const want = out === null ? base : out;
      if (n.nodeValue !== want) n.nodeValue = want;
    });

    // 2. Placeholders and labels
    const els = root.querySelectorAll ? root.querySelectorAll("[placeholder], [aria-label], [alt]") : [];
    Array.prototype.forEach.call(els, function (el) {
      ["placeholder", "aria-label", "alt"].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        let store = originalAttr.get(el);
        if (!store) { store = {}; originalAttr.set(el, store); }
        if (!(attr in store)) store[attr] = el.getAttribute(attr);
        const out = translateText(store[attr]);
        el.setAttribute(attr, out === null ? store[attr] : out);
      });
    });

    // 3. English heading + Thai line under it: wrap the English words so CSS can hide them
    const ths = root.querySelectorAll ? root.querySelectorAll(".th") : [];
    Array.prototype.forEach.call(ths, function (th) {
      const parent = th.parentNode;
      if (!parent || parent.dataset.langWrapped) return;
      parent.dataset.langWrapped = "1";
      // Usually the line under is Thai; sometimes it is the English one (Thai heading on top)
      const underIsEnglish = !THAI.test(original.get(th.firstChild) || th.textContent);
      if (underIsEnglish) th.classList.add("th-is-en");
      Array.prototype.slice.call(parent.childNodes).forEach(function (c) {
        if (c === th || c.nodeType !== 3 || !c.nodeValue.trim()) return;
        const isThai = THAI.test(original.get(c) || c.nodeValue);
        if (underIsEnglish ? isThai : !isThai) {
          const span = document.createElement("span");
          span.className = underIsEnglish ? "th-part" : "en-part";
          parent.insertBefore(span, c);
          span.appendChild(c);
        }
      });
    });

    // 4. English paragraph followed by its Thai version
    const thParas = root.querySelectorAll ? root.querySelectorAll(".th-paragraph") : [];
    Array.prototype.forEach.call(thParas, function (p) {
      const prev = p.previousElementSibling;
      if (prev && prev.tagName === "P") prev.classList.add("en-para");
    });
  }

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("lang-th", lang === "th");
    document.documentElement.classList.toggle("lang-en", lang === "en");
    processNode(document.body);
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
  }

  // The TH | EN buttons, added to the top menu of every page
  const bar = document.querySelector(".navbar-inner");
  if (bar) {
    const sw = document.createElement("div");
    sw.className = "lang-switch";
    sw.setAttribute("role", "group");
    sw.setAttribute("aria-label", "Language · ภาษา");
    sw.innerHTML = '<button type="button" data-lang="th" lang="th">TH</button><button type="button" data-lang="en" lang="en">EN</button>';
    const toggle = bar.querySelector(".menu-toggle");
    bar.insertBefore(sw, toggle);
    sw.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b || b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      try { localStorage.setItem("eaksaha-lang", lang); } catch (err) { /* ignore */ }
      apply();
    });
  }

  apply();

  // Parts of pages built later (brand pages, showroom list, booking form) get the same treatment
  // (only the newly added pieces are checked, and map tiles are skipped)
  const queue = new Set();
  let pending = false;
  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        const el = n.nodeType === 1 ? n : n.parentNode;
        if (!el || !el.closest || el.closest(".leaflet-pane, .lang-switch")) return;
        queue.add(el);
      });
    });
    if (pending || !queue.size) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      const items = Array.from(queue);
      queue.clear();
      items.forEach(function (el) { if (el.isConnected) processNode(el.parentNode || el); });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
