// src/jsx/tab-person.jsx
var React = window.React;
var { useState, useEffect } = window.React;

window.PersonTab = ({ pr, ch, date, setDate, settings, bioScores, onEdit, onPdf }) => {
  const [chartStyle, setChartStyle] = useState(() => (settings?.kundaliStyle || "north").toUpperCase());
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [expandedDasha, setExpandedDasha] = useState(null);
  const [isExpert, setIsExpert] = useState(false);

  const currentYear = date.getFullYear() + (date.getMonth() / 12);

  useEffect(() => {
    setChartStyle((settings?.kundaliStyle || "north").toUpperCase());
  }, [settings?.kundaliStyle]);

  useEffect(() => {
    if (ch && ch.dasha) {
      const activeIndex = ch.dasha.findIndex(d => currentYear >= d.start && currentYear < d.end);
      setExpandedDasha(activeIndex !== -1 ? activeIndex : 0);
    }
  }, [ch, date]);

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  const weekday = window.WEEKDAY[date.getDay()];
  const gochara = window.generateDeepGochara ? window.generateDeepGochara(ch, ch.d1?.lagna || "Aries", date, weekday, bioScores || { p: 0, e: 0, i: 0 }) : {};
  const formattedStyle = chartStyle.charAt(0).toUpperCase() + chartStyle.slice(1).toLowerCase();

  const customScrollStyle = { scrollbarWidth: "thin", scrollbarColor: "rgba(251, 191, 36, 0.2) transparent" };
  const sankalp = pr.gotra ? `Om Tat Sat. Native ${pr.name}, of ${pr.gotra} Gotra, seeking blessings of ${pr.kulDevta || 'Kul Devta'} at ${pr.place}.` : null;

  const deepSynthesis = window.generateDeepSynthesis ? window.generateDeepSynthesis(pr, ch, bioScores || {p:0,e:0,i:0}, date) : {};
  const dynamicRx = deepSynthesis.dynamicPrescription || {};

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      <style>{`
        .beauty-scroll::-webkit-scrollbar { width: 6px; }
        .beauty-scroll::-webkit-scrollbar-track { background: transparent; }
        .beauty-scroll::-webkit-scrollbar-thumb { background-color: rgba(251, 191, 36, 0.2); border-radius: 10px; }
      `}</style>

      {/* HEADER & SANKALP */}
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl flex justify-between items-start">
        <div>
          <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Astrological Profile</div>
          <h2 className="font-serif text-3xl text-white font-bold">{pr.name}</h2>
          <div className="text-xs t50 font-mono mt-1">{pr.dob} • {pr.time} • {pr.place}</div>
          {sankalp && (
            <div className="text-[10px] text-emerald-300/80 font-mono italic mt-3 bg-emerald-900/10 inline-block px-3 py-1.5 rounded border border-emerald-500/20">
              {sankalp}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.dispatchEvent(new CustomEvent('generate-pdf'))} className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 hover:bg-emerald-500/20 transition shadow-lg">
            <i className="ph ph-file-pdf text-lg"></i>
          </button>
          <button onClick={() => onEdit(pr)} className="w-10 h-10 rounded-full bg-white/5 text-white/70 flex items-center justify-center border border-white/10 hover:bg-white/10 transition shadow-lg">
            <i className="ph ph-pencil-simple text-lg"></i>
          </button>
        </div>
      </div>

      {/* TIME HORIZON CONTROLLER */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl flex flex-col xl:flex-row justify-between items-center gap-4 relative z-20">
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-400 bg-amber-400/5 shadow-inner shrink-0">
            <i className="ph ph-clock-counter-clockwise text-xl"></i>
          </div>
          <div>
            <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">Active Prediction Horizon</div>
            <div className="font-serif text-xl text-white font-bold">{weekday}, {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/5 w-full xl:w-auto">
          {[{ l: "-1M", d: -30 }, { l: "-1W", d: -7 }, { l: "-1D", d: -1 }, { l: "Today", d: 0 }, { l: "+1D", d: 1 }, { l: "+1W", d: 7 }, { l: "+1M", d: 30 }].map(btn => (
            <button key={btn.l} onClick={() => { const nd = new Date(date); nd.setDate(nd.getDate() + btn.d); btn.d === 0 ? setDate(new Date()) : setDate(nd); }} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono transition ${btn.d === 0 ? 'bg-amber-400/20 text-amber-400 border-amber-400/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              {btn.l}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC AI JYOTISH SYNTHESIS */}
      <div className="bg-[#121426] p-6 rounded-3xl border border-amber-500/20 shadow-xl">
        <h3 className="font-serif text-amber-200 mb-4 text-lg flex items-center gap-2">
          <i className="ph ph-sparkle text-amber-400"></i> AI Jyotish Engine Synthesis
        </h3>
        {!isExpert ? (
          <div className="space-y-3 text-sm t85 leading-relaxed font-mono">
            <p><strong>The Core Self:</strong> {deepSynthesis.basicKundali}</p>
            <p><strong>Time & Cycles:</strong> {deepSynthesis.basicDasha}</p>
            <p><strong>Energy & Power:</strong> {deepSynthesis.basicPower}</p>
            <p><strong className="text-amber-100 block mb-1">Daily Synchronization</strong><span>{deepSynthesis.basicBio || "Your daily physical, emotional, and intellectual cycles are calculated below from your birth date and selected prediction date."}</span></p>
          </div>
        ) : (
          <p className="text-sm t85 leading-relaxed font-mono whitespace-pre-wrap">
            • <strong className="text-amber-100">Natal Strength:</strong> Your {ch.d1.lagna} Lagna sets a foundation. Moon placed in {ch.moonSign} demands emotional clarity.<br/>
            • <strong className="text-amber-100">Biorhythm Impact:</strong> Intellect operating at {Math.round(((bioScores?.i + 1)/2)*100)}%, favorable for processing.<br/>
            • <strong className="text-amber-100">Active Cycle:</strong> Governed by {ch.dasha[0]?.lord} Mahadasha.
          </p>
        )}
      </div>

      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl space-y-3">
        <h3 className="font-serif text-lg text-amber-200">Your Lagna and Chalit Chart in Plain Language</h3>
        <p className="text-xs t85 leading-relaxed font-mono">{deepSynthesis.lagnaMeaning}</p>
        <p className="text-xs t85 leading-relaxed font-mono">{deepSynthesis.chalitMeaning}</p>
      </div>

      {/* CHART KUNDALI ENGINE */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl relative overflow-visible">
        <div className="flex justify-between items-center mb-6 relative z-20">
          <div className="text-xs t50 font-mono tracking-widest uppercase">Divisional View: D-1</div>
          <div className="flex gap-2">
            <button onClick={() => setIsExpert(!isExpert)} className={`px-4 py-1.5 rounded-full border border-white/10 transition text-[10px] font-mono font-bold uppercase tracking-widest ${isExpert ? 'bg-amber-400 text-black' : 'bg-black/40 text-amber-400 hover:border-amber-400/50'}`}>
              {isExpert ? "Expert Mode" : "Basic Mode"}
            </button>
            <div className="relative">
              <button onClick={() => setShowStyleMenu(!showStyleMenu)} className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 hover:border-amber-400/50 transition">
                <span className="text-[10px] t50 font-mono uppercase tracking-widest">Style:</span>
                <span className="text-amber-400 text-[10px] font-bold font-mono uppercase">{chartStyle}</span>
                <i className={`ph ph-caret-${showStyleMenu ? 'up' : 'down'} text-amber-400 text-[10px]`}></i>
              </button>
              {showStyleMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-[#181b33] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {["NORTH", "SOUTH", "EAST", "KP"].map(s => (
                    <div key={s} onClick={() => { setChartStyle(s); setShowStyleMenu(false); }} className={`px-4 py-2 text-xs font-mono cursor-pointer hover:bg-white/10 ${chartStyle === s ? 'text-amber-400 bg-white/5' : 'text-white/70'}`}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[300px] relative z-10">
          {window.KundaliRenderer && <window.KundaliRenderer ac={ch.d1} ch={ch} kpTable={ch.kpTable} style={formattedStyle} isExpert={isExpert} />}
        </div>
      </div>

      {/* DASHAS AND SHADBALA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Vimshottari Dasha Drilldown</h3>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 beauty-scroll" style={customScrollStyle}>
            {ch.dasha?.map((d, i) => {
              const isActive = currentYear >= d.start && currentYear < d.end;
              return (
                <div key={i} className={`border rounded-xl p-3 transition-all ${isActive ? 'bg-amber-400/5 border-amber-400/30' : 'bg-black/20 border-white/5'}`}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedDasha(expandedDasha === i ? null : i)}>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 't85'}`}>
                      {isActive && <span className="mr-1">●</span>} {d.lord} Mahadasha
                    </span>
                    <span className={`text-xs font-mono ${isActive ? 'text-amber-200' : 't60'}`}>
                      {Math.floor(d.start)} - {Math.floor(d.end)} <i className={`ph ph-caret-${expandedDasha === i ? 'up' : 'down'} ml-2`}></i>
                    </span>
                  </div>
                  {expandedDasha === i && (
                    <div className="mt-3 pt-3 border-t border-white/5 pl-2 space-y-3 gl-fadein">
                      {window.getAntardashas && window.getAntardashas(d.lord, d.start, d.end).map((antar, aIdx) => {
                        const isAntarActive = currentYear >= antar.start && currentYear < antar.end;
                        return (
                        <div key={aIdx}>
                          <div className={`text-[10px] font-mono font-bold mb-1 ${isAntarActive ? 'text-amber-400' : 'text-amber-200/60'}`}>
                            ▶ {d.lord} - {antar.lord} Antar <span className="float-right t60">{window.formatYM ? window.formatYM(antar.start) : Math.floor(antar.start)}</span>
                          </div>
                          {isAntarActive && (
                            <div className="pl-4 space-y-1.5 border-l border-white/10 ml-1 mt-2">
                              {window.getPratyantarDashas && window.getPratyantarDashas(antar.lord, antar.start, antar.end).map((prat, pIdx) => (
                                <div key={pIdx} className={`text-[9px] font-mono flex justify-between pl-2 relative ${currentYear >= prat.start && currentYear < prat.end ? 'text-amber-300 font-bold' : 't60'}`}>
                                  <span className="absolute -left-1 top-1.5 w-1 h-[1px] bg-white/20"></span>
                                  <span>↳ {prat.lord} Prat</span>
                                  <span>{window.formatYM ? window.formatYM(prat.start) : Math.floor(prat.start)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )})}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
          <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
            <h3 className="font-serif text-sm text-amber-200">Shadbala & Planetary Power</h3>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 beauty-scroll" style={customScrollStyle}>
            {Object.entries(ch.shadbala || {}).sort((a,b)=>b[1]-a[1]).map(([planet, score]) => {
              const pInfo = window.PLANET_INFO[planet]; 
              const percentage = Math.min(100, (score / 600) * 100);
              return (
                <div key={planet} className="relative">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold flex items-center gap-1" style={{ color: pInfo?.color }}>
                      <span className="text-xs">{pInfo?.symbol}</span> {planet}
                    </span>
                    <span className="t85 font-bold">{(score / 60).toFixed(1)} Rupas</span>
                  </div>
                  <div className="h-1.5 bg-black/50 rounded-full border border-white/5">
                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: pInfo?.color }}></div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs t60 font-mono leading-relaxed mt-4 border-t border-white/10 pt-3">{deepSynthesis.shadbalaMeaning}</p>
        </div>
      </div>

      {/* GOCHARA / TRANSITS */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200">Gochara (Transit) Impact</h3>
          <span className="text-[9px] t50 uppercase tracking-widest">{weekday}, {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        {!isExpert && <p className="text-xs t60 font-mono mb-4">Transits (Gochara) measure where the planets are in the sky *today* and how they interact with your static birth chart.</p>}
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

      {/* DYNAMIC PRESCRIPTIONS */}
      <div className="bgcard rounded-3xl border border-white/10 p-5 shadow-xl mb-6">
        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
          <h3 className="font-serif text-sm text-amber-200 flex items-center gap-2"><i className="ph ph-sparkle"></i> Highly Personalized Remediation</h3>
          <span className="text-[9px] text-amber-400/80 uppercase tracking-widest font-bold">● Chart Driven</span>
        </div>
        <p className="text-xs t60 font-mono mb-4">{dynamicRx.action}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 col-span-1 md:col-span-2 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Presiding Deity (Lagnesh) & Active Dasha Mantra</div>
            <div className="font-bold text-amber-200 text-sm">Adhidevata: {dynamicRx.deity}</div>
            <div className="t85 mt-2 bg-black/20 p-2 rounded border border-white/5">
              <span className="t50 text-[9px] uppercase block mb-1">Recite:</span>
              {dynamicRx.mantra}
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Life Force Gemstone</div>
            <div className="font-bold t100">{dynamicRx.gem}</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 shadow-inner">
            <div className="t50 text-[9px] uppercase mb-1 tracking-widest">Karmic Charity (Dana)</div>
            <div className="font-bold t100">{dynamicRx.charity}</div>
          </div>
        </div>
      </div>

      {/* FIX: NOW PASSING DOB, TARGET DATE, AND UTC TO TRIGGER THE TRUE SINE WAVES */}
      {window.BiocycleWidget && <window.BiocycleWidget dob={pr.dob} targetDate={date} utcOffset={pr.utcOffset} />}
    </div>
  );
};
