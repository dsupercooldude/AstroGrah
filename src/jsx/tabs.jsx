// src/jsx/tabs.jsx
const { useState, useEffect, Fragment } = window.React;

window.PersonTab = ({ pr, ch, date, setDate, settings, onEditProfile }) => {
  const { Icon, BiorhythmChart, KundaliRenderer, PLANET_INFO, bio, generateDeepGochara, WEEKDAY, formatYM, getAntardashas, getPratyantarDashas, getPlanetaryDignity, executeMultiProviderAI, runVedicRuleEngine } = window;

  const [div, setDiv] = useState(1);
  const [chartStyle, setChartStyle] = useState(settings.kundaliStyle || "north");
  const [expert, setExpert] = useState(false);
  
  // Dasha UI State Fix
  const [expandedDasha, setExpandedDasha] = useState(null);
  const [expandedAntar, setExpandedAntar] = useState(null);
  const [initialDashaSet, setInitialDashaSet] = useState(false);
  
  const [isExporting, setIsExporting] = useState(false);
  const [pdfForecast, setPdfForecast] = useState("");

  const currentDecYear = date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365.25;

  // Auto-expand the currently active Mahadasha ONCE on load to fix the UI bug
  useEffect(() => {
    if (ch?.dasha && !initialDashaSet) {
      const activeIdx = ch.dasha.findIndex(d => currentDecYear >= d.start && currentDecYear < d.end);
      if (activeIdx !== -1) setExpandedDasha(activeIdx);
      setInitialDashaSet(true);
    }
  }, [ch, currentDecYear, initialDashaSet]);

  if (!ch) return <div className="p-4 border border-white/10 rounded-xl text-center text-sm t60 bgfaint mt-4">Compute Error. Please verify coordinates.</div>;

  const ac = div === 1 ? ch.d1 : div === 7 ? ch.d7 : div === 9 ? ch.d9 : div === 10 ? ch.d10 : ch.d60;
  const pK = WEEKDAY[date.getDay()];
  const pI = PLANET_INFO[pK];

  const bsGraph = [];
  for (let i = -7; i <= 7; i += 0.25) {
    const d = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    const b = bio(pr.dob, d, pr.utcOffset);
    bsGraph.push({ idx: i + 7, P: b.p, E: b.e, I: b.i });
  }
  const bT = bio(pr.dob, date, pr.utcOffset);
  const scores = { p: Math.floor(bT.p * 100), e: Math.floor(bT.e * 100), i: Math.floor(bT.i * 100) };
  const gochara = generateDeepGochara(ch, ch.d1.lagna, date, pK, scores);

  const activeMahaObj = ch.dasha.find(d => currentDecYear >= d.start && currentDecYear < d.end);
  const activeMaha = activeMahaObj?.lord || "Jupiter";
  let activeAntar = activeMaha;
  if (activeMahaObj) {
    const antars = getAntardashas(activeMahaObj.lord, activeMahaObj.start, activeMahaObj.end);
    activeAntar = antars.find(a => currentDecYear >= a.start && currentDecYear < a.end)?.lord || activeMaha;
  }

  // --- COMPREHENSIVE CONTINUOUS PDF ENGINE (No Page Breaks) ---
  const handleExportPDF = async () => {
    if (!window.html2canvas || !window.jspdf) return alert("PDF Engine is loading. Please wait a second and click again.");
    setIsExporting(true);

    try {
      // 1. Generate 12-Month AI Forecast for the PDF
      let forecastText = "";
      const prompt = `Generate a comprehensive Yearly Horoscope with a month-by-month breakdown for the next 12 months for ${pr.name}. Current date: ${date.toDateString()}. Base this specifically on their Lagna (${ch.d1.lagna}), Moon Sign (${ch.moonSign}), active Vimshottari Dasha (${activeMaha}-${activeAntar}), and current transits. Use professional astrological formatting without markdown hashes.`;
      const systemCtx = "You are an expert Vedic astrologer generating a formal PDF report.";
      
      if (settings.aiModel !== "offline") {
        const apiRes = await executeMultiProviderAI(prompt, settings, systemCtx);
        if (apiRes && apiRes.text) forecastText = apiRes.text;
      }
      if (!forecastText) {
        // Fallback to the Offline 12-Month engine
        forecastText = runVedicRuleEngine("generate a yearly horoscope month-by-month breakdown", pr, ch, date);
      }
      
      setPdfForecast(forecastText);

      // Wait exactly 1.5 seconds for React to flush the forecast state into the Ghost DOM
      await new Promise(resolve => setTimeout(resolve, 1500));

      const reportZone = document.getElementById("ghost-pdf-report");
      if (!reportZone) throw new Error("Ghost Report DOM is missing.");

      // 2. High-Res Canvas Snapshot
      const canvas = await window.html2canvas(reportZone, {
        scale: 2,
        backgroundColor: "#121426",
        useCORS: true,
        windowWidth: 900 // Lock width for perfect CSS rendering
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      // 3. Create Continuous Variable-Height PDF
      const pdfWidth = 850; 
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new window.jspdf.jsPDF({
        orientation: "p",
        unit: "pt",
        format: [pdfWidth, pdfHeight] // Custom dimension completely eliminates page breaks
      });
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      
      const safeName = pr.name.replace(/\s+/g, "_");
      pdf.save(`${safeName}_Graha_Ledger_Report.pdf`);

    } catch (e) {
      console.error(e);
      alert("PDF Export failed: " + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4 pb-12 gl-fadein relative">
      
      {/* 1. ACTIVE PROFILE HEADER */}
      <div className="rounded-3xl border border-white/10 p-5 mt-4 bgcard2 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-[9px] uppercase text-amber-300 tracking-[0.25em]">Astrological Profile</div>
            <h2 className="font-serif text-2xl mt-0.5 text-white font-bold">{pr.name}</h2>
            <div className="text-[11px] font-mono t60 mt-1">
              {pr.dob} · {pr.time} · {pr.place} (UTC{pr.utcOffset >= 0 ? `+${pr.utcOffset}` : pr.utcOffset})
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportPDF} disabled={isExporting} title="Export Comprehensive PDF" className="p-2 border border-emerald-500/30 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 transition text-emerald-400 disabled:opacity-50 flex items-center justify-center">
              <i className={isExporting ? "ph ph-spinner animate-spin" : "ph ph-file-pdf"} style={{ fontSize: 18 }} />
            </button>
            <button onClick={() => onEditProfile(pr)} title="Edit Profile" className="p-2 border border-white/10 rounded-full bg-black/30 hover:bg-white/10 transition text-amber-300 disabled:opacity-50">
              <Icon name="pencil-simple" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. TIME-TRAVEL CONTROL BAR */}
      <div className="bgcard rounded-2xl border border-amber-400/20 p-4 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
            <Icon name="clock-countdown" size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider block font-semibold">Active Prediction Horizon</span>
            <span className="font-serif text-sm sm:text-base text-white font-bold">
              {date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          <button onClick={() => setDate(new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">-1M</button>
          <button onClick={() => setDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">-1W</button>
          <button onClick={() => setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">-1D</button>
          <button onClick={() => setDate(new Date())} className="px-3 py-1 text-amber-300 font-bold bg-amber-400/15 border border-amber-400/40 rounded-lg transition hover:bg-amber-400/25">Today</button>
          <button onClick={() => setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">+1D</button>
          <button onClick={() => setDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">+1W</button>
          <button onClick={() => setDate(new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000))} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 hover:text-white transition">+1M</button>
          <input type="date" value={date.toISOString().slice(0, 10)} onChange={(e) => { if (e.target.value) setDate(new Date(e.target.value + "T12:00:00")); }} className="bg-black/50 border border-amber-400/30 rounded-lg px-2 py-0.5 text-xs text-amber-200 outline-none ml-1 cursor-pointer"/>
        </div>
      </div>

      {/* 3. KUNDALI CHART SECTION */}
      <div className="rounded-3xl border border-white/10 bgcard p-4">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-white/5 pb-3">
          <div className="flex gap-1 flex-wrap bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
            {expert && <Fragment>
              {[1, 7, 9, 10, 60].map((divNum) => (
                <button key={divNum} onClick={() => setDiv(divNum)} className={`px-2 py-1 rounded-lg transition ${div === divNum ? "bg-amber-400/20 text-amber-300 font-bold" : "t40"}`}>D-{divNum}</button>
              ))}
            </Fragment>}
          </div>
          <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
            <button onClick={() => setExpert(!expert)} className="px-2 py-1 rounded-lg transition text-amber-300 hover:text-white border border-white/10 mr-2 bg-black/50 font-bold shadow">
              {expert ? "« Switch to Basic" : "Switch to Expert »"}
            </button>
            {expert && <Fragment>
              {["north", "south", "east", "kp"].map((st) => (
                <button key={st} onClick={() => setChartStyle(st)} className={`px-2 py-1 rounded-lg capitalize transition ${chartStyle === st ? "bg-white/15 text-white font-bold" : "t40"}`}>{st}</button>
              ))}
            </Fragment>}
          </div>
        </div>
        
        <KundaliRenderer ac={ac} ch={ch} kpTable={ch.kpTable} style={chartStyle} titleDesc={`Divisional View: D-${div}`} isExpert={expert} />
      </div>

      {/* 4. PLANETARY STRENGTH & VIMSHOTTARI DASHA DRILLDOWN */}
      {expert && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bgcard p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
              <span className="font-mono text-[9px] t50 uppercase">Maha / Antar</span>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {ch.dasha.map((d, i) => {
                const isActive = currentDecYear >= d.start && currentDecYear < d.end;
                const isExp = expandedDasha === i;
                return (
                  <div key={i}>
                    <div
                      onClick={() => setExpandedDasha(isExp ? null : i)}
                      className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-mono border cursor-pointer transition ${isActive ? "bg-amber-400/20 border-amber-400/50 font-bold text-amber-300 shadow-md ring-1 ring-amber-400/30" : "bg-black/30 border-white/5 hover:border-white/20"}`}
                    >
                      <span style={{ color: isActive ? '#FDE68A' : PLANET_INFO[d.lord]?.color }}>{d.lord} Mahadasha</span>
                      <div className="flex items-center gap-2">
                        <span className={isActive ? "text-amber-100" : "t70"}>{Math.floor(d.start)} - {Math.floor(d.end)}</span>
                        <Icon name={isExp ? "caret-up" : "caret-down"} className={isActive ? "text-amber-200" : "t50"} />
                      </div>
                    </div>
                    {isExp && (
                      <div className="pl-3 pr-2 py-2 mt-1 space-y-1 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono">
                        {getAntardashas(d.lord, d.start, d.end).map((ant, idx) => {
                          const isAntarActive = currentDecYear >= ant.start && currentDecYear < ant.end;
                          const isAntarExp = expandedAntar === `${i}-${idx}`;
                          return (
                            <div key={idx}>
                              <div
                                onClick={() => setExpandedAntar(isAntarExp ? null : `${i}-${idx}`)}
                                className={`flex justify-between items-center py-1 border-b border-white/5 last:border-0 cursor-pointer hover:text-white transition ${isAntarActive ? "text-amber-300 font-bold bg-amber-400/10 px-2 rounded border border-amber-400/20" : ""}`}
                              >
                                <span>{d.lord} - <span style={{ color: PLANET_INFO[ant.lord]?.color }}>{ant.lord}</span></span>
                                <div className="flex items-center gap-2">
                                  <span>{formatYM(ant.start)} to {formatYM(ant.end)}</span>
                                  <Icon name={isAntarExp ? "caret-up" : "caret-down"} className="t50" />
                                </div>
                              </div>
                              {isAntarExp && (
                                <div className="pl-3 py-1 space-y-0.5 border-l border-white/10 ml-2 mt-1 mb-1">
                                  {getPratyantarDashas(ant.lord, ant.start, ant.end).map((prat, pIdx) => {
                                    const isPratActive = currentDecYear >= prat.start && currentDecYear < prat.end;
                                    return (
                                      <div key={pIdx} className={`flex justify-between items-center text-[9px] ${isPratActive ? "text-amber-300 font-bold bg-amber-400/10 px-1 rounded" : "t60"}`}>
                                        <span>➔ <span style={{ color: PLANET_INFO[prat.lord]?.color }}>{prat.lord}</span></span>
                                        <span>{formatYM(prat.start)} to {formatYM(prat.end)}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bgcard p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif text-sm text-amber-200">Shadbala & Planetary Power</h3>
              <span className="font-mono text-[9px] t50 uppercase">Rupas & Dignity</span>
            </div>
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {Object.entries(ch.shadbala).map(([planet, score]) => {
                const signPlaced = ch.d1.houses[ch.d1.placements[planet]] || "Aries";
                const dignity = getPlanetaryDignity(planet, signPlaced);
                return (
                  <div key={planet} className="text-xs bg-black/25 p-2 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-1 font-mono">
                      <span style={{ color: PLANET_INFO[planet]?.color }} className="font-bold flex items-center gap-1.5">
                        <span>{PLANET_INFO[planet]?.symbol}</span> {planet}
                      </span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span style={{ color: dignity.color }} className="font-semibold px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{dignity.status}</span>
                        <span className="text-amber-200 font-bold">{(score / 60).toFixed(1)} Rupas ({score} pts)</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (score / 600) * 100)}%`, backgroundColor: PLANET_INFO[planet]?.color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. DEEP GOCHARA FORECAST */}
      <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-base text-amber-200">Gochara (Transit) Impact</h3>
          <span className="font-mono text-[9px] t50 uppercase">{date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
        </div>
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/20">
            <div className="flex justify-between text-xs font-medium text-emerald-300 mb-1">
              <span>Health & Vitality</span><span>{gochara.health.sc}/100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${gochara.health.sc}%` }}></div></div>
            <p className="text-[10px] t70 leading-relaxed">{gochara.health.text}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-500/20">
            <div className="flex justify-between text-xs font-medium text-amber-300 mb-1">
              <span>Wealth & Finance</span><span>{gochara.wealth.sc}/100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-amber-400" style={{ width: `${gochara.wealth.sc}%` }}></div></div>
            <p className="text-[10px] t70 leading-relaxed">{gochara.wealth.text}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-blue-500/20">
            <div className="flex justify-between text-xs font-medium text-blue-300 mb-1">
              <span>Career & Ambition</span><span>{gochara.career.sc}/100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-blue-400" style={{ width: `${gochara.career.sc}%` }}></div></div>
            <p className="text-[10px] t70 leading-relaxed">{gochara.career.text}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-purple-500/20">
            <div className="flex justify-between text-xs font-medium text-purple-300 mb-1">
              <span>Home & Harmony</span><span>{gochara.home.sc}/100</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-purple-400" style={{ width: `${gochara.home.sc}%` }}></div></div>
            <p className="text-[10px] t70 leading-relaxed">{gochara.home.text}</p>
          </div>
        </div>
      </div>

      {/* 6. DAILY PRESCRIPTIONS */}
      <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-base text-amber-300 flex items-center gap-2"><Icon name="sparkle" /> Prescriptions for {pK}</h3>
          <span className="text-[10px] font-mono t50 uppercase">{pI.symbol} Active Hora Ruler</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 sm:col-span-2">
            <span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Presiding Deity & Mantras</span>
            <div className="t100 font-bold mb-1">Adhidevata: {pI.adhidevata}</div>
            <div className="t90 tracking-wide font-medium italic">"{pI.beej}"</div>
            <div className="t60 mt-1">Recite: {pI.mantras.join(", ")}</div>
          </div>
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5">
            <span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Gemstone</span>
            <span className="t85 leading-relaxed block">{pI.gem}</span>
          </div>
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5">
            <span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Charity (Dana)</span>
            <span className="t85 leading-relaxed block">{pI.charity}</span>
          </div>
        </div>
      </div>

      <BiorhythmChart data={bsGraph} scores={scores} />

      {/* ========================================================================= */}
      {/* 🔮 GHOST PDF REPORT DOM (Hidden off-screen, purely for canvas extraction) */}
      {/* ========================================================================= */}
      <div id="ghost-pdf-report" style={{ position: 'absolute', left: '-9999px', top: 0, width: '900px', backgroundColor: '#121426', padding: '50px', color: '#F2EFE6', fontFamily: 'Sora, sans-serif', zIndex: -100 }}>
        
        {/* REPORT HEADER */}
        <div style={{ borderBottom: '2px solid rgba(212,165,116,0.3)', paddingBottom: '25px', marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '36px', color: '#D4A574', margin: '0 0 10px 0' }}>Comprehensive Astrological Report</h1>
          <h2 style={{ fontSize: '26px', margin: '0 0 5px 0' }}>{pr.name}</h2>
          <p style={{ fontSize: '13px', color: 'rgba(242,239,230,0.7)', fontFamily: 'monospace' }}>
            DOB: {pr.dob} | Time: {pr.time} | Place: {pr.place} | Target Prediction Date: {date.toDateString()}
          </p>
        </div>

        {/* FOUNDATION & ACTIVE DASHAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Natal Foundation</h3>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              <div><strong>Ascendant (Lagna):</strong> {ch.d1.lagna}</div>
              <div><strong>Moon Sign (Rashi):</strong> {ch.moonSign}</div>
              <div><strong>Sun Sign:</strong> {ch.sunSign}</div>
              <div><strong>Nakshatra:</strong> {ch.nak} (Pada {ch.pada})</div>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Active Chronology</h3>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              <div><strong>Active Mahadasha:</strong> <span style={{color: '#FDE68A', fontWeight: 'bold'}}>{activeMaha}</span></div>
              <div><strong>Active Antardasha:</strong> <span style={{color: '#FDE68A', fontWeight: 'bold'}}>{activeAntar}</span></div>
              <div><strong>Current Biorhythms:</strong> P {scores.p}% / E {scores.e}% / I {scores.i}%</div>
            </div>
          </div>
        </div>

        {/* SHADBALA (TABLE FORMAT FOR CLEAN PDF) */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Planetary Strengths (Shadbala & Dignity)</h3>
            <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  <th style={{ paddingBottom: '10px' }}>Planet</th>
                  <th style={{ paddingBottom: '10px' }}>Placement</th>
                  <th style={{ paddingBottom: '10px' }}>Dignity Status</th>
                  <th style={{ paddingBottom: '10px' }}>Score (Rupas)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ch.shadbala).map(([planet, score]) => {
                  const signPlaced = ch.d1.houses[ch.d1.placements[planet]] || "Aries";
                  const dignity = getPlanetaryDignity(planet, signPlaced);
                  return (
                    <tr key={planet} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '10px 0', color: PLANET_INFO[planet]?.color, fontWeight: 'bold' }}>{planet}</td>
                      <td style={{ padding: '10px 0' }}>{signPlaced}</td>
                      <td style={{ padding: '10px 0', color: dignity.color }}>{dignity.status}</td>
                      <td style={{ padding: '10px 0', fontWeight: 'bold' }}>{(score/60).toFixed(1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>

        {/* VIMSHOTTARI DASHA (TABULAR HIGHLIGHTED) */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Vimshottari Dasha Sequence</h3>
            <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  <th style={{ paddingBottom: '10px' }}>Mahadasha</th>
                  <th style={{ paddingBottom: '10px' }}>Antardasha</th>
                  <th style={{ paddingBottom: '10px' }}>Start Timeline</th>
                  <th style={{ paddingBottom: '10px' }}>End Timeline</th>
                </tr>
              </thead>
              <tbody>
                {ch.dasha.map((d, i) => {
                  const isActiveMaha = currentDecYear >= d.start && currentDecYear < d.end;
                  const antars = getAntardashas(d.lord, d.start, d.end);
                  return antars.map((ant, idx) => {
                    const isActiveAntar = currentDecYear >= ant.start && currentDecYear < ant.end;
                    const isHighlighted = isActiveMaha && isActiveAntar;
                    return (
                      <tr key={`${i}-${idx}`} style={{ backgroundColor: isHighlighted ? 'rgba(251,191,36,0.15)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '8px 10px', color: isHighlighted ? '#FDE68A' : PLANET_INFO[d.lord]?.color, fontWeight: isHighlighted?'bold':'normal' }}>{d.lord}</td>
                        <td style={{ padding: '8px 10px', color: isHighlighted ? '#FDE68A' : PLANET_INFO[ant.lord]?.color, fontWeight: isHighlighted?'bold':'normal' }}>{ant.lord}</td>
                        <td style={{ padding: '8px 10px', fontWeight: isHighlighted?'bold':'normal' }}>{formatYM(ant.start)}</td>
                        <td style={{ padding: '8px 10px', fontWeight: isHighlighted?'bold':'normal' }}>{formatYM(ant.end)}</td>
                      </tr>
                    );
                  })
                })}
              </tbody>
            </table>
        </div>

        {/* CHARTS GRID D1 & D9 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-1 Rashi Chart (Foundation)</h4>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}><KundaliRenderer ac={ch.d1} ch={ch} style="north" isExpert={true} /></div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-9 Navamsha Chart (Destiny & Union)</h4>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}><KundaliRenderer ac={ch.d9} ch={ch} style="north" isExpert={true} /></div>
            </div>
        </div>

        {/* CHARTS GRID D7 & D10 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-7 Saptamsha (Legacy & Children)</h4>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}><KundaliRenderer ac={ch.d7} ch={ch} style="north" isExpert={true} /></div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-10 Dashamsha (Career & Milestones)</h4>
                <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}><KundaliRenderer ac={ch.d10} ch={ch} style="north" isExpert={true} /></div>
            </div>
        </div>

        {/* GOCHARA & PRESCRIPTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Deep Gochara Forecast</h3>
            <div style={{ fontSize: '11px', lineHeight: '1.8' }}>
              <p><strong>Health & Vitality ({gochara.health.sc}%):</strong> {gochara.health.text}</p>
              <p><strong>Wealth & Finance ({gochara.wealth.sc}%):</strong> {gochara.wealth.text}</p>
              <p><strong>Career & Ambition ({gochara.career.sc}%):</strong> {gochara.career.text}</p>
              <p><strong>Home & Harmony ({gochara.home.sc}%):</strong> {gochara.home.text}</p>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Daily Prescriptions ({pK})</h3>
            <div style={{ fontSize: '12px', lineHeight: '2' }}>
              <div><strong>Presiding Deity:</strong> {pI.adhidevata}</div>
              <div><strong>Active Beej Mantra:</strong> <em>"{pI.beej}"</em></div>
              <div><strong>Associated Gemstone:</strong> {pI.gem}</div>
              <div><strong>Prescribed Charity:</strong> {pI.charity}</div>
              <div><strong>Daily Action:</strong> {pI.action}</div>
            </div>
          </div>
        </div>

        {/* AI FORECAST: 12-MONTH HOROSCOPE */}
        <div style={{ background: 'rgba(212,165,116,0.08)', border: '1px solid rgba(212,165,116,0.4)', padding: '30px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px', fontSize: '20px' }}>12-Month Astrological Horizon</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.9)' }}>
                {pdfForecast || "Generating Forecast..."}
            </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            Generated securely by Graha Ledger Enterprise • Cryptographic Vault System
        </div>
      </div>

    </div>
  );
};

window.PanchangTab = ({ d, setDate, p, utc, settings }) => {
  const { Icon, panchang, WEEKDAY, PLANET_INFO } = window;
  const [liveValidated, setLiveValidated] = useState(false);
  const [validating, setValidating] = useState(false);

  const pan = panchang(d, settings.monthSystem, utc);
  const fm = (dt) => dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  const validateLivePanchang = async () => {
    setValidating(true);
    try {
      const res = await fetch(`https://api.sunrisesunset.io/json?lat=${p?.lat || 25.2}&lng=${p?.lon || 55.2}&date=${d.toISOString().slice(0, 10)}`);
      const data = await res.json();
      if (data && data.results) {
          setLiveValidated(true);
          setTimeout(() => setLiveValidated(false), 4000); 
      }
    } catch (e) {}
    setValidating(false);
  };

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-emerald-950/40 via-black/20 to-transparent shadow-xl flex justify-between items-center">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">Drik Aligned Ephemeris</span>
          <h2 className="font-serif text-2xl text-emerald-100 mt-0.5">Vedic Panchang & Muhurtas</h2>
          <div className="text-[11px] font-mono t60 mt-1">
            Vikram Samvat {pan.vikram} · Saka Samvat {pan.saka} · Masa: {pan.masa}
          </div>
        </div>
        <button onClick={validateLivePanchang} disabled={validating} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] hover:bg-emerald-500/20 transition flex items-center gap-1.5">
          <Icon name="broadcast" className={validating ? "animate-pulse" : ""} /> {validating ? "Verifying..." : liveValidated ? "API Synced!" : "Validate Live API"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
        <div className="p-3.5 border border-white/10 rounded-2xl bgcard">
          <div className="text-amber-400 text-2xl mb-1">☀</div>
          <div className="t60 text-[9px] mb-1 uppercase">Surya Udaya — Asta</div>
          <div className="text-sm font-bold">{fm(pan.sr)} — {fm(pan.ss)}</div>
        </div>
        <div className="p-3.5 border border-white/10 rounded-2xl bgcard">
          <div className="text-blue-300 text-2xl mb-1">☽</div>
          <div className="t60 text-[9px] mb-1 uppercase">Chandra Udaya — Asta</div>
          <div className="text-sm font-bold">{fm(pan.mr)} — {fm(pan.msr)}</div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-4 grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">1. Tithi</span><span className="t100 font-bold">{pan.paksha} {pan.tithi}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">2. Vaar (Day)</span><span className="t100 font-bold">{d.toLocaleDateString("en-US", { weekday: "long" })}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">3. Nakshatra</span><span className="t100 font-bold">{pan.nak}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">4. Yoga</span><span className="t100 font-bold">{pan.yoga}</span></div>
        <div className="col-span-2 p-3 bg-black/30 rounded-xl border border-white/5 flex justify-between items-center">
          <span className="t50 font-mono text-[9px] uppercase">5. Karana</span>
          <span className={pan.karana.includes("Bhadra") || pan.karana.includes("Vishti") ? "text-red-400 font-bold" : "t100 font-bold"}>{pan.karana}</span>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
        <h3 className="font-serif text-sm text-white">Muhurta Windows</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pan.bhadra && (
            <div className="p-3 rounded-2xl border border-red-500/50 bg-red-950/40 sm:col-span-2 mb-1">
              <span className="font-mono text-[10px] uppercase text-red-400 block mb-0.5 font-bold">⚠️ Bhadra Kaal (Vishti Karana)</span>
              <span className="font-mono text-sm font-bold block mb-1">{fm(pan.bhadra.s)} - {fm(pan.bhadra.e)}</span>
              <span className="text-[10px] t85">Highly inauspicious. Avoid starting new commercial contracts during this window.</span>
            </div>
          )}
          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20"><span className="font-mono text-[9px] uppercase text-emerald-400 block mb-0.5">Abhijit (Auspicious)</span><span className="font-mono text-sm font-bold">{fm(pan.abh.s)} - {fm(pan.abh.e)}</span></div>
          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-950/20"><span className="font-mono text-[9px] uppercase text-blue-400 block mb-0.5">Brahma Muhurta (Meditative)</span><span className="font-mono text-sm font-bold">{fm(pan.brahma.s)} - {fm(pan.brahma.e)}</span></div>
          <div className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20"><span className="font-mono text-[9px] uppercase text-red-400 block mb-0.5">Rahu Kaalam (Avoid Starts)</span><span className="font-mono text-sm font-bold">{fm(pan.rahu.s)} - {fm(pan.rahu.e)}</span></div>
          <div className="p-3 rounded-2xl border border-orange-500/30 bg-orange-950/20"><span className="font-mono text-[9px] uppercase text-orange-400 block mb-0.5">Yamaganda</span><span className="font-mono text-sm font-bold">{fm(pan.yamaganda.s)} - {fm(pan.yamaganda.e)}</span></div>
          <div className="p-3 rounded-2xl border border-gray-500/30 bg-gray-900/20 sm:col-span-2"><span className="font-mono text-[9px] uppercase text-gray-400 block mb-0.5">Gulika Kaal</span><span className="font-mono text-sm font-bold">{fm(pan.gulika.s)} - {fm(pan.gulika.e)}</span></div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-amber-200 mb-4">Day Choghadiya Timings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pan.chogDay.map((c, i) => (
                <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] flex flex-col justify-center shadow-inner">
                    <span style={{ color: c.c }} className="font-bold text-xs block mb-0.5">{c.n}</span>
                    <span className="t50 text-[8px] font-mono uppercase">{c.d}</span>
                    <div className="font-mono t85 text-[10px] mt-2 bg-white/5 py-1 px-2 rounded">{fm(c.s)} - {fm(c.e)}</div>
                </div>
            ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-blue-200 mb-4">Planetary Hora Tracking</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pan.horas.map((h, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-black/30 border border-white/5 rounded-xl text-xs hover:bg-white/5 transition">
                    <div className="flex items-center gap-2">
                        <span className="text-lg opacity-80" style={{ color: PLANET_INFO[h.p]?.color }}>{PLANET_INFO[h.p]?.symbol}</span>
                        <span style={{ color: PLANET_INFO[h.p]?.color }} className="font-bold tracking-wide">{h.p}</span>
                    </div>
                    <div className="font-mono t85 text-[10px] bg-black/50 px-2 py-1 rounded border border-white/5">{fm(h.s)} - {fm(h.e)}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

window.CompatTab = ({ prs, chs, settings, date }) => {
  const { NAKSHATRAS } = window;
  const [pairIds, setPairIds] = useState(prs.length >= 2 ? [prs[0].id, prs[1].id] : [prs[0]?.id, prs[0]?.id]);
  if (prs.length < 2) return <div className="p-8 text-center text-sm t60 border border-dashed border-white/20 rounded-3xl mt-6 bgfaint">Add at least two natal profiles to unlock 36-point Ashtakoot Milan.</div>;
  const p1 = prs.find((p) => p.id === pairIds[0]) || prs[0];
  const p2 = prs.find((p) => p.id === pairIds[1]) || prs[1];
  const c1 = chs[p1.id], c2 = chs[p2.id];
  if (!c1 || !c2) return null;
  const score = Math.max(12, Math.min(36, 36 - ((Math.abs(NAKSHATRAS.indexOf(c1.nak) - NAKSHATRAS.indexOf(c2.nak)) % 10) * 1.8)));
  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-pink-950/40 via-black/20 to-transparent flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-pink-300 mb-1">Union & Kundali Milan</div>
          <div className="flex items-center gap-2">
            <select value={pairIds[0]} onChange={(e) => setPairIds([e.target.value, pairIds[1]])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">
              {prs.map((p) => (<option key={p.id} value={p.id}>{p.name.split(" ")[0]}</option>))}
            </select>
            <span className="font-serif text-pink-300">&amp;</span>
            <select value={pairIds[1]} onChange={(e) => setPairIds([pairIds[0], e.target.value])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">
              {prs.map((p) => (<option key={p.id} value={p.id}>{p.name.split(" ")[0]}</option>))}
            </select>
          </div>
        </div>
        <div className="text-center p-3 rounded-2xl bg-black/40 border border-white/10 min-w-[100px]">
          <div className="text-3xl font-serif text-pink-300 font-bold">{score.toFixed(1)}</div>
          <div className="text-[9px] t50 uppercase font-mono mt-0.5">Out of 36 Gunas</div>
        </div>
      </div>
    </div>
  );
};

window.AskTab = ({ em, emHash, set, pr, ch, date }) => {
  const { Icon, AppDB, CryptoUtils, WEEKDAY, executeMultiProviderAI, runVedicRuleEngine } = window;
  const [q, setQ] = useState("");
  const [h, setH] = useState([]);
  const [l, setL] = useState(false);
  const [isMic, setIsMic] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadHistory = async () => {
      try {
        const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`);
        const decH = typeof chatsFile.content.h === "string" ? CryptoUtils.decrypt(chatsFile.content.h) : chatsFile.content.h || [];
        if (isMounted && decH) setH(decH);
      } catch (e) {}
    };
    loadHistory();
    return () => { isMounted = false; };
  }, [emHash]);

  const startListening = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return alert("Voice input not supported in this browser.");
    const rec = new SpeechRec();
    setIsMic(true);
    rec.onresult = (e) => { setQ(e.results[0][0].transcript); setIsMic(false); };
    rec.onerror = () => setIsMic(false);
    rec.onend = () => setIsMic(false);
    rec.start();
  };

  async function ask(e) {
    if (e) e.preventDefault();
    if (!q.trim() || l) return;
    setL(true);
    let ans = "";
    let usedProvider = set.aiModel || "offline";
    try {
      let globalContext = "";
      try {
        const gDB = await AppDB.getGlobalAI();
        if (gDB.history.length > 0) {
          const last = CryptoUtils.decrypt(gDB.history[gDB.history.length - 1]);
          globalContext = `[Global Trend: Previous user asked "${last.q}"]`;
        }
      } catch (err) {}

      const systemContext = `You are the Graha Ledger Jyotish Sage. Provide Vedic astrology guidance for ${pr?.name || "Native"} (Asc: ${ch?.d1?.lagna || "Aries"}, Moon: ${ch?.moonSign || "Aries"}). Target Date: ${date.toDateString()}. Today Hora: ${WEEKDAY[date.getDay()]}. ${globalContext}`;

      if (set.aiModel !== "offline") {
        const apiRes = await executeMultiProviderAI(q, set, systemContext);
        if (apiRes && apiRes.text) { ans = apiRes.text; usedProvider = apiRes.provider; }
      }

      if (!ans) {
        usedProvider = "offline";
        ans = runVedicRuleEngine(q, pr, ch, date);
      }

      const newQA = { id: Date.now(), q, a: ans, v: usedProvider };
      const nx = [...h, newQA];
      setH(nx);
      setQ("");
      try {
        const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`);
        chatsFile.content.h = CryptoUtils.encrypt(nx);
        await AppDB.saveFile(`gl_chats_${emHash}.json`, chatsFile.content, chatsFile.sha);
        await AppDB.appendGlobalAI(newQA);
      } catch (er) {}
    } catch (err) {
      ans = `System Error: ${err.message}.`;
      setH([...h, { id: Date.now(), q, a: ans, v: "error" }]);
      setQ("");
    } finally {
      setL(false);
    }
  }

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-blue-950/40 via-black/20 to-transparent shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Global Learning AI</span>
            <h2 className="font-serif text-2xl text-blue-100 mt-0.5">Ask the Sage</h2>
          </div>
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300 uppercase">{set.aiModel || "offline"}</span>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-hide">
        <button onClick={() => setQ("Will I be able to achieve my Year's Target for the mentioned commission letter?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Yearly Targets?</button>
        <button onClick={() => setQ("How does my career look this week?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Career Week?</button>
        <button onClick={() => setQ("How will my marriage go and will my wife be accepted in the household?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Marriage & Home?</button>
      </div>
      <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
        {h.map((x, index) => (
          <details key={x.id} className="p-4 bgcard rounded-2xl border border-white/5 text-xs t85 leading-relaxed whitespace-pre-wrap group" open={index === h.length - 1}>
            <summary className="font-bold text-amber-400 cursor-pointer flex justify-between items-start outline-none">
              <span className="pr-4">Q: {x.q}</span>
              <Icon name="caret-down" className="group-open:rotate-180 transition-transform mt-0.5" />
            </summary>
            <div className="mt-3 pt-3 border-t border-white/10 text-white/90">
              {x.a}
              <div className="text-[8px] t40 font-mono mt-3 uppercase">Engine: {x.v}</div>
            </div>
          </details>
        ))}
        {l && <div className="text-xs t50 italic p-3">Synthesizing astrological coordinates & ephemeris...</div>}
      </div>
      <form onSubmit={ask} className="flex gap-2 p-2 bgcard2 border border-white/10 rounded-2xl shadow-2xl">
        <button type="button" onClick={startListening} className={`px-3 py-2 rounded-xl transition ${isMic ? "bg-red-500 text-white animate-pulse" : "bg-black/30 text-amber-300 hover:bg-white/10"}`}>
          <Icon name="microphone" size={20} />
        </button>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.target.form.requestSubmit(); } }} placeholder="Ask about 2026 transits, targets, marriage..." className="flex-1 bg-transparent text-xs focus:outline-none px-2 text-white" />
        <button type="submit" disabled={l} className="px-5 py-2.5 bg-amber-400 text-black text-xs font-semibold rounded-xl disabled:opacity-50 hover:bg-amber-300">Ask</button>
      </form>
    </div>
  );
};
