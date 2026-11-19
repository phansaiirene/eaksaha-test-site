// =====================================================================
// BRAND PAGE BUILDER
// Reads which brand to show from the web address, e.g. brand.html?b=ford,
// then builds the page from the information in brands-data.js.
// You normally never need to edit this file: edit brands-data.js instead.
// =====================================================================

// Where every "Book a test drive" button goes: the booking form, with this brand chosen
const TEST_DRIVE_LINK = "test-drive.html?b=" + encodeURIComponent(new URLSearchParams(window.location.search).get("b") || "");
const LINE_CHAT = "https://lin.ee/zeSHGfB";
const PHONE_LINK = "tel:044049888";

const page = document.getElementById("brand-page");
// DEEPAL is part of CHANGAN, so old ?b=deepal links open the CHANGAN page
const BRAND_ALIASES = { deepal: "changan" };
const requestedBrand = new URLSearchParams(window.location.search).get("b");
const brandKey = BRAND_ALIASES[requestedBrand] || requestedBrand;
const brand = brands[brandKey];

// Logo file for each brand (most are .webp; these three are background-free versions)
const LOGO_FILES = { "omoda-jaecoo": "omoda-jaecoo.svg", mg: "mg.svg", "gac-aion": "gac-aion.png" };
function logoSrc(key) {
  return "images/logos/" + (LOGO_FILES[key] || key + ".webp");
}

// Turns 1099000 into "1,099,000"
function formatPrice(number) {
  return Number(number).toLocaleString("en-US");
}

// Turns "Ranger Raptor" into "ranger-raptor" (used for jump links)
function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// The small "Other brands" grid at the bottom of every brand page
function otherBrandsHtml(currentKey) {
  return brandOrder
    .filter(function (key) { return key !== currentKey && brands[key]; })
    .map(function (key) {
      return '<a class="brand-box" href="brand.html?b=' + key + '">' +
        '<span class="brand-logo"><img src="' + logoSrc(key) + '" alt="" loading="lazy"></span>' +
        '<span class="brand-name">' + brands[key].name + "</span>" +
        '<span class="brand-meta">' + brands[key].models.length + " models</span>" +
        '<span class="brand-arrow" aria-hidden="true">→</span></a>';
    })
    .join("");
}

// Videos for this brand (from brand-videos.js), or an empty list
function videoInfo(key) {
  return (typeof brandVideos !== "undefined" && brandVideos[key]) ? brandVideos[key] : { hero: "", videos: [] };
}

// A YouTube player (privacy-friendly youtube-nocookie address)
function youtubeCard(v) {
  return '<figure class="video-card">' +
    '<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '?rel=0" ' +
      'title="' + v.title.replace(/"/g, "&quot;") + '" loading="lazy" ' +
      'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>' +
    "<figcaption><strong>" + v.title + "</strong><span>" + v.by + "</span></figcaption>" +
  "</figure>";
}

// One car card
function modelCardHtml(model) {
  // Price table, or a friendly "price coming soon" note if no prices yet
  let priceHtml;
  if (model.versions && model.versions.length) {
    const rows = model.versions.map(function (v) {
      return "<li><span>" + v.name + "</span><strong>" + formatPrice(v.price) + ".-</strong></li>";
    }).join("");
    const lowest = Math.min.apply(null, model.versions.map(function (v) { return v.price; }));
    priceHtml =
      '<p class="price-from">Starting from · ราคาเริ่มต้น <strong>' + formatPrice(lowest) + " <small>บาท</small></strong></p>" +
      '<p class="price-title">Official prices · ราคาอย่างเป็นทางการ</p>' +
      '<ul class="price-list">' + rows + "</ul>";
  } else {
    priceHtml =
      '<p class="price-soon">Price coming soon · รอประกาศราคา<br>' +
      '<a href="' + LINE_CHAT + '" target="_blank" rel="noopener">Ask for today\'s price on LINE →</a></p>';
  }

  const promoHtml = model.promo
    ? '<p class="model-promo"><span>Promotion · โปรโมชั่น</span>' + model.promo + "</p>"
    : "";

  const chips = ['<li>' + model.fuel + "</li>"];
  if (model.seats) chips.push("<li>" + model.seats + " seats · ที่นั่ง</li>");

  return (
    '<article class="model-card" id="' + slug(model.name) + '">' +
      // Car photo, or the brand logo when there is no photo yet
      (model.image
        ? '<div class="model-image has-photo' + (model.imageFit === "cover" ? " fill" : "") + '"><img src="' + model.image + '" alt="' + model.name + '" loading="lazy"></div>'
        : '<div class="model-image no-photo"><img src="' + logoSrc(brandKey) + '" alt="" loading="lazy"><span>' + model.name + "</span></div>") +
      '<div class="model-body">' +
        '<p class="card-brand">' + model.type + "</p>" +
        "<h3>" + model.name + "</h3>" +
        '<p class="model-tagline">' + model.tagline + "</p>" +
        '<ul class="model-chips">' + chips.join("") + "</ul>" +
        '<div class="model-price">' + priceHtml + "</div>" +
        promoHtml +
        '<a class="btn btn-primary model-cta" href="' + TEST_DRIVE_LINK + '&model=' + encodeURIComponent(model.name) + '">' +
          "Book a test drive · จองทดลองขับ</a>" +
      "</div>" +
    "</article>"
  );
}

if (brand) {
  // ----- Page title in the browser tab -----
  document.title = brand.name + " | Models & prices | Eaksaha Group";
  document.querySelector('meta[name="description"]').setAttribute(
    "content",
    brand.name + " models, prices and test drives at Eaksaha Group · รุ่นรถ ราคา และจองทดลองขับ " + brand.name
  );

  const jumpLinks = brand.models.map(function (m) {
    return '<a href="#' + slug(m.name) + '">' + m.name + "</a>";
  }).join("");

  const branchPills = brand.branches.map(function (b) { return "<li>" + b + "</li>"; }).join("");

  const info = videoInfo(brandKey);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroVideoHtml = (info.hero && !reduceMotion)
    ? '<div class="brand-hero-video" aria-hidden="true"><iframe tabindex="-1" title="" ' +
        'src="https://www.youtube-nocookie.com/embed/' + info.hero + '?autoplay=1&mute=1&loop=1&playlist=' + info.hero +
        '&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1" allow="autoplay; encrypted-media"></iframe></div>'
    : '<div class="hero-aurora" aria-hidden="true"><span></span><span></span><span></span></div>';

  page.innerHTML =
    // ----- 1. Brand header -----
    '<section class="brand-hero">' +
      // Silent looping brand video behind the top of the page (skipped for "reduce motion")
      heroVideoHtml +
      '<div class="brand-hero-shade" aria-hidden="true"></div>' +
      '<div class="container brand-hero-inner">' +
        '<nav class="breadcrumb" aria-label="Breadcrumb">' +
          '<a href="index.html">Home</a><span>/</span><a href="index.html#brands">Brands</a><span>/</span>' + brand.name +
        "</nav>" +
        '<span class="brand-hero-logo"><img src="' + logoSrc(brandKey) + '" alt="' + brand.name + ' logo"></span>' +
        '<p class="eyebrow">Eaksaha Group · Authorized dealer · ตัวแทนจำหน่ายอย่างเป็นทางการ</p>' +
        "<h1>" + brand.name + '<span class="th">' + brand.th + " · " + brand.introTh + "</span></h1>" +
        '<p class="brand-intro">' + brand.intro + "</p>" +
        '<div class="brand-actions">' +
          '<a href="' + TEST_DRIVE_LINK + '" class="btn btn-primary">Book a test drive · จองทดลองขับ</a>' +
          '<a href="#models" class="btn btn-ghost">See models &amp; prices · ดูรุ่นและราคา</a>' +
          '<a href="' + PHONE_LINK + '" class="btn btn-call">Call 044-049888</a>' +
        "</div>" +
        '<div class="brand-facts">' +
          '<p><strong>' + brand.models.length + "</strong> models · รุ่น</p>" +
          '<p><strong>' + brand.branches.length + "</strong> " + (brand.branches.length > 1 ? "branches" : "branch") + " · สาขา</p>" +
          (info.videos.length ? '<p><strong>' + info.videos.length + "</strong> videos · วิดีโอ</p>" : "") +
        "</div>" +
      "</div>" +
    "</section>" +

    // ----- 2. Car models with prices -----
    '<section class="section section-grey" id="models">' +
      '<div class="container">' +
        "<h2>Models &amp; prices <span class=\"th\">รุ่นรถและราคา</span></h2>" +
        '<nav class="model-jump" aria-label="Jump to a model">' + jumpLinks + "</nav>" +
        '<div class="model-grid">' + brand.models.map(modelCardHtml).join("") + "</div>" +
        '<p class="price-note">Prices are the official suggested retail prices and may change. ' +
          "Please contact the showroom for the latest price and promotion. · ราคาอาจเปลี่ยนแปลงได้ กรุณาสอบถามโชว์รูม</p>" +
      "</div>" +
    "</section>" +

    // ----- 2b. Videos -----
    (info.videos.length
      ? '<section class="section brand-videos" id="videos">' +
          '<div class="container">' +
            "<h2>Videos <span class=\"th\">วิดีโอ " + brand.name + "</span></h2>" +
            '<div class="video-grid">' + info.videos.map(youtubeCard).join("") + "</div>" +
          "</div>" +
        "</section>"
      : "") +

    // ----- 3. Where to buy -----
    '<section class="section">' +
      '<div class="container">' +
        "<h2>Where to buy " + brand.name + ' <span class="th">โชว์รูม ' + brand.name + " ในเครือเอกสหกรุ๊ป</span></h2>" +
        '<ul class="branch-list brand-branches">' + branchPills + "</ul>" +
        '<a class="text-link" href="index.html?brand=' + brandKey + '#showrooms">See ' + brand.name + " showrooms on the map · ดูแผนที่โชว์รูม →</a>" +
      "</div>" +
    "</section>" +

    // ----- 4. Other brands -----
    '<section class="section section-grey">' +
      '<div class="container">' +
        '<h2>Other brands <span class="th">แบรนด์อื่นในเครือ</span></h2>' +
        '<div class="brand-grid">' + otherBrandsHtml(brandKey) + "</div>" +
      "</div>" +
    "</section>";

  // ----- Show the bottom "Book a test drive" bar with the brand name -----
  document.getElementById("cta-bar-brand").textContent = brand.name;
  document.getElementById("cta-bar").hidden = false;
  ["nav-test-drive", "cta-test-drive"].forEach(function (id) {
    const a = document.getElementById(id);
    if (a) a.href = TEST_DRIVE_LINK;
  });
} else {
  // Wrong or missing brand in the address → show all brands instead
  page.innerHTML =
    '<section class="section">' +
      '<div class="container">' +
        '<h2>Choose a brand <span class="th">เลือกแบรนด์</span></h2>' +
        '<div class="brand-grid">' + otherBrandsHtml(null) + "</div>" +
      "</div>" +
    "</section>";
}
