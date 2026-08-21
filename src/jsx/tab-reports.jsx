// src/jsx/tab-reports.jsx
var React = window.React;

window.ReportsTab = ({ pr, ch }) => {
  if (!ch || !ch.planetaryDegrees) return <div className="p-4 text-center text-sm t60">Calculating Astral Data...</div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};

  // FIX: Accurate Keys mapping directly to calculateJaiminiKarakas output!
  const akPlanet = jaimini["Atma Karaka (AK)"] || "Sun";
  const amkPlanet = jaimini["Amatya Karaka (AmK)"] || "Moon";
  const dkPlanet = jaimini["Dara Karaka (DK)"] || "Venus";

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl flex flex-col h-full">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Jaimini Chara Karakas</h3>
          <div className="space-y-2 font-mono text-xs mb-4 flex-grow">
            {Object.entries(jaimini).map(([karaka, planet]) => (
                <div key={karaka} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span className="t60">{karaka}</span><span className="font-bold" style={{ color: window.PLANET_INFO[planet]?.color }}>{planet}</span>
                </div>
            ))}
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs t85 leading-relaxed shadow-inner">
            <strong className="text-amber-400 block mb-2">Deep Karmic Mission:</strong>
            Because your highest degree planet is <strong style={{ color: window.PLANET_INFO[akPlanet]?.color }}>{akPlanet}</strong>, your ultimate soul purpose (Atma Karaka) in this lifetime revolves around {akPlanet === "Sun" ? "mastering leadership and ego." : akPlanet === "Moon" ? "emotional intelligence and public care." : akPlanet === "Mars" ? "courage and protecting others." : akPlanet === "Mercury" ? "intellectual logic and communication." : akPlanet === "Jupiter" ? "wisdom, teaching, and ethics." : akPlanet === "Venus" ? "diplomacy, aesthetics, and relationships." : "structured discipline and massive endurance."}<br/><br/>
            Your Career Guide (Amatya Karaka) is <strong style={{ color: window.PLANET_INFO[amkPlanet]?.color }}>{amkPlanet}</strong>, meaning you achieve greatest worldly success through {amkPlanet === "Mercury" ? "rapid analytical thinking and commerce." : amkPlanet === "Venus" ? "client relationship management." : amkPlanet === "Saturn" ? "heavy administrative workloads." : "innate talents."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bgcard p-5 shadow-xl flex flex-col h-full">
          <h3 className="font-serif text-sm text-amber-200 mb-3">Planetary Baladi Avasthas</h3>
          <div className="space-y-2 font-mono text-xs max-h-[220px] overflow-y-auto pr-1 mb-4 flex-grow custom-scrollbar">
            {Object.entries(avasthas).map(([planet, avastha]) => (
                <div key={planet} className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                  <span style={{ color: window.PLANET_INFO[planet]?.color }} className="font-bold">{planet}</span><span className="t85 text-[11px]">{avastha}</span>
                </div>
            ))}
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs t85 leading-relaxed shadow-inner">
            <strong className="text-amber-400 block mb-2">Planetary Battery Life (Maturity):</strong> 
            Avasthas act like a cosmic battery indicator.<br/><br/>
            Planets in <strong>Yuva (Youth)</strong> operate at 100% peak vibrancy, delivering undeniable results. Planets in <strong>Mrita (Dead)</strong> or <strong>Vriddha (Old)</strong> are exhausted; they require specific gemstone/mantra remediation to unlock their promised chart benefits.
          </div>
        </div>
      </div>
    </div>
  );
};
