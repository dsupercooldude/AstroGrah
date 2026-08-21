// src/jsx/tab-union.jsx
const { useState } = window.React;

window.CompatTab = ({ prs, chs }) => {
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
