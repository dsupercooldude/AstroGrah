// src/jsx/tab-panchang.jsx
const { useState } = window.React;

window.PanchangTab = ({ d, setDate, p, utc, settings }) => {
  const { Icon, panchang, PLANET_INFO } = window;
  const [liveValidated, setLiveValidated] = useState(false);
  const [validating, setValidating] = useState(false);

  const pan = panchang(d, settings.monthSystem, utc);
  const fm = (dt) => dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  const validateLivePanchang = async () => {
    setValidating(true);
    try {
      const res = await fetch(`https://api.sunrisesunset.io/json?lat=${p?.lat || 25.2}&lng=${p?.lon || 55.2}&date=${d.toISOString().slice(0, 10)}`);
      const data = await res.json();
      if (data && data.results) {
          setLiveValidated(true);
          setTimeout(() => setLiveValidated(false), 4000); 
      }
    } catch (e) {}
    setValidating(false);
  };

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-emerald-950/40 via-black/20 to-transparent shadow-xl flex justify-between items-center">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">Drik Aligned Ephemeris</span>
          <h2 className="font-serif text-2xl text-emerald-100 mt-0.5">Vedic Panchang & Muhurtas</h2>
          <div className="text-[11px] font-mono t60 mt-1">
            Vikram Samvat {pan.vikram} · Saka Samvat {pan.saka} · Masa: {pan.masa}
          </div>
        </div>
        <button onClick={validateLivePanchang} disabled={validating} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] hover:bg-emerald-500/20 transition flex items-center gap-1.5">
          <Icon name="broadcast" className={validating ? "animate-pulse" : ""} /> {validating ? "Verifying..." : liveValidated ? "API Synced!" : "Validate Live API"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
        <div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-amber-400 text-2xl mb-1">☀</div><div className="t60 text-[9px] mb-1 uppercase">Surya Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.sr)} — {fm(pan.ss)}</div></div>
        <div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-blue-300 text-2xl mb-1">☽</div><div className="t60 text-[9px] mb-1 uppercase">Chandra Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.mr)} — {fm(pan.msr)}</div></div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-4 grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">1. Tithi</span><span className="t100 font-bold">{pan.paksha} {pan.tithi}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">2. Vaar (Day)</span><span className="t100 font-bold">{d.toLocaleDateString("en-US", { weekday: "long" })}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">3. Nakshatra</span><span className="t100 font-bold">{pan.nak}</span></div>
        <div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">4. Yoga</span><span className="t100 font-bold">{pan.yoga}</span></div>
        <div className="col-span-2 p-3 bg-black/30 rounded-xl border border-white/5 flex justify-between items-center"><span className="t50 font-mono text-[9px] uppercase">5. Karana</span><span className={pan.karana.includes("Bhadra") || pan.karana.includes("Vishti") ? "text-red-400 font-bold" : "t100 font-bold"}>{pan.karana}</span></div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
        <h3 className="font-serif text-sm text-white">Muhurta Windows</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pan.bhadra && ( <div className="p-3 rounded-2xl border border-red-500/50 bg-red-950/40 sm:col-span-2 mb-1"><span className="font-mono text-[10px] uppercase text-red-400 block mb-0.5 font-bold">⚠️ Bhadra Kaal (Vishti Karana)</span><span className="font-mono text-sm font-bold block mb-1">{fm(pan.bhadra.s)} - {fm(pan.bhadra.e)}</span><span className="text-[10px] t85">Highly inauspicious. Avoid starting new commercial contracts during this window.</span></div> )}
          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20"><span className="font-mono text-[9px] uppercase text-emerald-400 block mb-0.5">Abhijit (Auspicious)</span><span className="font-mono text-sm font-bold">{fm(pan.abh.s)} - {fm(pan.abh.e)}</span></div>
          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-950/20"><span className="font-mono text-[9px] uppercase text-blue-400 block mb-0.5">Brahma Muhurta (Meditative)</span><span className="font-mono text-sm font-bold">{fm(pan.brahma.s)} - {fm(pan.brahma.e)}</span></div>
          <div className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20"><span className="font-mono text-[9px] uppercase text-red-400 block mb-0.5">Rahu Kaalam (Avoid Starts)</span><span className="font-mono text-sm font-bold">{fm(pan.rahu.s)} - {fm(pan.rahu.e)}</span></div>
          <div className="p-3 rounded-2xl border border-orange-500/30 bg-orange-950/20"><span className="font-mono text-[9px] uppercase text-orange-400 block mb-0.5">Yamaganda</span><span className="font-mono text-sm font-bold">{fm(pan.yamaganda.s)} - {fm(pan.yamaganda.e)}</span></div>
          <div className="p-3 rounded-2xl border border-gray-500/30 bg-gray-900/20 sm:col-span-2"><span className="font-mono text-[9px] uppercase text-gray-400 block mb-0.5">Gulika Kaal</span><span className="font-mono text-sm font-bold">{fm(pan.gulika.s)} - {fm(pan.gulika.e)}</span></div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-amber-200 mb-4">Day Choghadiya Timings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pan.chogDay.map((c, i) => ( <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl text-[10px] flex flex-col justify-center shadow-inner"><span style={{ color: c.c }} className="font-bold text-xs block mb-0.5">{c.n}</span><span className="t50 text-[8px] font-mono uppercase">{c.d}</span><div className="font-mono t85 text-[10px] mt-2 bg-white/5 py-1 px-2 rounded">{fm(c.s)} - {fm(c.e)}</div></div> ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bgcard p-5">
        <h3 className="font-serif text-sm text-blue-200 mb-4">Planetary Hora Tracking</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pan.horas.map((h, i) => ( <div key={i} className="flex justify-between items-center p-3 bg-black/30 border border-white/5 rounded-xl text-xs hover:bg-white/5 transition"><div className="flex items-center gap-2"><span className="text-lg opacity-80" style={{ color: PLANET_INFO[h.p]?.color }}>{PLANET_INFO[h.p]?.symbol}</span><span style={{ color: PLANET_INFO[h.p]?.color }} className="font-bold tracking-wide">{h.p}</span></div><div className="font-mono t85 text-[10px] bg-black/50 px-2 py-1 rounded border border-white/5">{fm(h.s)} - {fm(h.e)}</div></div> ))}
        </div>
      </div>
    </div>
  );
};
