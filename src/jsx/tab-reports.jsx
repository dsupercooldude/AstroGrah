// src/jsx/tab-reports.jsx
var React = window.React;

window.ReportsTab = ({ pr, ch }) => {
  if (!ch || !ch.planetaryDegrees) return <div className="p-4 text-center text-sm t60">Calculating Astral Data...</div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};

  // Extract personalized planets for dynamic text
  const akPlanet = jaimini["Atmakaraka (Soul)"] || "Sun";
  const amkPlanet = jaimini["Amatyakaraka (Career)"] || "Moon";
  const dkPlanet = jaimini["Darakaraka (Spouse)"] || "Venus";

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
        <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs t85 leading-relaxed overflow-y-auto max-h-32 custom-scrollbar shadow-inner">
          <strong className="text-amber-400">The Cosmic GPS:</strong> This ledger tracks the precise mathematical location of each planet at the exact moment of birth. While millions of people share your Sun or Moon sign, your specific <strong>Nakshatra (Constellation)</strong> and <strong>Longitude</strong> create your highly unique personality blueprint. <em>Direct</em> motion means the planet's energy flows outward easily, while <em>Retrograde</em> suggests specific karmic lessons you must reflect upon.
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
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs t85 leading-relaxed overflow-y-auto max-h-40 custom-scrollbar shadow-inner">
            <strong className="text-amber-400 block mb-2">Your Personal Management Team:</strong>
            ● Your <strong>Atma Karaka (CEO)</strong> is <strong style={{ color: window.PLANET_INFO[akPlanet].color }}>{akPlanet}</strong>. This dictates your deepest soul purpose and primary karmic challenges this lifetime.<br/><br/>
            ● Your <strong>Amatya Karaka (Career)</strong> is <strong style={{ color: window.PLANET_INFO[amkPlanet].color }}>{amkPlanet}</strong>, which guides how you achieve success and wealth.<br/><br/>
            ● Your <strong>Dara Karaka (Partnership)</strong> is <strong style={{ color: window.PLANET_INFO[dkPlanet].color }}>{dkPlanet}</strong>, revealing the type of energy you attract in long-term relationships and marriage.
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
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs t85 leading-relaxed overflow-y-auto max-h-40 custom-scrollbar shadow-inner">
            <strong className="text-amber-400 block mb-2">Planetary Battery Life:</strong> 
            Avasthas reveal the maturity and operational capacity of your planets.<br/><br/>
            ● <strong>Yuva (Youth):</strong> The planet is operating at 100% peak vibrancy, delivering active and powerful results in your life.<br/><br/>
            ● <strong>Mrita (Dead) or Vriddha (Old):</strong> The planet's energy is currently dormant or fatigued. It requires patience, conscious effort, or spiritual remedies to successfully unlock its benefits.
          </div>
        </div>

      </div>
    </div>
  );
};
