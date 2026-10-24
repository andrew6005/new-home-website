const PHOTOS = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=85",
];
const I18N = {
  "zh-HK": {
    navAbout: "住宿資料",
    navDates: "可訂日子",
    navReviews: "住客評價",
    location: "英國 · 北愛爾蘭 · Belfast city",
    title: "鄉村小屋",
    subtitle: "整間小屋 · 鄉郊景觀 · 私人花園",
    share: "↗ 分享",
    save: "♡ 收藏",
    saved: "♥ 已收藏",
    showPhotos: "▦ 顯示全部相片",
    hostTitle: "精心打理的整間小屋",
    capacity:
      "最多 5 位住客 · 3 間睡房 · 2 張雙床 1 張單人床· 1 間浴室 2 間廁所",
    feature1Title: "獨享整間小屋",
    feature1Text: "你可獨享屋內空間、私人花園和免費泊車位。",
    feature2Title: "巨人堤道附近",
    feature2Text: "駕車約 8 分鐘到巨人堤道，探索壯麗的北海岸。",
    feature3Title: "旅客至愛",
    feature3Text: "舒適壁爐、安靜環境，以及步行可到 Bushmills 小鎮。",
    amenitiesTitle: "旅居設施",
    amenities: [
      "⌂ 設備齊全廚房",
      "⌁ 高速 Wi-Fi",
      "▣ 免費私人泊車",
      "♧ 私人花園",
      "☕ 咖啡機",
    ],
    perNight: "/ 晚",
    reviewCount: "38 則評價",
    checkin: "入住",
    checkout: "退房",
    guests: "住客",
    choose: "選擇日期",
    checkDates: "查看可訂日期",
    noCharge: "你暫時不會被收費",
    chooseDates: "選擇入住日期",
    dateHint: "已劃線的日子已有人預訂",
    available: "可預訂",
    unavailable: "已預訂",
    bookPay: "確認預訂",
    night: "晚",
    guestUnit: "位住客",
    cleaning: "清潔費",
    service: "服務費",
    total: "總額",
    writeReview: "寫下評價",
    footerTag: "住進一間溫暖的北愛爾蘭鄉村小屋。",
    contact: "聯絡我們",
    week: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    reviews: [
      [
        "Sophie",
        "2026年8月",
        "位置非常方便，去巨人堤道只需幾分鐘。屋內溫暖、乾淨，花園也很舒服。",
      ],
      [
        "James",
        "2026年7月",
        "Bushmills 是很可愛的小鎮，晚上在壁爐旁休息尤其寫意。我們一定會再來。",
      ],
      [
        "Mei",
        "2026年6月",
        "廚房設備齊全，泊車方便，去北海岸各景點都很近。非常適合一家人。",
      ],
      [
        "Oliver",
        "2026年5月",
        "寧靜、舒適而且充滿北愛爾蘭特色。Emma 的入住指示十分清楚。",
      ],
    ],
  },
  "zh-CN": {
    navAbout: "住宿信息",
    navDates: "可订日期",
    navReviews: "住客评价",
    location: "英国 · 北爱尔兰 · BUSHMILLS",
    title: "乡村小屋",
    subtitle: "整间小屋 · 乡村景观 · 私人花园",
    share: "↗ 分享",
    save: "♡ 收藏",
    saved: "♥ 已收藏",
    showPhotos: "▦ 显示全部照片",
    hostTitle: "精心管理的整间小屋",
    capacity: "最多 6 位住客 · 3 间卧室 · 4 张床 · 2 间浴室",
    feature1Title: "独享整间小屋",
    feature1Text: "你可独享屋内空间、私人花园和免费停车位。",
    feature2Title: "巨人堤道附近",
    feature2Text: "驾车约 8 分钟到巨人堤道，探索壮丽的北海岸。",
    feature3Title: "住客喜爱",
    feature3Text: "舒适壁炉、安静环境，以及步行可到 Bushmills 小镇。",
    amenitiesTitle: "房屋设施",
    amenities: [
      "♨ 室内壁炉",
      "⌂ 设备齐全的厨房",
      "⌁ 高速 Wi-Fi",
      "▣ 免费私人停车",
      "♧ 私人花园",
      "☕ 咖啡机",
    ],
    perNight: "/ 晚",
    reviewCount: "38 条评价",
    checkin: "入住",
    checkout: "退房",
    guests: "住客",
    choose: "选择日期",
    checkDates: "查看可订日期",
    noCharge: "你暂时不会被收费",
    chooseDates: "选择入住日期",
    dateHint: "划线的日期已被预订",
    available: "可预订",
    unavailable: "已预订",
    bookPay: "确认预订",
    night: "晚",
    guestUnit: "位住客",
    cleaning: "清洁费",
    service: "服务费",
    total: "总计",
    writeReview: "撰写评价",
    footerTag: "在巨人堤道旁，住进一间温暖的北爱尔兰乡村小屋。",
    contact: "联系我们",
    week: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    reviews: [
      [
        "Sophie",
        "2026年8月",
        "位置非常方便，去巨人堤道只需几分钟。屋内温暖、干净，花园也很舒适。",
      ],
      [
        "James",
        "2026年7月",
        "Bushmills 是很可爱的小镇，晚上在壁炉旁休息尤其惬意。我们一定会再来。",
      ],
      [
        "Mei",
        "2026年6月",
        "厨房设备齐全，停车方便，去北海岸各景点都很近。非常适合一家人。",
      ],
      [
        "Oliver",
        "2026年5月",
        "宁静、舒适而且充满北爱尔兰特色。Emma 的入住说明十分清楚。",
      ],
    ],
  },
  en: {
    navAbout: "The cottage",
    navDates: "Availability",
    navReviews: "Guest reviews",
    location: "BUSHMILLS · NORTHERN IRELAND · UK",
    title: "Giant’s Causeway Country Cottage",
    subtitle: "Entire cottage · Countryside views · Private garden",
    description:
      "Settle into a warm and peaceful stone cottage on Northern Ireland’s Causeway Coast. Just outside the village of Bushmills, the cottage is an 8-minute drive from the Giant’s Causeway and close to Old Bushmills Distillery, Dunluce Castle and the coastal trail. Return to a cosy fire and enjoy the slower rhythm of the Antrim countryside.",
    share: "↗ Share",
    save: "♡ Save",
    saved: "♥ Saved",
    showPhotos: "▦ Show all photos",
    hostTitle: "Entire cottage hosted by Emma",
    capacity: "Up to 6 guests · 3 bedrooms · 4 beds · 2 bathrooms",
    feature1Title: "The whole cottage is yours",
    feature1Text:
      "Enjoy the cottage, private garden and free off-street parking to yourself.",
    feature2Title: "Near the Giant’s Causeway",
    feature2Text:
      "An 8-minute drive puts you at the heart of Northern Ireland’s dramatic coast.",
    feature3Title: "A guest favourite",
    feature3Text:
      "A cosy fire, peaceful setting and Bushmills village within walking distance.",
    amenitiesTitle: "What this place offers",
    amenities: [
      "♨ Indoor fireplace",
      "⌂ Fully equipped kitchen",
      "⌁ Fast Wi-Fi",
      "▣ Free private parking",
      "♧ Private garden",
      "☕ Coffee maker",
    ],
    perNight: "/ night",
    reviewCount: "38 reviews",
    checkin: "Check-in",
    checkout: "Checkout",
    guests: "Guests",
    choose: "Choose date",
    checkDates: "Check availability",
    noCharge: "You won’t be charged yet",
    chooseDates: "Choose your dates",
    dateHint: "Crossed-out dates are already booked",
    available: "Available",
    unavailable: "Booked",
    bookPay: "Confirm reservation",
    night: "nights",
    guestUnit: "guests",
    cleaning: "Cleaning fee",
    service: "Service fee",
    total: "Total",
    writeReview: "Write a review",
    footerTag: "A warm Northern Irish cottage beside the Giant’s Causeway.",
    contact: "Contact us",
    week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    reviews: [
      [
        "Sophie",
        "August 2026",
        "Perfectly located for the Giant’s Causeway. The cottage was warm, spotless and the garden was lovely.",
      ],
      [
        "James",
        "July 2026",
        "Bushmills is a charming village and evenings by the fire were wonderful. We would absolutely stay again.",
      ],
      [
        "Mei",
        "June 2026",
        "A well-equipped kitchen, easy parking and a great base for the whole Causeway Coast. Perfect for our family.",
      ],
      [
        "Oliver",
        "May 2026",
        "Peaceful, comfortable and full of Northern Irish character. Emma’s check-in instructions were excellent.",
      ],
    ],
  },
};
I18N.de = {
  navAbout: "Das Ferienhaus",
  navDates: "Verfügbarkeit",
  navReviews: "Gästebewertungen",
  location: "BUSHMILLS · NORDIRLAND · UK",
  title: "Landhaus am Giant’s Causeway",
  subtitle: "Ganzes Ferienhaus · Landblick · Privater Garten",
  description:
    "Genießen Sie ein warmes und ruhiges Steinhaus an der Causeway Coast in Nordirland. Das Haus liegt am Rand des Ortes Bushmills, nur acht Autominuten vom Giant’s Causeway entfernt und in der Nähe der Old Bushmills Distillery, von Dunluce Castle und dem Küstenwanderweg.",
  share: "↗ Teilen",
  save: "♡ Speichern",
  saved: "♥ Gespeichert",
  showPhotos: "▦ Alle Fotos anzeigen",
  hostTitle: "Ganzes Ferienhaus, betreut von Emma",
  capacity: "Bis zu 6 Gäste · 3 Schlafzimmer · 4 Betten · 2 Bäder",
  feature1Title: "Das ganze Haus für Sie",
  feature1Text:
    "Genießen Sie das Haus, den privaten Garten und kostenlose Parkplätze.",
  feature2Title: "Nahe am Giant’s Causeway",
  feature2Text: "Nur acht Autominuten bis zur spektakulären Küste Nordirlands.",
  feature3Title: "Ein Favorit unserer Gäste",
  feature3Text:
    "Gemütlicher Kamin, ruhige Lage und Bushmills zu Fuß erreichbar.",
  amenitiesTitle: "Ausstattung",
  amenities: [
    "♨ Innenkamin",
    "⌂ Voll ausgestattete Küche",
    "⌁ Schnelles WLAN",
    "▣ Kostenloser Privatparkplatz",
    "♧ Privater Garten",
    "☕ Kaffeemaschine",
  ],
  perNight: "/ Nacht",
  reviewCount: "38 Bewertungen",
  checkin: "Check-in",
  checkout: "Check-out",
  guests: "Gäste",
  choose: "Datum wählen",
  checkDates: "Verfügbarkeit prüfen",
  noCharge: "Es wird noch nichts berechnet",
  chooseDates: "Reisedaten wählen",
  dateHint: "Durchgestrichene Daten sind bereits gebucht",
  available: "Verfügbar",
  unavailable: "Gebucht",
  bookPay: "Buchung bestätigen",
  night: "Nächte",
  guestUnit: "Gäste",
  cleaning: "Reinigungsgebühr",
  service: "Servicegebühr",
  total: "Gesamt",
  writeReview: "Bewertung schreiben",
  footerTag:
    "Ein gemütliches nordirisches Ferienhaus nahe dem Giant’s Causeway.",
  contact: "Kontakt",
  week: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  reviews: [
    [
      "Sophie",
      "August 2026",
      "Perfekte Lage für den Giant’s Causeway. Das Haus war warm, sauber und der Garten wunderschön.",
    ],
    [
      "James",
      "Juli 2026",
      "Bushmills ist ein charmanter Ort und die Abende am Kamin waren wunderbar.",
    ],
    [
      "Mei",
      "Juni 2026",
      "Gut ausgestattete Küche, bequemes Parken und ein idealer Ausgangspunkt für die Causeway Coast.",
    ],
    [
      "Oliver",
      "Mai 2026",
      "Ruhig, komfortabel und voller nordirischem Charakter. Emmas Check-in-Hinweise waren ausgezeichnet.",
    ],
  ],
};
const DEFAULTS = {
  titles: {
    "zh-HK": I18N["zh-HK"].title,
    "zh-CN": I18N["zh-CN"].title,
    en: I18N.en.title,
    de: I18N.de.title,
  },
  descriptions: {
    "zh-HK": I18N["zh-HK"].description,
    "zh-CN": I18N["zh-CN"].description,
    en: I18N.en.description,
    de: I18N.de.description,
  },
  price: 165,
  photos: [...PHOTOS],
};
let property =
    structuredClone(DEFAULTS),
  currentLang = localStorage.getItem("causewayLanguage") || "zh-HK",
  start = "",
  end = "",
  monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  adminLoggedIn = false,
  saved = false;
property.titles = property.titles || { ...DEFAULTS.titles };
property.descriptions = property.descriptions || { ...DEFAULTS.descriptions };
property.titles.de = property.titles.de || I18N.de.title;
property.descriptions.de = property.descriptions.de || I18N.de.description;
if (localStorage.getItem("causewayI18nVersion") !== "localized-v2") {
  property.titles = { ...DEFAULTS.titles };
  property.descriptions = { ...DEFAULTS.descriptions };
  property.localizedContent = {};
  delete property.sharedContent;
  localStorage.setItem("causewayI18nVersion", "localized-v2");
  localStorage.setItem("causewayProperty", JSON.stringify(property));
}
property.localizedContent = property.localizedContent || {};

const containsChineseCharacters = (value) =>
  /[\u3400-\u9fff]/.test(String(value || ""));

let repairedLanguageData = false;

["en", "de"].forEach((language) => {
  if (containsChineseCharacters(property.titles[language])) {
    property.titles[language] = I18N[language].title;
    repairedLanguageData = true;
  }

  if (containsChineseCharacters(property.descriptions[language])) {
    property.descriptions[language] = I18N[language].description;
    repairedLanguageData = true;
  }

  if (
    containsChineseCharacters(
      JSON.stringify(property.localizedContent[language] || {}),
    )
  ) {
    property.localizedContent[language] = {};
    repairedLanguageData = true;
  }
});

if (repairedLanguageData) {
  localStorage.setItem("causewayProperty", JSON.stringify(property));
}

property.photos = property.photos || [];
property.photos = [
  ...property.photos,
  ...PHOTOS.slice(property.photos.length),
].slice(0, 10);
const booked = new Set([]),
  $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s),
  pad = (n) => String(n).padStart(2, "0"),
  key = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
  t = () => I18N[currentLang];
let reservations = [], availabilityRanges = [], backendReady = false, stayConfig = {}, mailConfig = null;
async function api(path, method = "GET", body) {
  const response = await fetch(`/api${path}`, {
    method, credentials: "same-origin",
    headers: { "Content-Type": "application/json", "X-Requested-With": "booking-site" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}
async function refreshAvailability() {
  const data = await api("/availability");
  availabilityRanges = data.ranges;
  stayConfig = data.config;
  backendReady = data.bookingReady;
  const status = $("#connectionStatus");
  status.hidden = backendReady && data.emailConfigured;
  status.textContent = !backendReady ? "網上預訂尚未開放 / Online booking is not open yet" : !data.emailConfigured ? "確認電郵服務暫未準備好，確認電郵暫未能寄出。 / The confirmation email service is not ready; confirmation emails cannot be sent yet." : "";
  rebuildBookedDates();
  renderCalendars();
  updatePrice();
}
async function refreshReservations() {
  const data = await api("/reservations");
  reservations = data.reservations;
  mailConfig = data.mail || null;
}
function siteToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: stayConfig.timezone || "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
function validStay() {
  return start && end && start >= siteToday() && end > start && nights() <= 90 && !availabilityRanges.some(r => r.checkin < end && r.checkout > start);
}
function rebuildBookedDates() {
  booked.clear();
  availabilityRanges.forEach((reservation) => {
    const [year, month, day] = reservation.checkin.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    while (key(date) < reservation.checkout) {
      booked.add(key(date));
      date.setDate(date.getDate() + 1);
    }
  });
}
rebuildBookedDates();

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("causewayLanguage", lang);
  document.documentElement.lang = lang;
  $("#languageSelect").value = lang;
  $$("[data-i18n]").forEach((el) => {
    const field = el.dataset.i18n;
    el.textContent =
      property.localizedContent[lang]?.[field] ?? t()[field] ?? "";
  });
  $("#propertyTitle").textContent = property.titles[lang];
  $("#propertyDescription").textContent = property.descriptions[lang];
  $("#amenitiesList").innerHTML = (
    property.localizedContent[lang]?.amenities || t().amenities
  )
    .map((x) => `<span>${escapeHTML(x)}</span>`)
    .join("");
  $("#saveBtn").textContent = saved ? t().saved : t().save;
  renderReviews();
  renderCalendars();
  updatePrice();
}
function applyProperty() {
  $("#nightPrice").textContent = Number(property.price).toLocaleString();
  $$("[data-photo]").forEach(
    (img, i) => (img.src = property.photos[i] || PHOTOS[i]),
  );
  setLanguage(currentLang);
}
function renderReviews() {
  $("#reviewGrid").innerHTML = t()
    .reviews.map(
      (r) =>
        `<article><div class="reviewer"><i>${r[0][0]}</i><span><b>${r[0]}</b><small>${r[1]}</small></span></div><b class="stars">★★★★★</b><p>${r[2]}</p></article>`,
    )
    .join("");
}
function renderMonth(el, date) {
  let y = date.getFullYear(),
    m = date.getMonth(),
    first = new Date(y, m, 1),
    gridStart = new Date(y, m, 1 - first.getDay()),
    html = `<h3>${currentLang === "en" || currentLang === "de" ? `${t().months[m]} ${y}` : `${y}年 ${t().months[m]}`}</h3><div class="week">${t()
      .week.map((x) => `<span>${escapeHTML(x)}</span>`)
      .join("")}</div><div class="days">`;
  for (let i = 0; i < 42; i++) {
    let d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    let k = key(d),
      other = d.getMonth() !== m,
      isBooked = booked.has(k),
      choosingCheckout = start && !end && k > start && !availabilityRanges.some(r => r.checkin < k && r.checkout > start),
      selected = k === start || k === end,
      inRange = start && end && k > start && k < end;
    html += `<button data-date="${k}" class="${other ? "other " : ""}${isBooked ? "booked " : ""}${selected ? "selected " : ""}${inRange ? "range" : ""}" ${other || k < siteToday() || (isBooked && !choosingCheckout) ? "disabled" : ""}>${d.getDate()}</button>`;
  }
  el.innerHTML = html + "</div>";
}
function renderCalendars() {
  renderMonth($("#monthOne"), monthCursor);
  renderMonth(
    $("#monthTwo"),
    new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1),
  );
  $$("[data-date]").forEach(
    (b) => (b.onclick = () => pickDate(b.dataset.date)),
  );
}
function pickDate(k) {
  if (!start || end) {
    start = k;
    end = "";
  } else if (k > start && ![...booked].some((x) => x >= start && x < k))
    end = k;
  else {
    start = k;
    end = "";
  }
  renderCalendars();
  updatePrice();
}
const nights = () =>
    start && end ? Math.round((new Date(end) - new Date(start)) / 86400000) : 0,
  total = () => Math.round(property.price * nights() * 1.08 + 45);
function updatePrice() {
  let n = nights(),
    g = $("#guests").value,
    choose = t().choose;
  $("#cardCheckin").textContent = start || choose;
  $("#cardCheckout").textContent = end || choose;
  $("#barCheckin").textContent = start || choose;
  $("#barCheckout").textContent = end || choose;
  $("#dateSummary").textContent = n
    ? `${start} – ${end} · ${n} ${t().night}`
    : t().dateHint;
  $("#staySummary").textContent = `${n} ${t().night} · ${g} ${t().guestUnit}`;
  $("#grandTotal").textContent = n ? `£${total().toLocaleString()}` : "£—";
  $("#bookBtn").disabled = !backendReady || !validStay();
  $("#checkinDate").min = siteToday();
  $("#checkoutDate").min = start || siteToday();
  $("#checkinDate").value = start;
  $("#checkoutDate").value = end;
  $("#costs").innerHTML = n
    ? `<p><u>£${property.price} × ${n} ${t().night}</u><b>£${property.price * n}</b></p><p><u>${t().cleaning}</u><b>£45</b></p><p><u>${t().service}</u><b>£${Math.round(property.price * n * 0.08)}</b></p><hr><p><b>${t().total}</b><b>£${total()}</b></p>`
    : "";
}
function openModal(html, wide = false) {
  $("#modalContent").innerHTML = html;
  $("#modal").classList.toggle("wide", wide);
  $("#modalWrap").hidden = false;
  $("#modal").scrollTop = 0;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#modalWrap").hidden = true;
  document.body.style.overflow = "";
}
function a() {
  if (currentLang === "de") {
    return {
      login: "Admin-Anmeldung",
      loginText:
        "Gäste benötigen kein Konto. Dieser Bereich ist nur für die Verwaltung.",
      email: "Admin-E-Mail",
      password: "Passwort",
      submit: "Anmelden",
      error: "E-Mail oder Passwort ist falsch.",
      manage: "Unterkunft verwalten",
      logout: "Abmelden",
      name: "Name der Unterkunft",
      price: "Preis pro Nacht (GBP)",
      desc: "Beschreibung",
      photos: "Fotos der Unterkunft",
      photoHelp: "Wählen Sie ein Bild aus, um es zu ersetzen.",
      replace: "Ersetzen",
      save: "Speichern & Website aktualisieren",
      reset: "Beispielfotos wiederherstellen",
      saved: "Änderungen gespeichert",
      back: "Zurück zur Verwaltung",
      photoTitle: "Im Ferienhaus",





    };
  }
  return currentLang === "en"
    ? {
        login: "Admin sign in",
        loginText:
          "Guests do not need an account. This area is for the property administrator only.",
        email: "Admin email",
        password: "Password",
        submit: "Sign in",
        error: "Incorrect email or password.",
        manage: "Manage property",
        logout: "Sign out",
        name: "Property name",
        price: "Nightly price (GBP)",
        desc: "Property description",
        photos: "Property photos",
        photoHelp: "Select any image to replace it.",
        replace: "Replace",
        save: "Save & update website",
        reset: "Restore sample photos",
        saved: "Changes saved",
        back: "Back to admin",
        photoTitle: "Inside the cottage",





      }
    : currentLang === "zh-CN"
      ? {
          login: "管理员登录",
          loginText: "住客无需登录；此入口只供房屋管理员使用。",
          email: "管理员邮箱",
          password: "密码",
          submit: "登录管理后台",
          error: "邮箱或密码不正确。",
          manage: "管理房屋信息",
          logout: "退出",
          name: "房屋名称",
          price: "每晚价格（GBP）",
          desc: "房屋介绍",
          photos: "房屋照片",
          photoHelp: "点击任何照片即可更换。",
          replace: "更换",
          save: "保存并更新网站",
          reset: "恢复示范照片",
          saved: "修改已保存",
          back: "返回管理页",
          photoTitle: "房屋照片",





        }
      : {
          login: "管理員登入",
          loginText: "旅客毋須登入；此入口只供旅居管理員使用。",
          email: "管理員電郵",
          password: "密碼",
          submit: "登入管理後台",
          error: "電郵或密碼不正確。",
          manage: "管理旅居資料",
          logout: "登出",
          name: "旅居名稱",
          price: "每晚價格（GBP）",
          desc: "旅居介紹",
          photos: "旅居相片",
          photoHelp: "按任何相片便可更換。",
          replace: "更換",
          save: "儲存並更新網站",
          reset: "還原示範相片",
          saved: "修改已儲存",
          back: "返回管理頁",
          photoTitle: "屋內每個角落",





        };
}
async function openAdmin() {
  let x = a();
  if (adminLoggedIn) {
    try { await refreshReservations(); return adminPanel(); }
    catch { adminLoggedIn = false; }
  }
  openModal(
    `<span class="admin-label">ADMIN ONLY</span><h2>${x.login}</h2><p>${x.loginText}</p><form id="adminLogin"><label class="field">${x.email}<input id="adminEmail" type="email" required></label><label class="field">${x.password}<input id="adminPass" type="password" required></label><p class="error" id="loginError" hidden>${x.error}</p><button class="primary">${x.submit}</button></form>`,
  );
  $("#adminLogin").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/login", "POST", {email: $("#adminEmail").value.trim(), password: $("#adminPass").value});
      await refreshReservations();
      adminLoggedIn = true;
      adminPanel();
    } catch {
      $("#loginError").hidden = false;
    }
  };
}
function reservationWords() {
  const words = {"zh-HK": {"confirm": "確認預訂", "help": "請填寫姓名及電郵（必填），確認電郵會列明入住日期及時間。電話可選填。", "method": "聯絡方式", "email": "電郵", "phone": "電話", "contact": "聯絡資料", "invalidEmail": "請輸入有效嘅電郵地址。", "invalidPhone": "請輸入有效嘅電話號碼（可包括國際區號）。", "success": "預訂已確認，確認電郵已排隊寄出。請保留訂單號，並於預訂日期按指定時間入住。", "saveError": "未能儲存預訂，請再試一次。", "unavailable": "所選日期已被預訂，請重新選擇。"}, "zh-CN": {"confirm": "确认预订", "help": "请填写姓名及邮箱（必填），确认邮件会列明入住日期及时间。电话可选填。", "method": "联系方式", "email": "邮箱", "phone": "电话", "contact": "联系资料", "invalidEmail": "请输入有效的邮箱地址。", "invalidPhone": "请输入有效的电话号码（可包含国际区号）。", "success": "预订已确认，确认邮件已排队发送。请保留订单号，并按预订日期及指定时间入住。", "saveError": "无法保存预订，请重试。", "unavailable": "所选日期已被预订，请重新选择。"}, "en": {"confirm": "Confirm reservation", "help": "Enter your name and email (required) for your check-in confirmation. Phone is optional.", "method": "Contact method", "email": "Email", "phone": "Phone", "contact": "Contact details", "invalidEmail": "Enter a valid email address.", "invalidPhone": "Enter a valid phone number (including country code if needed).", "success": "Reservation confirmed. Your confirmation email is queued. Keep your reference and arrive on your booked date at the stated time.", "saveError": "Unable to save your reservation. Please try again.", "unavailable": "These dates are already booked. Please choose again."}, "de": {"confirm": "Buchung bestätigen", "help": "Name und E-Mail sind für die Bestätigung erforderlich. Die Telefonnummer ist optional.", "method": "Kontaktmethode", "email": "E-Mail", "phone": "Telefon", "contact": "Kontaktdaten", "invalidEmail": "Bitte eine gültige E-Mail-Adresse eingeben.", "invalidPhone": "Bitte eine gültige Telefonnummer eingeben (ggf. mit Ländervorwahl).", "success": "Buchung bestätigt. Die E-Mail wird versendet. Bitte bewahren Sie Ihre Referenz auf und reisen Sie zum gebuchten Termin an.", "saveError": "Buchung konnte nicht gespeichert werden. Bitte erneut versuchen.", "unavailable": "Diese Daten sind bereits gebucht. Bitte erneut wählen."}};
  return words[currentLang] || words.en;
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"})[char]);
}
function validContact(type, value) {
  if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return type === "phone" && /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 7 && value.replace(/\D/g, "").length <= 15;
}

function bookingWords() {
  if (currentLang === "de") {
    return {
      title: "Buchungsverwaltung",
      upcoming: "bevorstehende Aufenthalte",
      ref: "Referenz",
      guest: "Gast",
      checkin: "Check-in",
      checkout: "Check-out",
      people: "Gäste",
      amount: "Gesamt",
      status: "Status",
      confirmed: "Bestätigt",
      empty: "Noch keine Buchungen",
      actions: "Aktionen",
      remove: "Buchung löschen",
      confirmDelete: "Diese Buchung löschen und die Daten wieder freigeben? Dies kann nicht rückgängig gemacht werden. Es erfolgt keine automatische Rückerstattung.",
      deleteError: "Die Buchung konnte nicht gelöscht werden. Bitte erneut versuchen.",
    };
  }
  return currentLang === "en"
    ? {
        title: "Reservations",
        upcoming: "upcoming stays",
        ref: "Reference",
        guest: "Guest",
        checkin: "Check-in",
        checkout: "Checkout",
        people: "Guests",
        amount: "Total",
        status: "Status",
        confirmed: "Confirmed",
        empty: "No reservations yet",
        actions: "Actions",
        remove: "Delete reservation",
        confirmDelete: "Delete this reservation and release its dates? This cannot be undone and does not issue a refund.",
        deleteError: "Unable to delete the reservation. Please try again.",
      }
    : currentLang === "zh-CN"
      ? {
          title: "预订管理",
          upcoming: "个即将入住",
          ref: "订单号",
          guest: "住客",
          checkin: "入住",
          checkout: "退房",
          people: "人数",
          amount: "金额",
          status: "状态",
          confirmed: "已确认",
          empty: "暂时没有预订",
          actions: "操作",
          remove: "删除预订",
          confirmDelete: "确定删除这笔预订并释放日期？删除后无法恢复，也不会自动退款。",
          deleteError: "无法删除预订，请重试。",
        }
      : {
          title: "預訂管理",
          upcoming: "個即將入住",
          ref: "訂單號",
          guest: "住客",
          checkin: "入住",
          checkout: "退房",
          people: "人數",
          amount: "金額",
          status: "狀態",
          confirmed: "已確認",
          empty: "暫時沒有預訂",
          actions: "操作",
          remove: "刪除預訂",
          confirmDelete: "確定刪除呢筆預訂並釋放日期？刪除後無法復原，亦唔會自動退款。",
          deleteError: "無法刪除預訂，請重試。",
        };
}
function mailWords() {
  const words = {
    "zh-HK": {
      title: "確認電郵", transport: "寄件方式", configured: "設定已填齊；實際寄件結果請睇每筆訂單。", missing: "尚欠設定", disabled: "寄件程序已停用，請將 DISABLE_MAIL_WORKER 改為 0 並重新部署。", unknown: "寄件設定狀態未能取得，請更新網站後重新登入。", accepted: "「寄件服務已接收」只表示服務接受咗郵件，未代表收件匣已收到；請同時檢查 Resend 寄件紀錄及垃圾郵件。", retry: "重試寄信", retryError: "未能安排重試，請檢查寄件設定後再試。", code: "服務代碼",
      states: { pending: "等待寄出", sending: "處理中", sent: "寄件服務已接收", failed: "寄件失敗" },
      errors: { test_recipient_only: "Resend 測試地址只可寄畀註冊帳戶嘅電郵。要寄畀其他人，請先驗證自己嘅網域並更改 MAIL_FROM。", domain_unverified: "寄件網域未驗證，請喺 Resend 完成網域驗證並檢查 MAIL_FROM。", authentication_failed: "認證失敗，請檢查 API key 是否有效及具有寄件權限。", rate_limited: "寄件服務限制咗請求次數，請稍後重試並檢查寄件配額。", network_error: "無法連接寄件服務，請檢查後端網絡及寄件方式。", tls_error: "寄件服務安全連線失敗，請檢查 SMTP 連線設定。", sender_rejected: "寄件地址被拒絕，請檢查 MAIL_FROM 及網域驗證。", recipient_rejected: "收件地址被拒絕，請檢查住客電郵。", provider_rejected: "寄件服務拒絕請求，請檢查 Resend 寄件紀錄及後端日誌。", unexpected_error: "寄件未能完成，請檢查後端日誌後重試。" },
    },
    "zh-CN": {
      title: "确认邮件", transport: "发送方式", configured: "设置已填齐；实际发送结果请查看每笔订单。", missing: "缺少设置", disabled: "发送程序已停用，请将 DISABLE_MAIL_WORKER 改为 0 并重新部署。", unknown: "无法获取邮件设置状态，请更新网站后重新登录。", accepted: "“邮件服务已接收”仅表示服务接受了邮件，不代表收件箱已收到；请同时检查 Resend 发送记录和垃圾邮件。", retry: "重试发送", retryError: "无法安排重试，请检查邮件设置后重试。", code: "服务代码",
      states: { pending: "等待发送", sending: "处理中", sent: "邮件服务已接收", failed: "发送失败" },
      errors: { test_recipient_only: "Resend 测试地址仅能发送到注册账户的邮箱。发送给其他人前，请验证自己的域名并修改 MAIL_FROM。", domain_unverified: "发件域名未验证，请在 Resend 完成域名验证并检查 MAIL_FROM。", authentication_failed: "认证失败，请检查 API key 是否有效并具有发送权限。", rate_limited: "邮件服务限制了请求次数，请稍后重试并检查发送配额。", network_error: "无法连接邮件服务，请检查后端网络及发送方式。", tls_error: "邮件服务安全连接失败，请检查 SMTP 连接设置。", sender_rejected: "发件地址被拒绝，请检查 MAIL_FROM 和域名验证。", recipient_rejected: "收件地址被拒绝，请检查住客邮箱。", provider_rejected: "邮件服务拒绝请求，请检查 Resend 发送记录和后端日志。", unexpected_error: "邮件发送未完成，请检查后端日志后重试。" },
    },
    en: {
      title: "Confirmation emails", transport: "Transport", configured: "Required settings are present; see each reservation for the sending result.", missing: "Missing settings", disabled: "The mail worker is disabled. Set DISABLE_MAIL_WORKER to 0 and redeploy.", unknown: "Mail configuration status is unavailable. Update the website and sign in again.", accepted: "Accepted by mail service means the provider accepted the email, not that it reached the inbox. Check the Resend email log and spam folder as well.", retry: "Retry email", retryError: "Unable to queue the email. Check the mail settings and try again.", code: "Service code",
      states: { pending: "Queued", sending: "Processing", sent: "Accepted by mail service", failed: "Sending failed" },
      errors: { test_recipient_only: "The Resend test sender can only email the account's registered address. Verify your own domain and update MAIL_FROM to email other recipients.", domain_unverified: "The sender domain is not verified. Verify it in Resend and check MAIL_FROM.", authentication_failed: "Authentication failed. Check that the API key is valid and has sending permission.", rate_limited: "The service rate limit was reached. Try again later and check the sending quota.", network_error: "Unable to connect to the mail service. Check the server network and mail transport.", tls_error: "The secure mail connection failed. Check the SMTP connection settings.", sender_rejected: "The sender address was rejected. Check MAIL_FROM and domain verification.", recipient_rejected: "The recipient address was rejected. Check the guest's email address.", provider_rejected: "The mail service rejected the request. Check the Resend email log and server logs.", unexpected_error: "Sending could not be completed. Check the server logs before retrying." },
    },
    de: {
      title: "Bestätigungs-E-Mails", transport: "Versandart", configured: "Die erforderlichen Einstellungen sind vorhanden. Das Versandergebnis steht bei jeder Buchung.", missing: "Fehlende Einstellungen", disabled: "Der E-Mail-Dienst ist deaktiviert. DISABLE_MAIL_WORKER auf 0 setzen und erneut bereitstellen.", unknown: "Der E-Mail-Konfigurationsstatus ist nicht verfügbar. Website aktualisieren und erneut anmelden.", accepted: "Vom E-Mail-Dienst angenommen bedeutet nicht, dass die Nachricht im Posteingang angekommen ist. Auch das Resend-Versandprotokoll und den Spamordner prüfen.", retry: "Erneut senden", retryError: "Die E-Mail konnte nicht eingereiht werden. Einstellungen prüfen und erneut versuchen.", code: "Dienstcode",
      states: { pending: "In Warteschlange", sending: "In Bearbeitung", sent: "Vom E-Mail-Dienst angenommen", failed: "Versand fehlgeschlagen" },
      errors: { test_recipient_only: "Der Resend-Testabsender darf nur an die registrierte Konto-Adresse senden. Für andere Empfänger die eigene Domain verifizieren und MAIL_FROM ändern.", domain_unverified: "Die Absenderdomain ist nicht verifiziert. In Resend verifizieren und MAIL_FROM prüfen.", authentication_failed: "Authentifizierung fehlgeschlagen. Gültigkeit und Sendeberechtigung des API-Schlüssels prüfen.", rate_limited: "Das Anfragelimit wurde erreicht. Später erneut versuchen und das Versandkontingent prüfen.", network_error: "Keine Verbindung zum E-Mail-Dienst. Servernetzwerk und Versandart prüfen.", tls_error: "Die sichere Verbindung ist fehlgeschlagen. SMTP-Einstellungen prüfen.", sender_rejected: "Absenderadresse abgelehnt. MAIL_FROM und Domainverifizierung prüfen.", recipient_rejected: "Empfängeradresse abgelehnt. E-Mail-Adresse des Gastes prüfen.", provider_rejected: "Der E-Mail-Dienst hat die Anfrage abgelehnt. Resend-Versandprotokoll und Serverprotokolle prüfen.", unexpected_error: "Der Versand konnte nicht abgeschlossen werden. Vor einem erneuten Versuch die Serverprotokolle prüfen." },
    },
  };
  return words[currentLang] || words.en;
}
function mailDiagnostics() {
  const w = mailWords();
  if (!mailConfig) return `<div class="mail-diagnostics"><b>${w.title}</b><p>${w.unknown}</p></div>`;
  const transport = mailConfig.transport === "resend" ? "Resend HTTPS API" : "SMTP";
  const missing = Array.isArray(mailConfig.missingSettings) ? mailConfig.missingSettings : [];
  return `<div class="mail-diagnostics"><b>${w.title}</b><p>${w.transport}: ${transport}. ${mailConfig.configured ? w.configured : `${w.missing}: ${missing.map(escapeHTML).join(", ") || "—"}`}</p>${mailConfig.workerEnabled === false ? `<p class="mail-error">${w.disabled}</p>` : ""}<p>${w.accepted}</p></div>`;
}
function reservationEmailCell(reservation, index) {
  const w = mailWords();
  const status = w.states[reservation.emailStatus] || w.states.pending;
  const reason = reservation.emailError ? w.errors[reservation.emailError] || w.errors.unexpected_error : "";
  const code = Number.isInteger(reservation.emailErrorStatus) ? ` (${w.code}: ${reservation.emailErrorStatus})` : "";
  return `<td class="reservation-email"><span>${escapeHTML(status)}</span>${reason ? `<p class="mail-error">${escapeHTML(reason + code)}</p>` : ""}<button type="button" class="retry-email" data-reservation-index="${index}"${reservation.emailStatus === "sending" ? " disabled" : ""}>↻ ${w.retry}</button></td>`;
}
function bookingsTable() {
  let w = bookingWords(),
    rows = reservations
      .map((reservation, index) => ({ reservation, index }))
      .sort((a, b) => a.reservation.checkin.localeCompare(b.reservation.checkin))
      .map(
        ({ reservation: r, index }) =>
          `<tr><td><b>${escapeHTML(r.id)}</b></td><td>${escapeHTML(r.guest)}</td><td>${escapeHTML(r.contact || "—")}</td><td>${escapeHTML(r.checkin)}</td><td>${escapeHTML(r.checkout)}</td><td>${r.guests}</td><td>£${r.total}</td><td><span class="status-pill">${w.confirmed}</span></td>${reservationEmailCell(r, index)}<td><button type="button" class="delete-reservation" data-reservation-index="${index}">${w.remove}</button></td></tr>`,
      )
      .join("");
  return `<section class="reservation-admin"><div class="reservation-heading"><div><span class="admin-label">BOOKINGS</span><h2>${w.title}</h2></div><b>${reservations.length} ${w.upcoming}</b></div>${mailDiagnostics()}<div class="table-wrap"><table><thead><tr><th>${w.ref}</th><th>${w.guest}</th><th>${reservationWords().contact}</th><th>${w.checkin}</th><th>${w.checkout}</th><th>${w.people}</th><th>${w.amount}</th><th>${w.status}</th><th>Email</th><th>${w.actions}</th></tr></thead><tbody>${rows || `<tr><td colspan="10">${w.empty}</td></tr>`}</tbody></table></div></section>`;
}
function bindReservationActions() {
  $$(".retry-email").forEach(button => {
    button.onclick = async () => {
      button.disabled = true;
      try {
        const reservation = reservations[Number(button.dataset.reservationIndex)];
        await api(`/reservations/${encodeURIComponent(reservation.id)}/email`, "POST", {});
        await refreshReservations();
        $(".reservation-admin").outerHTML = bookingsTable();
        bindReservationActions();
      } catch { window.alert(mailWords().retryError); button.disabled = false; }
    };
  });
  $$(".delete-reservation").forEach((button) => {
    button.onclick = () => deleteReservation(Number(button.dataset.reservationIndex));
  });
}
async function deleteReservation(index) {
  if (!adminLoggedIn || !Number.isInteger(index) || !reservations[index]) return;
  const reservation = reservations[index];
  const words = bookingWords();
  if (!window.confirm(`${words.confirmDelete}\n\n${reservation.id} · ${reservation.guest}\n${reservation.checkin} → ${reservation.checkout}`)) return;
  try {
    await api(`/reservations/${encodeURIComponent(reservation.id)}`, "DELETE", {});
    await refreshReservations();
    await refreshAvailability();
  } catch {
    window.alert(words.deleteError);
    return;
  }
  rebuildBookedDates();
  renderCalendars();
  updatePrice();
  // Refresh only the booking list so unsaved property edits remain intact.
  $(".reservation-admin").outerHTML = bookingsTable();
  bindReservationActions();
}
function contentEditorFields() {
  const labels =
    currentLang === "de"
      ? {
          section: "Seiteninhalte",
          location: "Standortzeile",
          subtitle: "Untertitel",
          hostTitle: "Gastgeber-Überschrift",
          capacity: "Gäste- und Zimmerangaben",
          f1t: "Merkmal 1 – Titel",
          f1x: "Merkmal 1 – Text",
          f2t: "Merkmal 2 – Titel",
          f2x: "Merkmal 2 – Text",
          f3t: "Merkmal 3 – Titel",
          f3x: "Merkmal 3 – Text",
          amenitiesTitle: "Ausstattungsüberschrift",
          amenities: "Ausstattung",
        }
      : currentLang === "en"
        ? {
            section: "Page content",
            location: "Location line",
            subtitle: "Subtitle",
            hostTitle: "Host heading",
            capacity: "Guest and room details",
            f1t: "Feature 1 title",
            f1x: "Feature 1 text",
            f2t: "Feature 2 title",
            f2x: "Feature 2 text",
            f3t: "Feature 3 title",
            f3x: "Feature 3 text",
            amenitiesTitle: "Amenities heading",
            amenities: "Amenity",
          }
        : currentLang === "zh-CN"
          ? {
              section: "页面内容",
              location: "地点文字",
              subtitle: "副标题",
              hostTitle: "房东标题",
              capacity: "住客及房间资料",
              f1t: "特色一标题",
              f1x: "特色一内容",
              f2t: "特色二标题",
              f2x: "特色二内容",
              f3t: "特色三标题",
              f3x: "特色三内容",
              amenitiesTitle: "设施标题",
              amenities: "设施",
            }
          : {
              section: "頁面內容",
              location: "地點文字",
              subtitle: "副標題",
              hostTitle: "房東標題",
              capacity: "住客及房間資料",
              f1t: "特色一標題",
              f1x: "特色一內容",
              f2t: "特色二標題",
              f2x: "特色二內容",
              f3t: "特色三標題",
              f3x: "特色三內容",
              amenitiesTitle: "設施標題",
              amenities: "設施",
            };
  const currentContent = property.localizedContent[currentLang] || {};
  const value = (key) => currentContent[key] ?? t()[key];
  const amenities = currentContent.amenities || t().amenities;
  return `<h3 class="content-editor-title">${labels.section}</h3>
    <div class="content-fields">
      <label class="field">${labels.location}<input id="editLocation" value="${escapeHTML(value("location"))}"></label>
      <label class="field">${labels.subtitle}<input id="editSubtitle" value="${escapeHTML(value("subtitle"))}"></label>
      <label class="field">${labels.hostTitle}<input id="editHostTitle" value="${escapeHTML(value("hostTitle"))}"></label>
      <label class="field">${labels.capacity}<input id="editCapacity" value="${escapeHTML(value("capacity"))}"></label>
      <label class="field">${labels.f1t}<input id="editFeature1Title" value="${escapeHTML(value("feature1Title"))}"></label>
      <label class="field">${labels.f1x}<input id="editFeature1Text" value="${escapeHTML(value("feature1Text"))}"></label>
      <label class="field">${labels.f2t}<input id="editFeature2Title" value="${escapeHTML(value("feature2Title"))}"></label>
      <label class="field">${labels.f2x}<input id="editFeature2Text" value="${escapeHTML(value("feature2Text"))}"></label>
      <label class="field">${labels.f3t}<input id="editFeature3Title" value="${escapeHTML(value("feature3Title"))}"></label>
      <label class="field">${labels.f3x}<input id="editFeature3Text" value="${escapeHTML(value("feature3Text"))}"></label>
      <label class="field">${labels.amenitiesTitle}<input id="editAmenitiesTitle" value="${escapeHTML(value("amenitiesTitle"))}"></label>
    </div>
    <div class="amenity-admin-grid">${amenities.map((item, index) => `<label class="field">${labels.amenities} ${index + 1}<input class="edit-amenity" value="${escapeHTML(item)}"></label>`).join("")}</div>`;
}
function adminPanel() {
  if (!adminLoggedIn) return openAdmin();
  let x = a(),
    editors = property.photos
      .map(
        (p, i) =>
          `<label class="photo-editor"><img src="${escapeHTML(p)}"><span>${x.photos} ${i + 1}<b>${x.replace}</b></span><input class="photo-input" data-index="${i}" type="file" accept="image/*" hidden></label>`,
      )
      .join(""),
    syncNote =
      currentLang === "de"
        ? "Text wird nur für Deutsch gespeichert. Preis und Fotos gelten für alle vier Sprachen."
        : currentLang === "en"
          ? "Text is saved for English only. Price and photos update across all four languages."
          : currentLang === "zh-CN"
            ? "文字只保存到简体中文；价格和照片会同步到四个语言版本。"
            : "文字只儲存到繁體中文；價格和相片會同步到四個語言版本。";
  openModal(
    `<span class="admin-label">ADMIN CONTROL</span><div class="admin-top"><h2>${x.manage}</h2><button id="logout">${x.logout}</button></div>${bookingsTable()}<div class="property-editor"><p class="sync-note">↻ ${syncNote}</p><label class="field">${x.name}<input id="editTitle" value="${escapeHTML(property.titles[currentLang])}"></label><label class="field">${x.price}<input id="editPrice" type="number" value="${property.price}"></label><label class="field">${x.desc}<textarea id="editDescription" rows="5">${escapeHTML(property.descriptions[currentLang])}</textarea></label>${contentEditorFields()}<h3>${x.photos}</h3><p>${x.photoHelp}</p><div class="photo-editors">${editors}</div><button class="primary" id="saveAdmin">${x.save}</button><button class="reset-photos" id="resetPhotos">${x.reset}</button></div>`,
    true,
  );
  bindReservationActions();
  $("#logout").onclick = async () => {
    await api("/logout", "POST", {});
    reservations = [];
    mailConfig = null;
    adminLoggedIn = false;
    openAdmin();
  };
  $("#resetPhotos").onclick = () => {
    property = {
      ...DEFAULTS,
      titles: { ...DEFAULTS.titles },
      descriptions: { ...DEFAULTS.descriptions },
      photos: [...PHOTOS],
      localizedContent: {},
    };
    saveProperty();
  };
  $("#saveAdmin").onclick = () => {
    let title = $("#editTitle").value,
      description = $("#editDescription").value;
    property.titles[currentLang] = title;
    property.descriptions[currentLang] = description;
    property.localizedContent[currentLang] = {
      ...(property.localizedContent[currentLang] || {}),
      location: $("#editLocation").value,
      subtitle: $("#editSubtitle").value,
      hostTitle: $("#editHostTitle").value,
      capacity: $("#editCapacity").value,
      feature1Title: $("#editFeature1Title").value,
      feature1Text: $("#editFeature1Text").value,
      feature2Title: $("#editFeature2Title").value,
      feature2Text: $("#editFeature2Text").value,
      feature3Title: $("#editFeature3Title").value,
      feature3Text: $("#editFeature3Text").value,
      amenitiesTitle: $("#editAmenitiesTitle").value,
      amenities: Array.from($$(".edit-amenity")).map((input) => input.value),
    };
    property.price = +$("#editPrice").value;
    saveProperty();
  };
  $$(".photo-input").forEach(
    (input) =>
      (input.onchange = async () => {
        let f = input.files[0];
        if (f) {
          property.photos[+input.dataset.index] = await resizeImage(f);
          input.closest("label").querySelector("img").src =
            property.photos[+input.dataset.index];
        }
      }),
  );
}
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    let r = new FileReader();
    r.onerror = reject;
    r.onload = () => {
      let img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let s = Math.min(1, 1400 / Math.max(img.width, img.height)),
          c = document.createElement("canvas");
        c.width = img.width * s;
        c.height = img.height * s;
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}
async function saveProperty() {
  try {
    await api("/property", "PUT", property);
  } catch (error) {
    window.alert(reservationWords().saveError);
    return;
  }
  applyProperty();
  openModal(
    `<h2>${a().saved}</h2><p class="success">✓ ${a().saved}</p><button class="primary" id="backAdmin">${a().back}</button>`,
  );
  $("#backAdmin").onclick = adminPanel;
}
$("#languageSelect").onchange = (e) => {
  closeModal();
  setLanguage(e.target.value);
};
$("#adminTrigger").onclick = $("#footerAdmin").onclick = openAdmin;
$("#modalClose").onclick = closeModal;
$("#modalWrap").onclick = (e) => {
  if (e.target === $("#modalWrap")) closeModal();
};
$$("[data-scroll-calendar]").forEach(
  (b) => (b.onclick = () => $("#availability").scrollIntoView()),
);
$("#guests").onchange = updatePrice;
$("#prevMonth").onclick = () => {
  monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1);
  renderCalendars();
};
$("#nextMonth").onclick = () => {
  monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1);
  renderCalendars();
};
$("#saveBtn").onclick = () => {
  saved = !saved;
  $("#saveBtn").textContent = saved ? t().saved : t().save;
};
$("#shareBtn").onclick = async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    $("#shareBtn").textContent = "✓";
  } catch {}
};
$("#photoBtn").onclick = () =>
  openModal(
    `<h2>${a().photoTitle}</h2><div class="photo-grid">${property.photos.map((p) => `<img src="${escapeHTML(p)}">`).join("")}</div>`,
    true,
  );
$("#checkinDate").onchange = (event) => {
  start = event.target.value;
  if (end <= start) end = "";
  if (start) monthCursor = new Date(`${start}T12:00:00`);
  renderCalendars();
  updatePrice();
};
$("#checkoutDate").onchange = (event) => { end = event.target.value; renderCalendars(); updatePrice(); };
$("#bookBtn").onclick = () => {
  if (!backendReady || !validStay()) return;
  const words = reservationWords(), labels = bookingWords();
  const stay = { checkin: start, checkout: end, guests: +$("#guests").value, requestKey: crypto.randomUUID() };
  openModal(
    `<h2>${words.confirm}</h2>
    <div class="reservation-summary"><span>${labels.checkin}: ${stay.checkin} ${escapeHTML(stayConfig.checkinTime)}<br>${labels.checkout}: ${stay.checkout} ${escapeHTML(stayConfig.checkoutTime)}<br>${labels.people}: ${stay.guests}</span><b>£${total()}</b></div>
    <p>${words.help}</p>
    <form id="reservationForm">
      <label class="field">${labels.guest}<input id="bookingName" autocomplete="name" maxlength="100" required></label>
      <label class="field">${words.email} *<input id="bookingEmail" type="email" autocomplete="email" maxlength="254" required></label>
      <label class="field">${words.phone}<input id="bookingPhone" type="tel" autocomplete="tel" maxlength="30"></label>
      <p class="error" id="reservationError" role="alert" hidden></p>
      <button class="primary" id="confirmReservation" type="submit">${words.confirm}</button>
    </form>`,
  );
  const form = $("#reservationForm"), email = $("#bookingEmail"), phone = $("#bookingPhone");
  email.oninput = () => email.setCustomValidity("");
  phone.oninput = () => phone.setCustomValidity("");
  let submitted = false;
  form.onsubmit = async (event) => {
    event.preventDefault();
    if (submitted) return;
    email.setCustomValidity(validContact("email", email.value.trim()) ? "" : words.invalidEmail);
    phone.setCustomValidity(!phone.value.trim() || validContact("phone", phone.value.trim()) ? "" : words.invalidPhone);
    if (!form.reportValidity()) return;
    const error = $("#reservationError"), button = $("#confirmReservation");
    submitted = true;
    button.disabled = true;
    try {
      const result = await api("/reservations", "POST", {...stay, guest: $("#bookingName").value.trim(), email: email.value.trim(), phone: phone.value.trim()});
      const r = result.reservation;
      openModal(`<h2>✓ ${labels.confirmed}</h2><p>${words.success}</p><p>${labels.ref}: <b>${escapeHTML(r.id)}</b></p><p class="success">${labels.checkin}: ${r.checkin} ${escapeHTML(r.arrival.checkinTime)}<br>${labels.checkout}: ${r.checkout} ${escapeHTML(r.arrival.checkoutTime)}</p><p>${escapeHTML(r.arrival.address)}</p><p>${words.email}: ${escapeHTML(r.email)}</p><button class="primary" id="doneBooking">OK</button>`);
      $("#doneBooking").onclick = closeModal;
      start = "";
      end = "";
      await refreshAvailability().catch(() => { backendReady = false; updatePrice(); });
    } catch (failure) {
      error.textContent = failure.status === 409 ? words.unavailable : words.saveError;
      error.hidden = false;
      submitted = false;
      button.disabled = false;
    }
  };
};
document.onkeydown = (e) => {
  if (e.key === "Escape") closeModal();
};
applyProperty();

async function initializeSite() {
  const status = $("#connectionStatus");
  try {
    const data = await api("/property");
    if (data.property) property = data.property;
    applyProperty();
    await refreshAvailability();

  } catch {
    backendReady = false;
    updatePrice();
    status.hidden = false;
    status.textContent = "暫時無法連接預訂服務，請稍後再試。 / Booking service unavailable. Please try again later.";
  }
}
initializeSite();
setInterval(async () => {
  if (document.hidden) return;
  try {
    await refreshAvailability();
    if (adminLoggedIn && $(".reservation-admin")) {
      await refreshReservations();
      $(".reservation-admin").outerHTML = bookingsTable();
      bindReservationActions();
    }
  } catch { backendReady = false; updatePrice(); }
}, 30000);
