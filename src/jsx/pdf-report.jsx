// src/jsx/pdf-report.jsx
var React = window.React;

window.GhostPDFReport = React.forwardRef(({ profile, ch, bioScores, date }, ref) => {
  if (!profile || !ch) return <div ref={ref} className="hidden"></div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};
  const avasthas = window.calculateBaladiAvastha ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) : {};
  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1?.lagna || "Aries", date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const deepSynthesis = window.generateDeepSynthesis ? window.generateDeepSynthesis(profile, ch, bioScores || {p:0,e:0,i:0}) : {};
  const dynamicRx = deepSynthesis.dynamicPrescription || {};
  
  const currentYear = date.getFullYear() + (date.getMonth() / 12);
  const activeDashaIdx = ch.dasha?.findIndex(d => currentYear >= d.start && currentYear < d.end) || 0;
  const displayDashas = ch.dasha?.slice(activeDashaIdx, activeDashaIdx + 4) || [];

  // Parse 12-Month Horoscope string into an array of lines
  const rawYearly = window.generateOfflineYearlyHoroscope ? window.generateOfflineYearlyHoroscope(profile, ch, date) : "";
  const yearlyMonths = rawYearly.split('\n\n').filter(line => line.trim().startsWith('•')).map(line => line.replace('•', '').trim());

  // Biorhythm Math
  const formatBio = (val) => Math.round(((val + 1) / 2) * 100);
  const [Y, M, D] = profile.dob.split("-").map(Number);
  const eD = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0) - ((profile.utcOffset || 0) * 3600000) - (Date.UTC(Y, M - 1, D, 12, 0, 0) - ((profile.utcOffset || 0) * 3600000))) / 86400000;
  
  const getWave = (cycle) => {
    let path = "";
    for(let day = -15; day <= 15; day++) {
      const x = ((day + 15) / 30) * 100;
      const y = 20 - (Math.sin((2 * Math.PI * (eD + day)) / cycle) * 20);
      path += `${day === -15 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return path;
  };

  // Personalization Extraction
  const akPlanet = jaimini["Atma Karaka (AK)"] || "Sun";
  const amkPlanet = jaimini["Amatya Karaka (AmK)"] || "Moon";
  const peakPlanets = Object.entries(avasthas).filter(([p, a]) => a.includes("Yuva") || a.includes("Kumara")).map(([p]) => p);
  const weakPlanets = Object.entries(avasthas).filter(([p, a]) => a.includes("Mrita") || a.includes("Vriddha")).map(([p]) => p);

  return (
    <div id="pdf-render-target" ref={ref} className="absolute hidden">
      
      {/* ========================================== */}
      {/* PAGE 1: EXECUTIVE SUMMARY & SYNTHESIS      */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <div className="border-b border-amber-400/30 pb-6 mb-8 text-center">
          <h1 className="font-serif text-4xl text-amber-400 mb-2">Vedic Astrological Dossier</h1>
          <h2 className="text-2xl font-bold tracking-widest uppercase">{profile.name}</h2>
          <p className="text-sm t60 font-mono mt-2 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
            DOB: {profile.dob} | Time: {profile.time} | Location: {profile.place} <br/> 
            Generated: {date.toDateString()}
          </p>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-2xl text-amber-200 mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
            <i className="ph ph-sparkle text-amber-400"></i> The Jyotish Core Synthesis
          </h3>
          <div className="space-y-4 text-sm t85 leading-relaxed font-mono">
            <p><strong>The Core Self:</strong> {deepSynthesis.basicKundali}</p>
            <p><strong>Time & Cycles:</strong> {deepSynthesis.basicDasha}</p>
            <p><strong>Energy & Power:</strong> {deepSynthesis.basicPower}</p>
          </div>
        </div>

        <div className="flex gap-6 mb-8">
          <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Natal Matrix Highlights</h3>
            <ul className="text-sm space-y-3 font-mono">
              <li><span className="t60 inline-block w-28">Ascendant:</span> <span className="font-bold">{ch.d1.lagna}</span></li>
              <li><span className="t60 inline-block w-28">Moon Sign:</span> <span className="font-bold">{ch.moonSign}</span></li>
              <li><span className="t60 inline-block w-28">Sun Sign:</span> <span className="font-bold">{ch.sunSign}</span></li>
              <li><span className="t60 inline-block w-28">Nakshatra:</span> <span className="font-bold">{ch.nak}</span></li>
            </ul>
          </div>
          
          <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Dynamic Prescriptions</h3>
            <ul className="text-sm space-y-3 font-mono">
              <li><span className="t60 inline-block w-24">Deity:</span> <span className="font-bold">{dynamicRx.deity}</span></li>
              <li><span className="t60 inline-block w-24">Gemstone:</span> <span className="font-bold">{dynamicRx.gem}</span></li>
              <li><span className="t60 inline-block w-24">Charity:</span> <span className="font-bold">{dynamicRx.charity}</span></li>
            </ul>
            <div className="mt-3 text-[10px] text-amber-400 bg-black/30 p-2 rounded">Mantra: {dynamicRx.mantra}</div>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 2: CHARTS & ENERGY CYCLES             */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Astrological Charts & Energy Cycles</h3>
        
        <div className="flex gap-6 mb-8">
          <div className="flex-1 bg-[#121426] p-4 rounded-2xl border border-white/10 flex flex-col items-center">
            {window.KundaliRenderer && <window.KundaliRenderer ac={ch.d1} ch={ch} kpTable={null} style="NORTH" isExpert={false} titleDesc="North Indian (Diamond)" />}
          </div>
          <div className="flex-1 bg-[#121426] p-4 rounded-2xl border border-white/10 flex flex-col items-center">
            {window.KundaliRenderer && <window.KundaliRenderer ac={ch.d1} ch={ch} kpTable={null} style="SOUTH" isExpert={false} titleDesc="South Indian (Grid)" />}
          </div>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">30-Day Biorhythm Progression</h3>
          <div className="flex justify-between items-center mb-6 font-mono">
            <div className="text-center"><div className="text-[10px] text-red-400">PHYSICAL</div><div className="text-2xl font-bold">{formatBio(bioScores.p)}%</div></div>
            <div className="text-center"><div className="text-[10px] text-blue-400">EMOTIONAL</div><div className="text-2xl font-bold">{formatBio(bioScores.e)}%</div></div>
            <div className="text-center"><div className="text-[10px] text-amber-400">INTELLECTUAL</div><div className="text-2xl font-bold">{formatBio(bioScores.i)}%</div></div>
          </div>
          <div className="relative w-full h-40 bg-gradient-to-b from-black/40 to-black/10 rounded-xl border border-white/10 p-2">
            <svg viewBox="0 -10 100 60" preserveAspectRatio="none" className="w-full h-full opacity-80 overflow-visible">
              <line x1="0" y1="20" x2="100" y2="20" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d={getWave(23)} fill="none" stroke="#F87171" strokeWidth="2" />
              <path d={getWave(28)} fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,2" />
              <path d={getWave(33)} fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6,3" />
              <line x1="50" y1="-10" x2="50" y2="50" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-black/60 px-2 rounded border border-white/20">TODAY</div>
          </div>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Shadbala (Planetary Strength)</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(ch.shadbala || {}).sort((a,b)=>b[1]-a[1]).map(([planet, score]) => {
              const pInfo = window.PLANET_INFO[planet]; const percentage = Math.min(100, (score / 600) * 100);
              return (
                <div key={planet} className="relative bg-black/20 p-3 rounded-lg border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-1"><span className="font-bold flex items-center gap-1" style={{ color: pInfo?.color }}>{pInfo?.symbol} {planet}</span><span className="t85">{(score / 60).toFixed(1)} Rupas</span></div>
                  <div className="h-2 bg-black/50 rounded-full"><div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: pInfo?.color }}></div></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* PAGE 3: ASTROLOGICAL DATA & GOCHARA        */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Advanced Planetary Framework</h3>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Detailed Planetary Ledger</h3>
          <table className="w-full text-sm font-mono text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="t50 uppercase border-b border-white/10">
                <th className="pb-3">Graha</th><th className="pb-3">Sign</th><th className="pb-3">Longitude</th><th className="pb-3">Nakshatra (Pada)</th><th className="pb-3">Motion</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(details).map(([planet, data]) => {
                const pInfo = window.PLANET_INFO[planet] || { color: '#FFF' };
                return (
                  <tr key={planet} className="border-b border-white/5">
                    <td className="py-3 font-bold" style={{ color: pInfo.color }}>{pInfo.symbol} {planet}</td>
                    <td className="py-3 t90">{data.rashi}</td>
                    <td className="py-3 text-amber-200">{data.longitudeStr}</td>
                    <td className="py-3 t80">{data.nakshatra} ({data.pada})</td>
                    <td className="py-3 t60 text-[10px]">{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-6 mb-8">
          <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Jaimini Chara Karakas</h3>
            <div className="space-y-3 font-mono text-xs mb-4">
              {Object.entries(jaimini).map(([karaka, planet]) => (
                <div key={karaka} className="flex justify-between p-2 bg-black/20 rounded border border-white/5"><span className="t60">{karaka}</span><span className="font-bold" style={{ color: window.PLANET_INFO[planet]?.color }}>{planet}</span></div>
              ))}
            </div>
            <div className="text-[10px] t85 leading-relaxed font-mono bg-black/30 p-3 rounded">
              Your Soul Purpose (Atma Karaka) is heavily influenced by <strong>{akPlanet}</strong>, while your worldly Career Guide (Amatya Karaka) is directed by <strong>{amkPlanet}</strong>.
            </div>
          </div>
          
          <div className="flex-1 bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Baladi Avasthas (Maturity)</h3>
            <div className="space-y-3 font-mono text-xs mb-4">
              {Object.entries(avasthas).map(([planet, avastha]) => (
                <div key={planet} className="flex justify-between p-2 bg-black/20 rounded border border-white/5"><span className="font-bold" style={{ color: window.PLANET_INFO[planet]?.color }}>{planet}</span><span className="t85">{avastha}</span></div>
              ))}
            </div>
            <div className="text-[10px] t85 leading-relaxed font-mono bg-black/30 p-3 rounded">
              {peakPlanets.length > 0 ? `Your ${peakPlanets.join(", ")} operates at peak youth (Yuva).` : "No planets at peak youth."} {weakPlanets.length > 0 ? `However, ${weakPlanets.join(", ")} is fatigued and requires remedy.` : "Your cosmic battery is well charged."}
            </div>
          </div>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Current Gochara (Transit) Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(gochara).map(([domain, data]) => (
              <div key={domain} className="p-4 bg-black/20 rounded-xl border border-white/5">
                <div className="flex justify-between text-xs font-mono mb-2"><span className="font-bold text-amber-100 capitalize">{domain.replace(/([A-Z])/g, ' $1').trim()}</span><span className="t85 font-bold">{Math.round(data.sc)}/100</span></div>
                <div className="h-1 bg-black/50 rounded-full mb-3"><div className="h-full rounded-full bg-amber-500" style={{ width: `${data.sc}%` }}></div></div>
                <div className="text-[10px] t60 font-mono leading-relaxed">{data.text}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 4: FORECASTING & TIMELINES            */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Forecasting & Timelines</h3>
        
        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Vimshottari Dasha Drilldown</h3>
          <div className="flex flex-wrap gap-4 font-mono text-xs">
            {displayDashas.map((d, i) => {
              const isActive = currentYear >= d.start && currentYear < d.end;
              return (
                <div key={i} className={`p-4 border rounded-xl ${isActive ? 'bg-amber-400/10 border-amber-400/50' : 'bg-black/30 border-white/10'}`} style={{ width: 'calc(50% - 8px)' }}>
                  <div className={`font-bold mb-2 ${isActive ? 'text-amber-400 text-sm' : 'text-white'}`}>
                    {d.lord} Mahadasha ({Math.floor(d.start)} - {Math.floor(d.end)})
                  </div>
                  <div className="space-y-2 pl-2 border-l border-white/20">
                    {window.getAntardashas && window.getAntardashas(d.lord, d.start, d.end).slice(0, 5).map((a, j) => (
                      <div key={j} className="flex justify-between t80"><span>{a.lord} Antar</span><span>{Math.floor(a.start)}</span></div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">12-Month Deterministic Horoscope</h3>
          <div className="grid grid-cols-2 gap-4">
            {yearlyMonths.slice(0, 12).map((monthText, idx) => {
              const [monthName, ...descParts] = monthText.split(':');
              return (
                <div key={idx} className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="font-bold text-amber-300 font-mono text-sm mb-2">{monthName}</div>
                  <div className="text-xs t85 leading-relaxed font-mono">{descParts.join(':').trim()}</div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

    </div>
  );
});
