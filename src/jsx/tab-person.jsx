// src/jsx/tab-person.jsx
var React = window.React;

window.PersonTab = ({ pr, ch, date, setDate, bioScores, onEdit, onPdf }) => {
  const [chartStyle, setChartStyle] = React.useState("NORTH");
  const [showStyleMenu, setShowStyleMenu] = React.useState(false);
  const [expandedDasha, setExpandedDasha] = React.useState(0);

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1?.lagna || "Capricorn", date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", pr, ch, date) : "";

  const activePlanet = window.PLANET_INFO[weekday === "Sun" ? "Sun" : weekday === "Mon" ? "Moon" : weekday === "Tue" ? "Mars" : weekday === "Wed" ? "Mercury" : weekday === "Thu" ? "Jupiter" : weekday === "Fri" ? "Venus" : "Saturn"];

  const currentYear = date.getFullYear() + (date.getMonth() / 12);
  const formattedStyle = chartStyle.charAt(0).toUpperCase() + chartStyle.slice(1).toLowerCase();

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">

      {/* FAIL-SAFE PROFILE HEADER */}
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl flex justify-between items-start">
        <div>
          <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Astrological Profile</div>
          <h2 className="font-serif text-3xl text-white font-bold">{pr.name}</h2>
          <div className="text-xs t50 font-mono mt-1">{pr.dob} • {pr.time} • {pr.place}</div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onPdf ? onPdf() : window.dispatchEvent(new CustomEvent('generate-pdf'))} 
            className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 hover:bg-emerald-500/20 transition shadow-lg"
          >
            <i className="ph ph-file-pdf text-lg"></i>
          </button>
          <button 
            onClick={() => onEdit ? onEdit() : window.dispatchEvent(new CustomEvent('open-edit-modal'))} 
            className="w-10 h-10 rounded-full bg-white/5 text-white/70 flex items-center justify-center border border-white/10 hover:bg-white/10 transition shadow-lg"
          >
            <i className="ph ph-pencil-simple text-lg"></i>
          </button>
        </div>
      </div>

      {/* TIME CONTROLLER */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl flex flex-col xl:flex-row justify-between items-center gap-4 relative z-20">
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-400 bg-amber-400/5 shadow-inner shrink-0">
            <i className="ph ph-clock-counter-clockwise text-xl"></i>
          </div>
          <div>
            <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Active Prediction Horizon</div>
            <div className="font-serif text-xl text-white font-bold">
              {weekday}, {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/5 w-full xl:w-auto">
          {[{ l: "-1M", d: -30 }, { l: "-1W", d: -7 }, { l: "-1D", d: -1 }, { l: "Today", d: 0 }, { l: "+1D", d: 1 }, { l: "+1W", d: 7 }, { l: "+1M", d: 30 }].map(btn => (
            <button
              key={btn.l}
              onClick={() => { const nd = new Date(date); nd.setDate(nd.getDate() + btn.d); btn.d === 0 ? setDate(new Date()) : setDate(nd); }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono transition ${btn.d === 0 ? 'bg-amber-400/20 text-amber-400 border-amber-400/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {btn.l}
            </button>
          ))}
        </div>
      </div>

      {/* CHART KUNDALI WITH FORMATTED STYLE */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl relative overflow-visible">
        <div className="flex justify-between items-center mb-6 relative z-20">
          <div className="text-xs t50 font-mono tracking-widest uppercase">Divisional View: D-1</div>
          <div className="relative">
            <button onClick={() => setShowStyleMenu(!showStyleMenu)} className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 hover:border-amber-400/50 transition">
              <span className="text-[10px] t50 font-mono uppercase tracking-widest">Style:</span>
              <span className="text-amber-400 text-[10px] font-bold font-mono uppercase">{chartStyle}</span>
              <i className={`ph ph-caret-${showStyleMenu ? 'up' : 'down'} text-amber-400 text-[10px]`}></i>
            </button>
            {showStyleMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-[#181b33] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {["NORTH", "SOUTH", "EAST", "KP"].map(s => (
                  <div key={s} onClick={() => { setChartStyle(s); setShowStyleMenu(false); }} className={`px-4 py-2 text-xs font-mono cursor-pointer hover:bg-white/10 ${chartStyle === s ? 'text-amber-400 bg-white/5' : 'text-white/70'}`}>{s}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center items-center min-h-[300px] relative z-10">
          {window.KundaliRenderer ? <window.KundaliRenderer ch={ch} chartStyle={formattedStyle} style={formattedStyle} /> : 
           window.renderKundali ? window.renderKundali(ch, formattedStyle) : 
           <div className="text-xs t50 font-mono border border-dashed border-white/10 p-10 rounded-xl text-center">Chart Engine Synced<br/><span className="text-amber-400">[{formattedStyle} STYLE]</span></div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DYNAMIC DASHA DRILLDOWN RESTORED */}
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
          </div>
          <div className="space-y-2">
            {ch.dasha?.slice(0, 4).map((d, i) => {
              const isActive = currentYear >= d.start && currentYear < d.end;
              return (
                <div key={i} className={`border rounded-xl p-3 transition-all ${isActive ? 'bg-amber-400/5 border-amber-400/30' : 'bg-black/20 border-white/5'}`}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDasha(expandedDasha === i ? null : i)}>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 't85'}`}>{isActive && <span className="mr-1">●</span>} {d.lord} Mahadasha</span>
                    <span className={`text-xs font-mono ${isActive ? 'text-amber-200' : 't60'}`}>{Math.floor(d.start)} - {Math.floor(d.end)} <i className={`ph ph-caret-${expandedDasha === i ? 'up' : 'down'} ml-2`}></i></span>
                  </div>
                  
                  {/* The missing drill-down code block! */}
                  {expandedDasha === i && (
                    <div className="mt-3 pt-3 border-t border-white/5 pl-2 space-y-3 gl-fadein">
                      {window.getAntardashas ? window.getAntardashas(d.lord, d.start, d.end).slice(0, 3).map((antar, aIdx) => (
                        <div key={aIdx}>
                          <div className="text-[10px] font-mono text-amber-200 font-bold mb-1">
                            ▶ {d.lord} - {antar.lord} Antar <span className="float-right t60">{window.formatYM ? window.formatYM(antar.start) : Math.floor(antar.start)}</span>
                          </div>
                          <div className="pl-4 space-y-1.5 border-l border-white/10 ml-1 mt-2">
                            {window.getPratyantarDashas ? window.getPratyantarDashas(antar.lord, antar.start, antar.end).slice(0, 3).map((prat, pIdx) => (
                              <div key={pIdx} className="text-[9px] font-mono t60 flex justify-between pl-2 relative">
                                <span className="absolute -left-1 top-1.5 w-1 h-[1px] bg-white/20"></span>
                                <span>↳ {prat.lord} Prat</span>
                                <span>{window.formatYM ? window.formatYM(prat.start) : Math.floor(prat.start)}</span>
                              </div>
                            )) : null}
                          </div>
                        </div>
                      )) : null}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* SHADBALA */}
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Shadbala & Planetary Power</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(ch.shadbala || {}).slice(0, 6).map(([planet, score]) => {
              const pInfo = window.PLANET_INFO[planet];
              const percentage = Math.min(100, (score / 600) * 100);
              return (
                <div key={planet} className="relative">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold flex items-center gap-1" style={{ color: pInfo?.color }}><span className="text-xs">{pInfo?.symbol}</span> {planet}</span>
                    <span className="t85 font-bold">{(score / 60).toFixed(1)} Rupas</span>
                  </div>
                  <div className="h-1.5 bg-black/50 rounded-full border border-white/5"><div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: pInfo?.color }}></div></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC TRANSIT TEXT RESTORED */}
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
              <div className="text-[10px] t60 font-mono leading-snug">
                {data.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl mb-6">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200 flex items-center gap-2">
            <i className="ph ph-sparkle"></i> Prescriptions for {weekday}
          </h3>
          <span className="text-[9px] text-amber-400/80 uppercase tracking-widest font-bold">● Active Hora Ruler: {activePlanet.symbol} {weekday === "Sun" ? "Sun" : weekday === "Mon" ? "Moon" : weekday === "Tue" ? "Mars" : weekday === "Wed" ? "Mercury" : weekday === "Thu" ? "Jupiter" : weekday === "Fri" ? "Venus" : "Saturn"}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 col-span-1 md:col-span-2 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Presiding Deity & Mantras</div>
            <div className="font-bold text-amber-200 text-sm">Adhidevata: {activePlanet.adhidevata}</div>
            <div className="t85 mt-2 bg-black/20 p-2 rounded border border-white/5">
              <span className="t50 text-[9px] uppercase block mb-1">Recite:</span>
              {activePlanet.beej}
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Gemstone</div>
            <div className="font-bold t100">{activePlanet.gem}</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Charity (Dana)</div>
            <div className="font-bold t100">{activePlanet.charity}</div>
          </div>
        </div>
      </div>

      {window.BiocycleWidget && <window.BiocycleWidget bioScores={bioScores} />}

    </div>
  );
};
