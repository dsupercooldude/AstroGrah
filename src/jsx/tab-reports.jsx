// src/jsx/tab-reports.jsx
const React = window.React;

window.ReportsTab = ({ pr, ch }) => {
  if (!ch || !ch.planetaryDegrees) return <div className="p-4 text-center text-sm t60">Calculating Astral Data...</div>;

  // Safe evaluations fallback to empty objects if data is missing
  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      
      {/* 1. PLANETARY LEDGER TABLE */}
      <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl overflow-hidden">
        <h3 className="font-serif text-base text-amber-200 mb-4 flex items-center gap-2">
          <i className="ph ph-planet" style={{ fontSize: 20 }}></i> Detailed Planetary Ledger & Longitudes
        </h3>
        <div className="overflow-x-auto">
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
                // FALLBACK: Safe default object for Ascendant, Uranus, Neptune, Pluto
                const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa', symbol: '●' };
                return (
                  <tr key={planet} className="hover:bg-white/5 transition">
                    <td className="py-3 font-bold" style={{ color: pInfo.color }}>
                      {pInfo.symbol} {planet}
                    </td>
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
      </div>

      {/* 2. JAIMINI CHARA KARAKAS MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Jaimini Chara Karakas (7-Karak Scheme)</h3>
          <div className="space-y-2 font-mono text-xs">
            {Object.entries(jaimini).map(([karaka, planet]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa' };
              return (
                <div key={karaka} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span className="t60">{karaka}</span>
                  <span className="font-bold" style={{ color: pInfo.color }}>{planet}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. PLANETARY BALADI AVASTHAS */}
        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Planetary Baladi Avasthas (Maturity)</h3>
          <div className="space-y-2 font-mono text-xs max-h-[220px] overflow-y-auto pr-1">
            {Object.entries(avasthas).map(([planet, avastha]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa' };
              return (
                <div key={planet} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span style={{ color: pInfo.color }} className="font-bold">{planet}</span>
                  <span className="t85 text-[11px]">{avastha}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
