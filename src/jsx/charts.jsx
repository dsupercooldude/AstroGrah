// src/jsx/charts.jsx
var React = window.React;
var { useState } = window.React;

window.KundaliRenderer = ({ ac, ch, kpTable, style, titleDesc, isExpert }) => {
  if (!ac) return <div className="p-4 text-center text-xs t60">No Chart Data Available</div>;

  const st = style.toLowerCase();
  
  // FIX: Maps planets to the correct house index for drawing
  const getHousePlanets = (h) => {
    return Object.entries(ac.placements || {})
      .filter(([p, houseStr]) => parseInt(houseStr) === parseInt(h))
      .map(([p]) => p);
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center justify-center p-6 bg-black/30 rounded-2xl border border-white/5 shadow-inner">
        <div className="text-center font-serif text-lg text-amber-200 mb-6">{ac.lagna} Lagna Chart</div>

        {/* NORTH INDIAN CHART (DIAMOND SVG) */}
        {st === "north" && (
          <div className="relative w-full max-w-[320px] aspect-square border-2 border-amber-400/50 bg-black/60 rounded p-2">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full stroke-amber-400/40" strokeWidth="0.5" fill="none">
              <line x1="0" y1="0" x2="100" y2="100" /><line x1="100" y1="0" x2="0" y2="100" />
              <polygon points="50,0 100,50 50,100 0,50" />
            </svg>
            <div className="absolute inset-0 font-mono text-[9px] font-bold text-center">
              {/* House 1 */} <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[1].slice(0,3)}</div>{getHousePlanets(1).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 2 */} <div className="absolute top-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[2].slice(0,3)}</div>{getHousePlanets(2).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 3 */} <div className="absolute top-[20%] left-[15%] -translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[3].slice(0,3)}</div>{getHousePlanets(3).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 4 */} <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[4].slice(0,3)}</div>{getHousePlanets(4).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 5 */} <div className="absolute bottom-[20%] left-[15%] -translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[5].slice(0,3)}</div>{getHousePlanets(5).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 6 */} <div className="absolute bottom-[15%] left-[20%] -translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[6].slice(0,3)}</div>{getHousePlanets(6).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 7 */} <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[7].slice(0,3)}</div>{getHousePlanets(7).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 8 */} <div className="absolute bottom-[15%] right-[20%] translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[8].slice(0,3)}</div>{getHousePlanets(8).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 9 */} <div className="absolute bottom-[20%] right-[15%] translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[9].slice(0,3)}</div>{getHousePlanets(9).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 10 */}<div className="absolute top-1/2 right-[20%] translate-x-1/2 -translate-y-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[10].slice(0,3)}</div>{getHousePlanets(10).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 11 */}<div className="absolute top-[20%] right-[15%] translate-x-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[11].slice(0,3)}</div>{getHousePlanets(11).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
              {/* House 12 */}<div className="absolute top-[15%] right-[20%] translate-x-1/2 -translate-y-1/2 w-16 h-16"><div className="t50 mb-1">{ac.houses[12].slice(0,3)}</div>{getHousePlanets(12).map(p=><span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}</div>
            </div>
          </div>
        )}
// Inside KundaliRenderer in src/jsx/charts.jsx, change the South Indian block condition from:
// {st === "south" && ( ... )} 
// TO THIS:

        {/* SOUTH INDIAN & KP CHART (GRID) */}
        {(st === "south" || st === "kp") && (
          <div className="grid grid-cols-4 grid-rows-4 w-full max-w-[320px] aspect-square border-2 border-amber-400/50 bg-black/60 rounded">
            {[12,1,2,3, 11,null,null,4, 10,null,null,5, 9,8,7,6].map((h, i) => (
              <div key={i} className={`border border-amber-400/30 p-1 flex flex-col ${h ? '' : 'bg-transparent border-none'}`}>
                {h && (
                  <>
                    <div className="text-[8px] font-mono t50 text-center">{ac.houses[h].slice(0,3)} {h===1 ? '(As)' : ''}</div>
                    <div className="flex-1 flex flex-wrap content-center justify-center gap-1 font-mono text-[9px] font-bold mt-1">
                      {/* For KP, display actual planets in the sub/nakshatra. Since KP uses Placidus, we map the core planets down */}
                      {getHousePlanets(h).map(p => <span key={p} style={{color:window.PLANET_INFO[p].color}}>{window.PLANET_INFO[p].symbol}</span>)}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* DEFAULT/EAST/KP GRID FALLBACK */}
        {(st === "east" || st === "kp") && (
          <div className="grid grid-cols-4 gap-2 z-10 text-[9px] font-mono text-center w-full">
            {Object.entries(ac.houses || {}).map(([houseNum, sign]) => (
              <div key={houseNum} className="p-2 bg-white/5 border border-white/10 rounded-xl min-h-[70px] flex flex-col items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-1 left-1.5 text-[8px] t40">{houseNum}</div>
                <div className="absolute top-1 right-1.5 font-bold text-amber-200/50">{sign.substring(0,3).toUpperCase()}</div>
                <div className="mt-auto mb-auto w-full flex flex-wrap justify-center gap-1">
                  {getHousePlanets(houseNum).map(p => ( <span key={p} style={{ color: window.PLANET_INFO[p]?.color }} title={p} className="text-sm font-bold bg-black/50 w-6 h-6 rounded-full flex items-center justify-center border border-white/5">{window.PLANET_INFO[p]?.symbol}</span> ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {isExpert && kpTable && (
        <div className="overflow-x-auto pt-4 gl-fadein">
          <table className="w-full text-[10px] font-mono text-left border-collapse bg-black/40 border border-white/10 rounded-xl shadow-lg">
            <thead>
              <tr className="border-b border-white/10 t50 uppercase"><th className="pb-2 pt-2 pl-3">Planet</th><th className="pb-2 pt-2">Sign</th><th className="pb-2 pt-2">Nakshatra</th><th className="pb-2 pt-2">Sub Lord</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(kpTable).map(([p, info]) => (
                <tr key={p} className="hover:bg-white/5"><td className="py-2 pl-3 font-bold" style={{ color: window.PLANET_INFO[p]?.color }}>{p}</td><td className="py-2 t80">{info.sign}</td><td className="py-2 t80">{info.nak}</td><td className="py-2 text-amber-200">{info.sub}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

window.BiorhythmChart = ({ data, scores }) => { /* Existing Biorhythm UI */ return null; };
