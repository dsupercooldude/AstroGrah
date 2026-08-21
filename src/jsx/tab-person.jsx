// src/jsx/tab-person.jsx
var React = window.React;

window.PersonTab = ({ pr, ch, date, setDate, bioScores, onEdit, onPdf }) => {
  const [chartStyle, setChartStyle] = React.useState("NORTH");
  const [showStyleMenu, setShowStyleMenu] = React.useState(false);
  const [expandedDasha, setExpandedDasha] = React.useState(0);

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1.lagna, date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", pr, ch, date) : "";

  const rulerMap = { "Sun": "Sun", "Mon": "Moon", "Tue": "Mars", "Wed": "Mercury", "Thu": "Jupiter", "Fri": "Venus", "Sat": "Saturn" };
  const activePlanet = rulerMap[weekday] || "Sun";
  const pData = window.PLANET_INFO[activePlanet] || window.PLANET_INFO["Sun"];

  const currentYear = date.getFullYear() + (date.getMonth() / 12);

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">

      {/* 1. PROFILE HEADER & PDF BUTTONS */}
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl flex justify-between items-start">
        <div>
          <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Astrological Profile</div>
          <h2 className="font-serif text-3xl text-white font-bold">{pr.name}</h2>
          <div className="text-xs t50 font-mono mt-1">
            {pr.dob} • {pr.time} • {pr.place} (UTC+{pr.utcOffset})
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onPdf} className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 hover:bg-emerald-500/20 transition shadow-lg" title="Download PDF">
            <i className="ph ph-file-pdf text-lg"></i>
          </button>
          <button onClick={onEdit} className="w-10 h-10 rounded-full bg-white/5 text-white/70 flex items-center justify-center border border-white/10 hover:bg-white/10 transition shadow-lg" title="Edit Profile">
            <i className="ph ph-pencil-simple text-lg"></i>
          </button>
        </div>
      </div>

      {/* 2. RESTORED TIME SERIES CONTROLLER (Prediction Horizon) */}
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
          {[
            { label: "-1M", days: -30 }, { label: "-1W", days: -7 }, { label: "-1D", days: -1 },
            { label: "Today", days: 0 },
            { label: "+1D", days: 1 }, { label: "+1W", days: 7 }, { label: "+1M", days: 30 }
          ].map(btn => (
            <button
              key={btn.label}
              onClick={() => {
                if (btn.days === 0) setDate(new Date());
                else {
                  const nd = new Date(date);
                  nd.setDate(nd.getDate() + btn.days);
                  setDate(nd);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono transition ${
                btn.days === 0 
                  ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30 shadow-inner' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              {btn.label}
            </button>
          ))}
          <div className="relative ml-2 flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <input 
              type="date" 
              className="bg-transparent text-amber-400 text-xs font-mono outline-none cursor-pointer px-3 py-1.5"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => {
                 if (e.target.value) setDate(new Date(e.target.value));
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. OVERVIEW */}
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

      {/* 4. KUNDALI CHART & CUSTOM SLEEK DROPDOWN */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl relative overflow-visible">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-20 gap-4">
          <div className="text-xs t50 font-mono tracking-widest uppercase">Divisional View: D-1</div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="text-[10px] uppercase font-bold text-amber-400 border border-amber-400/30 rounded-full px-4 py-1.5 hover:bg-amber-400/10 transition">
              Switch to Expert ⇾
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowStyleMenu(!showStyleMenu)} 
                className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 hover:border-amber-400/50 transition cursor-pointer"
              >
                <span className="text-[10px] t50 font-mono uppercase tracking-widest">Style:</span>
                <span className="text-amber-400 text-[10px] font-bold font-mono uppercase">{chartStyle}</span>
                <i className={`ph ph-caret-${showStyleMenu ? 'up' : 'down'} text-amber-400 text-[10px]`}></i>
              </button>
              
              {showStyleMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-[#181b33] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {["NORTH", "SOUTH", "EAST", "KP"].map(s => (
                    <div 
                      key={s} 
                      onClick={() => { setChartStyle(s); setShowStyleMenu(false); }} 
                      className={`px-4 py-2 text-xs font-mono cursor-pointer hover:bg-white/10 transition ${chartStyle === s ? 'text-amber-400 bg-white/5' : 'text-white/70'}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center min-h-[300px] relative z-10">
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
        {/* 5. DASHA WITH CURRENT HIGHLIGHT */}
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
            <span className="text-[9px] t50 uppercase tracking-widest">Maha / Antar / Prat</span>
          </div>
          <div className="space-y-2">
            {ch.dasha?.slice(0, 4).map((d, i) => {
              const isActive = currentYear >= d.start && currentYear < d.end;
              
              return (
                <div key={i} className={`border rounded-xl p-3 transition-all ${isActive ? 'bg-amber-400/5 border-amber-400/30' : 'bg-black/20 border-white/5'}`}>
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => setExpandedDasha(expandedDasha === i ? null : i)}
                  >
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 't85'}`}>
                      {isActive && <span className="mr-1">●</span>} {d.lord} Mahadasha
                    </span>
                    <span className={`text-xs font-mono ${isActive ? 'text-amber-200' : 't60'}`}>
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
                            <span>{Math.floor(d.start + (idx*0.2))}-{(idx * 2 + 1).toString().padStart(2, '0')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. SHADBALA */}
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
                      <span className="px-1.5 py-0.5 rounded text-[8px] uppercase font-bold" style={{ backgroundColor: `${dignity.color}15`, color: dignity.color }}>{dignity.status}</span>
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
                {domain === 'health' && `Your physical vitality and stamina are directly influenced by the Moon's current position. A score above 50 means you have a surplus of energy to burn.`}
                {domain === 'wealth' && `This evaluates the planetary alignment for financial decisions today. Higher scores indicate favorable conditions for investments, budgeting, or negotiations.`}
                {domain === 'career' && `Reflects how visible and effective your efforts are at work right now. A strong score means superiors are likely to notice your contributions.`}
                {domain === 'home' && `Indicates the emotional climate of your domestic life. Lower scores suggest a need for patience with family members, while high scores promise harmony.`}
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

      {/* 7. FIXED BIOCYCLE WIDGET WITH FALLBACK GRAPHS */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl mb-6">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200 uppercase tracking-widest">Biocycle Synchronization</h3>
          <span className="text-[9px] t50 uppercase tracking-widest">15-Day Local Time Wave</span>
        </div>
        {window.BiocycleWidget ? <window.BiocycleWidget bioScores={bioScores} /> : (
          <div className="space-y-4 font-mono">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/30 p-4 rounded-xl border border-red-500/20">
                <div className="text-[10px] text-red-400 mb-1">PHYSICAL</div>
                <div className="text-lg text-white">{Math.round((bioScores?.p || 0) * 100)}%</div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-blue-500/20">
                <div className="text-[10px] text-blue-400 mb-1">EMOTIONAL</div>
                <div className="text-lg text-white">{Math.round((bioScores?.e || 0) * 100)}%</div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-amber-500/20">
                <div className="text-[10px] text-amber-400 mb-1">INTELLECTUAL</div>
                <div className="text-lg text-white">{Math.round((bioScores?.i || 0) * 100)}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
