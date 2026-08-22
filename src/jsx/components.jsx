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
window.NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purvaphalguni", "Uttaraphalguni", "Hasta", "Chitra", "Swati", "Visakha", "Anuradha", "Jyeshtha", "Mula", "Purvashadha", "Uttarashadha", "Abhijit", "Sravana", "Dhanistha", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"];

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

window.BiocycleWidget = ({ bioScores }) => {
  const p = bioScores?.p || 0; 
  const e = bioScores?.e || 0; 
  const i = bioScores?.i || 0;

  // Format to true 0-100% scale safely
  const dp = Math.round(((p + 1) / 2) * 100);
  const de = Math.round(((e + 1) / 2) * 100);
  const di = Math.round(((i + 1) / 2) * 100);

  return (
    <div className="font-mono">
      <div className="grid grid-cols-3 gap-4 text-center mb-4 relative z-10">
        <div className="bg-black/40 p-4 rounded-xl border border-red-500/30 shadow-lg backdrop-blur-sm"><div className="text-[10px] text-red-400 mb-1 tracking-widest">PHYSICAL</div><div className="text-xl text-white font-bold">{dp}%</div></div>
        <div className="bg-black/40 p-4 rounded-xl border border-blue-500/30 shadow-lg backdrop-blur-sm"><div className="text-[10px] text-blue-400 mb-1 tracking-widest">EMOTIONAL</div><div className="text-xl text-white font-bold">{de}%</div></div>
        <div className="bg-black/40 p-4 rounded-xl border border-amber-500/30 shadow-lg backdrop-blur-sm"><div className="text-[10px] text-amber-400 mb-1 tracking-widest">INTELLECTUAL</div><div className="text-xl text-white font-bold">{di}%</div></div>
      </div>
      
      {/* FIX: Expanded ViewBox boundaries & Overflow Visible so waves never clip */}
      <div className="relative w-full h-32 bg-gradient-to-b from-black/20 to-black/5 rounded-2xl border border-white/5 mt-2 p-2">
        <svg viewBox="0 -10 100 60" preserveAspectRatio="none" className="w-full h-full opacity-80 overflow-visible">
          
          <line x1="0" y1="20" x2="100" y2="20" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2,2" />
          
          {/* Dynamically calculated Beziers centered at Y=20, with Amplitude=20. ViewBox is -10 to 50, guaranteeing 10 units of safe padding above and below! */}
          <path d={`M 0 ${20 - (p*20)} C 25 ${20 + (p*25)}, 75 ${20 - (p*25)}, 100 ${20 + (p*20)}`} fill="none" stroke="#F87171" strokeWidth="2" />
          <path d={`M 0 ${20 - (e*20)} C 30 ${20 + (e*25)}, 70 ${20 - (e*25)}, 100 ${20 + (e*20)}`} fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3,2" />
          <path d={`M 0 ${20 - (i*20)} C 35 ${20 + (i*25)}, 65 ${20 - (i*25)}, 100 ${20 + (i*20)}`} fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6,3" />
          
          <line x1="50" y1="-10" x2="50" y2="50" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white/50 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">TODAY</div>
      </div>
    </div>
  );
};
