// src/jsx/components.jsx
var React = window.React;

window.ErrorBoundary = class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0b0d19] text-[#F2EFE6] font-sans">
          <div className="w-full max-w-md bgcard2 p-6 rounded-3xl border border-red-500/40 text-center shadow-2xl gl-fadein">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-3 text-red-400"><i className="ph ph-warning-octagon" style={{ fontSize: 24 }}></i></div>
            <h2 className="font-serif text-xl text-red-400 mb-1">System Execution Fault</h2>
            <p className="text-xs text-red-300 mb-4">{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} className="bg-amber-400 text-black font-bold rounded-full px-6 py-2 text-xs hover:bg-amber-300 transition">Reload Engine</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
};

window.useIdleTimeout = (onIdle, timeoutMs = 300000) => {
  var { useEffect } = window.React;
  useEffect(() => {
    let timer;
    const resetTimer = () => { clearTimeout(timer); timer = setTimeout(onIdle, timeoutMs); };
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => { clearTimeout(timer); events.forEach(event => window.removeEventListener(event, resetTimer)); };
  }, [onIdle, timeoutMs]);
};

window.GOTRAS = ["Kashyapa", "Bharadwaja", "Vasistha", "Vishwamitra", "Atri", "Gotama", "Jamadagni", "Agastya", "Kaundinya", "Gargya", "Shandilya", "Alambayana", "Parashara", "Sankhyayana", "Vatsa", "Satyashraya"];
window.JAATIS = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kayastha", "Bania", "Rajput", "Maratha", "Agarwal", "Bhatia", "Khatri", "Arora", "Reddy", "Nair", "Iyer", "Iyengar", "Jain", "Sindhi"];
window.SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
window.WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const basePlanetInfo = {
  Sun: { symbol: "☉", color: "#F87171", adhidevata: "Lord Shiva / Agni", beej: "Om Hram Hrim Hroum Sah Suryaya Namah", gem: "Ruby", charity: "Wheat or jaggery on Sunday", action: "Offer water to the Sun." },
  Moon: { symbol: "☽", color: "#60A5FA", adhidevata: "Goddess Gauri", beej: "Om Shram Shrim Shroum Sah Chandramase Namah", gem: "Pearl", charity: "Milk or white rice on Monday", action: "Practice meditation." },
  Mars: { symbol: "♂", color: "#EF4444", adhidevata: "Lord Kartikeya", beej: "Om Kram Krim Kroum Sah Bhaumaya Namah", gem: "Red Coral", charity: "Red lentils on Tuesday", action: "Constructive physical workouts." },
  Mercury: { symbol: "☿", color: "#34D399", adhidevata: "Lord Vishnu", beej: "Om Bram Brim Broum Sah Budhaya Namah", gem: "Emerald", charity: "Green moong dal on Wednesday", action: "Intellectual reading." },
  Jupiter: { symbol: "♃", color: "#FBBF24", adhidevata: "Lord Brahma", beej: "Om Gram Grim Groum Sah Gurave Namah", gem: "Yellow Sapphire", charity: "Turmeric or chana dal on Thursday", action: "Study sacred philosophy." },
  Venus: { symbol: "♀", color: "#F472B6", adhidevata: "Goddess Lakshmi", beej: "Om Dram Drim Droum Sah Shukraya Namah", gem: "Diamond", charity: "White clothes on Friday", action: "Appreciate fine arts." },
  Saturn: { symbol: "♄", color: "#A78BFA", adhidevata: "Lord Yama", beej: "Om Pram Prim Proum Sah Shanaishcharaaya Namah", gem: "Blue Sapphire", charity: "Black sesame seeds on Saturday", action: "Practice strict discipline." },
  Rahu: { symbol: "☊", color: "#9CA3AF", adhidevata: "Goddess Durga", beej: "Om Bhram Bhrim Bhroum Sah Rahave Namah", gem: "Hessonite", charity: "Feed stray dogs", action: "Embrace innovative thinking." },
  Ketu: { symbol: "☋", color: "#D97706", adhidevata: "Lord Ganesha", beej: "Om Sram Srim Sroum Sah Ketave Namah", gem: "Cat's Eye", charity: "Multi-colored blankets", action: "Deep spiritual introspection." }
};

window.PLANET_INFO = new Proxy(basePlanetInfo, {
  get(target, prop) {
    if (typeof prop === 'symbol') return target[prop];
    const key = typeof prop === 'string' ? prop.charAt(0).toUpperCase() + prop.slice(1).toLowerCase() : prop;
    if (key in target) return target[key];
    return { symbol: "●", color: "#a1a1aa", adhidevata: "Cosmic Point", beej: "", gem: "None", charity: "None", action: "None" };
  }
});

window.SageLogo = ({ size = 32 }) => (
  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 shadow-lg" style={{ width: size, height: size }}><span className="font-serif text-amber-300 font-bold" style={{ fontSize: size * 0.55 }}>ॐ</span></div>
);

window.Icon = ({ name, size = 18, className = "" }) => ( <i className={`ph ph-${name} ${className}`} style={{ fontSize: size }} /> );

window.BiocycleWidget = ({ dob, targetDate, utcOffset }) => {
  var { useState } = window.React;
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [visibleCycles, setVisibleCycles] = useState({ physical: true, emotional: true, intellectual: true, spiritual: true });

  if (!dob || !targetDate) return null;

  const getScores = (dayOffset) => {
    const day = new Date(targetDate);
    day.setDate(day.getDate() + dayOffset);
    return window.bio ? window.bio(dob, day, utcOffset) : { p: 0, e: 0, i: 0 };
  };
  const scores = getScores(selectedDay);
  const pScore = scores.p;
  const eScore = scores.e;
  const iScore = scores.i;
  const sScore = scores.s;

  // Scaled 0-100% Display
  const dp = Math.round(((pScore + 1) / 2) * 100);
  const de = Math.round(((eScore + 1) / 2) * 100);
  const di = Math.round(((iScore + 1) / 2) * 100);

  // DYNAMIC SINE WAVE GENERATOR (-15 days to +15 days)
  const getWave = (cycle) => {
    const [Y, M, D] = dob.split("-").map(Number);
    const eD = (Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()) - Date.UTC(Y, M - 1, D)) / 86400000;
    let path = "";
    for(let day = -15; day <= 15; day++) {
      const x = ((day + 15) / 30) * 100;
      const y = 20 - (Math.sin((2 * Math.PI * (eD + day)) / cycle) * 20);
      path += `${day === -15 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    return path;
  };

  const formatScore = (score) => `${Math.round(((score + 1) / 2) * 100)}%`;
  const handleChartClick = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setSelectedDay(Math.round(ratio * 30) - 15);
  };

  const handleSync = async () => {
    setLoading(true);
    const validationDate = new Date(targetDate);
    validationDate.setDate(validationDate.getDate() + selectedDay);
    const canonical = window.bio ? window.bio(dob, validationDate, utcOffset) : null;
    const matches = canonical && Math.abs(canonical.p - pScore) < 1e-12 && Math.abs(canonical.e - eScore) < 1e-12 && Math.abs(canonical.i - iScore) < 1e-12;
    setSynced(!!matches);
    setLoading(false);
    setTimeout(() => setSynced(false), 5000);
  };

  return (
    <div className="font-mono bgcard rounded-3xl border border-white/10 p-5 shadow-xl mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 border-b border-white/10 pb-2 gap-3">
        <h3 className="font-serif text-sm text-amber-200 flex items-center gap-2"><i className="ph ph-wave-sine"></i> 30-Day Biocycle Progression</h3>
        <div className="flex gap-3 items-center">
          <a href={`https://biorhythm-calculator.net/?dob=${dob}`} target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest text-blue-400 hover:underline flex items-center gap-1"><i className="ph ph-link"></i> Compare Online</a>
          <button onClick={handleSync} disabled={loading} className="px-3 py-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[9px] hover:bg-emerald-500/20 transition flex items-center gap-1.5 uppercase tracking-widest font-bold">
            <i className={`ph ph-arrows-clockwise ${loading ? "animate-spin" : ""}`} /> {loading ? "Checking..." : synced ? "Math Verified" : "Validate Math"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center mb-4 relative z-10">
        <div className="bg-black/40 p-3 rounded-xl border border-red-500/30 shadow-lg backdrop-blur-sm"><div className="text-[9px] text-red-400 mb-1 tracking-widest">PHYSICAL</div><div className="text-lg text-white font-bold">{dp}%</div></div>
        <div className="bg-black/40 p-3 rounded-xl border border-blue-500/30 shadow-lg backdrop-blur-sm"><div className="text-[9px] text-blue-400 mb-1 tracking-widest">EMOTIONAL</div><div className="text-lg text-white font-bold">{de}%</div></div>
        <div className="bg-black/40 p-3 rounded-xl border border-amber-500/30 shadow-lg backdrop-blur-sm"><div className="text-[9px] text-amber-400 mb-1 tracking-widest">INTELLECTUAL</div><div className="text-lg text-white font-bold">{di}%</div></div>
      </div>
      <div className="text-[10px] leading-relaxed text-white/60 font-sans mb-3">These three lines show your calculated physical energy, emotional balance, and mental focus for each day. The center marker is today; move across the chart or click it to inspect another date. This is a mathematical planning aid, not a medical diagnosis.</div>
      
      <div className="relative w-full h-40 bg-gradient-to-b from-black/20 to-black/5 rounded-2xl border border-white/5 mt-2 p-2 cursor-crosshair" onClick={handleChartClick} onMouseMove={handleChartClick} title="Move across or click the chart to inspect a day">
        <svg viewBox="0 -10 100 60" preserveAspectRatio="none" className="w-full h-full opacity-80 overflow-visible">
          <line x1="0" y1="20" x2="100" y2="20" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2,2" />
          
          {/* True Mathematical Sine Waves spanning 30 days */}
          {visibleCycles.physical && <path d={getWave(23)} fill="none" stroke="#F87171" strokeWidth="2" />}
          {visibleCycles.emotional && <path d={getWave(28)} fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,2" />}
          {visibleCycles.intellectual && <path d={getWave(33)} fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6,3" />}
          {visibleCycles.spiritual && <path d={getWave(38)} fill="none" stroke="#A78BFA" strokeWidth="2" strokeDasharray="2,3" />}
          
          <line x1="50" y1="-10" x2="50" y2="50" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2,2" />
          <line x1={`${((selectedDay + 15) / 30) * 100}`} y1="-10" x2={`${((selectedDay + 15) / 30) * 100}`} y2="50" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1" />
        </svg>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white/50 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">TODAY</div>
        <div className="absolute bottom-1 left-1 text-[8px] font-bold text-white/30">-15 DAYS</div>
        <div className="absolute bottom-1 right-1 text-[8px] font-bold text-white/30">+15 DAYS</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[9px] font-mono">
        {[{ id: "physical", label: "Physical", color: "text-red-300" }, { id: "emotional", label: "Emotional", color: "text-blue-300" }, { id: "intellectual", label: "Intellectual", color: "text-amber-300" }, { id: "spiritual", label: "Spiritual", color: "text-violet-300" }].map((item) => (
          <label key={item.id} className={`flex items-center gap-1.5 ${item.color}`}><input type="checkbox" checked={visibleCycles[item.id]} onChange={(event) => setVisibleCycles({ ...visibleCycles, [item.id]: event.target.checked })} />{item.label}</label>
        ))}
      </div>
      <div className="mt-3 text-center text-[10px] text-white/60 font-mono">{selectedDay === 0 ? "Today" : `${selectedDay > 0 ? "+" : ""}${selectedDay} days`} · Physical {formatScore(pScore)} · Emotional {formatScore(eScore)} · Intellectual {formatScore(iScore)} · Spiritual {formatScore(sScore)}</div>
    </div>
  );
};
