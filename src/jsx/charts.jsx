// src/jsx/charts.jsx
var React = window.React;
var { useState } = window.React;

window.KundaliRenderer = ({ ac, ch, kpTable, style, titleDesc, isExpert }) => {
  if (!ac) return <div className="p-4 text-center text-xs t60">No Chart Data Available</div>;

  return (
    <div className="space-y-3 w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center font-mono text-[10px] t60 border-b border-white/5 pb-2">
        <span>{titleDesc || "Natal Chart"}</span><span className="uppercase text-amber-300">Style: {style}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center p-6 bg-black/30 rounded-2xl border border-white/5 shadow-inner">
        <div className="text-center font-serif text-lg text-amber-200 mb-4">{ac.lagna} Lagna Chart</div>
        
        {/* FIX: Actually mapping planets into the house boxes! */}
        <div className="grid grid-cols-4 gap-2 z-10 text-[9px] font-mono text-center w-full">
          {Object.entries(ac.houses || {}).map(([houseNum, sign]) => {
            const hInt = parseInt(houseNum);
            const planetsInHouse = Object.entries(ac.placements || {}).filter(([p, h]) => parseInt(h) === hInt).map(([p]) => p);
            
            return (
              <div key={houseNum} className="p-2 bg-white/5 border border-white/10 rounded-xl min-h-[70px] flex flex-col items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-1 left-1.5 text-[8px] t40">{houseNum}</div>
                <div className="absolute top-1 right-1.5 font-bold text-amber-200/50">{sign.substring(0,3).toUpperCase()}</div>
                <div className="mt-auto mb-auto w-full flex flex-wrap justify-center gap-1">
                  {planetsInHouse.map(p => (
                    <span key={p} style={{ color: window.PLANET_INFO[p]?.color }} title={p} className="text-sm font-bold bg-black/50 w-6 h-6 rounded-full flex items-center justify-center border border-white/5">
                      {window.PLANET_INFO[p]?.symbol}
                    </span>
                  ))}
                  {planetsInHouse.length === 0 && <span className="t40">-</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isExpert && kpTable && (
        <div className="overflow-x-auto pt-4 gl-fadein">
          <table className="w-full text-[10px] font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 t50 uppercase">
                <th className="pb-2">Planet</th><th className="pb-2">Sign</th><th className="pb-2">Nakshatra</th><th className="pb-2">Sub Lord</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(kpTable).map(([p, info]) => (
                <tr key={p} className="hover:bg-white/5">
                  <td className="py-2 font-bold" style={{ color: window.PLANET_INFO[p]?.color }}>{p}</td><td className="py-2 t80">{info.sign}</td><td className="py-2 t80">{info.nak}</td><td className="py-2 text-amber-200">{info.sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
