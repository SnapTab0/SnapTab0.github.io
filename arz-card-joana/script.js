/* ==========================================================
   ARZ Consultants – Digital Profile · script.js
   1. CONFIG    – your contact details (edit here)
   2. Language  – English / Arabic, fills every text and link
   3. Slider    – swiping, arrows, auto-advance, progress, dots
   4. Copy buttons
   5. Save Contact (.vcf – adds name + phone to the phone)
   6. Share card (QR codes + the phone's share sheet)
   The words themselves are in lang.js
   ========================================================== */


/* 1 · CONFIG ------------------------------------------------ */
var CONFIG = {
  name:         "Joana Ruiz",             // name saved in the phone's contacts
  title:        "Senior Consultant",        // shown under the name, saved as job title
  tagline:      "Guidance · Clarity · Progress",

  phone:        "+966561352951",               // international format, no spaces
  phoneDisplay: "+966 56 135 2951",            // how it looks on the card
  whatsapp:     "+966561352951",               // WhatsApp number (can be the same)
  email:        "joana@arzconsultants.com",
  website:      "https://arzconsultants.com/",                            // optional, e.g. "https://arzconsultants.com"

  maps:         "https://maps.app.goo.gl/agpqT3LTig8to7xy6",   // paste your Google Maps share link
  booking:      "https://calendly.com/appointment-arzconsultants/30min",

  // Leave a link as "" to hide that icon
  linkedin:     "https://www.linkedin.com/company/arz-consultants/",
  facebook:     "https://www.facebook.com/arzconsultants/",
  instagram:    "https://www.instagram.com/arzconsultants/",
  website:      "https://arzconsultants.com/",

  poweredByName: "$get  your here$",
  poweredBy:     "https://wa.me/966538850518",

  // Language: "en", "ar", or "auto" (Arabic on Arabic phones, English on all others)
  defaultLanguage: "auto",

  // Auto-advance to the next page. It stops as soon as the visitor touches the card.
  autoAdvance:        true,    // true = go to the next page automatically, false = off
  autoAdvanceSeconds: 2,       // seconds on each page
  autoLoop:           false    // true = go back to page 1 after the last page
};

function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }


/* 2 · LANGUAGE ------------------------------------------------ */
var lang = "en";
var ui = {};                                    // the slider adds a refresh() here

// find a word: current language -> English -> CONFIG
function t(key) {
  var d = LANG[lang];
  if (d && d[key] !== undefined) return d[key];
  if (LANG.en[key] !== undefined) return LANG.en[key];
  return CONFIG[key];
}

function pickLanguage() {
  var saved = null;
  try { saved = localStorage.getItem("card-lang"); } catch (e) {}
  if (saved === "en" || saved === "ar") return saved;
  if (CONFIG.defaultLanguage === "en" || CONFIG.defaultLanguage === "ar") return CONFIG.defaultLanguage;
  return (navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
}

function applyLanguage() {
  var root = document.documentElement;
  root.lang = lang;
  root.dir  = lang === "ar" ? "rtl" : "ltr";
  document.title = t("name") + " – " + t("pageTitle");

  each("[data-text]",      function (el) { var v = t(el.getAttribute("data-text")); if (v) el.textContent = v; });
  each("[data-i18n]",      function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
  each("[data-i18n-html]", function (el) { el.innerHTML   = t(el.getAttribute("data-i18n-html")); });
  each("[data-i18n-aria]", function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });

  // links:  <a data-link="phone">
  each("[data-link]", function (el) {
    var key = el.getAttribute("data-link");
    var v = CONFIG[key];
    if (!v) { el.hidden = true; return; }

    if (key === "phone")         el.href = "tel:" + v;
    else if (key === "whatsapp") el.href = "https://wa.me/" + v.replace(/\D/g, "") + "?text=" + encodeURIComponent(t("waMsg"));
    else if (key === "email")    el.href = "mailto:" + v;
    else                         el.href = v;
  });

  // hide the whole social row if no social links are filled in
  var socials = document.querySelector(".socials");
  if (socials) socials.hidden = !socials.querySelector("a:not([hidden])");

  if (ui.refresh) ui.refresh();
}

lang = pickLanguage();
applyLanguage();

document.getElementById("langBtn").addEventListener("click", function () {
  lang = lang === "en" ? "ar" : "en";
  try { localStorage.setItem("card-lang", lang); } catch (e) {}
  applyLanguage();
});


/* 3 · SLIDER: SWIPING, ARROWS, AUTO-ADVANCE, PROGRESS, DOTS ---- */
(function slider() {
  var track  = document.getElementById("track");
  var slides = Array.prototype.slice.call(track.children);
  var label  = document.getElementById("lbl");
  var count  = document.getElementById("cnt");
  var fill   = document.getElementById("fill");
  var dots   = document.getElementById("dots");
  var prev   = document.getElementById("prev");
  var next   = document.getElementById("next");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;
  var timer = null;
  var auto = CONFIG.autoAdvance;

  function rtl() { return document.documentElement.dir === "rtl"; }
  function sign() { return rtl() ? -1 : 1; }          // in Arabic the page scrolls the other way

  // one dot per slide
  slides.forEach(function (slide, i) {
    var b = document.createElement("button");
    b.addEventListener("click", function () { goTo(i); });
    dots.appendChild(b);
  });

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: sign() * i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  // depth effect while swiping: tell each page how far it is from the centre (-1 … 0 … 1)
  var frame = null;
  function glide() {
    frame = null;
    var W = track.clientWidth, x = track.scrollLeft;
    slides.forEach(function (el, i) {
      var p = reduce ? 0 : (sign() * i * W - x) / W;
      el.style.setProperty("--p", p.toFixed(3));
      el.style.opacity = Math.max(0, 1 - Math.abs(p) * 1.1).toFixed(3);
    });
  }

  function update() {
    current = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    current = Math.max(0, Math.min(slides.length - 1, current));
    label.textContent = t(slides[current].getAttribute("data-lk"));
    count.textContent = "0" + (current + 1) + " / 0" + slides.length;
    fill.style.width  = ((current + 1) / slides.length * 100) + "%";
    Array.prototype.forEach.call(dots.children, function (d, k) {
      d.setAttribute("aria-current", k === current ? "true" : "false");
    });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    schedule();
  }

  // called after the language changes
  ui.refresh = function () {
    Array.prototype.forEach.call(dots.children, function (d, k) {
      d.setAttribute("aria-label", t(slides[k].getAttribute("data-lk")));
    });
    prev.querySelector("use").setAttribute("href", rtl() ? "#chev" : "#left");
    next.querySelector("use").setAttribute("href", rtl() ? "#left" : "#chev");
    track.scrollTo({ left: sign() * current * track.clientWidth, behavior: "auto" });
    update();
    glide();
  };

  // ---- auto-advance ----
  function schedule() {
    clearTimeout(timer);
    if (!auto) return;
    var last = current === slides.length - 1;
    if (last && !CONFIG.autoLoop) return;
    timer = setTimeout(function () { goTo(last ? 0 : current + 1); },
                       (CONFIG.autoAdvanceSeconds || 7) * 1000);
  }
  function stopAuto() { auto = false; clearTimeout(timer); }    // visitor took control

  ["pointerdown", "touchstart", "wheel", "keydown"].forEach(function (evt) {
    document.addEventListener(evt, stopAuto, { passive: true });
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) clearTimeout(timer); else schedule(); });

  prev.addEventListener("click", function () { goTo(current - 1); });
  next.addEventListener("click", function () { goTo(current + 1); });

  track.addEventListener("scroll", function () {
    update();
    if (!frame) frame = requestAnimationFrame(glide);
  }, { passive: true });
  window.addEventListener("resize", function () { track.scrollLeft = sign() * current * track.clientWidth; });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goTo(current + sign());
    if (e.key === "ArrowLeft")  goTo(current - sign());
  });
  document.querySelector("[data-next]").addEventListener("click", function () { goTo(1); });

  ui.refresh();
})();


/* 4 · COPY BUTTONS ------------------------------------------- */
var toast = document.getElementById("toast");

function say(message) {
  toast.textContent = message;
  toast.classList.add("on");
  clearTimeout(say.timer);
  say.timer = setTimeout(function () { toast.classList.remove("on"); }, 1600);
}

each("[data-copy]", function (btn) {
  btn.addEventListener("click", function () {
    var value = CONFIG[btn.getAttribute("data-copy")];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(
        function () { say(t("toast.copied")); },
        function () { say(value); }
      );
    } else {
      say(value);
    }
  });
});


/* 5 · SAVE CONTACT (.vcf) ------------------------------------
   Builds a contact file with the name, phone, email and job
   title. Tapping Save opens the phone's "Add contact" screen
   (iPhone) or downloads the file to open (Android/desktop).   */
function vcardText(s) {                       // escape special characters
  return String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function buildVCard() {
  var lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:" + vcardText(CONFIG.name),
    "N:;" + vcardText(CONFIG.name) + ";;;",
    "ORG:" + vcardText(CONFIG.name),
    "TITLE:" + vcardText(CONFIG.title),
    "TEL;TYPE=CELL,VOICE:" + CONFIG.phone,
    "EMAIL;TYPE=WORK,INTERNET:" + CONFIG.email
  ];
  if (CONFIG.website) lines.push("URL:" + CONFIG.website);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function saveContact() {
  var blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement("a");
  a.href = url;
  a.download = CONFIG.name.replace(/[^\w]+/g, "-").toLowerCase() + ".vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  say(t("toast.contact"));
}

each("[data-save]", function (btn) { btn.addEventListener("click", saveContact); });


/* 6 · SHARE CARD ---------------------------------------------
   A web page can't beam data over NFC, so sharing works like this:
   - QR code: the other person scans it with their camera
   - Share button: opens the phone's own share menu
     (AirDrop on iPhone, Quick Share / Nearby Share on Android,
      WhatsApp, Messages, ...)                                    */
(function share() {
  var url = CONFIG.shareUrl || location.href.split("#")[0];

  // draw every QR code on the page (cover, enlarged view, last page)
  each("[data-qr]", function (box) {
    try {
      var qr = qrcode(0, "M");
      qr.addData(url);
      qr.make();
      box.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    } catch (err) {
      box.hidden = true;
    }
  });

  // tap the QR on the cover to enlarge it
  var modal = document.getElementById("qrModal");
  document.getElementById("qrOpen").addEventListener("click", function () { modal.hidden = false; });
  modal.addEventListener("click", function () { modal.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") modal.hidden = true; });

  // phone share menu
  document.getElementById("shareBtn").addEventListener("click", function () {
    if (navigator.share) {
      navigator.share({ title: CONFIG.name, text: t("name") + " – " + t("title"), url: url })
        .catch(function () { /* cancelled */ });
    } else {
      copy(url);
    }
  });

  document.getElementById("copyLink").addEventListener("click", function () { copy(url); });

  function copy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { say(t("toast.linkcopied")); }, function () { say(text); });
    } else {
      say(text);
    }
  }
})();
