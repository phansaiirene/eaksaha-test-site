// =====================================================================
// SHOWROOM MAP
// Builds the region tabs, the coloured provinces, the pins, the list and
// the Google Maps view, all from showrooms-data.js.
// To add or move a showroom, edit showrooms-data.js (not this file).
// =====================================================================

// Region colours: same as the map on the old eaksahagroup.com website
const REGION_COLORS = {
  northeast: "#ea580c",   // orange
  bangkok:   "#dc2626",   // red
  east:      "#0284c7",   // blue
  south:     "#16a34a"    // green
};

// The 12 provinces with an Eaksaha showroom, and which region each belongs to.
// The names must match the province outline file below.
const PROVINCE_REGION = {
  "Nakhon Ratchasima": "northeast", "Buri Ram": "northeast", "Surin": "northeast",
  "Bangkok Metropolis": "bangkok", "Pathum Thani": "bangkok", "Nonthaburi": "bangkok",
  "Nakhon Nayok": "east", "Chon Buri": "east", "Rayong": "east", "Chanthaburi": "east", "Trat": "east",
  "Phuket": "south"
};
const PROVINCE_TH = {
  "Nakhon Ratchasima": "นครราชสีมา", "Buri Ram": "บุรีรัมย์", "Surin": "สุรินทร์",
  "Bangkok Metropolis": "กรุงเทพมหานคร", "Pathum Thani": "ปทุมธานี", "Nonthaburi": "นนทบุรี",
  "Nakhon Nayok": "นครนายก", "Chon Buri": "ชลบุรี", "Rayong": "ระยอง", "Chanthaburi": "จันทบุรี", "Trat": "ตราด",
  "Phuket": "ภูเก็ต"
};

// Outline of every Thai province (free, public file)
const PROVINCES_URL = "https://cdn.jsdelivr.net/gh/apisit/thailand.json@master/thailand.json";

const LINE_LINK = "https://lin.ee/zeSHGfB";
const HQ_PHONE = "044-049888";
const THAILAND = [[5.6, 97.3], [20.5, 105.7]];

const mapBox = document.getElementById("map");

// Brand display name, e.g. "omoda-jaecoo" → "OMODA & JAECOO"
function brandName(key) {
  return (typeof brands !== "undefined" && brands[key]) ? brands[key].name : key.toUpperCase();
}

// What Google Maps should look for.
// Exact pins use the map position itself, so Google can't pick the wrong place.
// Approximate pins search by brand + branch name instead.
function mapsQuery(s) {
  if (s.exact) return s.lat + "," + s.lng;
  return s.address
    ? brandName(s.brand) + " " + s.address
    : brandName(s.brand) + " เอกสห " + s.name + " " + s.province;
}

// The teardrop pin, coloured by region (bigger when selected)
function pinIcon(s, selected) {
  const w = selected ? 34 : 24;
  const h = selected ? 45 : 32;
  return L.divIcon({
    className: "map-pin2" + (selected ? " is-selected" : ""),
    html:
      '<svg viewBox="0 0 24 32" width="' + w + '" height="' + h + '" aria-hidden="true">' +
        '<path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="' +
          REGION_COLORS[s.region] + '" stroke="#fff" stroke-width="1.5"/>' +
        '<circle cx="12" cy="12" r="4.5" fill="#fff"/>' +
      "</svg>",
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    tooltipAnchor: [0, -h]
  });
}

if (mapBox && window.L && typeof showrooms !== "undefined") {
  const isPhone = window.matchMedia("(max-width: 860px)").matches;
  const state = { region: "all", brand: "", query: "", selected: null };

  const tabsBox = document.getElementById("region-tabs");
  const listBox = document.getElementById("finder-list");
  const toolsBox = document.getElementById("finder-tools");
  const detailBox = document.getElementById("finder-detail");
  const countBox = document.getElementById("finder-count");
  const searchBox = document.getElementById("finder-search");
  const brandSelect = document.getElementById("finder-brand");

  // ----- The map itself -----
  const map = L.map("map", {
    scrollWheelZoom: false,     // scrolling the page won't zoom the map by accident
    dragging: !isPhone,         // on phones, one finger scrolls the page (not the map)
    zoomControl: false,
    zoomSnap: 0.5
  });
  L.control.zoom({ position: "topright" }).addTo(map);

  // Light grey map (free Esri tiles, no key needed).
  // Place names sit on their own layer ABOVE the coloured provinces so they stay readable.
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
  const ESRI_CREDIT = 'Tiles &copy; <a href="https://www.esri.com">Esri</a> — Esri, HERE, Garmin, &copy; OpenStreetMap contributors';
  L.tileLayer(ESRI + "World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    attribution: ESRI_CREDIT,
    maxZoom: 16
  }).addTo(map);
  map.createPane("labels");
  map.getPane("labels").style.zIndex = 450;          // above shapes, below pins
  map.getPane("labels").style.pointerEvents = "none";
  L.tileLayer(ESRI + "World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
    pane: "labels",
    maxZoom: 16
  }).addTo(map);

  map.fitBounds(THAILAND);
  const startZoom = map.getZoom();

  // On phones: allow dragging the map only after zooming in
  if (isPhone) {
    map.on("zoomend", function () {
      if (map.getZoom() > startZoom) map.dragging.enable();
      else map.dragging.disable();
    });
  }

  // Pins close together join into one numbered circle until you zoom in
  const cluster = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 16,   // fully zoomed in: always show single pins
    maxClusterRadius: 44,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: function (c) {
      const n = c.getChildCount();
      const size = n > 9 ? 44 : 36;
      return L.divIcon({
        className: "pin-cluster",
        html: "<span>" + n + "</span>",
        iconSize: [size, size]
      });
    }
  });
  map.addLayer(cluster);

  // One pin per showroom
  const markers = showrooms.map(function (s, i) {
    const m = L.marker([s.lat, s.lng], { icon: pinIcon(s, false), title: brandName(s.brand) + " " + s.name, riseOnHover: true });
    m.bindTooltip("<strong>" + brandName(s.brand) + "</strong> " + s.name, { direction: "top", className: "pin-tip" });
    m.on("click", function () { select(i); });
    return m;
  });

  // ----- Coloured provinces (like the old website map) -----
  // The colour fades when zoomed in, so streets stay easy to read
  function provinceFill() { return map.getZoom() >= 10 ? 0.05 : 0.22; }
  let provinceLayer = null;
  map.on("zoomend", function () {
    if (provinceLayer) provinceLayer.setStyle({ fillOpacity: provinceFill() });
  });

  fetch(PROVINCES_URL)
    .then(function (r) { return r.json(); })
    .then(function (geo) {
      geo.features = geo.features.filter(function (f) { return PROVINCE_REGION[f.properties.name]; });
      provinceLayer = L.geoJSON(geo, {
        style: function (f) {
          const c = REGION_COLORS[PROVINCE_REGION[f.properties.name]];
          return { color: c, weight: 1.5, fillColor: c, fillOpacity: provinceFill() };
        },
        onEachFeature: function (f, layer) {
          const en = f.properties.name;
          const count = showrooms.filter(function (s) { return s.province === PROVINCE_TH[en]; }).length;
          layer.bindTooltip(
            "<strong>" + PROVINCE_TH[en] + "</strong><br>" + count + " showroom" + (count === 1 ? "" : "s") + " · " + count + " โชว์รูม",
            { sticky: true, className: "pin-tip" }
          );
          layer.on("mouseover", function () { layer.setStyle({ fillOpacity: provinceFill() + 0.15 }); });
          layer.on("mouseout", function () { layer.setStyle({ fillOpacity: provinceFill() }); });
          // Tap a coloured province → open its region and zoom to it
          layer.on("click", function () {
            if (map.getZoom() >= 10) return;   // already zoomed in: let people explore
            setRegion(PROVINCE_REGION[en], false);
            map.flyToBounds(layer.getBounds(), { padding: [30, 30], duration: 0.8 });
          });
        }
      }).addTo(map).bringToBack();
    })
    .catch(function () { /* no internet for the outlines: the pins still work */ });

  // ----- Which showrooms match the tabs, search and brand filter -----
  function matches(s, ignoreRegion) {
    if (!ignoreRegion && state.region !== "all" && s.region !== state.region) return false;
    if (state.brand && s.brand !== state.brand) return false;
    if (state.query) {
      const text = (brandName(s.brand) + " " + s.name + " " + s.province + " " + s.address).toLowerCase();
      if (text.indexOf(state.query) === -1) return false;
    }
    return true;
  }

  // ----- Region tabs -----
  function renderTabs() {
    tabsBox.innerHTML = Object.keys(regions).map(function (key) {
      const count = showrooms.filter(function (s) {
        return matches(s, true) && (key === "all" || s.region === key);
      }).length;
      const dot = key === "all" ? "" : '<span class="tab-dot" style="background:' + REGION_COLORS[key] + '"></span>';
      return '<button type="button" role="tab" class="region-tab' + (state.region === key ? " active" : "") +
        '" aria-selected="' + (state.region === key) + '" data-region="' + key + '">' +
        dot + '<span class="tab-name">' + regions[key].name + "<small>" + regions[key].th + "</small></span>" +
        '<span class="tab-count">' + count + "</span></button>";
    }).join("");
  }

  tabsBox.addEventListener("click", function (e) {
    const tab = e.target.closest(".region-tab");
    if (tab) setRegion(tab.dataset.region, true);
  });

  // ----- The list, the pins and the counts -----
  function render(fitMap) {
    const visible = [];
    showrooms.forEach(function (s, i) { if (matches(s)) visible.push(i); });

    cluster.clearLayers();
    cluster.addLayers(visible.map(function (i) { return markers[i]; }));

    countBox.textContent = visible.length + (visible.length === 1 ? " showroom" : " showrooms") + " · " + visible.length + " โชว์รูม";

    listBox.innerHTML = visible.length
      ? visible.map(function (i) {
          const s = showrooms[i];
          return '<li><button type="button" class="finder-item" data-i="' + i + '" style="--region:' + REGION_COLORS[s.region] + '">' +
            '<span class="fi-brand">' + brandName(s.brand) + "</span>" +
            '<span class="fi-name">' + s.name + "</span>" +
            '<span class="fi-meta">' + s.province + (s.exact ? "" : ' · <em>approximate</em>') + "</span>" +
            '<span class="fi-arrow" aria-hidden="true">›</span>' +
          "</button></li>";
        }).join("")
      : '<li class="finder-empty">No showroom found. Try another brand or region. · ไม่พบโชว์รูม</li>';

    renderTabs();

    if (fitMap) {
      if (state.region === "all" && !state.brand && !state.query) {
        map.flyToBounds(THAILAND, { duration: 0.8 });
      } else if (visible.length) {
        const bounds = L.latLngBounds(visible.map(function (i) { return [showrooms[i].lat, showrooms[i].lng]; }));
        map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 12, duration: 0.8 });
      }
    }
  }

  listBox.addEventListener("click", function (e) {
    const item = e.target.closest(".finder-item");
    if (item) select(Number(item.dataset.i));
  });

  function setRegion(key, fitMap) {
    state.region = key;
    closeDetail(false);
    render(fitMap);
  }

  // ----- One showroom chosen: zoom in + show it on Google Maps -----
  function select(i) {
    const s = showrooms[i];
    if (state.selected !== null) markers[state.selected].setIcon(pinIcon(showrooms[state.selected], false));
    state.selected = i;

    const q = encodeURIComponent(mapsQuery(s));
    const phone = s.phone || HQ_PHONE;
    const color = REGION_COLORS[s.region];

    detailBox.innerHTML =
      '<button type="button" class="detail-back" id="detail-back">‹ All showrooms · ดูทุกสาขา</button>' +
      '<p class="detail-brand" style="color:' + color + '">' + brandName(s.brand) + "</p>" +
      '<h3 class="detail-name">' + s.name + "</h3>" +
      '<p class="detail-meta">' + s.province + " · " + regions[s.region].th + "</p>" +
      (s.address
        ? '<p class="detail-address">' + s.address + "</p>"
        : '<p class="detail-address detail-approx">Exact address coming soon. The Google map below searches for this showroom. · ตำแหน่งโดยประมาณ</p>') +
      '<div class="detail-gmap">' +
        '<iframe title="Google map: ' + brandName(s.brand) + " " + s.name + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
        'src="https://maps.google.com/maps?q=' + q + "&z=" + (s.exact ? 16 : 14) + '&hl=th&output=embed"></iframe>' +
      "</div>" +
      '<div class="detail-actions">' +
        '<a class="btn btn-map" href="https://www.google.com/maps/dir/?api=1&destination=' + q + '" target="_blank" rel="noopener">Directions on Google Maps · นำทาง</a>' +
        '<a class="btn btn-call" href="tel:' + phone.replace(/-/g, "") + '">Call ' + phone + (s.phone ? "" : " (head office)") + "</a>" +
      "</div>" +
      '<div class="detail-links">' +
        '<a href="brand.html?b=' + s.brand + '">See ' + brandName(s.brand) + " models &amp; prices →</a>" +
        '<a href="test-drive.html?b=' + s.brand + '&branch=' + encodeURIComponent(s.name) + '">Book a test drive here →</a>' +
      "</div>";

    toolsBox.hidden = true;
    listBox.hidden = true;
    detailBox.hidden = false;
    document.getElementById("detail-back").addEventListener("click", function () { closeDetail(true); });

    // Zoom the map in on the pin
    const marker = markers[i];
    map.flyTo([s.lat, s.lng], s.exact ? 15 : 13, { duration: 0.9 });
    map.once("moveend", function () {
      cluster.zoomToShowLayer(marker, function () { marker.setIcon(pinIcon(s, true)); });
    });

    if (isPhone) detailBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeDetail(fitMap) {
    if (state.selected !== null) markers[state.selected].setIcon(pinIcon(showrooms[state.selected], false));
    state.selected = null;
    detailBox.hidden = true;
    detailBox.innerHTML = "";
    toolsBox.hidden = false;
    listBox.hidden = false;
    if (fitMap) render(true);
  }

  // ----- Search box and brand filter -----
  const usedBrands = [];
  showrooms.forEach(function (s) { if (usedBrands.indexOf(s.brand) === -1) usedBrands.push(s.brand); });
  usedBrands.sort(function (a, b) { return brandName(a).localeCompare(brandName(b)); });
  brandSelect.insertAdjacentHTML("beforeend", usedBrands.map(function (key) {
    return '<option value="' + key + '">' + brandName(key) + "</option>";
  }).join(""));

  let typingTimer;
  searchBox.addEventListener("input", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
      state.query = searchBox.value.trim().toLowerCase();
      render(true);
    }, 250);
  });

  brandSelect.addEventListener("change", function () {
    state.brand = brandSelect.value;
    render(true);
  });

  // ----- Colour key under the map -----
  document.getElementById("map-legend").innerHTML = ["northeast", "bangkok", "east", "south"].map(function (key) {
    return '<li><span class="tab-dot" style="background:' + REGION_COLORS[key] + '"></span>' + regions[key].th + "</li>";
  }).join("");

  // A brand page can link here with a brand already chosen: index.html?brand=ford#showrooms
  const startBrand = new URLSearchParams(window.location.search).get("brand");
  if (startBrand && usedBrands.indexOf(startBrand) !== -1) {
    state.brand = startBrand;
    brandSelect.value = startBrand;
    render(true);
  } else {
    render(false);
  }
} else if (mapBox) {
  // If the map tool couldn't load (for example, no internet)
  mapBox.classList.add("map-offline");
  mapBox.textContent = "The map needs an internet connection. · แผนที่ต้องใช้อินเทอร์เน็ต";
}
