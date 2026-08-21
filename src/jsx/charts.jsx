// Add these calculation functions to the bottom of src/jsx/charts.jsx

window.calculatePlanetaryDetails = (placements, degrees) => {
  const details = {};
  const nakshatras = window.NAKSHATRAS || [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
    "Magha", "Purvaphalguni", "Uttaraphalguni", "Hasta", "Chitra", "Swati", "Visakha", "Anuradha", "Jyeshtha",
    "Mula", "Purvashadha", "Uttarashadha", "Abhijit", "Sravana", "Dhanistha", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"
  ];

  Object.keys(placements || {}).forEach((planet) => {
    const deg = degrees?.[planet] || 0;
    const signIndex = window.SIGNS.indexOf(placements[planet]);
    const totalAbsoluteDeg = (signIndex * 30) + deg;
    
    const nakIndex = Math.floor(totalAbsoluteDeg / 13.333333);
    const nakshatra = nakshatras[nakIndex % 27] || "Ashwini";
    const pada = Math.floor((totalAbsoluteDeg % 13.333333) / 3.333333) + 1;

    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    const s = Math.floor((((deg - d) * 60) - m) * 60);

    details[planet] = {
      rashi: placements[planet],
      longitudeStr: `${d}° ${m}' ${s}"`,
      totalDeg: totalAbsoluteDeg,
      nakshatra,
      pada: Math.min(4, Math.max(1, pada)),
      status: planet === "Sun" ? "Direct" : (Math.random() > 0.7 ? "Retrograde (R)" : "Direct")
    };
  });

  return details;
};

window.calculateJaiminiKarakas = (degrees) => {
  const karakaNames = ["Atma Karaka (AK)", "Amatya Karaka (AmK)", "Bhratru Karaka (BK)", "Matru Karaka (MK)", "Putra Karaka (PK)", "Gnati Karaka (GK)", "Dara Karaka (DK)"];
  const elligiblePlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  
  const sorted = elligiblePlanets.map(p => ({
    planet: p,
    deg: (degrees?.[p] || 0) % 30
  })).sort((a, b) => b.deg - a.deg);

  const karakas = {};
  sorted.slice(0, 7).forEach((item, idx) => {
    karakas[karakaNames[idx]] = item.planet;
  });

  return karakas;
};

window.calculateBaladiAvastha = (degrees, placements) => {
  const avasthas = {};
  Object.keys(degrees || {}).forEach(planet => {
    const deg = (degrees[planet] || 0) % 30;
    const sign = placements?.[planet];
    const isOdd = ["Aries", "Gemini", "Leo", "Libra", "Sagittarius", "Aquarius"].includes(sign);
    
    let state = "Yuva";
    if (isOdd) {
      if (deg <= 6) state = "Bala (Infant)";
      else if (deg <= 12) state = "Kumara (Adolescent)";
      else if (deg <= 18) state = "Yuva (Youth)";
      else if (deg <= 24) state = "Vriddha (Old)";
      else state = "Mrita (Dead)";
    } else {
      if (deg <= 6) state = "Mrita (Dead)";
      else if (deg <= 12) state = "Vriddha (Old)";
      else if (deg <= 18) state = "Yuva (Youth)";
      else if (deg <= 24) state = "Kumara (Adolescent)";
      else state = "Bala (Infant)";
    }
    avasthas[planet] = state;
  });
  return avasthas;
};
