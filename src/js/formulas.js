// src/js/formulas.js
window.CITY_PRESETS = [
  { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708, utc: 4.0 },
  { name: "Mumbai, India", lat: 19.0760, lon: 72.8777, utc: 5.5 },
  { name: "New Delhi, India", lat: 28.6139, lon: 77.2090, utc: 5.5 },
  { name: "Phalodi, India", lat: 27.1300, lon: 72.3600, utc: 5.5 },
  { name: "Ujjain, India", lat: 23.1765, lon: 75.7885, utc: 5.5 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278, utc: 0.0 },
  { name: "New York, USA", lat: 40.7128, lon: -74.0060, utc: -5.0 }
];

window.GOTRAS = ["Kashyapa", "Bharadwaj", "Vatsa", "Sandilya", "Gautama", "Gargya", "Vishwamitra", "Vasishtha", "Atri", "Agastya"];
window.JAATIS = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kayastha", "Rajput", "Maratha", "Jat"];
window.SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
window.SIGN_LORDS = { Aries:"Mars", Taurus:"Venus", Gemini:"Mercury", Cancer:"Moon", Leo:"Sun", Virgo:"Mercury", Libra:"Venus", Scorpio:"Mars", Sagittarius:"Jupiter", Capricorn:"Saturn", Aquarius:"Saturn", Pisces:"Jupiter" };

window.SIGN_TRAITS = {
  "Aries": "pioneering, dynamic, action-oriented",
  "Taurus": "stable, value-driven, steadfast",
  "Gemini": "intellectual, versatile, communicative",
  "Cancer": "intuitive, protective, deeply emotional",
  "Leo": "authoritative, charismatic, creative",
  "Virgo": "methodical, precision-driven, analytical",
  "Libra": "diplomatic, harmony-seeking, strategic",
  "Scorpio": "transformative, perceptive, resilient",
  "Sagittarius": "visionary, expansive, philosophical",
  "Capricorn": "disciplined, ambitious, structured",
  "Aquarius": "innovative, unconventional, forward-thinking",
  "Pisces": "empathetic, contemplative, intuitive"
};

window.NAKSHATRAS = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
window.LUNAR_MASAS = ["Chaitra","Vaishakha","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashvin","Kartika","Margashirsha","Pausha","Magha","Phalguna"];
window.YOGAS = ["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
window.KARANAS = ["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti (Bhadra)"];
window.WEEKDAY = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn"];
window.SANSKRIT_DAYS = { Sun:"Ravi", Moon:"Soma", Mars:"Mangala", Mercury:"Budha", Jupiter:"Brihaspati", Venus:"Shukra", Saturn:"Shani" };
window.PLANET_LORDS = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
window.VIMSHOTTARI_YEARS = { Ketu:7, Venus:20, Sun:6, Moon:10, Mars:7, Rahu:18, Jupiter:16, Saturn:19, Mercury:17 };

window.PLANET_INFO = {
  Sun: { symbol: "☉", color: "#E8A33D", adhidevata: "Lord Rama", gem: "Ruby (Manikya)", beej: "Om Hraam Hreem Hroum Sah Suryaya Namah", mantras: ["Aditya Hrudaya Stotram", "Gayatri Mantra"], charity: "Donate wheat, copper, or jaggery on Sundays.", action: "Offer water (Arghya) facing East at sunrise." },
  Moon: { symbol: "☽", color: "#9FB8D9", adhidevata: "Goddess Gauri", gem: "Pearl (Mukta)", beej: "Om Shraam Shreem Shroum Sah Chandraya Namah", mantras: ["Chandra Kavacham", "Om Namah Shivaya"], charity: "Donate white rice, milk, or silver on Mondays.", action: "Practice evening mindfulness and breath control." },
  Mars: { symbol: "♂", color: "#B23A48", adhidevata: "Lord Hanuman", gem: "Red Coral (Moonga)", beej: "Om Kraam Kreem Kroum Sah Bhaumaya Namah", mantras: ["Hanuman Chalisa", "Mangala Stotram"], charity: "Donate red lentils (Masoor Dal) on Tuesdays.", action: "Engage in physical discipline and direct execution." },
  Mercury: { symbol: "☿", color: "#7C9473", adhidevata: "Lord Vishnu", gem: "Emerald (Panna)", beej: "Om Braam Breem Broum Sah Budhaya Namah", mantras: ["Vishnu Sahasranama", "Budha Kavacham"], charity: "Feed green fodder to cows; donate green moong dal.", action: "Audit agreements, ledger entries, and communications." },
  Jupiter: { symbol: "♃", color: "#D4A574", adhidevata: "Lord Dakshinamurthy", gem: "Yellow Sapphire (Pukhraj)", beej: "Om Graam Greem Groum Sah Gurave Namah", mantras: ["Guru Stotram", "Brihaspati Kavacham"], charity: "Donate turmeric, chana dal, or yellow sweets on Thursdays.", action: "Seek counsel from mentors and honor teachers." },
  Venus: { symbol: "♀", color: "#C98CA7", adhidevata: "Goddess Mahalakshmi", gem: "Diamond / White Zircon", beej: "Om Draam Dreem Droum Sah Shukraya Namah", mantras: ["Sri Suktam", "Mahalakshmi Ashtakam"], charity: "Donate white silk, sugar, or ghee on Fridays.", action: "Cultivate aesthetic order, diplomacy, and generosity." },
  Saturn: { symbol: "♄", color: "#8288A0", adhidevata: "Lord Shani / Bhairava", gem: "Blue Sapphire (Neelam)", beej: "Om Praam Preem Proum Sah Shanaye Namah", mantras: ["Shani Chalisa", "Dasharatha Shani Stotram"], charity: "Donate black sesame seeds, mustard oil, or iron items.", action: "Light a mustard-oil deepak at dusk on Saturdays." },
  Rahu: { symbol: "☊", color: "#A872B2", adhidevata: "Goddess Durga", gem: "Hessonite (Gomed)", beej: "Om Bhraam Bhreem Bhroum Sah Rahave Namah", mantras: ["Durga Saptashati", "Rahu Stotram"], charity: "Feed birds and stray animals; donate coconut.", action: "Maintain strict transparency; avoid impulsive speculation." },
  Ketu: { symbol: "☋", color: "#72AAB2", adhidevata: "Lord Ganesha", gem: "Cat's Eye (Lehsuniya)", beej: "Om Sraam Sreem Sroum Sah Ketave Namah", mantras: ["Ganesha Atharvashirsha", "Ketu Kavacham"], charity: "Donate multi-colored blankets or feed street dogs.", action: "Practice silent contemplation and detachment." }
};

window.norm360 = (x) => { let v = x % 360; return v < 0 ? v + 360 : v; };
window.toRad = (d) => (d * Math.PI) / 180;

window.julianDay = (dStr, tStr, utc) => {
  const [Y, M, D] = (dStr || "2026-01-01").split("-").map(Number);
  const [h, m] = (tStr || "12:00").split(":").map(Number);
  return (Date.UTC(Y, M - 1, D, h, m, 0) - ((utc || 0) * 3600000)) / 86400000 + 2440587.5;
};

window.getAya = (Y) => 23.85 + (Y - 2000) * 0.013972;

window.sunLon = (T) => {
  const M = window.norm360(357.529 + 35999.05 * T);
  const L = window.norm360(280.466 + 36000.77 * T + 1.915 * Math.sin(window.toRad(M)));
  return { L, R: 1.00014 - 0.01671 * Math.cos(window.toRad(M)) };
};

window.moonLon = (T) => {
  const D = window.norm360(297.85 + 445267.11 * T);
  const M = window.norm360(357.52 + 35999.05 * T);
  const Mp = window.norm360(134.96 + 477198.86 * T);
  return window.norm360(218.316 + 481267.88 * T + 6.28 * Math.sin(window.toRad(Mp)) + 1.27 * Math.sin(window.toRad(2 * D - Mp)));
};

const PE = {
  Mercury: { a: 0.387, e: 0.205, i: 7.004, L: [252.25, 149472.67], peri: 77.45, node: 48.33 },
  Venus: { a: 0.723, e: 0.006, i: 3.394, L: [181.97, 58517.81], peri: 131.60, node: 76.67 },
  Mars: { a: 1.523, e: 0.093, i: 1.849, L: [-4.55, 19140.30], peri: -23.94, node: 49.55 },
  Jupiter: { a: 5.202, e: 0.048, i: 1.304, L: [34.39, 3034.74], peri: 14.72, node: 100.47 },
  Saturn: { a: 9.536, e: 0.053, i: 2.485, L: [49.95, 1222.49], peri: 92.59, node: 113.66 }
};

window.helio = (n, T) => {
  const p = PE[n], a = p.a, e = p.e, i = window.toRad(p.i), L = p.L[0] + p.L[1] * T, peri = p.peri, node = p.node;
  const w = window.toRad(window.norm360(peri - node)), Om = window.toRad(window.norm360(node)), M = window.toRad(window.norm360(L - peri));
  const E = M + e * Math.sin(M);
  const xo = a * (Math.cos(E) - e), yo = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const cw = Math.cos(w), sw = Math.sin(w), co = Math.cos(Om), so = Math.sin(Om), ci = Math.cos(i);
  return { x: (co * cw - so * sw * ci) * xo + (-co * sw - so * cw * ci) * yo, y: (so * cw + co * sw * ci) * xo + (-so * sw + co * cw * ci) * yo };
};

window.getKPLords = (lon) => {
  const nakIdx = Math.floor(lon / (360 / 27));
  const remInNak = lon % (360 / 27);
  const subLordIdx = (Math.floor(remInNak / ((360 / 27) / 9)) + (nakIdx % 9)) % 9;
  return {
    starLord: window.PLANET_LORDS[nakIdx % 9],
    subLord: window.PLANET_LORDS[subLordIdx],
    subSubLord: window.PLANET_LORDS[(subLordIdx + 2) % 9]
  };
};

window.formatYM = (decimalYear) => {
  const year = Math.floor(decimalYear);
  const month = Math.round((decimalYear - year) * 12);
  const d = new Date(year, month);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

window.calcDasha = (moonDeg, dobStr) => {
  const nakLen = 360 / 27;
  const nakIdx = Math.floor(moonDeg / nakLen);
  const passedPct = (moonDeg % nakLen) / nakLen;
  let lordIdx = nakIdx % 9;
  const mahaYrs = window.VIMSHOTTARI_YEARS[window.PLANET_LORDS[lordIdx]];
  const bDate = new Date(dobStr || "2000-01-01");
  let startYear = bDate.getFullYear() + (bDate.getMonth() / 12) - (mahaYrs * passedPct);
  const periods = [];
  for (let i = 0; i < 9; i++) {
    const lrd = window.PLANET_LORDS[(lordIdx + i) % 9];
    const dur = window.VIMSHOTTARI_YEARS[lrd];
    periods.push({ lord: lrd, start: startYear, end: startYear + dur });
    startYear += dur;
  }
  return periods;
};

window.getAntardashas = (mahaLord, mahaStart, mahaEnd) => {
  const periods = [];
  const mahaYears = window.VIMSHOTTARI_YEARS[mahaLord] || (mahaEnd - mahaStart);
  let currentStart = mahaStart;
  let lordIdx = window.PLANET_LORDS.indexOf(mahaLord);
  for (let i = 0; i < 9; i++) {
    const antarLord = window.PLANET_LORDS[(lordIdx + i) % 9];
    const antarYears = (mahaYears * window.VIMSHOTTARI_YEARS[antarLord]) / 120;
    periods.push({ lord: antarLord, start: currentStart, end: currentStart + antarYears });
    currentStart += antarYears;
  }
  return periods;
};

window.getPratyantarDashas = (antarLord, antarStart, antarEnd) => {
  const periods = [];
  const antarYears = antarEnd - antarStart;
  let currentStart = antarStart;
  let lordIdx = window.PLANET_LORDS.indexOf(antarLord);
  for (let i = 0; i < 9; i++) {
    const pLord = window.PLANET_LORDS[(lordIdx + i) % 9];
    const pYears = (antarYears * window.VIMSHOTTARI_YEARS[pLord]) / 120;
    periods.push({ lord: pLord, start: currentStart, end: currentStart + pYears });
    currentStart += pYears;
  }
  return periods;
};

window.getPlanetaryDignity = (planet, sign) => {
  const exaltations = { Sun: "Aries", Moon: "Taurus", Mars: "Capricorn", Mercury: "Virgo", Jupiter: "Cancer", Venus: "Pisces", Saturn: "Libra", Rahu: "Taurus", Ketu: "Scorpio" };
  const debilitations = { Sun: "Libra", Moon: "Scorpio", Mars: "Cancer", Mercury: "Pisces", Jupiter: "Capricorn", Venus: "Virgo", Saturn: "Aries", Rahu: "Scorpio", Ketu: "Taurus" };
  const ownSigns = { Sun: ["Leo"], Moon: ["Cancer"], Mars: ["Aries","Scorpio"], Mercury: ["Gemini","Virgo"], Jupiter: ["Sagittarius","Pisces"], Venus: ["Taurus","Libra"], Saturn: ["Capricorn","Aquarius"] };

  if (exaltations[planet] === sign) return { status: "Exalted", color: "#10B981" };
  if (debilitations[planet] === sign) return { status: "Debilitated", color: "#EF4444" };
  if (ownSigns[planet]?.includes(sign)) return { status: "Own Sign", color: "#3B82F6" };
  return { status: "Neutral", color: "#9CA3AF" };
};

window.computeKundli = (profile, dateObj = null) => {
  if (!profile) return null;
  const targetDate = dateObj || new Date();
  const JD = window.julianDay(profile.dob, profile.time, profile.utcOffset);
  const T = (JD - 2451545) / 36525;
  const [Y, Mo] = (profile.dob || "2026-01-01").split("-").map(Number);
  const aya = window.getAya(Y + (Mo - 1) / 12);
  const s = window.sunLon(T);
  const e = { x: s.R * Math.cos(window.toRad(window.norm360(s.L + 180))), y: s.R * Math.sin(window.toRad(window.norm360(s.L + 180))) };
  const sid = { Sun: window.norm360(s.L - aya), Moon: window.norm360(window.moonLon(T) - aya), Rahu: window.norm360(window.norm360(125.04 - 1934.13 * T) - aya) };
  sid.Ketu = window.norm360(sid.Rahu + 180);

  ["Mercury", "Venus", "Mars", "Jupiter", "Saturn"].forEach((p) => {
    const h = window.helio(p, T);
    sid[p] = window.norm360((Math.atan2(h.y - e.y, h.x - e.x) * 180) / Math.PI - aya);
  });

  const [hh, mm] = (profile.time || "12:00").split(":").map(Number);
  const ascL = window.norm360(sid.Sun + (hh + mm / 60 - 6) * 15);

  const getDiv = (lon, div) => {
    if (div === 1) return window.SIGNS[Math.floor(lon / 30)];
    if (div === 7) return window.SIGNS[((Math.floor(lon / 30) % 2 !== 0 ? Math.floor(lon / 30) + 6 : Math.floor(lon / 30)) + Math.floor((lon % 30) / (30 / 7))) % 12];
    if (div === 9) return window.SIGNS[([0, 9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3][Math.floor(lon / 30)] + Math.floor((lon % 30) / (30 / 9))) % 12];
    if (div === 10) return window.SIGNS[((Math.floor(lon / 30) % 2 !== 0 ? Math.floor(lon / 30) + 8 : Math.floor(lon / 30)) + Math.floor((lon % 30) / 3)) % 12];
    if (div === 60) return window.SIGNS[Math.floor((lon * 60) / 30) % 12];
  };

  const genC = (div) => {
    const lg = getDiv(ascL, div);
    const idx = window.SIGNS.indexOf(lg);
    const hs = {}, pl = {};
    for (let i = 1; i <= 12; i++) { hs[i] = window.SIGNS[(idx + i - 1) % 12]; }
    Object.entries(sid).forEach(([p, l]) => (pl[p] = ((window.SIGNS.indexOf(getDiv(l, div)) - idx + 12) % 12) + 1));
    return { lagna: lg, houses: hs, placements: pl };
  };

  const kpTable = Array.from({ length: 12 }).map((_, i) => {
    const cuspDegree = window.norm360(ascL + i * 30);
    return { cusp: i + 1, sign: window.SIGNS[Math.floor(cuspDegree / 30)], deg: (cuspDegree % 30).toFixed(2), ...window.getKPLords(cuspDegree) };
  });

  const shadbala = {
    Sun: Math.floor(380 + Math.abs(Math.sin(window.toRad(sid.Sun))) * 220),
    Moon: Math.floor(410 + Math.abs(Math.cos(window.toRad(sid.Moon))) * 210),
    Mars: Math.floor(340 + Math.abs(Math.sin(window.toRad(sid.Mars))) * 200),
    Mercury: Math.floor(390 + Math.abs(Math.cos(window.toRad(sid.Mercury))) * 230),
    Jupiter: Math.floor(450 + (sid.Jupiter % 180) * 1.1),
    Venus: Math.floor(420 + (sid.Venus % 180) * 1.0),
    Saturn: Math.floor(350 + (sid.Saturn % 180) * 0.9)
  };

  const dasha = window.calcDasha(sid.Moon, profile.dob);
  const moonIdx = Math.floor(sid.Moon / (360 / 27));

  const trJD = window.julianDay(targetDate.toISOString().slice(0, 10), "12:00", profile.utcOffset);
  const trT = (trJD - 2451545) / 36525;
  const ts = window.sunLon(trT);
  const te = { x: ts.R * Math.cos(window.toRad(window.norm360(ts.L + 180))), y: ts.R * Math.sin(window.toRad(window.norm360(ts.L + 180))) };
  const transits = { Sun: window.SIGNS[Math.floor(window.norm360(ts.L - aya) / 30)], Moon: window.SIGNS[Math.floor(window.norm360(window.moonLon(trT) - aya) / 30)] };
  ["Mercury", "Venus", "Mars", "Jupiter", "Saturn"].forEach((p) => {
    const h = window.helio(p, trT);
    transits[p] = window.SIGNS[Math.floor(window.norm360((Math.atan2(h.y - te.y, h.x - te.x) * 180) / Math.PI - aya) / 30)];
  });

  return {
    d1: genC(1), d7: genC(7), d9: genC(9), d10: genC(10), d60: genC(60),
    kpTable, moonSign: window.SIGNS[Math.floor(sid.Moon / 30)], sunSign: window.SIGNS[Math.floor(sid.Sun / 30)],
    nak: window.NAKSHATRAS[moonIdx], pada: Math.floor((sid.Moon % (360 / 27)) / ((360 / 27) / 4)) + 1,
    planetaryDegrees: sid, transits, dasha, shadbala
  };
};

window.panchang = (dObj, ms = "amanta", utc = 5.5) => {
  const JD = window.julianDay(dObj.toISOString().slice(0, 10), "12:00", utc);
  const T = (JD - 2451545) / 36525;
  const sl = window.sunLon(T).L, ml = window.moonLon(T);
  const diff = window.norm360(ml - sl);
  const tIdx = Math.floor(diff / 12);
  const isS = tIdx < 15;
  const mIdx = Math.floor(window.norm360(sl) / 30);
  const masa = ms === "purnimanta" && !isS ? window.LUNAR_MASAS[(mIdx + 1) % 12] : window.LUNAR_MASAS[mIdx];

  const d = new Date(dObj.getTime());
  d.setHours(6, 0, 0, 0); const sr = new Date(d.getTime());
  d.setHours(18, 0, 0, 0); const ss = new Date(d.getTime());
  d.setHours(18, 30, 0, 0); const mr = new Date(d.getTime());
  d.setHours(6, 30, 0, 0); const msr = new Date(d.getTime());
  d.setDate(d.getDate() + 1);

  const dMs = ss - sr;
  const getS = (s, dur) => ({ s: new Date(s), e: new Date(s + dur) });
  const dow = dObj.getDay();
  const abh = getS(sr.getTime() + (dMs / 15) * 7, dMs / 15);
  const ct = [{ n:"Udveg", d:"Anxiety", c:"#B23A48" }, { n:"Amrit", d:"Nectar", c:"#8FB2D9" }, { n:"Rog", d:"Disease", c:"#B23A48" }, { n:"Labh", d:"Gain", c:"#8FC9A9" }, { n:"Shubh", d:"Auspicious", c:"#D4A574" }, { n:"Char", d:"Moving", c:"#9FB8D9" }, { n:"Kaal", d:"Loss", c:"#8288A0" }];
  const cm = { 0:[0,5,3,1,2,4,6,0], 1:[1,2,4,6,0,5,3,1], 2:[2,4,6,0,5,3,1,2], 3:[3,1,2,4,6,0,5,3], 4:[4,6,0,5,3,1,2,4], 5:[5,3,1,2,4,6,0,5], 6:[6,0,5,3,1,2,4,6] };
  const chogDay = cm[dow].map((i, idx) => ({ ...ct[i], ...getS(sr.getTime() + idx * (dMs / 8), dMs / 8) }));
  const chogNight = cm[(dow + 4) % 7].map((i, idx) => ({ ...ct[i], ...getS(ss.getTime() + idx * (dMs / 8), dMs / 8) }));

  const hoOrder = [0, 5, 3, 1, 6, 4, 2];
  const sHoIdx = [0, 3, 6, 2, 5, 1, 4][dow];
  const horas = Array.from({ length: 12 }).map((_, i) => ({ p: window.WEEKDAY[hoOrder[(hoOrder.indexOf(sHoIdx) + i) % 7]], ...getS(sr.getTime() + i * (dMs / 12), dMs / 12) }));

  const karana = window.KARANAS[Math.floor(diff / 6) % 7] || "Kimstughna";
  const bhadraApprox = karana.includes("Bhadra") || karana.includes("Vishti") ? getS(sr.getTime() + dMs * 0.5, dMs * 0.4) : null;

  return {
    tithi: ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi",isS ? "Purnima" : "Amavasya"][tIdx % 15],
    paksha: isS ? "Shukla" : "Krishna", masa,
    nak: window.NAKSHATRAS[Math.floor(ml / (360 / 27))],
    yoga: window.YOGAS[Math.floor(window.norm360(ml + sl) / (360 / 27))],
    karana, sr, ss, mr, msr, abh, chogDay, chogNight, horas, bhadra: bhadraApprox,
    rahu: getS(sr.getTime() + dMs * 0.8, dMs * 0.1), yamaganda: getS(sr.getTime() + dMs * 0.4, dMs * 0.1),
    gulika: getS(sr.getTime() + dMs * 0.2, dMs * 0.1), brahma: getS(sr.getTime() - dMs * 0.15, dMs * 0.08),
    vikram: dObj.getFullYear() + 57, saka: dObj.getFullYear() - 78
  };
};

window.bio = (dob, td, utc) => {
  const [Y, M, D] = (dob || "2026-01-01").split("-").map(Number);
  const eD = (Date.UTC(td.getFullYear(), td.getMonth(), td.getDate(), 12, 0, 0) - ((utc || 0) * 3600000) - (Date.UTC(Y, M - 1, D, 12, 0, 0) - ((utc || 0) * 3600000))) / 86400000;
  return { p: Math.sin((2 * Math.PI * eD) / 23), e: Math.sin((2 * Math.PI * eD) / 28), i: Math.sin((2 * Math.PI * eD) / 33), s: Math.sin((2 * Math.PI * eD) / 38) };
};
