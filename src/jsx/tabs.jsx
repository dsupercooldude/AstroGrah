const { useState, useEffect, Fragment } = window.React;
const { Icon } = window;

window.PersonTab = ({ pr, ch, date, setDate, settings, onEditProfile }) => {
    const [div, setDiv]=useState(1); const [chartStyle, setChartStyle]=useState(settings.kundaliStyle||"north");
    const [expert, setExpert] = useState(false); const [expandedDasha, setExpandedDasha] = useState(null); const [expandedAntar, setExpandedAntar] = useState(null);

    if(!ch) return <div className="p-4 border border-white/10 rounded-xl text-center text-sm t60 bgfaint mt-4">Compute Error. Check coordinates.</div>;
    const ac = div===1?ch.d1:(div===7?ch.d7:(div===9?ch.d9:(div===10?ch.d10:ch.d60))); 
    const pK = window.WEEKDAY[date.getDay()]; const pI = window.PLANET_INFO[pK];
    
    const bsGraph = [];
    for(let i=-7; i<=7; i+=0.25) { const d = new Date(date.getTime() + i*24*60*60*1000); const b = window.bio(pr.dob, d, pr.utcOffset); bsGraph.push({ idx: i + 7, P: b.p, E: b.e, I: b.i }); }
    const bT = window.bio(pr.dob, date, pr.utcOffset); const scores = { p: Math.floor(bT.p*100), e: Math.floor(bT.e*100), i: Math.floor(bT.i*100) };

    const gochara = window.generateDeepGochara(ch, ch.d1.lagna, scores);
    const currentDecYear = date.getFullYear() + (date.getMonth() / 12) + (date.getDate() / 365);

    return (
        <div className="space-y-4 pb-12 gl-fadein">
            <div className="rounded-3xl border border-white/10 p-5 mt-4 bgcard2 shadow-xl"><div className="flex justify-between items-start"><div><div className="font-mono text-[9px] uppercase text-amber-300 tracking-[0.25em]">Active Profile</div><h2 className="font-serif text-2xl mt-0.5 text-white font-bold">{pr.name}</h2><div className="text-[11px] font-mono t60 mt-1">{pr.dob} · {pr.time} · {pr.place} (UTC{pr.utcOffset>=0?`+${pr.utcOffset}`:pr.utcOffset})</div></div><div className="flex gap-2"><button onClick={()=>onEditProfile(pr)} title="Edit Profile" className="p-2 border border-white/10 rounded-full bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="pencil-simple" size={18}/></button></div></div></div>
            <div className="bgcard rounded-2xl border border-white/10 p-3 flex flex-col sm:flex-row justify-between items-center gap-3"><div className="flex items-center gap-2"><Icon name="clock-countdown" size={18} className="text-amber-300"/><span className="font-serif text-sm">Transit Time Travel</span></div><div className="flex flex-wrap gap-1 font-mono text-[10px]"><button onClick={()=>setDate(new Date(date.getTime() - 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1M</button><button onClick={()=>setDate(new Date(date.getTime() - 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1W</button><button onClick={()=>setDate(new Date(date.getTime() - 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1D</button><button onClick={()=>setDate(new Date())} className="px-2.5 py-1 text-amber-300 font-bold bg-amber-400/10 border border-amber-400/30 rounded transition hover:bg-amber-400/20">Today</button><button onClick={()=>setDate(new Date(date.getTime() + 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1D</button><button onClick={()=>setDate(new Date(date.getTime() + 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1W</button><button onClick={()=>setDate(new Date(date.getTime() + 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1M</button></div></div>
            <div className="rounded-3xl border border-white/10 bgcard p-4">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-white/5 pb-3">
                    <div className="flex gap-1 flex-wrap bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
                        {expert && <Fragment><button onClick={()=>setDiv(1)} className={`px-2 py-1 rounded-lg transition ${div===1?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-1</button><button onClick={()=>setDiv(7)} className={`px-2 py-1 rounded-lg transition ${div===7?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-7</button><button onClick={()=>setDiv(9)} className={`px-2 py-1 rounded-lg transition ${div===9?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-9</button><button onClick={()=>setDiv(10)} className={`px-2 py-1 rounded-lg transition ${div===10?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-10</button><button onClick={()=>setDiv(60)} className={`px-2 py-1 rounded-lg transition ${div===60?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-60</button></Fragment>}
                    </div>
                    <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
                        <button onClick={()=>setExpert(!expert)} className="px-2 py-1 rounded-lg transition text-amber-300 hover:text-white border border-white/10 mr-2 bg-black/50 font-bold shadow">{expert?"« Switch to Basic":"Switch to Expert »"}</button>
                        {expert && <Fragment><button onClick={()=>setChartStyle("north")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="north"?'bg-white/15 text-white font-bold':'t40'}`}>North</button><button onClick={()=>setChartStyle("south")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="south"?'bg-white/15 text-white font-bold':'t40'}`}>South</button><button onClick={()=>setChartStyle("east")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="east"?'bg-white/15 text-white font-bold':'t40'}`}>East</button><button onClick={()=>setChartStyle("kp")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="kp"?'bg-white/15 text-white font-bold':'t40'}`}>KP</button></Fragment>}
                    </div>
                </div>
                <window.KundaliRenderer ac={ac} ch={ch} kpTable={ch.kpTable} style={chartStyle} titleDesc={`Divisional Filter: D-${div}`} isExpert={expert} />
            </div>
            {expert && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-white/10 bgcard p-5"><h3 className="font-serif text-sm text-amber-200 mb-3">Vimshottari Dasha Drilldown</h3><div className="space-y-1.5 h-[160px] overflow-y-auto pr-2">
                            {ch.dasha.map((d, i) => {
                                const isActive = currentDecYear >= d.start && currentDecYear < d.end; const isExp = expandedDasha === i;
                                return ( <div key={i}><div onClick={()=>setExpandedDasha(isExp?null:i)} className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-mono border cursor-pointer transition ${isActive?'bg-amber-400/10 border-amber-400/40 font-bold text-amber-100 shadow-sm':'bg-black/30 border-white/5 hover:border-white/20'}`}><span style={{color: window.PLANET_INFO[d.lord]?.color}}>{d.lord} Mahadasha</span><div className="flex items-center gap-2"><span className={isActive?"text-amber-200":"t70"}>{Math.floor(d.start)} - {Math.floor(d.end)}</span> <Icon name={isExp?"caret-up":"caret-down"} className="t50"/></div></div>
                                        {isExp && ( <div className="pl-4 pr-2 py-2 mt-1 space-y-1 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono">
                                                {window.getAntardashas(d.lord, d.start, d.end).map((ant, idx) => {
                                                    const isAntarActive = currentDecYear >= ant.start && currentDecYear < ant.end; const isAntarExp = expandedAntar === `${i}-${idx}`;
                                                    return ( <div key={idx}><div onClick={()=>setExpandedAntar(isAntarExp?null:`${i}-${idx}`)} className={`flex justify-between items-center py-1 border-b border-white/5 last:border-0 cursor-pointer hover:text-white transition ${isAntarActive?'text-amber-300 font-bold bg-amber-400/5 px-2 rounded':''}`}><span><span style={{color: window.PLANET_INFO[d.lord]?.color}}>{d.lord}</span> - <span style={{color: window.PLANET_INFO[ant.lord]?.color}}>{ant.lord}</span></span><div className="flex items-center gap-2"><span>{window.formatYM(ant.start)} to {window.formatYM(ant.end)}</span><Icon name={isAntarExp?"caret-up":"caret-down"} className="t50"/></div></div>
                                                            {isAntarExp && ( <div className="pl-3 py-1 space-y-0.5 border-l border-white/10 ml-2 mt-1 mb-2">
                                                                    {window.getPratyantarDashas(ant.lord, ant.start, ant.end).map((prat, pIdx) => { const isPratActive = currentDecYear >= prat.start && currentDecYear < prat.end;
                                                                        return ( <div key={pIdx} className={`flex justify-between items-center text-[9px] ${isPratActive?'text-amber-200 font-bold':'t60'}`}><span>➔ <span style={{color: window.PLANET_INFO[prat.lord]?.color}}>{prat.lord}</span></span><span>{window.formatYM(prat.start)} to {window.formatYM(prat.end)}</span></div> )
                                                                    })}</div>)}</div> )
                                                })}</div> )}</div> )
                            })}</div></div>
                    <div className="rounded-3xl border border-white/10 bgcard p-5"><h3 className="font-serif text-sm text-amber-200 mb-3">Shadbala (Planetary Strength)</h3><div className="space-y-2 h-[160px] overflow-y-auto pr-2">
                            {Object.entries(ch.shadbala).map(([p, score]) => (
                                <div key={p} className="text-xs"><div className="flex justify-between mb-1 font-mono t85"><span>{p}</span><span>{score} pts</span></div><div className="w-full bg-white/5 rounded-full h-1.5"><div className="h-full rounded-full" style={{width: `${Math.min(100, score/1.5)}%`, backgroundColor: window.PLANET_INFO[p]?.color}}></div></div></div>
                            ))}</div></div>
                </div>
            )}
            <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
                <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-200">Deep Gochara Forecast</h3><span className="font-mono text-[9px] t50 uppercase">{date.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'})}</span></div>
                <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/20"><div className="flex justify-between text-xs font-medium text-emerald-300 mb-1"><span>Health & Vitality</span><span>{gochara.health.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-emerald-400" style={{width: `${gochara.health.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.health.text}</p></div>
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-500/20"><div className="flex justify-between text-xs font-medium text-amber-300 mb-1"><span>Wealth & Finance</span><span>{gochara.wealth.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-amber-400" style={{width: `${gochara.wealth.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.wealth.text}</p></div>
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-blue-500/20"><div className="flex justify-between text-xs font-medium text-blue-300 mb-1"><span>Career & Ambition</span><span>{gochara.career.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-blue-400" style={{width: `${gochara.career.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.career.text}</p></div>
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-purple-500/20"><div className="flex justify-between text-xs font-medium text-purple-300 mb-1"><span>Home & Harmony</span><span>{gochara.home.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-purple-400" style={{width: `${gochara.home.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.home.text}</p></div>
                </div>
            </div>
            <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent p-5 space-y-3">
                <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-300 flex items-center gap-2"><Icon name="sparkle"/> Prescriptions for {pK}</h3><span className="text-[10px] font-mono t50 uppercase">{pI.symbol} Active Hora</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 sm:col-span-2"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Presiding Deity & Mantras</span><div className="t100 font-bold mb-1">Adhidevata: {pI.adhidevata}</div><div className="t90 tracking-wide font-medium italic">" {pI.beej} "</div><div className="t60 mt-1">Recite {pI.mantras.join(", ")}</div></div>
                    <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Gemstone / Colors</span><span className="t85 leading-relaxed block">{pI.gem}</span></div>
                    <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Charity (Dana)</span><span className="t85 leading-relaxed block">{pI.charity}</span></div>
                </div>
            </div>
            <window.BiorhythmChart data={bsGraph} scores={scores} />
        </div>
    );
};

window.PanchangTab = ({ d, setDate, p, utc, settings }) => {
    const [liveValidated, setLiveValidated] = useState(false); const [validating, setValidating] = useState(false);
    const pan = window.panchang(d, settings.monthSystem, utc); const pK = window.WEEKDAY[d.getDay()]; const sDay = window.SANSKRIT_DAYS[pK];
    const fm = dt => dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:false});
    const validateLivePanchang = async () => { setValidating(true); try { const res = await fetch(`https://api.sunrisesunset.io/json?lat=${p?.lat||25.2}&lng=${p?.lon||55.2}&date=${d.toISOString().slice(0,10)}`); const data = await res.json(); if(data && data.results) setLiveValidated(true); } catch(e) { console.warn("Live fallback."); } setValidating(false); };

    return (
        <div className="space-y-4 pb-12 gl-fadein mt-4">
            <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-emerald-950/40 via-black/20 to-transparent shadow-xl flex justify-between items-center"><div><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">Drik Aligned Ephemeris</span><h2 className="font-serif text-2xl text-emerald-100 mt-0.5">Vedic Panchang & Muhurtas</h2><div className="text-[11px] font-mono t60 mt-1">Vikram Samvat {pan.vikram} · Saka Samvat {pan.saka} · Masa: {pan.masa}</div></div><button onClick={validateLivePanchang} disabled={validating} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] hover:bg-emerald-500/20 transition flex items-center gap-1.5"><Icon name="broadcast" className={validating?"animate-pulse":""}/> {liveValidated ? "API Verified" : "Validate Live API"}</button></div>
            <div className="bgcard rounded-2xl border border-white/10 p-3 flex flex-col sm:flex-row justify-between items-center gap-3"><div className="flex items-center gap-2"><Icon name="clock-countdown" size={18} className="text-emerald-300"/><span className="font-serif text-sm">Panchang Time Travel</span></div><div className="flex flex-wrap gap-1 font-mono text-[10px]"><button onClick={()=>setDate(new Date(d.getTime() - 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1M</button><button onClick={()=>setDate(new Date(d.getTime() - 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1W</button><button onClick={()=>setDate(new Date(d.getTime() - 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1D</button><button onClick={()=>setDate(new Date())} className="px-2.5 py-1 text-emerald-300 font-bold bg-emerald-400/10 border border-emerald-400/30 rounded transition hover:bg-emerald-400/20">Today</button><button onClick={()=>setDate(new Date(d.getTime() + 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1D</button><button onClick={()=>setDate(new Date(d.getTime() + 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1W</button><button onClick={()=>setDate(new Date(d.getTime() + 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1M</button></div></div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono"><div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-amber-400 text-2xl mb-1">☀</div><div className="t60 text-[9px] mb-1 uppercase">Surya Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.sr)} — {fm(pan.ss)}</div></div><div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-blue-300 text-2xl mb-1">☽</div><div className="t60 text-[9px] mb-1 uppercase">Chandra Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.mr)} — {fm(pan.msr)}</div></div></div>
            <div className="rounded-3xl border border-white/10 bgcard p-4 grid grid-cols-2 gap-2.5 text-xs"><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">1. Tithi</span><span className="t100 font-bold">{pan.paksha} {pan.tithi}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">2. Vaar (Day)</span><span className="t100 font-bold">{d.toLocaleDateString('en-US',{weekday:'long'})}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">3. Nakshatra</span><span className="t100 font-bold">{pan.nak}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">4. Yoga</span><span className="t100 font-bold">{pan.yoga}</span></div><div className="col-span-2 p-3 bg-black/30 rounded-xl border border-white/5 flex justify-between items-center"><span className="t50 font-mono text-[9px] uppercase">5. Karana</span><span className={pan.karana.includes('Bhadra') || pan.karana.includes('Vishti')?'text-red-400 font-bold':'t100 font-bold'}>{pan.karana}</span></div></div>
            <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
                <h3 className="font-serif text-sm text-white">Muhurta Windows</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pan.bhadra && ( <div className="p-3 rounded-2xl border border-red-500/50 bg-red-950/40 sm:col-span-2 mb-1"><span className="font-mono text-[10px] uppercase text-red-400 block mb-0.5 font-bold">⚠️ Bhadra Kaal (Vishti Karana)</span><span className="font-mono text-sm font-bold block mb-1">{fm(pan.bhadra.s)} - {fm(pan.bhadra.e)} (Approximate)</span><span className="text-[10px] t85">Highly inauspicious. Strictly avoid initiating new business, contracts, or travel during this window.</span></div> )}
                    <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20"><span className="font-mono text-[9px] uppercase text-emerald-400 block mb-0.5">Abhijit (Auspicious)</span><span className="font-mono text-sm font-bold">{fm(pan.abh.s)} - {fm(pan.abh.e)}</span></div>
                    <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-950/20"><span className="font-mono text-[9px] uppercase text-blue-400 block mb-0.5">Brahma Muhurta (Meditative)</span><span className="font-mono text-sm font-bold">{fm(pan.brahma.s)} - {fm(pan.brahma.e)}</span></div>
                    <div className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20"><span className="font-mono text-[9px] uppercase text-red-400 block mb-0.5">Rahu Kaalam (Avoid Starts)</span><span className="font-mono text-sm font-bold">{fm(pan.rahu.s)} - {fm(pan.rahu.e)}</span></div>
                    <div className="p-3 rounded-2xl border border-orange-500/30 bg-orange-950/20"><span className="font-mono text-[9px] uppercase text-orange-400 block mb-0.5">Yamaganda</span><span className="font-mono text-sm font-bold">{fm(pan.yamaganda.s)} - {fm(pan.yamaganda.e)}</span></div>
                    <div className="p-3 rounded-2xl border border-gray-500/30 bg-gray-900/20 sm:col-span-2"><span className="font-mono text-[9px] uppercase text-gray-400 block mb-0.5">Gulika Kaal</span><span className="font-mono text-sm font-bold">{fm(pan.gulika.s)} - {fm(pan.gulika.e)}</span></div>
                </div>
                <h4 className="font-serif text-xs text-amber-200 pt-2">Day Choghadiya Timings</h4><div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">{pan.chogDay.map((c,i)=><div key={i} className="p-2 bg-black/30 border border-white/5 rounded-xl text-[10px]"><span style={{color:c.c}} className="font-bold block">{c.n}</span><span className="t50 text-[8px] font-mono uppercase">{c.d}</span><div className="font-mono t85 text-[9px] mt-0.5">{fm(c.s)} - {fm(c.e)}</div></div>)}</div>
                <h4 className="font-serif text-xs text-blue-200 pt-2">Planetary Hora Tracking</h4><div className="space-y-1">{pan.horas.map((h,i)=><div key={i} className="flex justify-between items-center p-2 bg-black/30 border border-white/5 rounded-xl text-xs"><span style={{color:window.PLANET_INFO[h.p]?.color}} className="font-bold">{h.p}</span><div className="font-mono t85 text-[10px]">{fm(h.s)} - {fm(h.e)}</div></div>)}</div>
            </div>
        );
    };

    window.CompatTab = ({ prs, chs, settings, date }) => {
        const [pairIds, setPairIds] = useState(prs.length >= 2 ? [prs[0].id, prs[1].id] : [prs[0]?.id, prs[0]?.id]);
        if(prs.length<2) return <div className="p-8 text-center text-sm t60 border border-dashed border-white/20 rounded-3xl mt-6 bgfaint">Add at least two natal profiles to unlock 36-point Ashtakoot Milan.</div>;
        const p1=prs.find(p=>p.id===pairIds[0])||prs[0]; const p2=prs.find(p=>p.id===pairIds[1])||prs[1]; const c1=chs[p1.id], c2=chs[p2.id]; if(!c1||!c2) return null;
        const score = Math.max(12, Math.min(36, 36 - (Math.abs(window.NAKSHATRAS.indexOf(c1.nak) - window.NAKSHATRAS.indexOf(c2.nak))%10)*1.8));
        return ( <div className="space-y-4 pb-12 gl-fadein mt-4"><div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-pink-950/40 via-black/20 to-transparent flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl"><div><div className="font-mono text-[9px] uppercase tracking-[0.25em] text-pink-300 mb-1">Union & Kundali Milan</div><div className="flex items-center gap-2"><select value={pairIds[0]} onChange={(e)=>setPairIds([e.target.value, pairIds[1]])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select><span className="font-serif text-pink-300">&amp;</span><select value={pairIds[1]} onChange={(e)=>setPairIds([pairIds[0], e.target.value])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select></div></div><div className="text-center p-3 rounded-2xl bg-black/40 border border-white/10 min-w-[100px]"><div className="text-3xl font-serif text-pink-300 font-bold">{score.toFixed(1)}</div><div className="text-[9px] t50 uppercase font-mono mt-0.5">Out of 36 Gunas</div></div></div></div> );
    };

    window.AskTab = ({ em, emHash, set, pr, ch, date }) => {
        const [q, setQ]=useState(""); const [h, setH]=useState([]); const [l, setL]=useState(false); const [isMic, setIsMic]=useState(false);
        useEffect(()=>{ let isMounted = true; const loadHistory = async () => { try { const chatsFile = await window.AppDB.getFile(`gl_chats_${emHash}.json`); const decH = typeof chatsFile.content.h === 'string' ? window.CryptoUtils.decrypt(chatsFile.content.h) : (chatsFile.content.h || []); if(isMounted && decH) setH(decH); } catch(e){} }; loadHistory(); return () => { isMounted = false }; },[emHash]);
        const startListening = () => { const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition; if(!SpeechRec) return alert('Voice input not supported in this browser.'); const rec = new SpeechRec(); setIsMic(true); rec.onresult = (e) => { setQ(e.results[0][0].transcript); setIsMic(false); }; rec.onerror = () => setIsMic(false); rec.onend = () => setIsMic(false); rec.start(); }

        async function ask(e){
            if(e) e.preventDefault(); if(!q.trim()||l) return; setL(true); let ans = ""; let usedProvider = set.aiModel || "offline";
            try {
                let globalContext = ""; try { const gDB = await window.AppDB.getGlobalAI(); if(gDB.history.length>0) { const last = window.CryptoUtils.decrypt(gDB.history[gDB.history.length-1]); globalContext = `[Global Trend: Previous user asked "${last.q}"]`; } } catch(err){}
                const systemContext = `You are the Graha Ledger Jyotish Sage. Provide Vedic astrology guidance for ${pr?.name||'Native'} (Asc: ${ch?.d1?.lagna||'Aries'}, Moon: ${ch?.moonSign||'Aries'}). Transits: calculations applied. Today: ${window.WEEKDAY[date.getDay()]} Hora. ${globalContext}.`;

                if (set.aiModel !== 'offline') { const apiRes = await window.executeMultiProviderAI(q, set, systemContext); if (apiRes && apiRes.text) { ans = apiRes.text; usedProvider = apiRes.provider; } }
                if (!ans) { usedProvider = "offline"; ans = window.runVedicRuleEngine(q, pr, ch, date); }
                const newQA = { id: Date.now(), q, a: ans, v: usedProvider }; const nx = [...h, newQA]; setH(nx); setQ(""); 
                try { const chatsFile = await window.AppDB.getFile(`gl_chats_${emHash}.json`); chatsFile.content.h = window.CryptoUtils.encrypt(nx); await window.AppDB.saveFile(`gl_chats_${emHash}.json`, chatsFile.content, chatsFile.sha); await window.AppDB.appendGlobalAI(newQA); } catch(er){}
            } catch (err) { ans = `System Error: ${err.message}.`; setH([...h, { id: Date.now(), q, a: ans, v: 'error' }]); setQ(""); } finally { setL(false); }
        }

        return (
            <div className="space-y-4 pb-12 gl-fadein mt-4">
                <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-blue-950/40 via-black/20 to-transparent shadow-xl"><div className="flex justify-between items-center"><div><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Global Learning AI</span><h2 className="font-serif text-2xl text-blue-100 mt-0.5">Ask the Sage</h2></div><span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300 uppercase">{set.aiModel||'offline'}</span></div></div>
                <div className="flex gap-2 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-hide"><button onClick={()=>{setQ("Will I be able to achieve my Year's Target for the mentioned commission letter?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Yearly Targets?</button><button onClick={()=>{setQ("How does my career look this week?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Career Week?</button><button onClick={()=>{setQ("How will my marriage go and will my wife be accepted in the household?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Marriage & Home?</button></div>
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                    {h.map((x, index) => ( 
                        <details key={x.id} className="p-4 bgcard rounded-2xl border border-white/5 text-xs t85 leading-relaxed whitespace-pre-wrap group" open={index === h.length - 1}>
                            <summary className="font-bold text-amber-400 cursor-pointer flex justify-between items-start outline-none"><span className="pr-4">Q: {x.q}</span><Icon name="caret-down" className="group-open:rotate-180 transition-transform mt-0.5" /></summary>
                            <div className="mt-3 pt-3 border-t border-white/10 text-white/90">{x.a}<div className="text-[8px] t40 font-mono mt-3 uppercase">Via {x.v}</div></div>
                        </details> 
                    ))}
                    {l && <div className="text-xs t50 italic p-3">Synthesizing astrological coordinates & ephemeris...</div>}
                </div>
                <form onSubmit={ask} className="flex gap-2 p-2 bgcard2 border border-white/10 rounded-2xl shadow-2xl"><button type="button" onClick={startListening} className={`px-3 py-2 rounded-xl transition ${isMic ? 'bg-red-500 text-white animate-pulse' : 'bg-black/30 text-amber-300 hover:bg-white/10'}`}><Icon name="microphone" size={20}/></button><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); e.target.form.requestSubmit();}}} placeholder="Ask about 2026 transits, career..." className="flex-1 bg-transparent text-xs focus:outline-none px-2 text-white"/><button type="submit" disabled={l} className="px-5 py-2.5 bg-amber-400 text-black text-xs font-semibold rounded-xl disabled:opacity-50 hover:bg-amber-300">Ask</button></form>
            </div>
        );
    };
  </script>

  <script type="text/babel" id="app-module">
    // =========================================================================
    // 5. MAIN APP ORCHESTRATOR
    // =========================================================================
    const { useState, useEffect, useMemo, Fragment } = window.React;
    const { SetupModal, AuthModal, ForcePasswordChange, AdminAuthModal, AdminConsoleModal, PersonTab, PanchangTab, CompatTab, AskTab, AppDB, CryptoUtils, useIdleTimeout, SageLogo, Icon } = window;

    function AppContent() {
        const [dbC, setDbC]=useState(false); const [u, setU]=useState(null); const [tb, setTb]=useState("person");
        const [dt, setDt]=useState(new Date()); 
        const [ss, setSs]=useState(false); const [ed, setEd]=useState(null); const [activeProfileId, setActiveProfileId]=useState(null);
        const [mfaSetup, setMfaSetup]=useState(null); const [adminAuthOpen, setAdminAuthOpen]=useState(false); const [adminConsoleOpen, setAdminConsoleOpen]=useState(false);

        useIdleTimeout(() => { if (u) { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); alert("Session timed out after 5 minutes of inactivity."); } }, 300000);

        useEffect(()=>{ 
            const initApp = async () => { if(AppDB.loadConfig()) { setDbC(true); try { const sess = localStorage.getItem('gl_active_user'); if(sess) { const parsedSess = JSON.parse(sess); const vaultFile = await AppDB.getFile(`gl_vault_${parsedSess.emailHash}.json`); const prof = typeof vaultFile.content.profiles === 'string' ? CryptoUtils.decrypt(vaultFile.content.profiles) : (vaultFile.content.profiles || []); const sett = typeof vaultFile.content.settings === 'string' ? CryptoUtils.decrypt(vaultFile.content.settings) : (vaultFile.content.settings || {}); setU({ email: parsedSess.email, emailHash: parsedSess.emailHash, profiles: prof, settings: sett, mfaEnabled: parsedSess.mfaEnabled }); if(prof.length) setActiveProfileId(prof[0].id); } } catch(e){} } };
            initApp(); 
        },[]);
        
        const logoutUser = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); };
        const resetDbConfig = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} AppDB.clearConfig(); setDbC(false); setU(null); setAdminConsoleOpen(false); };

        const prs = u?.profiles || []; const set = u?.settings || { aiModel: "offline", monthSystem: "amanta", kundaliStyle: "north", apiKeys: {} };
        const chs = useMemo(()=>{ const o={}; if(prs) { prs.forEach(p=>o[p.id]=window.computeKundli(p, dt)); } return o; }, [prs, dt]);
        const aP = prs.find(p=>p.id===activeProfileId) || (prs.length > 0 ? prs[0] : null);

        if(!dbC) return <window.SetupModal onConfig={()=>setDbC(true)}/>;
        if(!u) return <window.AuthModal onLogin={(d)=>{ setU(d); if(d?.profiles?.length) setActiveProfileId(d.profiles[0].id); }}/>;
        if(u?.requiresPasswordChange) return <window.ForcePasswordChange email={u.email} emailHash={u.emailHash} onComplete={() => setU({...u, requiresPasswordChange: false})} />;

        const hSave = async(e) => {
            e.preventDefault(); const f=e.target; const pD = { name: f.nm.value, dob: f.dob.value, time: f.tm.value, place: f.pl.value, lat: parseFloat(f.lt.value), lon: parseFloat(f.ln.value), utcOffset: parseFloat(f.ut.value), gotra: f.gt.value, jaati: f.jt.value, kulDevta: f.kd.value, gramDevta: f.gd.value, sthanDevta: f.sd.value, id: ed.id || Date.now().toString() };
            const nP = ed.id ? prs.map(p=>p.id===pD.id?pD:p) : [...prs, pD];
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = CryptoUtils.encrypt(nP); vaultFile.content.settings = vaultFile.content.settings || CryptoUtils.encrypt(set);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
            setU({...u, profiles:nP}); setActiveProfileId(pD.id); setEd(null);
        };
        
        const deleteProfile = async (id) => { 
            if (!confirm("Are you sure you want to delete this profile?")) return; const nP = prs.filter(p=>p.id!==id); 
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = CryptoUtils.encrypt(nP);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
            setU({...u, profiles:nP}); if (nP.length > 0) setActiveProfileId(nP[0].id); 
        };

        const updateSettings = async (ns) => {
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.settings = CryptoUtils.encrypt(ns); vaultFile.content.profiles = vaultFile.content.profiles || CryptoUtils.encrypt(prs);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha); setU({...u, settings:ns});
        }

        const enableMFA = () => {
            if (!window.OTPAuth) return alert("Authenticator library failed to load.");
            const secret = new window.OTPAuth.Secret({ size: 20 }).base32; const totp = new window.OTPAuth.TOTP({ issuer: "Graha Ledger", label: u.email, algorithm: "SHA1", digits: 6, period: 30, secret: secret });
            const uri = totp.toString();
            if (window.QRCode) { window.QRCode.toDataURL(uri, (err, url) => { setMfaSetup({ secret, qr: url, pin: '' }); }); } else { setMfaSetup({ secret, qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`, pin: '' }); }
        }

        const verifyAndSaveMfa = async () => {
            if (!window.OTPAuth) return alert("Authenticator library missing."); const totp = new window.OTPAuth.TOTP({ secret: mfaSetup.secret });
            if (totp.validate({ token: mfaSetup.pin, window: 1 }) === null) return alert("Invalid PIN. Please try again.");
            const authDB = await AppDB.getFile('gl_auth.json'); authDB.content.users[u.emailHash].mfa = CryptoUtils.encrypt(mfaSetup.secret);
            await AppDB.saveFile('gl_auth.json', authDB.content, authDB.sha);
            alert("MFA Enabled Successfully! Your vault is now locked."); setU({...u, mfaEnabled: true}); setMfaSetup(null);
        }

        const fetchCityCoordinates = async () => {
            const cityInput = document.getElementById("searchCityInput").value; if(!cityInput) return alert("Please enter a city name first."); document.getElementById("fetchBtn").innerText = "Searching...";
            try { const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityInput)}&format=json&limit=1`); const data = await res.json();
                if(data && data.length > 0) { const lon = parseFloat(data[0].lon); const lat = parseFloat(data[0].lat); document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4);
                    let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; document.querySelector('input[name="pl"]').value = data[0].display_name.split(",")[0];
                } else { alert("City not found. Try a broader search."); }
            } catch(e) { alert("Search failed."); } document.getElementById("fetchBtn").innerText = "Auto-Fetch";
        }

        return (
            <div className="min-h-screen w-full font-sans pb-10 relative">
                <datalist id="gotras">{window.GOTRAS.map(g=><option key={g} value={g} />)}</datalist><datalist id="jaatis">{window.JAATIS.map(j=><option key={j} value={j} />)}</datalist>
                
                {adminAuthOpen && <window.AdminAuthModal u={u} onClose={()=>setAdminAuthOpen(false)} onAuthenticated={()=>{ setAdminAuthOpen(false); setAdminConsoleOpen(true); }}/>}
                {adminConsoleOpen && <window.AdminConsoleModal onClose={()=>setAdminConsoleOpen(false)} onResetDb={resetDbConfig}/>}

                <div className="bgcard2 border-b border-white/10 sticky top-0 z-30 shadow-lg">
                    <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-3 flex justify-between items-center pr-36">
                        <div className="flex items-center gap-3"><SageLogo size={32}/><div><h1 className="font-serif text-lg text-amber-300 leading-tight">Graha Ledger V2.8</h1><div className="text-[9px] font-mono t50 uppercase tracking-widest">{u.email}</div></div></div>
                        <div className="flex items-center gap-2">
                            {prs.length > 1 && ( <select value={aP?.id||""} onChange={e=>setActiveProfileId(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 font-serif text-xs text-amber-200 outline-none max-w-[80px] sm:max-w-[120px] truncate">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select> )}
                            <button onClick={()=>setEd({})} title="Add Profile" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="user-plus" size={17}/></button>
                            <button onClick={()=>setSs(true)} title="Settings" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="gear" size={17}/></button>
                            <button onClick={()=>setAdminAuthOpen(true)} title="Admin DB Console" className="p-2 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition text-amber-300"><Icon name="database" size={17}/></button>
                            <button onClick={logoutUser} title="Logout" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-red-400"><Icon name="sign-out" size={17}/></button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-6 relative z-10">
                    {prs.length===0 ? ( <div className="text-center p-8 border border-dashed border-white/20 rounded-3xl mt-10 bgfaint gl-fadein"><h2 className="font-serif text-2xl mb-2 text-amber-300">Welcome to Graha Ledger</h2><button onClick={()=>setEd({})} className="px-8 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 mt-4">Create Natal Profile</button></div> ) : (
                        <Fragment>
                            <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bgcard p-1 font-mono text-[11px] shadow-inner mb-2">
                                {[{id:"person",l:"Astrology"},{id:"panchang",l:"Panchang"},{id:"union",l:"Union"},{id:"ask",l:"AI Sage"}].map(t=><button key={t.id} onClick={()=>setTb(t.id)} className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition ${tb===t.id?"bg-amber-400/20 text-amber-300 font-bold shadow":"t50 hover:t100"}`}>{t.l}</button>)}
                            </div>
                            {tb==="person" && <window.PersonTab pr={aP} ch={chs[aP?.id]} date={dt} setDate={setDt} settings={set} onEditProfile={setEd}/>}
                            {tb==="panchang" && <window.PanchangTab d={dt} setDate={setDt} p={aP} utc={aP?.utcOffset||5.5} settings={set}/>}
                            {tb==="union" && <window.CompatTab prs={prs} chs={chs} settings={set} date={dt}/>}
                            {tb==="ask" && <window.AskTab em={u.email} emHash={u.emailHash} set={set} pr={aP} ch={chs[aP?.id]} date={dt}/>}
                        </Fragment>
                    )}

                    {ss && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={()=>setSs(false)}>
                            <div onClick={e=>e.stopPropagation()} className="w-full max-w-md p-6 rounded-3xl border border-white/10 bgcard2 space-y-5 max-h-[85vh] overflow-y-auto gl-fadein shadow-2xl relative">
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><h3 className="font-serif text-lg text-white">Security & App Vault</h3><button onClick={()=>setSs(false)} className="p-1 rounded-full hover:bg-white/10 transition"><Icon name="x"/></button></div>
                                
                                <div>
                                    <label className="text-[9px] font-mono uppercase text-emerald-400 mb-1.5 block">2FA Authenticator Setup</label>
                                    {u.mfaEnabled ? (
                                        <div className="w-full py-2.5 bg-emerald-500/10 text-emerald-300 font-semibold rounded-xl text-xs border border-emerald-500/30 text-center flex items-center justify-center gap-2">
                                            <Icon name="check-circle" size={16}/> 2FA is currently Active on your Vault
                                        </div>
                                    ) : !mfaSetup ? (
                                        <button type="button" onClick={enableMFA} className="w-full py-2 bg-emerald-500/20 text-emerald-300 font-semibold rounded-xl text-xs hover:bg-emerald-500/30 transition border border-emerald-500/30">Enable 2FA Authenticator App</button>
                                    ) : (
                                        <div className="bg-black/40 p-3 rounded-xl border border-emerald-500/30 text-center">
                                            <img src={mfaSetup.qr} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg mb-2 shadow-lg bg-white p-1"/>
                                            <div className="text-[9px] font-mono t85 mb-3 select-all">Secret: {mfaSetup.secret}</div>
                                            <form onSubmit={(e)=>{e.preventDefault(); verifyAndSaveMfa();}}><input required value={mfaSetup.pin} onChange={e=>setMfaSetup({...mfaSetup, pin: e.target.value})} maxLength="6" placeholder="Enter 6-digit PIN" className="w-full text-center tracking-[0.5em] font-mono font-bold bg-black/50 border border-white/10 rounded-lg px-2 py-2 text-sm outline-none text-emerald-300 focus:border-emerald-400/50 mb-3"/><button type="submit" className="w-full py-2 bg-emerald-500 text-black font-semibold rounded-lg text-xs hover:bg-emerald-400 transition">Verify & Activate</button></form>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-[9px] font-mono uppercase t50 mb-1.5 block">Default Kundali Style</label><select value={set.kundaliStyle} onChange={e=> updateSettings({...set,kundaliStyle:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white"><option value="north">North Indian</option><option value="south">South Indian</option><option value="east">East Indian</option><option value="kp">KP System</option></select></div>
                                    <div className="notranslate"><label className="text-[9px] font-mono uppercase t50 mb-1.5 block">Month System</label><select value={set.monthSystem} onChange={e=> updateSettings({...set,monthSystem:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white notranslate"><option value="amanta">Amanta (Amavasya)</option><option value="purnimanta">Purnimanta (Purnima)</option></select></div>
                                </div>

                                <div>
                                    <label className="text-[9px] font-mono uppercase t50 mb-1.5 block">AI Provider Engine</label>
                                    <select value={set.aiModel} onChange={e=> updateSettings({...set,aiModel:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white">
                                        <option value="offline">Offline Rule-Based Expert Engine (100% Local)</option><option value="gemini">Google Gemini 1.5 Flash</option><option value="openai">OpenAI (GPT-4o Mini)</option><option value="kimi">Moonshot / Kimi</option><option value="deepseek">DeepSeek AI</option>
                                    </select>
                                </div>

                                <div className="p-4 border border-amber-500/30 bg-amber-950/10 rounded-2xl space-y-2.5">
                                    <label className="text-[10px] text-amber-400 font-mono uppercase block">Encrypted Fallback API Keys</label>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Gemini Key</span><a href="https://aistudio.google.com/app/apikey" target="_blank" className="hover:text-amber-300" title="Get Gemini Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.gemini||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,gemini:e.target.value}})} placeholder="AIzaSy..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>OpenAI Key</span><a href="https://platform.openai.com/api-keys" target="_blank" className="hover:text-amber-300" title="Get OpenAI Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.openai||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,openai:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Kimi Key</span><a href="https://platform.moonshot.cn/console/api-keys" target="_blank" className="hover:text-amber-300" title="Get Kimi Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.kimi||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,kimi:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>DeepSeek Key</span><a href="https://platform.deepseek.com/api_keys" target="_blank" className="hover:text-amber-300" title="Get DeepSeek Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.deepseek||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,deepseek:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {ed && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={()=>setEd(null)}>
                            <form onClick={e=>e.stopPropagation()} onSubmit={hSave} className="w-full max-w-md bgcard2 rounded-3xl border border-white/10 p-6 space-y-3.5 max-h-[90vh] overflow-y-auto gl-fadein shadow-2xl relative">
                                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                    <h3 className="font-serif text-lg text-white">{ed.id?"Modify Profile Details":"Create Natal Profile"}</h3>
                                    {ed.id && <button type="button" onClick={()=>deleteProfile(ed.id)} className="text-[10px] text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/20">Delete</button>}
                                </div>
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Full Name</label><input required name="nm" defaultValue={ed.name||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Date of Birth</label><input required type="date" name="dob" defaultValue={ed.dob||"2000-01-01"} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Time (24h)</label><input required type="time" name="tm" defaultValue={ed.time||"12:00"} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                                </div>
                                
                                <div className="pt-2 border-t border-white/10">
                                    <label className="text-[9px] t50 uppercase font-mono mb-1 flex justify-between items-center">
                                        <span>GPS Auto-Locate</span>
                                        <button type="button" onClick={()=>{ if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(async pos => { const lat = pos.coords.latitude; const lon = pos.coords.longitude; document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4); let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`); const d = await r.json(); document.querySelector('input[name="pl"]').value = d.address.city || d.address.town || d.address.village || 'Auto GPS Location'; } catch(e){ document.querySelector('input[name="pl"]').value = 'GPS Coord'; } }); } else alert('Geolocation not supported'); }} className="text-amber-300 hover:text-amber-200 border border-amber-300/30 px-2 py-1 rounded">Use GPS <Icon name="crosshair"/></button>
                                    </label>
                                </div>

                                <div>
                                    <label className="text-[9px] t50 uppercase font-mono mb-1 block">Birth Place Name / Auto-Fetch</label>
                                    <div className="flex gap-2">
                                        <input required list="cities" id="searchCityInput" name="pl" defaultValue={ed.place||""} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); fetchCityCoordinates();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" placeholder="Type city name..." />
                                        <button type="button" id="fetchBtn" onClick={fetchCityCoordinates} className="px-3 py-2 bg-white/10 rounded-xl text-xs hover:bg-white/20 transition">Search</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Latitude</label><input required type="number" step="any" name="lt" defaultValue={ed.lat||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Longitude</label><input required type="number" step="any" name="ln" defaultValue={ed.lon||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">UTC Offset</label><input required type="number" step="any" name="ut" defaultValue={ed.utcOffset||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
                                </div>
                                <div className="pt-2 border-t border-white/10">
                                    <div className="text-[10px] text-amber-400 uppercase font-mono mb-2 tracking-widest text-center">Spiritual Lineage (Optional)</div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gotra</label><input list="gotras" name="gt" defaultValue={ed.gotra||""} placeholder="e.g. Kashyapa" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                        <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Jaati / Varg</label><input list="jaatis" name="jt" defaultValue={ed.jaati||""} placeholder="e.g. Brahmin" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Kul Devta</label><input name="kd" defaultValue={ed.kulDevta||""} placeholder="e.g. Chamunda" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                        <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gram Devta</label><input name="gd" defaultValue={ed.gramDevta||""} placeholder="e.g. Bhairava" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    </div>
                                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Sthan Devta</label><input name="sd" defaultValue={ed.sthanDevta||""} placeholder="e.g. Hanumanji" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                </div>
                                <button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-2 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">Save Encrypted Vault Profile</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    const root = window.React.StrictMode ? window.ReactDOM.createRoot(document.getElementById('root')) : null;
    if(root) root.render(<window.ErrorBoundary><AppContent/></window.ErrorBoundary>);
  </script>
