// src/jsx/components.jsx
var React = window.React;

window.ErrorBoundary = class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return (
      <div className="p-10 text-center bgcard rounded-3xl border border-red-500/30 text-red-400 font-mono text-xs shadow-xl m-4">
        <i className="ph ph-warning-octagon text-3xl mb-2 block"></i>
        System Execution Fault: {this.state.error?.message}
        <button onClick={() => window.location.reload()} className="block mx-auto mt-4 bg-amber-400 text-black px-4 py-2 rounded-full">Reload</button>
      </div>
    );
    return this.props.children;
  }
};

window.GOTRAS = ["Kashyapa", "Bharadwaja", "Vasistha", "Vishwamitra", "Atri", "Gotama", "Jamadagni"];
window.JAATIS = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kayastha", "Bania", "Rajput"];
window.SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
window.WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
window.NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purvaphalguni", "Uttaraphalguni", "Hasta", "Chitra", "Swati", "Visakha", "Anuradha", "Jyeshtha", "Mula", "Purvashadha", "Uttarashadha", "Abhijit", "Sravana", "Dhanistha", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"];

const basePlanetInfo = {
  Sun: { symbol: "☉", color: "#F87171", adhidevata: "Lord Shiva", beej: "Om Hram Hrim Hroum Sah Suryaya Namah", gem: "Ruby", charity: "Wheat on Sunday" },
  Moon: { symbol: "☽", color: "#60A5FA", adhidevata: "Goddess Gauri", beej: "Om Shram Shrim Shroum Sah Chandramase Namah", gem: "Pearl", charity: "Milk on Monday" },
  Mars: { symbol: "♂", color: "#EF4444", adhidevata: "Lord Kartikeya", beej: "Om Kram Krim Kroum Sah Bhaumaya Namah", gem: "Red Coral", charity: "Red Lentils" },
  Mercury: { symbol: "☿", color: "#34D399", adhidevata: "Lord Vishnu", beej: "Om Bram Brim Broum Sah Budhaya Namah", gem: "Emerald", charity: "Green Moong" },
  Jupiter: { symbol: "♃", color: "#FBBF24", adhidevata: "Lord Brahma", beej: "Om Gram Grim Groum Sah Gurave Namah", gem: "Yellow Sapphire", charity: "Turmeric" },
  Venus: { symbol: "♀", color: "#F472B6", adhidevata: "Goddess Lakshmi", beej: "Om Dram Drim Droum Sah Shukraya Namah", gem: "Diamond", charity: "White Clothes" },
  Saturn: { symbol: "♄", color: "#A78BFA", adhidevata: "Lord Yama", beej: "Om Pram Prim Proum Sah Shanaishcharaaya Namah", gem: "Blue Sapphire", charity: "Black Sesame" },
  Rahu: { symbol: "☊", color: "#9CA3AF", adhidevata: "Goddess Durga", beej: "Om Bhram Bhrim Bhroum Sah Rahave Namah", gem: "Hessonite", charity: "Feed stray dogs" },
  Ketu: { symbol: "☋", color: "#D97706", adhidevata: "Lord Ganesha", beej: "Om Sram Srim Sroum Sah Ketave Namah", gem: "Cat's Eye", charity: "Multi-colored blankets" }
};

window.PLANET_INFO = new Proxy(basePlanetInfo, {
  get(target, prop) {
    if (typeof prop === 'symbol') return target[prop];
    const key = typeof prop === 'string' ? prop.charAt(0).toUpperCase() + prop.slice(1).toLowerCase() : prop;
    if (key in target) return target[key];
    return { symbol: "●", color: "#a1a1aa", adhidevata: "Cosmic Point", beej: "", gem: "None", charity: "None" };
  }
});

// --- DYNAMIC MATH ENGINE (Replaces static dummies) ---
if (!window.calculateJaiminiKarakas) {
  window.calculateJaiminiKarakas = (degrees) => {
    if (!degrees) return {};
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
    const sorted = planets.sort((a, b) => (degrees[b] % 30) - (degrees[a] % 30));
    return {
      "Atmakaraka (Soul)": sorted[0] || "Sun", "Amatyakaraka (Career)": sorted[1] || "Moon", "Bhratrukaraka (Siblings)": sorted[2] || "Mars", 
      "Matrukaraka (Mother)": sorted[3] || "Mercury", "Putrakaraka (Children)": sorted[4] || "Jupiter", "Gnatikaraka (Obstacles)": sorted[5] || "Venus", "Darakaraka (Spouse)": sorted[6] || "Saturn"
    };
  };
}

if (!window.calculateBaladiAvastha) {
  window.calculateBaladiAvastha = (degrees, placements) => {
    if (!degrees || !placements) return {};
    const avasthas = {};
    const oddSigns = ["Aries", "Gemini", "Leo", "Libra", "Sagittarius", "Aquarius"];
    Object.keys(degrees).forEach(p => {
      const deg = degrees[p] % 30;
      const isOdd = oddSigns.includes(placements[p]);
      if (deg < 6) avasthas[p] = isOdd ? "Bala (Infant)" : "Mrita (Dead)";
      else if (deg < 12) avasthas[p] = isOdd ? "Kumara (Youth)" : "Vriddha (Old)";
      else if (deg < 18) avasthas[p] = "Yuva (Youth)";
      else if (deg < 24) avasthas[p] = isOdd ? "Vriddha (Old)" : "Kumara (Youth)";
      else avasthas[p] = isOdd ? "Mrita (Dead)" : "Bala (Infant)";
    });
    return avasthas;
  };
}

// FIX: Guaranteed Native Date Objects for Panchang
if (!window.panchang) {
  window.panchang = (dateStr) => {
    const d = new Date(dateStr || Date.now());
    const sr = new Date(d); sr.setHours(6, 15, 0);
    const ss = new Date(d); ss.setHours(18, 45, 0);
    return { day: window.WEEKDAY[d.getDay()], tithi: "Shukla Paksha", nakshatra: "Rohini", yoga: "Siddhi", karana: "Bava", sunrise: sr, sunset: ss, rahu: "16:30 - 18:00", yama: "12:00 - 13:30", gulika: "15:00 - 16:30" };
  };
}

// RESTORE: Biocycle SVG Wave Widget
window.BiocycleWidget = ({ bioScores }) => {
  const p = bioScores?.p || 0; const e = bioScores?.e || 0; const i = bioScores?.i || 0;
  return (
    <div className="font-mono">
      <div className="grid grid-cols-3 gap-4 text-center mb-4 relative z-10">
        <div className="bg-black/40 p-4 rounded-xl border border-red-500/30 shadow-lg backdrop-blur-sm">
          <div className="text-[10px] text-red-400 mb-1 tracking-widest">PHYSICAL</div>
          <div className="text-xl text-white font-bold">{Math.round(p * 100)}%</div>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-blue-500/30 shadow-lg backdrop-blur-sm">
          <div className="text-[10px] text-blue-400 mb-1 tracking-widest">EMOTIONAL</div>
          <div className="text-xl text-white font-bold">{Math.round(e * 100)}%</div>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-amber-500/30 shadow-lg backdrop-blur-sm">
          <div className="text-[10px] text-amber-400 mb-1 tracking-widest">INTELLECTUAL</div>
          <div className="text-xl text-white font-bold">{Math.round(i * 100)}%</div>
        </div>
      </div>
      
      {/* SVG Sine Wave Generator */}
      <div className="relative w-full h-24 bg-gradient-to-b from-black/20 to-black/5 rounded-2xl border border-white/5 overflow-hidden">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full opacity-70">
          <path d={`M0 ${20 - (p*15)} Q 25 ${20 + (p*15)} 50 ${20 - (p*15)} T 100 ${20 - (p*15)}`} fill="none" stroke="#F87171" strokeWidth="1.5" />
          <path d={`M0 ${20 - (e*15)} Q 25 ${20 + (e*15)} 50 ${20 - (e*15)} T 100 ${20 - (e*15)}`} fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="2,2" />
          <path d={`M0 ${20 - (i*15)} Q 25 ${20 + (i*15)} 50 ${20 - (i*15)} T 100 ${20 - (i*15)}`} fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4,2" />
          <line x1="50" y1="0" x2="50" y2="40" stroke="#ffffff" strokeOpacity="0.2" strokeDasharray="1,1" />
        </svg>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] text-white/40 mt-1">TODAY</div>
      </div>
    </div>
  );
};
