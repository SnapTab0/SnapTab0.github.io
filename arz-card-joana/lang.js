/* ==========================================================
   ARZ Consultants – Digital Profile · lang.js
   ALL the words on the card, in English (en) and Arabic (ar).
   Change a sentence here and it updates on the page.

   Name, phone, email and links are NOT here – they live in
   CONFIG at the top of script.js.
   Have a native Arabic speaker read the "ar" part once.
   ========================================================== */

var LANG = {

  /* ---------------- ENGLISH ---------------- */
  en: {
    pageTitle:      "Digital Profile",
    "lang.toggle":  "العربية",                       // button that switches to Arabic

    // top-bar names of each page
    "label.cover":    "Digital Identity",
    "label.about":    "About Us",
    "label.contact":  "Contact",
    "label.services": "Services",
    "label.connect":  "Connect",

    // page 1 · cover
    "act.save":  "Save",
    "act.call":  "Call",
    "act.wa":    "WhatsApp",
    "act.email": "Email",
    book:        "Book an appointment",
    "qr.title":  "Scan to share",
    "qr.sub":    "Tap to enlarge the QR code",
    more:        "Tap to explore",

    // page 2 · about
    "about.h2":       "Your Path to<br><em>Opportunity</em>",
    "about.lead":     "We guide individuals and families through the immigration process with clear advice, honest timelines and dedicated support at every step.",
    "about.focus":    "Focus",
    "about.focus.v":  "Immigration Services",
    "about.consult":  "Consultation",
    "about.consult.v":"30-minute appointment",
    "about.reach":    "Reach us",
    "about.reach.v":  "Call, WhatsApp or email",
    savecontact:      "Save Contact",

    // page 3 · contact
    "contact.h2":   "Get in Touch",
    "contact.lead": "Feel free to reach out anytime. We're always open to new enquiries and conversations.",
    "c.phone":      "Phone",
    "c.wa":         "WhatsApp",
    "c.wa.v":       "Chat with us",
    "c.email":      "Email",
    "c.loc":        "Location",
    "c.loc.v":      "Open in Google Maps",
    addcontact:     "Add to Contacts",

    // page 4 · services  (edit to match your real services)
    "services.h2":   "What We <em>Do</em>",
    "services.lead": "Practical, step-by-step support from first consultation to final approval.",
    "s1.t": "Visa Assistance",         "s1.d": "Visit, work and family visas",
    "s2.t": "Work Permits",            "s2.d": "Employment and sponsorship support",
    "s3.t": "Residency & Relocation",  "s3.d": "Settlement and long-term status",
    "s4.t": "Study Abroad",            "s4.d": "Admissions and student visas",
    "s5.t": "Document Support",        "s5.d": "Preparation and application files",

    // page 5 · connect
    "connect.h2":   "Let's Connect",
    "connect.lead": "Follow us on social media or reach out for enquiries.",
    "panel.h3":     "Ready to start your journey?",
    "panel.p":      "Book a 30-minute consultation or send us a message.",
    sendmsg:        "Send Message",
    "share.h3":     "Share this card",
    "share.p":      "Let someone scan the code, or send it from your phone.",
    "share.btn":    "Share card",
    "share.copy":   "Copy link",
    powered:        "Powered by ",

    // big QR window, small messages, screen-reader labels
    "modal.scan":   "Scan to open",
    "modal.close":  "Close",
    "toast.copied":     "Copied",
    "toast.linkcopied": "Link copied",
    "toast.contact":    "Contact file ready",
    "aria.prev":      "Previous page",
    "aria.next":      "Next page",
    "aria.copyphone": "Copy phone number",
    "aria.copyemail": "Copy email address",
    "aria.qropen":    "Enlarge QR code",

    // first message when someone taps WhatsApp
    waMsg: "Hello, I'd like to ask about your immigration services."
  },

  /* ---------------- ARABIC (العربية) ---------------- */
  ar: {
    pageTitle:      "الملف الرقمي",
    "lang.toggle":  "English",

    title:   "خدمات الهجرة",                       // replaces CONFIG.title
    tagline: "إرشاد · وضوح · تقدّم",                // replaces CONFIG.tagline

    "label.cover":    "الهوية الرقمية",
    "label.about":    "من نحن",
    "label.contact":  "اتصل بنا",
    "label.services": "خدماتنا",
    "label.connect":  "ابقَ على تواصل",

    "act.save":  "حفظ",
    "act.call":  "اتصال",
    "act.wa":    "واتساب",
    "act.email": "البريد",
    book:        "احجز موعدًا",
    "qr.title":  "امسح للمشاركة",
    "qr.sub":    "اضغط لتكبير رمز QR",
    more:        "اضغط للاستكشاف",

    "about.h2":       "طريقك نحو<br><em>الفرص</em>",
    "about.lead":     "نرافق الأفراد والعائلات خلال رحلة الهجرة بنصيحة واضحة وجداول زمنية صادقة ودعم متواصل في كل خطوة.",
    "about.focus":    "التخصص",
    "about.focus.v":  "خدمات الهجرة",
    "about.consult":  "الاستشارة",
    "about.consult.v":"موعد لمدة 30 دقيقة",
    "about.reach":    "تواصل معنا",
    "about.reach.v":  "اتصال أو واتساب أو بريد إلكتروني",
    savecontact:      "حفظ جهة الاتصال",

    "contact.h2":   "تواصل معنا",
    "contact.lead": "لا تتردد في التواصل معنا في أي وقت. يسعدنا استقبال استفساراتك.",
    "c.phone":      "الهاتف",
    "c.wa":         "واتساب",
    "c.wa.v":       "تحدث معنا",
    "c.email":      "البريد الإلكتروني",
    "c.loc":        "الموقع",
    "c.loc.v":      "افتح في خرائط جوجل",
    addcontact:     "إضافة إلى جهات الاتصال",

    "services.h2":   "ماذا <em>نقدّم</em>",
    "services.lead": "دعم عملي خطوة بخطوة، من الاستشارة الأولى حتى الموافقة النهائية.",
    "s1.t": "المساعدة في التأشيرات",  "s1.d": "تأشيرات الزيارة والعمل والعائلة",
    "s2.t": "تصاريح العمل",           "s2.d": "دعم التوظيف والكفالة",
    "s3.t": "الإقامة والانتقال",       "s3.d": "الاستقرار والوضع النظامي طويل الأمد",
    "s4.t": "الدراسة في الخارج",       "s4.d": "القبول الجامعي وتأشيرات الطلاب",
    "s5.t": "دعم المستندات",          "s5.d": "إعداد ملفات الطلبات",

    "connect.h2":   "لنبقَ على تواصل",
    "connect.lead": "تابعنا على وسائل التواصل أو راسلنا لأي استفسار.",
    "panel.h3":     "مستعد لبدء رحلتك؟",
    "panel.p":      "احجز استشارة مدتها 30 دقيقة أو أرسل لنا رسالة.",
    sendmsg:        "أرسل رسالة",
    "share.h3":     "شارك هذه البطاقة",
    "share.p":      "دع الآخرين يمسحون الرمز، أو أرسلها من هاتفك.",
    "share.btn":    "شارك البطاقة",
    "share.copy":   "نسخ الرابط",
    powered:        "بدعم من ",

    "modal.scan":   "امسح لفتح",
    "modal.close":  "إغلاق",
    "toast.copied":     "تم النسخ",
    "toast.linkcopied": "تم نسخ الرابط",
    "toast.contact":    "ملف جهة الاتصال جاهز",
    "aria.prev":      "الصفحة السابقة",
    "aria.next":      "الصفحة التالية",
    "aria.copyphone": "نسخ رقم الهاتف",
    "aria.copyemail": "نسخ البريد الإلكتروني",
    "aria.qropen":    "تكبير رمز QR",

    waMsg: "السلام عليكم، أود الاستفسار عن خدماتكم في الهجرة."
  }
};
