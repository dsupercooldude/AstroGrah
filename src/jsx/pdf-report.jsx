// src/jsx/pdf-report.jsx
var React = window.React;

window.GhostPDFReport = React.forwardRef(({ profile, ch, bioScores, date }, ref) => {
  if (!profile || !ch) return <div ref={ref} className="hidden"></div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};
  
  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1?.lagna || "Aries", date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", profile, ch, date) : "";
  
  const currentYear = date.getFullYear() + (date.getMonth() / 12);

  // Safely format the sine wave percentages (-1 to +1 -> 0% to 100%)
  const formatBio = (val) => Math.round(((val + 1) / 2) * 100);

  return (
    <div 
      id="pdf-render-target" 
      ref={ref} 
      className="bg-[#0b0d19] text-[#F2EFE6] p-12 w-[900px] font-sans absolute top-0 hidden" 
      style={{ minHeight: '1200px' }}
    >
      
      {/* 1. REPORT HEADER */}
      <div className="border-b border-amber-400/30 pb-6 mb-8 text-center">
        <h1 className="font-serif text-4xl text-amber-400 mb-2">Vedic Astrological Dossier</h1>
        <h2 className="text-2xl font-bold tracking-widest uppercase">{profile.name}</h2>
        <p className="text-sm t60 font-mono mt-2 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
          DOB: {profile.dob} | Time: {profile.time} | Location: {profile.place} <br/> 
          Generated: {date.toDateString()}
        </p>
      </div>

      {/* 2. ENTERPRISE AI SYNTHESIS */}
      {overviewText && (
        <div className="mb-8 p-6 bg-[#121426] border border-white/10 rounded-2xl font-mono text-sm leading-relaxed text-amber-100 whitespace-pre-wrap">
          {overviewText.replace(/\[Graha Ledger.*?\]\n═════════════════════════════════════════════════════\n/, '')}
        </div>
      )}

      {/* 3. NATAL MATRIX & BIORHYTHMS (FLEXBOX LAYOUT) */}
      <div className="flex flex-row justify-between gap-6 mb-8 w-full">
        
        {/* NATAL MATRIX */}
        <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
            Natal Matrix
          </h3>
          <ul className="text-base space-y-3 font-mono">
            <li>
              <span className="t60 inline-block w-32">Ascendant:</span> 
              <span className="font-bold">{ch.d1.lagna}</span>
            </li>
            <li>
              <span className="t60 inline-block w-32">Moon Sign:</span> 
              <span className="font-bold">{ch.moonSign}</span>
            </li>
            <li>
              <span className="t60 inline-block w-32">Sun Sign:</span> 
              <span className="font-bold">{ch.sunSign}</span>
            </li>
            <li>
              <span className="t60 inline-block w-32">Nakshatra:</span> 
              <span className="font-bold">{ch.nak} (Pada {ch.pada})</span>
            </li>
            <li>
              <span className="t60 inline-block w-32">Active Dasha:</span> 
              <span className="text-amber-400 font-bold">{ch.dasha[0]?.lord}</span>
            </li>
          </ul>
        </div>
        
        {/* ACTIVE BIORHYTHMS */}
        <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
            Active Biorhythms
          </h3>
          <div className="space-y-4 font-mono text-base mt-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-red-400 uppercase tracking-widest text-[10px]">Physical</span>
                <span>{formatBio(bioScores.p)}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded">
                <div className="h-full bg-red-400 rounded" style={{width: `${formatBio(bioScores.p)}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-blue-400 uppercase tracking-widest text-[10px]">Emotional</span>
                <span>{formatBio(bioScores.e)}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded">
                <div className="h-full bg-blue-400 rounded" style={{width: `${formatBio(bioScores.e)}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-amber-400 uppercase tracking-widest text-[10px]">Intellectual</span>
                <span>{formatBio(bioScores.i)}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded">
                <div className="h-full bg-amber-400 rounded" style={{width: `${formatBio(bioScores.i)}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PLANETARY LEDGER TABLE */}
      <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8 w-full">
        <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
          Detailed Planetary Ledger
        </h3>
        <table className="w-full text-sm font-mono text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="t50 uppercase border-b border-white/10">
              <th className="pb-3">Graha</th>
              <th className="pb-3">Sign</th>
              <th className="pb-3">Longitude</th>
              <th className="pb-3">Nakshatra</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(details).map(([planet, data]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa', symbol: '●' };
              return (
                <tr key={planet} className="border-b border-white/5">
                  <td className="py-3 font-bold" style={{ color: pInfo.color }}>
                    {pInfo.symbol} {planet}
                  </td>
                  <td className="py-3 t90">{data.rashi}</td>
                  <td className="py-3 text-amber-200">{data.longitudeStr}</td>
                  <td className="py-3 t80">{data.nakshatra} (P-{data.pada})</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 5. JAIMINI & AVASTHAS (FLEXBOX LAYOUT) */}
      <div className="flex flex-row justify-between gap-6 mb-8 w-full">
        
        {/* JAIMINI */}
        <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
            Jaimini Chara Karakas
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(jaimini).map(([karaka, planet]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#fff' };
              return (
                <div key={karaka} className="flex justify-between p-3 bg-black/20 rounded-lg border border-white/5">
                  <span className="t60">{karaka}</span>
                  <span className="font-bold text-sm" style={{ color: pInfo.color }}>{planet}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* AVASTHAS */}
        <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
            Baladi Avasthas (Maturity)
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(avasthas).map(([planet, avastha]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#fff' };
              return (
                <div key={planet} className="flex justify-between p-3 bg-black/20 rounded-lg border border-white/5">
                  <span className="font-bold text-sm" style={{ color: pInfo.color }}>{planet}</span>
                  <span className="t85">{avastha}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. GOCHARA TRANSITS (FLEXBOX GRID REPLACEMENT) */}
      <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8 w-full">
        <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
          Gochara (Transit) Impact
        </h3>
        <div className="flex flex-row flex-wrap gap-4">
          {Object.entries(gochara).map(([domain, data]) => (
            <div key={domain} className="p-4 bg-black/20 rounded-xl border border-white/5" style={{ width: 'calc(50% - 8px)' }}>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="font-bold text-amber-100 capitalize">
                  {domain.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="t85 font-bold">{Math.round(data.sc)}/100</span>
              </div>
              <div className="h-1 bg-black/50 rounded-full mb-3">
                <div className="h-full rounded-full bg-amber-500" style={{ width: `${data.sc}%` }}></div>
              </div>
              <div className="text-[10px] t60 font-mono leading-relaxed">
                {data.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. VIMSHOTTARI DASHA DRILLDOWN */}
      <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8 w-full page-break-before">
        <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">
          Vimshottari Dasha Drilldown
        </h3>
        <div className="flex flex-row flex-wrap gap-4 font-mono text-xs">
          {ch.dasha?.slice(0, 4).map((d, i) => {
            const isActive = currentYear >= d.start && currentYear < d.end;
            return (
              <div key={i} className={`p-4 border rounded-xl ${isActive ? 'bg-amber-400/10 border-amber-400/50' : 'bg-black/30 border-white/10'}`} style={{ width: 'calc(50% - 8px)' }}>
                <div className={`font-bold mb-2 ${isActive ? 'text-amber-400 text-sm' : 'text-white'}`}>
                  {d.lord} Mahadasha ({Math.floor(d.start)} - {Math.floor(d.end)})
                </div>
                <div className="space-y-1 pl-2 border-l border-white/20">
                  {window.getAntardashas && window.getAntardashas(d.lord, d.start, d.end).slice(0, 5).map((a, j) => (
                    <div key={j} className="flex justify-between t80">
                      <span>{a.lord} Antar</span>
                      <span>{Math.floor(a.start)}</span>
                    </div>
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
