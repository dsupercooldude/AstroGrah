// src/jsx/tab-person.jsx
var React = window.React;

window.PersonTab = ({ pr, ch, date, setDate, bioScores, onEdit, onPdf }) => {
  const [chartStyle, setChartStyle] = React.useState("NORTH");
  const [expandedDasha, setExpandedDasha] = React.useState(0);

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1.lagna, date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const overviewText = window.runVedicRuleEngine ? window.runVedicRuleEngine("overview", pr, ch, date) : "";

  const rulerMap = { "Sun": "Sun", "Mon": "Moon", "Tue": "Mars", "Wed": "Mercury", "Thu": "Jupiter", "Fri": "Venus", "Sat": "Saturn" };
  const activePlanet = rulerMap[weekday] || "Sun";
  const pData = window.PLANET_INFO[activePlanet] || window.PLANET_INFO["Sun"];

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">

      {/* 1. RESTORED PROFILE HEADER & PDF BUTTONS */}
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl flex justify-between items-start">
        <div>
          <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Astrological Profile</div>
          <h2 className="font-serif text-3xl text-white font-bold">{pr.name}</h2>
          <div className="text-xs t50 font-mono mt-1">
            {pr.dob} • {pr.time} • {pr.place} (UTC{pr.utcOffset})
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

      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10 gap-4">
          <div className="text-xs t50 font-mono tracking-widest uppercase">Divisional View: D-1</div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="text-[10px] uppercase font-bold text-amber-400 border border-amber-400/30 rounded-full px-4 py-1.5 hover:bg-amber-400/10 transition">
              Switch to Expert ⇾
            </button>
            
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

      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
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

      {/* 2. RESTORED BIOCYCLE SYNCHRONIZATION WIDGET */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl mb-6">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200 uppercase tracking-widest">Biocycle Synchronization</h3>
          <span className="text-[9px] t50 uppercase tracking-widest">15-Day Local Time Wave</span>
        </div>
        {window.BiocycleWidget ? <window.BiocycleWidget bioScores={bioScores} /> : (
          <div className="grid grid-cols-3 gap-4 text-center font-mono">
            <div className="bg-black/30 p-4 rounded-xl border border-red-500/20">
              <div className="text-[10px] text-red-400 mb-1">PHYSICAL</div>
              <div className="text-lg text-white">{(bioScores?.p * 100 || 0).toFixed(0)}%</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-blue-500/20">
              <div className="text-[10px] text-blue-400 mb-1">EMOTIONAL</div>
              <div className="text-lg text-white">{(bioScores?.e * 100 || 0).toFixed(0)}%</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-amber-500/20">
              <div className="text-[10px] text-amber-400 mb-1">INTELLECTUAL</div>
              <div className="text-lg text-white">{(bioScores?.i * 100 || 0).toFixed(0)}%</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
