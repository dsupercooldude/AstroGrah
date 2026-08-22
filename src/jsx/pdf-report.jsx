// src/jsx/pdf-report.jsx
var React = window.React;

window.GhostPDFReport = React.forwardRef(({ profile, ch, bioScores, date }, ref) => {
  if (!profile || !ch) return <div ref={ref} className="hidden"></div>;

  const details = window.calculatePlanetaryDetails 
    ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) 
    : {};
    
  const jaimini = window.calculateJaiminiKarakas 
    ? window.calculateJaiminiKarakas(ch.planetaryDegrees) 
    : {};
    
  const avasthas = window.calculateBaladiAvastha 
    ? window.calculateBaladiAvastha(ch.planetaryDegrees, ch.d1?.placements || {}) 
    : {};
    
  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara 
    ? window.generateDeepGochara(ch, ch.d1?.lagna || "Aries", date, weekday, bioScores || { p: 0, e: 0, i: 0 }) 
    : {};
    
  const deepSynthesis = window.generateDeepSynthesis 
    ? window.generateDeepSynthesis(profile, ch, bioScores || {p:0,e:0,i:0}, date) 
    : {};
    
  const dynamicRx = deepSynthesis.dynamicPrescription || {};
  
  const currentYear = date.getFullYear() + (date.getMonth() / 12);
  const activeDashaIdx = ch.dasha?.findIndex(d => currentYear >= d.start && currentYear < d.end) || 0;
  const displayDashas = ch.dasha?.slice(activeDashaIdx, activeDashaIdx + 4) || [];

  const yearlyForecast = window.getYearlyForecastData 
    ? window.getYearlyForecastData(profile, ch, date) 
    : [];

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

  const akPlanet = jaimini["Atma Karaka (AK)"] || "Sun";
  const amkPlanet = jaimini["Amatya Karaka (AmK)"] || "Moon";

  return (
    <div id="pdf-render-target" ref={ref} className="fixed top-0 -left-[20000px] hidden flex-col gap-10 bg-[#0b0d19] z-[-9999]">
      
      {/* ========================================== */}
      {/* PAGE 1: EXECUTIVE SUMMARY                  */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <div className="border-b border-amber-400/30 pb-6 mb-8 text-center">
          <h1 className="font-serif text-4xl text-amber-400 mb-2">Vedic Astrological Dossier</h1>
          <h2 className="text-2xl font-bold tracking-widest uppercase">{profile.name}</h2>
          <p className="text-sm text-white/60 font-mono mt-2 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
            DOB: {profile.dob} | Time: {profile.time} | Location: {profile.place} <br/> 
            Generated: {date.toLocaleDateString()}
          </p>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-2xl text-amber-200 mb-4 border-b border-white/10 pb-2">
            The Jyotish Core Synthesis
          </h3>
          <div className="space-y-4 text-sm text-white/80 leading-relaxed font-mono">
            <p><strong>The Core Self:</strong> {deepSynthesis.basicKundali}</p>
            <p><strong>Time & Cycles:</strong> {deepSynthesis.basicDasha}</p>
            <p><strong>Energy & Power:</strong> {deepSynthesis.basicPower}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Natal Matrix Highlights</h3>
            <ul className="text-sm space-y-3 font-mono">
              <li><span className="text-white/60 inline-block w-28">Ascendant:</span> <span className="font-bold">{ch.d1.lagna}</span></li>
              <li><span className="text-white/60 inline-block w-28">Moon Sign:</span> <span className="font-bold">{ch.moonSign}</span></li>
              <li><span className="text-white/60 inline-block w-28">Sun Sign:</span> <span className="font-bold">{ch.sunSign}</span></li>
              <li><span className="text-white/60 inline-block w-28">Nakshatra:</span> <span className="font-bold">{ch.nak}</span></li>
            </ul>
          </div>
          
          <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg text-amber-200 mb-3 border-b border-white/10 pb-2">Dynamic Prescriptions</h3>
            <ul className="text-sm space-y-3 font-mono">
              <li><span className="text-white/60 inline-block w-24">Deity:</span> <span className="font-bold">{dynamicRx.deity}</span></li>
              <li><span className="text-white/60 inline-block w-24">Gemstone:</span> <span className="font-bold">{dynamicRx.gem}</span></li>
              <li><span className="text-white/60 inline-block w-24">Charity:</span> <span className="font-bold">{dynamicRx.charity}</span></li>
            </ul>
            <div className="mt-4 text-[11px] text-amber-400 bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-white/60 block mb-1 uppercase text-[10px]">Active Mantra:</span> {dynamicRx.mantra}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 2: ASTROLOGICAL CHARTS & BIORHYTHMS   */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Astrological Charts & Energy Cycles</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-[#121426] p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
            {window.KundaliRenderer && <window.KundaliRenderer ac={ch.d1} ch={ch} kpTable={null} style="NORTH" isExpert={false} titleDesc="North Indian (Diamond)" />}
          </div>
          <div className="bg-[#121426] p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
            {window.KundaliRenderer && <window.KundaliRenderer ac={ch.d1} ch={ch} kpTable={null} style="SOUTH" isExpert={false} titleDesc="South Indian (Grid)" />}
          </div>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">30-Day Biorhythm Progression</h3>
          
          <p className="text-xs text-white/80 leading-relaxed font-mono mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
            {deepSynthesis.pdfBiorhythm}
          </p>

          <div className="flex justify-between items-center mb-6 font-mono px-10">
            <div className="text-center">
              <div className="text-[10px] text-red-400 mb-1">PHYSICAL</div>
              <div className="text-2xl font-bold">{formatBio(bioScores.p)}%</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-blue-400 mb-1">EMOTIONAL</div>
              <div className="text-2xl font-bold">{formatBio(bioScores.e)}%</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-amber-400 mb-1">INTELLECTUAL</div>
              <div className="text-2xl font-bold">{formatBio(bioScores.i)}%</div>
            </div>
          </div>

          <div className="relative w-full h-32 bg-gradient-to-b from-black/40 to-black/10 rounded-xl border border-white/10 p-2">
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

      </div>

      {/* ========================================== */}
      {/* PAGE 3: PLANETARY LEDGER & SHADBALA        */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Planetary Alignments & Strengths</h3>
        
        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Detailed Planetary Ledger</h3>
          <p className="text-xs text-white/80 leading-relaxed font-mono mb-4 bg-black/30 p-4 rounded-xl border border-white/5">
            This ledger records the precise mathematical coordinates of the celestial bodies at your exact moment of birth. It serves as the foundational data for all astrological predictions.
          </p>
          <table className="w-full text-sm font-mono text-left border-collapse">
            <thead>
              <tr className="text-white/50 uppercase border-b border-white/10 text-xs">
                <th className="pb-3">Graha</th>
                <th className="pb-3">Sign</th>
                <th className="pb-3">Longitude</th>
                <th className="pb-3">Nakshatra (Pada)</th>
                <th className="pb-3">Motion</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(details).map(([planet, data]) => {
                const pInfo = window.PLANET_INFO[planet] || { color: '#FFF' };
                return (
                  <tr key={planet} className="border-b border-white/5">
                    <td className="py-3 font-bold" style={{ color: pInfo.color }}>{pInfo.symbol} {planet}</td>
                    <td className="py-3 text-white/90">{data.rashi}</td>
                    <td className="py-3 text-amber-200">{data.longitudeStr}</td>
                    <td className="py-3 text-white/80">{data.nakshatra} ({data.pada})</td>
                    <td className="py-3 text-white/60 text-[10px]">{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Shadbala (Planetary Strength)</h3>
          <p className="text-xs text-white/80 leading-relaxed font-mono mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
            {deepSynthesis.pdfShadbala}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(ch.shadbala || {}).sort((a,b)=>b[1]-a[1]).map(([planet, score]) => {
              const pInfo = window.PLANET_INFO[planet]; 
              const percentage = Math.min(100, (score / 600) * 100);
              return (
                <div key={planet} className="relative bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="font-bold flex items-center gap-1" style={{ color: pInfo?.color }}>
                      {pInfo?.symbol} {planet}
                    </span>
                    <span className="text-white/80 font-bold">{(score / 60).toFixed(1)} Rupas</span>
                  </div>
                  <div className="h-[8px] bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: pInfo?.color }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 4: JAIMINI KARAKAS                    */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Jaimini Chara Karakas (Karmic Blueprint)</h3>
        
        <p className="text-sm text-white/80 leading-relaxed font-mono mb-8 bg-[#121426] p-6 rounded-xl border border-white/10">
          In Jaimini Astrology, planets are assigned roles (Karakas) based on their exact mathematical degrees. Your highest degree planet becomes the Atma Karaka (Soul), governing your overarching life purpose, while lower degree planets govern career, relationships, and obstacles.
        </p>

        <div className="space-y-4">
          {Object.entries(jaimini).map(([karaka, planet]) => (
            <div key={karaka} className="bg-[#121426] p-5 rounded-xl border border-white/10 flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold text-amber-200 font-mono text-sm">{karaka}</span>
                <span className="font-bold text-lg" style={{ color: window.PLANET_INFO[planet]?.color }}>{planet}</span>
              </div>
              <div className="text-sm text-white/70 font-mono">
                {deepSynthesis.karakaMeanings[karaka]}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 5: BALADI AVASTHAS                    */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Baladi Avasthas (Planetary Maturity)</h3>
        
        <p className="text-sm text-white/80 leading-relaxed font-mono mb-8 bg-[#121426] p-6 rounded-xl border border-white/10">
          Just because a planet is placed well does not mean it can deliver results. Baladi Avasthas determine the "age" or "maturity" of a planet based on its degrees within a sign. A planet in "Youth" is highly potent, while a planet that is "Dead" requires intense conscious remediation.
        </p>

        <div className="space-y-4">
          {Object.entries(avasthas).map(([planet, avastha]) => (
            <div key={planet} className="bg-[#121426] p-5 rounded-xl border border-white/10 flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold text-lg" style={{ color: window.PLANET_INFO[planet]?.color }}>{planet}</span>
                <span className="font-bold text-amber-200 font-mono text-sm">{avastha}</span>
              </div>
              <div className="text-sm text-white/70 font-mono">
                {deepSynthesis.avasthaMeanings[avastha]}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 6: CURRENT GOCHARA                    */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Real-Time Gochara (Transit) Impact</h3>
        
        <p className="text-sm text-white/80 leading-relaxed font-mono mb-8 bg-[#121426] p-6 rounded-xl border border-white/10">
          While your birth chart is a fixed static map, Gochara translates the real-time movement of the planets in the sky <strong>today</strong> against that fixed map. These transits indicate immediate weekly outcomes and shift as the planets continue to orbit.
        </p>

        <div className="flex flex-col gap-6">
          {Object.entries(gochara).map(([domain, data]) => (
            <div key={domain} className="bg-[#121426] p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-amber-200 font-serif text-xl capitalize">{domain.replace(/([A-Z])/g, ' $1').trim()} Sphere</span>
                <span className="text-amber-400 font-mono font-bold text-lg">{Math.round(data.sc)}/100</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full mb-4 overflow-hidden border border-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${data.sc}%` }}></div>
              </div>
              <div className="text-sm text-white/80 font-mono leading-relaxed">
                {data.text}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 7: VIMSHOTTARI DASHA TIMELINE         */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">Vimshottari Dasha Timeline</h3>
        
        <div className="bg-[#121426] p-6 rounded-2xl border border-white/10 h-full">
          <h3 className="font-serif text-xl text-amber-200 mb-4 border-b border-white/10 pb-2">Your Active Operating System</h3>
          
          <p className="text-sm text-white/80 leading-relaxed font-mono mb-8 bg-black/30 p-5 rounded-xl border border-white/5">
            {deepSynthesis.pdfDasha}
          </p>

          <div className="grid grid-cols-2 gap-6 font-mono text-xs">
            {displayDashas.map((d, i) => {
              const isActive = currentYear >= d.start && currentYear < d.end;
              return (
                <div key={i} className={`p-5 border rounded-xl ${isActive ? 'bg-amber-400/10 border-amber-400/50 shadow-lg shadow-amber-500/10' : 'bg-black/30 border-white/10 opacity-70'}`}>
                  <div className={`font-bold mb-3 ${isActive ? 'text-amber-400 text-lg' : 'text-white text-base'}`}>
                    {d.lord} Mahadasha <br/>
                    <span className="text-xs text-white/60">({Math.floor(d.start)} - {Math.floor(d.end)})</span>
                  </div>
                  <div className="space-y-3 pl-3 border-l border-white/20 mt-4 text-sm">
                    {window.getAntardashas && window.getAntardashas(d.lord, d.start, d.end).slice(0, 6).map((a, j) => (
                      <div key={j} className="flex justify-between text-white/80 py-1">
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

      {/* ========================================== */}
      {/* PAGE 8: 12-MONTH HOROSCOPE (Q1 & Q2)       */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">12-Month Matrix: Q1 & Q2</h3>
        
        <div className="flex flex-col gap-6">
          {yearlyForecast.slice(0, 4).map((m, idx) => (
            <div key={idx} className="p-5 bg-[#121426] rounded-xl border border-white/10">
              <div className="font-bold text-amber-300 font-mono text-lg mb-3 border-b border-white/5 pb-2">
                {m.month}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/80">
                <div className="col-span-2 bg-black/30 p-3 rounded"><strong>General:</strong> {m.general}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Career:</strong> {m.career}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Wealth:</strong> {m.wealth}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Home:</strong> {m.home}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Health:</strong> {m.health}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 9: 12-MONTH HOROSCOPE (Q3 & Q4)       */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">12-Month Matrix: Q3 & Q4</h3>
        
        <div className="flex flex-col gap-6">
          {yearlyForecast.slice(4, 8).map((m, idx) => (
            <div key={idx} className="p-5 bg-[#121426] rounded-xl border border-white/10">
              <div className="font-bold text-amber-300 font-mono text-lg mb-3 border-b border-white/5 pb-2">
                {m.month}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/80">
                <div className="col-span-2 bg-black/30 p-3 rounded"><strong>General:</strong> {m.general}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Career:</strong> {m.career}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Wealth:</strong> {m.wealth}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Home:</strong> {m.home}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Health:</strong> {m.health}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================== */}
      {/* PAGE 10: 12-MONTH HOROSCOPE (Q5 & BEYOND)  */}
      {/* ========================================== */}
      <div className="pdf-page w-[794px] h-[1123px] bg-[#0b0d19] text-[#F2EFE6] p-10 font-sans relative overflow-hidden box-border">
        
        <h3 className="font-serif text-3xl text-amber-400 mb-6 border-b border-amber-400/30 pb-2">12-Month Matrix: Extended Forecast</h3>
        
        <div className="flex flex-col gap-6">
          {yearlyForecast.slice(8, 12).map((m, idx) => (
            <div key={idx} className="p-5 bg-[#121426] rounded-xl border border-white/10">
              <div className="font-bold text-amber-300 font-mono text-lg mb-3 border-b border-white/5 pb-2">
                {m.month}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/80">
                <div className="col-span-2 bg-black/30 p-3 rounded"><strong>General:</strong> {m.general}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Career:</strong> {m.career}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Wealth:</strong> {m.wealth}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Home:</strong> {m.home}</div>
                <div className="bg-black/20 p-3 rounded border border-white/5"><strong>Health:</strong> {m.health}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
});
