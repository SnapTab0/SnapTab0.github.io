/* ==========================================================
   ARZ Consultants – Digital Profile · script.js
   1. CONFIG   – edit your details here (one place for everything)
   2. Fill the page from CONFIG
   3. Swiping, arrows, auto-advance, progress bar, dots
   4. Copy buttons
   5. Save Contact (.vcf – adds name + phone to the phone)
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
  email2:       "info@arzconsultants.com",

  poweredByName: "$get  your here$",
  poweredBy:     "https://wa.me/966538850518",

  // Auto-advance to the next page. It stops as soon as the visitor touches the card.
  autoAdvance:        true,    // true = go to the next page automatically, false = off
  autoAdvanceSeconds: 7,       // seconds on each page
  autoLoop:           false    // true = go back to page 1 after the last page
};


/* 2 · FILL THE PAGE FROM CONFIG ------------------------------ */
(function fill() {
  document.title = CONFIG.name + " – Digital Profile";

  // text:  <span data-text="email">
  each("[data-text]", function (el) {
    var v = CONFIG[el.getAttribute("data-text")];
    if (v) el.textContent = v;
  });

  // links:  <a data-link="phone">
  each("[data-link]", function (el) {
    var key = el.getAttribute("data-link");
    var v = CONFIG[key];
    if (!v) { el.hidden = true; return; }

    if (key === "phone")         el.href = "tel:" + v;
    else if (key === "whatsapp") el.href = "https://wa.me/" + v.replace(/\D/g, "");
    else if (key === "email")    el.href = "mailto:" + v;
    else                         el.href = v;
  });

  // hide the whole social row if no social links are filled in
  var socials = document.querySelector(".socials");
  if (socials && !socials.querySelector("a:not([hidden])")) socials.hidden = true;
})();

function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }


/* 3 · SWIPING, ARROWS, AUTO-ADVANCE, PROGRESS BAR, DOTS ------- */
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

  // one dot per slide
  slides.forEach(function (slide, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Go to " + slide.dataset.label);
    b.addEventListener("click", function () { goTo(i); });
    dots.appendChild(b);
  });

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  function update() {
    current = Math.round(track.scrollLeft / track.clientWidth);
    label.textContent = slides[current].dataset.label;
    count.textContent = "0" + (current + 1) + " / 0" + slides.length;
    fill.style.width  = ((current + 1) / slides.length * 100) + "%";
    Array.prototype.forEach.call(dots.children, function (d, k) {
      d.setAttribute("aria-current", k === current ? "true" : "false");
    });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    schedule();
  }

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

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", function () { track.scrollLeft = current * track.clientWidth; });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft")  goTo(current - 1);
  });
  document.querySelector("[data-next]").addEventListener("click", function () { goTo(1); });

  update();
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
        function () { say("Copied"); },
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
  say("Contact file ready");
}

each("[data-save]", function (btn) { btn.addEventListener("click", saveContact); });
