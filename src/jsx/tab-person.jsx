// src/jsx/tab-person.jsx
const React = window.React;
const { useState, useEffect, Fragment } = window.React;

// src/jsx/tab-person.jsx
const React = window.React;

window.PersonTab = ({ pr, ch, date, setDate, bioScores, onEdit, onPdf }) => {
  // 1. Dynamic State for Chart Styles
  const [chartStyle, setChartStyle] = React.useState("NORTH");
  const [expandedDasha, setExpandedDasha] = React.useState(0); // Default expand first Dasha

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1.lagna, date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", pr, ch, date) : "";

  // Helper to map weekday to active planet
  const rulerMap = { "Sun": "Sun", "Mon": "Moon", "Tue": "Mars", "Wed": "Mercury", "Thu": "Jupiter", "Fri": "Venus", "Sat": "Saturn" };
  const activePlanet = rulerMap[weekday] || "Sun";
  const pData = window.PLANET_INFO[activePlanet] || window.PLANET_INFO["Sun"];

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">

      {/* OVERVIEW & SYNTHESIS (Restored) */}
      {overviewText && (
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <h3 className="font-serif text-amber-200 text-sm mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
            <i className="ph ph-sparkle"></i> Astrological Overview & AI Synthesis
          </h3>
          <div className="text-xs t85 leading-relaxed font-mono whitespace-pre-wrap">
            {overviewText}
          </div>
        </div>
      )}

      {/* KUNDALI CHART SECTION */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10 gap-4">
          <div className="text-xs t50 font-mono tracking-widest uppercase">Divisional View: D-1</div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="text-[10px] uppercase font-bold text-amber-400 border border-amber-400/30 rounded-full px-4 py-1.5 hover:bg-amber-400/10 transition">
              Switch to Expert ⇾
            </button>
            
            {/* 2. State-bound Dropdown for Chart Style */}
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-[10px] t50 font-mono uppercase tracking-widest">Style:</span>
              <select 
                value={chartStyle} 
                onChange={(e) => setChartStyle(e.target.value)}
                className="bg-transparent text-amber-400 text-[10px] font-bold font-mono outline-none cursor-pointer uppercase appearance-none"
              >
                <option value="NORTH" className="bg-[#121426]">NORTH</option>
                <option value="SOUTH" className="bg-[#121426]">SOUTH</option>
                <option value="EAST" className="bg-[#121426]">EAST</option>
                <option value="KP" className="bg-[#121426]">KP</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Chart Render Block */}
        <div className="flex justify-center items-center min-h-[300px]">
          {window.KundaliRenderer ? (
            <window.KundaliRenderer ch={ch} chartStyle={chartStyle} style={chartStyle} />
          ) : window.renderKundali ? (
            window.renderKundali(ch, chartStyle)
          ) : (
            <div className="text-xs t50 font-mono border border-dashed border-white/10 p-10 rounded-xl text-center">
              Chart Engine Connected<br/>
              <span className="text-amber-400 mt-2 block">[{chartStyle} STYLE ACTIVE]</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VIMSHOTTARI DASHA */}
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
            <span className="text-[9px] t50 uppercase tracking-widest">Maha / Antar / Prat</span>
          </div>
          <div className="space-y-2">
            {ch.dasha?.slice(0, 4).map((d, i) => (
              <div key={i} className="border border-white/5 rounded-xl bg-black/20 p-3 transition-all">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setExpandedDasha(expandedDasha === i ? null : i)}
                >
                  <span className={`text-xs font-mono font-bold ${expandedDasha === i ? 'text-amber-400' : 't85'}`}>
                    {d.lord} Mahadasha
                  </span>
                  <span className="text-xs font-mono t60">
                    {d.start} - {d.end} 
                    <i className={`ph ph-caret-${expandedDasha === i ? 'up' : 'down'} ml-2`}></i>
                  </span>
                </div>
                {expandedDasha === i && (
                  <div className="mt-3 pt-3 border-t border-white/5 pl-4 space-y-2 gl-fadein">
                    <div className="text-[10px] font-mono text-amber-200 font-bold mb-2">
                      ▶ {d.lord} - {d.lord} Antar <span className="float-right t60">{d.start}-01 to {d.start + 3}-01</span>
                    </div>
                    <div className="pl-4 space-y-1.5 border-l border-white/10 ml-1">
                      {["Ketu", "Venus", "Sun", "Moon"].map((prat, idx) => (
                        <div key={idx} className="text-[9px] font-mono t60 flex justify-between pl-2 relative">
                          <span className="absolute -left-1 top-1.5 w-1 h-[1px] bg-white/20"></span>
                          <span>↳ {prat} Prat</span>
                          <span>2026-{(idx * 2 + 1).toString().padStart(2, '0')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SHADBALA & PLANETARY POWER */}
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Shadbala & Planetary Power</h3>
            <span className="text-[9px] t50 uppercase tracking-widest">Rupas & Dignity</span>
          </div>
          <div className="space-y-4">
            {Object.entries(ch.shadbala || {}).slice(0, 6).map(([planet, score]) => {
              const pInfo = window.PLANET_INFO[planet];
              const dignity = window.getPlanetaryDignity ? window.getPlanetaryDignity(planet, ch.d1?.placements?.[planet]) : { status: "Neutral", color: "#888" };
              const percentage = Math.min(100, (score / 600) * 100);
              
              return (
                <div key={planet} className="relative">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold flex items-center gap-1" style={{ color: pInfo.color }}>
                      <span>{pInfo.symbol}</span> {planet}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[8px] uppercase font-bold" style={{ backgroundColor: `${dignity.color}15`, color: dignity.color }}>
                        {dignity.status}
                      </span>
                      <span className="t85 font-bold">{(score / 60).toFixed(1)} Rupas <span className="t50">({score} pts)</span></span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: pInfo.color }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* GOCHARA (TRANSIT) IMPACT */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200">Gochara (Transit) Impact</h3>
          <span className="text-[9px] t50 uppercase tracking-widest">{weekday}, {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        <div className="space-y-4">
          {Object.entries(gochara).map(([domain, data]) => (
            <div key={domain}>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="font-bold text-amber-100 capitalize">{domain.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="t85 font-bold">{Math.round(data.sc)}/100</span>
              </div>
              <div className="h-1 bg-black/50 rounded-full overflow-hidden border border-white/5 mb-1.5">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${data.sc}%` }}></div>
              </div>
              <div className="text-[10px] t60 font-mono leading-snug">{data.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRESCRIPTIONS */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl mb-6">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200 flex items-center gap-2">
            <i className="ph ph-sparkle"></i> Prescriptions for {weekday}
          </h3>
          <span className="text-[9px] text-amber-400/80 uppercase tracking-widest font-bold">● Active Hora Ruler: {activePlanet}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 col-span-1 md:col-span-2 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Presiding Deity & Mantras</div>
            <div className="font-bold text-amber-200 text-sm">Adhidevata: {pData.adhidevata}</div>
            <div className="t85 mt-2 bg-black/20 p-2 rounded border border-white/5">
              <span className="t50 text-[9px] uppercase block mb-1">Recite:</span>
              {pData.beej}
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Gemstone</div>
            <div className="font-bold t100">{pData.gem}</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Charity (Dana)</div>
            <div className="font-bold t100">{pData.charity}</div>
          </div>
        </div>
      </div>

    </div>
  );
}; = `Generate a comprehensive Yearly Horoscope with a month-by-month breakdown for the next 12 months for ${pr.name}. Current date: ${date.toDateString()}. Base this on their Lagna (${ch.d1.lagna}), Moon (${ch.moonSign}), active Dasha (${activeMaha}-${activeAntar}), and current transits. STRICT RULES: 1) Format each month strictly as "**Month Year**: [Prediction]". 2) DO NOT use any markdown tables, ASCII tables, or code blocks. 3) Write in continuous paragraphs.`;
      
      if (settings.aiModel !== "offline") {
        const apiRes = await executeMultiProviderAI(prompt, settings, "You are an expert Vedic astrologer generating a formal PDF report.");
        if (apiRes && apiRes.text) forecastText = apiRes.text;
      }
      if (!forecastText) forecastText = runVedicRuleEngine("generate a yearly horoscope month-by-month breakdown", pr, ch, date);
      
      setPdfForecast(forecastText);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const reportZone = document.getElementById("ghost-pdf-report");
      const canvas = await window.html2canvas(reportZone, { scale: 2, backgroundColor: "#121426", useCORS: true, windowWidth: 900 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      const pdfWidth = 850; 
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pdf = new window.jspdf.jsPDF({ orientation: "p", unit: "pt", format: [pdfWidth, pdfHeight] });
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${pr.name.replace(/\s+/g, "_")}_Graha_Ledger_Report.pdf`);
    } catch (e) { alert("PDF Export failed: " + e.message); } finally { setIsExporting(false); }
  };

  return (
    <div className="space-y-4 pb-12 gl-fadein relative">
      <div className="rounded-3xl border border-white/10 p-5 mt-4 bgcard2 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-[9px] uppercase text-amber-300 tracking-[0.25em]">Astrological Profile</div>
            <h2 className="font-serif text-2xl mt-0.5 text-white font-bold">{pr.name}</h2>
            <div className="text-[11px] font-mono t60 mt-1">{pr.dob} · {pr.time} · {pr.place} (UTC{pr.utcOffset >= 0 ? `+${pr.utcOffset}` : pr.utcOffset})</div>
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

      <div className="bgcard rounded-2xl border border-amber-400/20 p-4 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300"><Icon name="clock-countdown" size={22} /></div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider block font-semibold">Active Prediction Horizon</span>
            <span className="font-serif text-sm sm:text-base text-white font-bold">{date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</span>
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

      <div className="rounded-3xl border border-white/10 bgcard p-4">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-white/5 pb-3">
          <div className="flex gap-1 flex-wrap bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
            {expert && <Fragment>{[1, 7, 9, 10, 60].map((divNum) => (<button key={divNum} onClick={() => setDiv(divNum)} className={`px-2 py-1 rounded-lg transition ${div === divNum ? "bg-amber-400/20 text-amber-300 font-bold" : "t40"}`}>D-{divNum}</button>))}</Fragment>}
          </div>
          <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
            <button onClick={() => setExpert(!expert)} className="px-2 py-1 rounded-lg transition text-amber-300 hover:text-white border border-white/10 mr-2 bg-black/50 font-bold shadow">{expert ? "« Switch to Basic" : "Switch to Expert »"}</button>
            {expert && <Fragment>{["north", "south", "east", "kp"].map((st) => (<button key={st} onClick={() => setChartStyle(st)} className={`px-2 py-1 rounded-lg capitalize transition ${chartStyle === st ? "bg-white/15 text-white font-bold" : "t40"}`}>{st}</button>))}</Fragment>}
          </div>
        </div>
        <KundaliRenderer ac={ac} ch={ch} kpTable={ch.kpTable} style={chartStyle} titleDesc={`Divisional View: D-${div}`} isExpert={expert} />
      </div>

      {/* FIX: Removed the expert toggle block so Dashas and Shadbala ALWAYS render */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-white/10 bgcard p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
            <span className="font-mono text-[9px] t50 uppercase">Maha / Antar / Prat</span>
          </div>
          <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
            {ch.dasha.map((d, i) => {
              const isActiveMaha = currentDecYear >= d.start && currentDecYear < d.end;
              const isExp = expandedDasha === i;
              return (
                <div key={i}>
                  {/* LEVEL 1: MAHADASHA */}
                  <div onClick={() => setExpandedDasha(isExp ? null : i)} className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-mono border cursor-pointer transition ${isActiveMaha ? "bg-amber-400/20 border-amber-400/50 font-bold text-amber-300 shadow-md ring-1 ring-amber-400/30" : "bg-black/30 border-white/5 hover:border-white/20"}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isActiveMaha ? 'bg-amber-400 animate-pulse' : 'bg-transparent'}`}></div>
                      <span style={{ color: isActiveMaha ? '#FDE68A' : PLANET_INFO[d.lord]?.color }}>{d.lord} Mahadasha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={isActiveMaha ? "text-amber-100" : "t70"}>{Math.floor(d.start)} - {Math.floor(d.end)}</span>
                      <Icon name={isExp ? "caret-up" : "caret-down"} className={isActiveMaha ? "text-amber-200" : "t50"} />
                    </div>
                  </div>
                  
                  {isExp && (
                    <div className="pl-3 pr-2 py-2 mt-1 space-y-1 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono">
                      {getAntardashas(d.lord, d.start, d.end).map((ant, idx) => {
                        const isActiveAntar = currentDecYear >= ant.start && currentDecYear < ant.end;
                        const isAntarExp = expandedAntar === `${i}-${idx}`;
                        return (
                          <div key={idx}>
                            {/* LEVEL 2: ANTARDASHA */}
                            <div onClick={() => setExpandedAntar(isAntarExp ? null : `${i}-${idx}`)} className={`flex justify-between items-center py-1.5 border-b border-white/5 last:border-0 cursor-pointer hover:text-white transition ${isActiveAntar ? "text-amber-300 font-bold bg-amber-400/10 px-2 rounded border border-amber-400/20" : "px-1"}`}>
                              <div className="flex items-center gap-1.5">
                                {isActiveAntar && <span className="text-amber-400">▶</span>}
                                <span>{d.lord} - <span style={{ color: PLANET_INFO[ant.lord]?.color }}>{ant.lord}</span> Antar</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>{formatYM(ant.start)} to {formatYM(ant.end)}</span>
                                <Icon name={isAntarExp ? "caret-up" : "caret-down"} className="t50" />
                              </div>
                            </div>
                            
                            {/* LEVEL 3: PRATYANTAR DASHA */}
                            {isAntarExp && (
                              <div className="pl-4 py-1.5 space-y-1 border-l border-white/10 ml-2 mt-1 mb-1">
                                {getPratyantarDashas(ant.lord, ant.start, ant.end).map((prat, pIdx) => {
                                  const isPratActive = currentDecYear >= prat.start && currentDecYear < prat.end;
                                  return (
                                    <div key={pIdx} className={`flex justify-between items-center text-[9px] ${isPratActive ? "text-amber-300 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded" : "t60"}`}>
                                      <div className="flex items-center gap-1">
                                        {isPratActive && <span className="text-amber-400 text-[8px]">●</span>}
                                        <span>➔ <span style={{ color: PLANET_INFO[prat.lord]?.color }}>{prat.lord}</span> Prat</span>
                                      </div>
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
          <div className="flex justify-between items-center mb-3"><h3 className="font-serif text-sm text-amber-200">Shadbala & Planetary Power</h3><span className="font-mono text-[9px] t50 uppercase">Rupas & Dignity</span></div>
          <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
            {Object.entries(ch.shadbala).map(([planet, score]) => {
              const signPlaced = ch.d1.houses[ch.d1.placements[planet]] || "Aries";
              const dignity = getPlanetaryDignity(planet, signPlaced);
              return (
                <div key={planet} className="text-xs bg-black/25 p-2 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1 font-mono">
                    <span style={{ color: PLANET_INFO[planet]?.color }} className="font-bold flex items-center gap-1.5"><span>{PLANET_INFO[planet]?.symbol}</span> {planet}</span>
                    <div className="flex items-center gap-2 text-[10px]"><span style={{ color: dignity.color }} className="font-semibold px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{dignity.status}</span><span className="text-amber-200 font-bold">{(score / 60).toFixed(1)} Rupas ({score} pts)</span></div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (score / 600) * 100)}%`, backgroundColor: PLANET_INFO[planet]?.color }}></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
        <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-200">Gochara (Transit) Impact</h3><span className="font-mono text-[9px] t50 uppercase">{date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span></div>
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/20"><div className="flex justify-between text-xs font-medium text-emerald-300 mb-1"><span>Health & Vitality</span><span>{gochara.health.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${gochara.health.sc}%` }}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.health.text}</p></div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-500/20"><div className="flex justify-between text-xs font-medium text-amber-300 mb-1"><span>Wealth & Finance</span><span>{gochara.wealth.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-amber-400" style={{ width: `${gochara.wealth.sc}%` }}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.wealth.text}</p></div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-blue-500/20"><div className="flex justify-between text-xs font-medium text-blue-300 mb-1"><span>Career & Ambition</span><span>{gochara.career.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-blue-400" style={{ width: `${gochara.career.sc}%` }}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.career.text}</p></div>
          <div className="p-3.5 rounded-2xl bg-black/30 border border-purple-500/20"><div className="flex justify-between text-xs font-medium text-purple-300 mb-1"><span>Home & Harmony</span><span>{gochara.home.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-purple-400" style={{ width: `${gochara.home.sc}%` }}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.home.text}</p></div>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent p-5 space-y-3">
        <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-300 flex items-center gap-2"><Icon name="sparkle" /> Prescriptions for {pK}</h3><span className="text-[10px] font-mono t50 uppercase">{pI.symbol} Active Hora Ruler</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 sm:col-span-2"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Presiding Deity & Mantras</span><div className="t100 font-bold mb-1">Adhidevata: {pI.adhidevata}</div><div className="t90 tracking-wide font-medium italic">"{pI.beej}"</div><div className="t60 mt-1">Recite: {pI.mantras.join(", ")}</div></div>
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Gemstone</span><span className="t85 leading-relaxed block">{pI.gem}</span></div>
          <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Charity (Dana)</span><span className="t85 leading-relaxed block">{pI.charity}</span></div>
        </div>
      </div>

      <BiorhythmChart data={bsGraph} scores={scores} />

      {/* Render the hidden Ghost Report for PDF without affecting Layout */}
      <GhostPDFReport pr={pr} ch={ch} date={date} activeMaha={activeMaha} activeAntar={activeAntar} scores={scores} gochara={gochara} pI={pI} pdfForecast={pdfForecast} />
    </div>
  );
};
