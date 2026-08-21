// src/jsx/pdf-report.jsx
var React = window.React;

window.GhostPDFReport = React.forwardRef(({ profile, ch, bioScores, date }, ref) => {
  if (!profile || !ch) return <div ref={ref} className="hidden"></div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", profile, ch, date) : "";
  const currentYear = date.getFullYear() + (date.getMonth() / 12);

  return (
    <div id="pdf-render-target" ref={ref} className="bg-[#0b0d19] text-[#F2EFE6] p-12 w-[900px] font-sans absolute -left-[9999px] top-0 hidden" style={{ minHeight: '1200px' }}>
      
      <div className="border-b border-amber-400/30 pb-6 mb-8 text-center">
        <h1 className="font-serif text-4xl text-amber-400 mb-2">Vedic Astrological Dossier</h1>
        <h2 className="text-2xl font-bold tracking-widest uppercase">{profile.name}</h2>
        <p className="text-sm t60 font-mono mt-2 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
          DOB: {profile.dob} | Time: {profile.time} | Location: {profile.place} <br/> Generated: {date.toDateString()}
        </p>
      </div>

      {overviewText && (
        <div className="mb-8 p-6 bg-[#121426] border border-white/10 rounded-2xl font-mono text-sm leading-relaxed text-amber-100 whitespace-pre-wrap">
          {overviewText.replace(/\[Graha Ledger.*?\]\n═════════════════════════════════════════════════════\n/, '')}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Natal Matrix</h3>
          <ul className="text-base space-y-3 font-mono">
            <li><span className="t60 inline-block w-32">Ascendant:</span> <span className="font-bold">{ch.d1.lagna}</span></li>
            <li><span className="t60 inline-block w-32">Moon Sign:</span> <span className="font-bold">{ch.moonSign}</span></li>
            <li><span className="t60 inline-block w-32">Sun Sign:</span> <span className="font-bold">{ch.sunSign}</span></li>
            <li><span className="t60 inline-block w-32">Nakshatra:</span> <span className="font-bold">{ch.nak} (Pada {ch.pada})</span></li>
            <li><span className="t60 inline-block w-32">Active Dasha:</span> <span className="text-amber-400 font-bold">{ch.dasha[0]?.lord}</span></li>
          </ul>
        </div>
        
        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Active Biorhythms</h3>
          <div className="space-y-4 font-mono text-base mt-4">
            <div>
              <div className="flex justify-between mb-1"><span className="text-red-400 uppercase tracking-widest text-[10px]">Physical</span><span>{Math.round(bioScores.p * 100)}%</span></div>
              <div className="h-2 bg-black/50 rounded"><div className="h-full bg-red-400 rounded" style={{width: `${Math.max(0, bioScores.p*100)}%`}}></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-blue-400 uppercase tracking-widest text-[10px]">Emotional</span><span>{Math.round(bioScores.e * 100)}%</span></div>
              <div className="h-2 bg-black/50 rounded"><div className="h-full bg-blue-400 rounded" style={{width: `${Math.max(0, bioScores.e*100)}%`}}></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-amber-400 uppercase tracking-widest text-[10px]">Intellectual</span><span>{Math.round(bioScores.i * 100)}%</span></div>
              <div className="h-2 bg-black/50 rounded"><div className="h-full bg-amber-400 rounded" style={{width: `${Math.max(0, bioScores.i*100)}%`}}></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
        <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Planetary Ledger</h3>
        <table className="w-full text-sm font-mono text-left">
          <thead>
            <tr className="t50 uppercase border-b border-white/10">
              <th className="pb-3">Graha</th><th className="pb-3">Sign</th><th className="pb-3">Longitude</th><th className="pb-3">Nakshatra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {Object.entries(details).map(([planet, data]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa', symbol: '●' };
              return (
                <tr key={planet}>
                  <td className="py-3 font-bold" style={{ color: pInfo.color }}>{pInfo.symbol} {planet}</td>
                  <td className="py-3 t90">{data.rashi}</td>
                  <td className="py-3 text-amber-200">{data.longitudeStr}</td>
                  <td className="py-3 t80">{data.nakshatra} (P-{data.pada})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8 page-break-before">
        <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Vimshottari Dasha Drilldown</h3>
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          {ch.dasha?.slice(0, 4).map((d, i) => {
            const isActive = currentYear >= d.start && currentYear < d.end;
            return (
              <div key={i} className={`p-4 border rounded-xl ${isActive ? 'bg-amber-400/10 border-amber-400/50' : 'bg-black/30 border-white/10'}`}>
                <div className={`font-bold mb-2 ${isActive ? 'text-amber-400 text-sm' : 'text-white'}`}>{d.lord} Mahadasha ({Math.floor(d.start)} - {Math.floor(d.end)})</div>
                <div className="space-y-1 pl-2 border-l border-white/20">
                  {window.getAntardashas && window.getAntardashas(d.lord, d.start, d.end).slice(0,5).map((a, j) => (
                    <div key={j} className="flex justify-between t80"><span>{a.lord} Antar</span><span>{Math.floor(a.start)}</span></div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
});
