// src/jsx/tab-reports.jsx
const React = window.React;

window.ReportsTab = ({ pr, ch }) => {
  if (!ch || !ch.planetaryDegrees) return <div className="p-4 text-center text-sm t60">Calculating Astral Data...</div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      
      {/* 1. PLANETARY LEDGER TABLE */}
      <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl flex flex-col">
        <h3 className="font-serif text-base text-amber-200 mb-4 flex items-center gap-2">
          <i className="ph ph-planet" style={{ fontSize: 20 }}></i> Detailed Planetary Ledger & Longitudes
        </h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 t50 text-[10px] uppercase">
                <th className="pb-3">Graha</th>
                <th className="pb-3">Rashi (Sign)</th>
                <th className="pb-3">Longitude</th>
                <th className="pb-3">Nakshatra (Pada)</th>
                <th className="pb-3">Motion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(details).map(([planet, data]) => {
                const pInfo = window.PLANET_INFO[planet];
                return (
                  <tr key={planet} className="hover:bg-white/5 transition">
                    <td className="py-3 font-bold" style={{ color: pInfo.color }}>{pInfo.symbol} {planet}</td>
                    <td className="py-3 t90">{data.rashi}</td>
                    <td className="py-3 text-amber-200">{data.longitudeStr}</td>
                    <td className="py-3 t80">{data.nakshatra} (P-{data.pada})</td>
                    <td className="py-3 t60 text-[10px]">{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Explanation Box */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-[11px] t60 leading-relaxed overflow-y-auto max-h-24 custom-scrollbar">
          <strong className="text-amber-400/80">The Cosmic GPS:</strong> This ledger tracks the precise mathematical location of each planet at the exact moment of birth. While many people share your Sun or Moon sign, your specific <strong>Nakshatra (Constellation)</strong> and <strong>Longitude</strong> create your highly unique personality blueprint. <em>Direct</em> motion means the planet's energy flows outward, while <em>Retrograde</em> suggests karmic lessons that are internalized and reflected upon.
        </div>
      </div>

      {/* 2. JAIMINI & AVASTHAS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* JAIMINI */}
        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl flex flex-col h-full">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Jaimini Chara Karakas</h3>
          <div className="space-y-2 font-mono text-xs mb-4 flex-grow">
            {Object.entries(jaimini).map(([karaka, planet]) => {
              const pInfo = window.PLANET_INFO[planet];
              return (
                <div key={karaka} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span className="t60">{karaka}</span>
                  <span className="font-bold" style={{ color: pInfo.color }}>{planet}</span>
                </div>
              );
            })}
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-[11px] t60 leading-relaxed overflow-y-auto max-h-24 custom-scrollbar">
            <strong className="text-amber-400/80">Life's Management Team:</strong> In Jaimini astrology, planets take on specific roles based on their exact degrees. The <strong>Atma Karaka (Highest Degree)</strong> is the "CEO" of your chart, representing your soul's main purpose. The <strong>Amatya Karaka</strong> guides your career and ambitions, while the <strong>Dara Karaka</strong> signifies your approach to partnerships and marriage.
          </div>
        </div>

        {/* AVASTHAS */}
        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl flex flex-col h-full">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Planetary Baladi Avasthas</h3>
          <div className="space-y-2 font-mono text-xs max-h-[220px] overflow-y-auto pr-1 mb-4 flex-grow custom-scrollbar">
            {Object.entries(avasthas).map(([planet, avastha]) => {
              const pInfo = window.PLANET_INFO[planet];
              return (
                <div key={planet} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span style={{ color: pInfo.color }} className="font-bold">{planet}</span>
                  <span className="t85 text-[11px]">{avastha}</span>
                </div>
              );
            })}
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-[11px] t60 leading-relaxed overflow-y-auto max-h-24 custom-scrollbar">
            <strong className="text-amber-400/80">Planetary Battery Life:</strong> Avasthas reveal the maturity and operational energy of your planets. <strong>Yuva (Youth)</strong> indicates a planet operating at peak vibrancy and delivering maximum results. <strong>Mrita (Dead)</strong> or <strong>Vriddha (Old)</strong> means the planet's energy is dormant or fatigued, requiring conscious effort, patience, or spiritual remedies to unlock its benefits.
          </div>
        </div>

      </div>
    </div>
  );
};
