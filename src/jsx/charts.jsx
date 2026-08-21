// src/jsx/charts.jsx
var React = window.React;
const { useState } = window.React;

// --- 1. CORE KUNDALI CHART RENDERER ---
window.KundaliRenderer = ({ ac, ch, kpTable, style, titleDesc, isExpert }) => {
  if (!ac) return <div className="p-4 text-center text-xs t60">No Chart Data Available</div>;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center font-mono text-[10px] t60 border-b border-white/5 pb-2">
        <span>{titleDesc || "Natal Chart"}</span>
        <span className="uppercase text-amber-300">Style: {style}</span>
      </div>
      <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-2xl border border-white/5">
        <div className="text-center font-serif text-sm text-amber-200 mb-2">{ac.lagna} Lagna Chart</div>
        <div className="w-full max-w-[320px] aspect-square border border-amber-400/30 relative bg-black/60 rounded-xl p-2 flex flex-col justify-between shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[141%] h-[141%] border border-amber-400 rotate-45 absolute"></div>
            <div className="w-full h-full border border-amber-400 absolute"></div>
          </div>
          <div className="text-[10px] font-mono t8str z-10 text-center text-amber-300">
            Ascendant House: {ac.lagna} (Rashi Lord: {ac.lagnaLord || 'Sun'})
          </div>
          <div className="grid grid-cols-3 gap-1 z-10 text-[9px] font-mono text-center">
            {Object.entries(ac.houses || {}).map(([houseNum, sign]) => (
              <div key={houseNum} className="p-1.5 bg-white/5 border border-white/5 rounded">
                <div className="text-[8px] t40">H-{houseNum}</div>
                <div className="font-bold text-amber-200 truncate">{sign}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isExpert && kpTable && (
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-[10px] font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 t50 uppercase">
                <th className="pb-2">Planet</th>
                <th className="pb-2">Sign</th>
                <th className="pb-2">Nakshatra</th>
                <th className="pb-2">Sub Lord</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(kpTable).map(([p, info]) => (
                <tr key={p}>
                  <td className="py-1.5 font-bold" style={{ color: window.PLANET_INFO[p]?.color }}>{p}</td>
                  <td className="py-1.5 t80">{info.sign}</td>
                  <td className="py-1.5 t80">{info.nak}</td>
                  <td className="py-1.5 text-amber-200">{info.sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- 2. BIORHYTHM GRAPH MODULE ---
window.BiorhythmChart = ({ data, scores }) => {
  return (
    <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300">Biocycle Synchronization</span>
          <h3 className="font-serif text-base text-white mt-0.5">15-Day Local Time Wave</h3>
        </div>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="text-red-400">● Physical</span>
          <span className="text-blue-400">● Emotional</span>
          <span className="text-amber-400">● Intellectual</span>
        </div>
      </div>
      <div className="h-32 w-full bg-black/40 rounded-2xl border border-white/5 relative flex items-center justify-center p-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 100">
          <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
          <line x1="300" y1="0" x2="300" y2="100" stroke="rgba(255,255,255,0.2)" strokeDasharray="2" />
          <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (data.length - 1))} ${50 - d.P * 40}`).join(' ')} fill="none" stroke="#F87171" strokeWidth="2" />
          <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (data.length - 1))} ${50 - d.E * 40}`).join(' ')} fill="none" stroke="#60A5FA" strokeWidth="2" />
          <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (data.length - 1))} ${50 - d.I * 40}`).join(' ')} fill="none" stroke="#FBBF24" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2.5 bg-black/30 rounded-xl border border-red-500/20"><span className="t50 block text-[9px] uppercase">Physical</span><span className="text-red-400 font-bold text-sm">{scores.p}%</span></div>
        <div className="p-2.5 bg-black/30 rounded-xl border border-blue-500/20"><span className="t50 block text-[9px] uppercase">Emotional</span><span className="text-blue-400 font-bold text-sm">{scores.e}%</span></div>
        <div className="p-2.5 bg-black/30 rounded-xl border border-amber-500/20"><span className="t50 block text-[9px] uppercase">Intellectual</span><span className="text-amber-400 font-bold text-sm">{scores.i}%</span></div>
      </div>
    </div>
  );
};

// --- 3. ADVANCED CALCULATION HELPERS FOR REPORTS ---
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
