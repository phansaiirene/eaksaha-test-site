// This small script runs the ☰ menu on phones.

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

// When the ☰ button is tapped: open the menu (or close it if it's already open)
menuButton.addEventListener("click", function () {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

// When a menu link is tapped: close the menu so the page is visible again
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", false);
  });
});

// Keep the year in the footer up to date automatically
document.getElementById("year").textContent = new Date().getFullYear();

// The showroom map is in showrooms.js


// =====================================================================
// HERO SLIDESHOW
// Changes slide every 6 seconds. It stops when the visitor hovers over it,
// tabs into it, presses pause, scrolls it off screen, or has
// "reduce motion" turned on in their phone/computer settings.
// =====================================================================
const slideshow = document.getElementById("slideshow");

if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll(".slide"));
  const dotsBox = slideshow.querySelector(".slide-dots");
  const pauseButton = slideshow.querySelector(".slide-pause");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DELAY = 6000;   // milliseconds per slide

  let current = 0;
  let timer = null;
  let pausedByUser = reduceMotion;   // reduced motion = start paused
  let hovering = false;
  let onScreen = true;
  slideshow.style.setProperty("--slide-time", DELAY / 1000 + "s");

  // One dot per slide
  const dots = slides.map(function (slide, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", "Slide " + (i + 1) + " of " + slides.length);
    // Tab = progress line + the slide's name (from data-label)
    dot.innerHTML = '<span class="dot-bar"><i></i></span>' + (slide.dataset.label || "Slide " + (i + 1));
    dot.addEventListener("click", function () { show(i); restart(); });
    dotsBox.appendChild(dot);
    return dot;
  });

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (slide, n) {
      const active = n === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      slide.inert = !active;          // hidden slides can't be tabbed into
    });
    dots.forEach(function (dot, n) {
      dot.setAttribute("aria-current", n === current ? "true" : "false");
      // restart the progress line on the new tab
      const bar = dot.querySelector(".dot-bar i");
      if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
    });
  }

  function shouldPlay() {
    return !pausedByUser && !hovering && onScreen && !document.hidden && slides.length > 1;
  }

  function restart() {
    clearInterval(timer);
    timer = null;
    const playing = shouldPlay();
    slideshow.classList.toggle("is-playing", playing);
    if (playing) {
      show(current);                  // starts the progress line from zero
      timer = setInterval(function () { show(current + 1); }, DELAY);
    }
  }

  function updatePauseButton() {
    slideshow.classList.toggle("is-paused", pausedByUser);
    pauseButton.setAttribute("aria-label", pausedByUser ? "Play slideshow · เล่น" : "Pause slideshow · หยุด");
  }

  slideshow.querySelector(".slide-prev").addEventListener("click", function () { show(current - 1); restart(); });
  slideshow.querySelector(".slide-next").addEventListener("click", function () { show(current + 1); restart(); });

  pauseButton.addEventListener("click", function () {
    pausedByUser = !pausedByUser;
    updatePauseButton();
    restart();
  });

  // Pause while the mouse is over it or keyboard focus is inside it
  slideshow.addEventListener("mouseenter", function () { hovering = true; restart(); });
  slideshow.addEventListener("mouseleave", function () { hovering = false; restart(); });
  slideshow.addEventListener("focusin", function () { hovering = true; restart(); });
  slideshow.addEventListener("focusout", function () { hovering = false; restart(); });

  // Left / right arrow keys when the slideshow has focus
  slideshow.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { show(current - 1); }
    if (e.key === "ArrowRight") { show(current + 1); }
  });

  // Swipe on phones
  let touchX = null;
  slideshow.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  slideshow.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const moved = e.changedTouches[0].clientX - touchX;
    if (Math.abs(moved) > 40) { show(current + (moved < 0 ? 1 : -1)); restart(); }
    touchX = null;
  });

  // Stop when scrolled off screen or the browser tab is hidden
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      restart();
    }).observe(slideshow);
  }
  document.addEventListener("visibilitychange", restart);

  show(0);
  updatePauseButton();
  restart();
}


// =====================================================================
// PROMOTIONS ROW: the ‹ › buttons slide the banners sideways
// =====================================================================
const promoRow = document.getElementById("promo-row");
document.querySelectorAll(".row-arrow").forEach(function (button) {
  button.addEventListener("click", function () {
    if (promoRow) promoRow.scrollBy({ left: Number(button.dataset.scroll) * promoRow.clientWidth * 0.8 });
  });
});


// =====================================================================
// BRAND CARDS: "X models · Y showrooms" under each brand name,
// counted from brands-data.js and showrooms-data.js
// =====================================================================
document.querySelectorAll(".brand-box[data-brand]").forEach(function (card) {
  const key = card.dataset.brand;
  const meta = card.querySelector(".brand-meta");
  if (!meta) return;
  const models = (typeof brands !== "undefined" && brands[key]) ? brands[key].models.length : 0;
  const rooms = typeof showrooms !== "undefined" ? showrooms.filter(function (s) { return s.brand === key; }).length : 0;
  const parts = [];
  if (models) parts.push(models + (models === 1 ? " model" : " models"));
  if (rooms) parts.push(rooms + (rooms === 1 ? " showroom" : " showrooms"));
  meta.textContent = parts.join(" · ");
});


// =====================================================================
// NUMBERS COUNT UP (36 years, 46 showrooms …) when they scroll into view.
// People who turn on "reduce motion" just see the final numbers.
// =====================================================================
const countNumbers = document.querySelectorAll("[data-count]");
const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (countNumbers.length && !calmMotion && "IntersectionObserver" in window) {
  const counter = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.count);
      const start = performance.now();
      const duration = 1400;
      counter.unobserve(el);
      (function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);        // fast, then slows down
        el.textContent = Math.round(end * eased);
        if (t < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.6 });
  countNumbers.forEach(function (el) { counter.observe(el); });
}


// =====================================================================
// BRAND LOGO STRIP: the ‹ › buttons slide the logos sideways
// =====================================================================
const stripRow = document.getElementById("strip-row");
document.querySelectorAll(".strip-arrow").forEach(function (button) {
  button.addEventListener("click", function () {
    if (stripRow) stripRow.scrollBy({ left: Number(button.dataset.strip) * stripRow.clientWidth * 0.7 });
  });
});


// =====================================================================
// HERO PHOTOS: show a different brand every 5 seconds
// (stays on the first photo for people who turned on "reduce motion")
// =====================================================================
const heroPhotos = document.querySelectorAll("#hero-photos .hp");
if (heroPhotos.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let heroIndex = 0;
  setInterval(function () {
    if (document.hidden) return;
    heroPhotos[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroPhotos.length;
    heroPhotos[heroIndex].classList.add("is-active");
  }, 5000);
}
