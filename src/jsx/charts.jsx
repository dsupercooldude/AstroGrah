const { Fragment } = window.React;

window.BiorhythmChart = ({ data, scores }) => {
    const w = 340, h = 100;
    const smoothPath = (key) => {
        if(data.length===0) return ""; let d = `M 0,${50 - data[0][key]*40}`;
        for (let i = 1; i < data.length; i++) {
            const x0 = ((i - 1) / (data.length - 1)) * w; const y0 = 50 - data[i - 1][key] * 40;
            const x1 = (i / (data.length - 1)) * w; const y1 = 50 - data[i][key] * 40;
            const xc = (x0 + x1) / 2; d += ` Q ${xc},${y0} ${xc},${y1} T ${x1},${y1}`;
        }
        return d;
    };
    return (
        <div className="w-full bg-[#121426] rounded-2xl border border-white/10 p-5 gl-fadein shadow-lg mt-4">
            <div className="flex justify-between items-center mb-6"><span className="font-mono text-[10px] text-amber-200/70 uppercase tracking-widest">15-Day Local Time Synchrony Wave</span><div className="flex gap-3 font-mono text-[9px]"><span className="text-[#E84855]">● Physical</span><span className="text-[#6495ED]">● Emotional</span><span className="text-[#F9C22E]">● Intellectual</span></div></div>
            <div className="w-full h-32 relative overflow-visible flex flex-col justify-end">
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <line x1="0" y1="50" x2={w} y2="50" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                    <line x1={w/2} y1="-10" x2={w/2} y2={h+10} stroke="rgba(212,165,116,0.4)" strokeDasharray="3 3" />
                    <path d={smoothPath('P')} fill="none" stroke="#E84855" strokeWidth="2.5" className="drop-shadow-lg" />
                    <path d={smoothPath('E')} fill="none" stroke="#6495ED" strokeWidth="2.5" className="drop-shadow-lg" />
                    <path d={smoothPath('I')} fill="none" stroke="#F9C22E" strokeWidth="2.5" className="drop-shadow-lg" />
                </svg>
                <div className="flex justify-between w-full px-1 mt-4 font-mono text-[9px] t100 font-bold"><span>-7 Days</span><span className="text-amber-300 bg-black/80 px-3 py-1 rounded shadow-lg border border-amber-400/20">Anchored Target Date</span><span>+7 Days</span></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#E84855] font-bold block mb-1">Physical ({scores.p}%)</span><span className="t85 leading-relaxed">{scores.p > 20 ? "Peak phase. High endurance and stamina for physical tasks." : (scores.p > -20 && scores.p <= 20 ? "Critical crossover day. High injury risk, rest." : "Recharge phase. Deep rest and recovery required.")}</span></div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#6495ED] font-bold block mb-1">Emotional ({scores.e}%)</span><span className="t85 leading-relaxed">{scores.e > 20 ? "High resilience, empathy, and creative flow." : (scores.e > -20 && scores.e <= 20 ? "Crossover instability. Avoid arguments today." : "Emotional withdrawal phase. Practice solitude.")}</span></div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#F9C22E] font-bold block mb-1">Intellectual ({scores.i}%)</span><span className="t85 leading-relaxed">{scores.i > 20 ? "Peak cognitive processing and analytical focus." : (scores.i > -20 && scores.i <= 20 ? "Decision making compromised. Brain fog." : "Reflective period. Delay major contracts.")}</span></div>
            </div>
        </div>
    );
};

window.KundaliRenderer = ({ ac, ch, kpTable, style="north", titleDesc="", isExpert }) => {
    if (!ac) return null;
    if (!isExpert) {
        let maxP = "Sun", maxScore = -1, minP = "Sun", minScore = 101;
        Object.entries(ch.shadbala).forEach(([p, s]) => { if(s > maxScore) { maxScore = s; maxP = p; } if(s < minScore) { minScore = s; minP = p; } });
        return (
            <div className="p-5 bg-black/30 rounded-xl border border-white/5 text-[13px] t85 leading-relaxed shadow-inner">
                <span className="text-amber-300 font-bold block mb-3 text-base font-serif border-b border-white/10 pb-2">Your Foundation Overview:</span>
                Your core outward personality and how others see you (Ascendant) is shaped by <strong>{ac.lagna}</strong>, meaning your natural physical energy is generally <em>{window.SIGN_TRAITS[ac.lagna]||"unique"}</em>.<br/><br/>
                Your deep emotional reactions, intuition, and inner thoughts are driven by your Moon sign <strong>{ch.moonSign}</strong> (currently placed in the {ch.nak} constellation). This means your psychological instincts are fundamentally <em>{window.SIGN_TRAITS[ch.moonSign]||"unique"}</em>.
                <br/><br/><span className="text-amber-200 font-bold block mt-3 mb-1 text-sm font-serif">Planetary Power Summary (Shadbala):</span>
                Your strongest guiding planet is <strong>{maxP} ({maxScore} pts)</strong>, which acts as your primary driving force and natural strength in life. Conversely, your most sensitive planet is <strong>{minP} ({minScore} pts)</strong>, indicating an area where you might need to apply conscious effort, patience, and remedial actions.
                <br/><br/><span className="text-[10px] italic t50 mt-2 block">Switch to <strong>Expert Mode</strong> above to view precise geometric astrological charts and planetary transits.</span>
            </div>
        );
    }
    
    if (style === "south") {
        return (
            <div className="grid grid-cols-4 gap-1 w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-black/40 p-2 shadow-inner mb-2 gl-fadein" style={{aspectRatio: '1/1'}}>
                {[ { s: "Pisces", r: 0, c: 0 }, { s: "Aries", r: 0, c: 1 }, { s: "Taurus", r: 0, c: 2 }, { s: "Gemini", r: 0, c: 3 }, { s: "Cancer", r: 1, c: 3 }, { s: "Leo", r: 2, c: 3 }, { s: "Virgo", r: 3, c: 3 }, { s: "Libra", r: 3, c: 2 }, { s: "Scorpio", r: 3, c: 1 }, { s: "Sagittarius", r: 3, c: 0 }, { s: "Capricorn", r: 2, c: 0 }, { s: "Aquarius", r: 1, c: 0 } ].map((bx) => {
                    const hNum = Object.entries(ac.houses||{}).find(([,sn])=>sn===bx.s)?.[0]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const isL = ac.lagna===bx.s; const trs = ch.transits && Object.entries(ch.transits).filter(([,sn])=>sn===bx.s).map(([p])=>p);
                    return ( <div key={bx.s} style={{gridRow:bx.r+1, gridColumn:bx.c+1}} className={`flex flex-col p-1.5 rounded-xl border text-[9px] relative overflow-hidden transition-all ${isL?'border-amber-400/60 bg-amber-400/10':'border-white/10 bg-white/5'}`}><div className="flex justify-between font-mono font-semibold t50 mb-0.5"><span>{bx.s.slice(0,3)}</span><span className={isL?'text-amber-300 font-bold':''}>{isL?'Lg':`H${hNum}`}</span></div><div className="flex flex-col gap-0.5 z-10">{pIn.map(p=><span key={p} style={{color:window.PLANET_INFO[p]?.color||'#fff'}} className="font-bold drop-shadow">{p.slice(0,3)}</span>)}</div>{trs && trs.length > 0 && <div className="mt-auto pt-1 border-t border-white/10 text-[8px] flex flex-wrap gap-0.5 z-10">{trs.map(p=><span key={'tr'+p} style={{color:window.PLANET_INFO[p]?.color||'#fff'}} className="italic opacity-80">+{p.slice(0,2)}</span>)}</div>}</div> )
                })}
                <div style={{gridRow:"2/4", gridColumn:"2/4"}} className="flex flex-col items-center justify-center p-2 text-center bg-black/20 rounded-xl border border-white/5 m-1"><span className="font-serif text-sm text-amber-200">South Indian</span><span className="font-mono text-[8px] t50 uppercase mt-0.5">Fixed Zodiac Grid</span><span className="font-mono text-[7px] t40 mt-1 italic max-w-[80%]">{titleDesc}</span></div>
            </div>
        );
    }
    if (style === "east") {
        return (
            <div className="grid grid-cols-3 gap-1 w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-black/40 p-2 shadow-inner mb-2 gl-fadein" style={{aspectRatio: '1/1'}}>
                {[ {s:"Pisces",r:0,c:0},{s:"Aries",r:0,c:1},{s:"Taurus",r:0,c:2},{s:"Aquarius",r:1,c:0},{s:"Gemini",r:1,c:2},{s:"Capricorn",r:2,c:0},{s:"Cancer",r:2,c:2},{s:"Sagittarius",r:3,c:0},{s:"Scorpio",r:3,c:1},{s:"Libra",r:3,c:2} ].map((bx) => {
                     const hNum = Object.entries(ac.houses||{}).find(([,sn])=>sn===bx.s)?.[0]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const isL = ac.lagna===bx.s;
                     return ( <div key={bx.s} style={{gridRow:bx.r+1, gridColumn:bx.c+1}} className={`flex flex-col p-1.5 rounded-xl border text-[9px] ${isL?'border-amber-400/60 bg-amber-400/10':'border-white/10 bg-white/5'}`}><div className="font-mono font-semibold t50">{bx.s.slice(0,3)}</div><div className="flex flex-col gap-0.5">{pIn.map(p=><span key={p} style={{color:window.PLANET_INFO[p]?.color||'#fff'}} className="font-bold">{p.slice(0,3)}</span>)}</div></div> )
                })}
                <div style={{gridRow:"2/4", gridColumn:"2/2"}} className="flex flex-col items-center justify-center p-2 text-center bg-black/20 rounded-xl border border-white/5 m-1"><span className="font-serif text-sm text-amber-200">East Indian</span><span className="font-mono text-[7px] t40 uppercase mt-1 italic">{titleDesc}</span></div>
            </div>
        );
    }
    if (style === "kp") {
        return (
            <div className="w-full max-w-[360px] mx-auto bg-black/40 rounded-2xl border border-white/10 p-3 mb-4 gl-fadein overflow-x-auto"><div className="flex flex-col items-center border-b border-white/10 pb-2 mb-2"><span className="font-serif text-xs text-amber-300">KP (Krishnamurti Padhdhati) 249 System</span><span className="font-mono text-[7px] t40 mt-1 italic">{titleDesc}</span></div>
                <table className="w-full text-left font-mono text-[9px]">
                    <thead><tr className="t50 border-b border-white/5"><th className="py-1">Cusp</th><th>Sign (Deg)</th><th>Star Lord</th><th>Sub Lord</th><th>Sub-Sub</th></tr></thead>
                    <tbody>{kpTable.map((row) => ( <tr key={row.cusp} className="border-b border-white/5 hover:bg-white/5"><td className="py-1 text-amber-400 font-bold">H{row.cusp}</td><td>{row.sign.slice(0,3)} {row.deg}°</td><td style={{color: window.PLANET_INFO[row.starLord]?.color}}>{row.starLord.slice(0,3)}</td><td style={{color: window.PLANET_INFO[row.subLord]?.color}} className="font-bold">{row.subLord.slice(0,3)}</td><td style={{color: window.PLANET_INFO[row.subSubLord]?.color}} className="opacity-70">{row.subSubLord.slice(0,3)}</td></tr> ))}</tbody>
                </table>
            </div>
        );
    }
    const hPos = { 1: {x:50, y:22}, 2: {x:25, y:12.5}, 3: {x:12.5, y:25}, 4: {x:25, y:50}, 5: {x:12.5, y:75}, 6: {x:25, y:87.5}, 7: {x:50, y:78}, 8: {x:75, y:87.5}, 9: {x:87.5, y:75}, 10: {x:75, y:50}, 11: {x:87.5, y:25}, 12: {x:75, y:12.5} };
    return (
        <div className="w-full max-w-[340px] mx-auto rounded-2xl bg-black/40 p-2 shadow-inner mb-2 relative gl-fadein" style={{aspectRatio: '1/1'}}>
            <svg viewBox="0 0 100 100" className="w-full h-full"><rect x="0" y="0" width="100" height="100" fill="transparent" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><polygon points="50,0 100,50 50,100 0,50" fill="transparent" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
                {Object.keys(hPos).map(hNum => { const sn = ac.houses[hNum]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const trs = ch.transits && Object.entries(ch.transits).filter(([,snT])=>snT===sn).map(([p])=>p); const {x, y} = hPos[hNum];
                    return ( <g key={`h${hNum}`}><text x={x} y={y-4} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{sn.slice(0,3)}</text><text x={x} y={y+2.5} fill="#D4A574" fontSize="5" textAnchor="middle" fontWeight="bold">H{hNum}</text>{pIn.map((p, i) => <text key={p} x={x} y={y+8+(i*5)} fill={window.PLANET_INFO[p]?.color} fontSize="5.5" textAnchor="middle" fontWeight="bold">{p.slice(0,3)}</text>)}{trs && trs.length > 0 && <text x={x} y={y+10+(pIn.length*5)} fill="rgba(255,255,255,0.6)" fontSize="4" textAnchor="middle" fontStyle="italic">+{trs.map(p=>p.slice(0,2)).join(',')}</text>}</g> );
                })}
            </svg><div className="absolute top-2 left-3 font-mono text-[8px] t40 uppercase tracking-widest leading-tight">North Indian Diamond<br/><span className="text-[6px] italic lowercase">{titleDesc}</span></div>
        </div>
    )
};
