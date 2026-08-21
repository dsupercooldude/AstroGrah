// src/jsx/charts.jsx
var React = window.React;
var { useState } = window.React;

window.KundaliRenderer = ({ ac, ch, kpTable, style, titleDesc, isExpert }) => {
  if (!ac) return <div className="p-4 text-center text-xs t60">No Chart Data Available</div>;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center font-mono text-[10px] t60 border-b border-white/5 pb-2"><span>{titleDesc || "Natal Chart"}</span><span className="uppercase text-amber-300">Style: {style}</span></div>
      <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-2xl border border-white/5">
        <div className="text-center font-serif text-sm text-amber-200 mb-2">{ac.lagna} Lagna Chart</div>
        <div className="w-full max-w-[320px] aspect-square border border-amber-400/30 relative bg-black/60 rounded-xl p-2 flex flex-col justify-between shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"><div className="w-[141%] h-[141%] border border-amber-400 rotate-45 absolute"></div><div className="w-full h-full border border-amber-400 absolute"></div></div>
          <div className="text-[10px] font-mono t8str z-10 text-center text-amber-300">Ascendant House: {ac.lagna} (Rashi Lord: {ac.lagnaLord || 'Sun'})</div>
          <div className="grid grid-cols-3 gap-1 z-10 text-[9px] font-mono text-center">
            {Object.entries(ac.houses || {}).map(([houseNum, sign]) => ( <div key={houseNum} className="p-1.5 bg-white/5 border border-white/5 rounded"><div className="text-[8px] t40">H-{houseNum}</div><div className="font-bold text-amber-200 truncate">{sign}</div></div> ))}
          </div>
        </div>
      </div>
    </div>
  );
};
