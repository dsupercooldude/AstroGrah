// src/jsx/tab-panchang.jsx
var React = window.React;
var { useState } = window.React;

window.PanchangTab = ({ d, setDate, p, utc, settings }) => {
  const { Icon, panchang, PLANET_INFO } = window;
  const [liveValidated, setLiveValidated] = useState(false);
  const [validating, setValidating] = useState(false);

  const pan = panchang ? panchang(d, settings?.monthSystem || "amanta", utc) : {};

  const fm = (dt) => {
    if (!dt) return "—";
    if (dt instanceof Date) return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    return typeof dt === "string" ? dt : "—";
  };

  const validateLivePanchang = async () => { /* Same as before */ };

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      {/* ... [KEEP HEADER, SUN/MOON RISE, AND GRID IDENTICAL] ... */}

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-amber-200 mb-4">Day Choghadiya Timings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(pan.chogDay || []).map((c, i) => ( 
              <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] flex flex-col justify-center shadow-inner">
                <span style={{ color: c.c }} className="font-bold text-xs block mb-0.5">{c.n}</span><span className="t50 text-[8px] font-mono uppercase">{c.d}</span>
                <div className="font-mono t85 text-[10px] mt-2 bg-white/5 py-1 px-2 rounded">{fm(c.s)} - {fm(c.e)}</div>
              </div> 
            ))}
        </div>
        
        {/* FIX: Night Choghadiya Render Block */}
        <h3 className="font-serif text-sm text-blue-200 mt-6 mb-4">Night Choghadiya Timings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(pan.chogNight || []).map((c, i) => ( 
              <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] flex flex-col justify-center shadow-inner opacity-80">
                <span style={{ color: c.c }} className="font-bold text-xs block mb-0.5">{c.n}</span><span className="t50 text-[8px] font-mono uppercase">{c.d}</span>
                <div className="font-mono t85 text-[10px] mt-2 bg-white/5 py-1 px-2 rounded">{fm(c.s)} - {fm(c.e)}</div>
              </div> 
            ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-blue-200 mb-4">Planetary Hora Tracking (24H)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* FIX: Combined Day + Night Horas */}
            {[...(pan.horas || []), ...(pan.nightHoras || [])].map((h, i) => ( 
              <div key={i} className="flex justify-between items-center p-3 bg-black/30 border border-white/5 rounded-xl text-xs hover:bg-white/5 transition">
                <div className="flex items-center gap-2">
                  <span className="t50 font-mono text-[9px] mr-1">{i + 1}.</span>
                  <span className="text-lg opacity-80" style={{ color: PLANET_INFO[h.p]?.color }}>{PLANET_INFO[h.p]?.symbol}</span>
                  <span style={{ color: PLANET_INFO[h.p]?.color }} className="font-bold tracking-wide">{h.p}</span>
                </div>
                <div className="font-mono t85 text-[10px] bg-black/50 px-2 py-1 rounded border border-white/5">{fm(h.s)} - {fm(h.e)}</div>
              </div> 
            ))}
        </div>
      </div>
    </div>
  );
};
