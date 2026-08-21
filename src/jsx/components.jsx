// src/jsx/components.jsx
var React = window.React;

// --- 0. ERROR BOUNDARY & IDLE TIMEOUT HOOK ---
window.ErrorBoundary = class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0b0d19] text-[#F2EFE6] font-sans">
          <div className="w-full max-w-md bgcard2 p-6 rounded-3xl border border-red-500/40 text-center shadow-2xl gl-fadein">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-3 text-red-400">
              <i className="ph ph-warning-octagon" style={{ fontSize: 24 }}></i>
            </div>
            <h2 className="font-serif text-xl text-red-400 mb-1">System Execution Fault: {this.state.error?.message}</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-amber-400 text-black font-bold rounded-full px-6 py-2 text-xs hover:bg-amber-300 transition"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
};

window.useIdleTimeout = (onIdle, timeoutMs = 300000) => {
  const { useEffect } = window.React;
  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(onIdle, timeoutMs);
    };
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [onIdle, timeoutMs]);
};

// --- 1. ASTROLOGICAL METADATA ---
window.GOTRAS = ["Kashyapa", "Bharadwaja", "Vasistha", "Vishwamitra", "Atri", "Gotama", "Jamadagni", "Agastya", "Kaundinya", "Gargya", "Shandilya", "Alambayana", "Parashara", "Sankhyayana", "Vatsa", "Satyashraya"];
window.JAATIS = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kayastha", "Bania", "Rajput", "Maratha", "Agarwal", "Bhatia", "Khatri", "Arora", "Reddy", "Nair", "Iyer", "Iyengar", "Jain", "Sindhi"];
window.SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
window.WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
window.NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purvaphalguni", "Uttaraphalguni", "Hasta", "Chitra", "Swati", "Visakha", "Anuradha", "Jyeshtha", "Mula", "Purvashadha", "Uttarashadha", "Abhijit", "Sravana", "Dhanistha", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"];

// --- 2. PLANETARY PROXY DICTIONARY ---
const basePlanetInfo = {
  Sun: { symbol: "☉", color: "#F87171", adhidevata: "Lord Shiva / Agni", beej: "Om Hram Hrim Hroum Sah Suryaya Namah", gem: "Ruby", charity: "Wheat or jaggery on Sunday" },
  Moon: { symbol: "☽", color: "#60A5FA", adhidevata: "Goddess Gauri", beej: "Om Shram Shrim Shroum Sah Chandramase Namah", gem: "Pearl", charity: "Milk or white rice on Monday" },
  Mars: { symbol: "♂", color: "#EF4444", adhidevata: "Lord Kartikeya", beej: "Om Kram Krim Kroum Sah Bhaumaya Namah", gem: "Red Coral", charity: "Red lentils on Tuesday" },
  Mercury: { symbol: "☿", color: "#34D399", adhidevata: "Lord Vishnu", beej: "Om Bram Brim Broum Sah Budhaya Namah", gem: "Emerald", charity: "Green moong dal on Wednesday" },
  Jupiter: { symbol: "♃", color: "#FBBF24", adhidevata: "Lord Brahma", beej: "Om Gram Grim Groum Sah Gurave Namah", gem: "Yellow Sapphire", charity: "Turmeric or chana dal on Thursday" },
  Venus: { symbol: "♀", color: "#F472B6", adhidevata: "Goddess Lakshmi", beej: "Om Dram Drim Droum Sah Shukraya Namah", gem: "Diamond", charity: "White clothes on Friday" },
  Saturn: { symbol: "♄", color: "#A78BFA", adhidevata: "Lord Yama", beej: "Om Pram Prim Proum Sah Shanaishcharaaya Namah", gem: "Blue Sapphire", charity: "Black sesame seeds on Saturday" },
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

// --- 3. UI COMPONENTS ---
window.SageLogo = ({ size = 32 }) => (
  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 shadow-lg" style={{ width: size, height: size }}>
    <span className="font-serif text-amber-300 font-bold" style={{ fontSize: size * 0.55 }}>ॐ</span>
  </div>
);

window.Icon = ({ name, size = 18, className = "" }) => (
  <i className={`ph ph-${name} ${className}`} style={{ fontSize: size }} />
);

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

// --- 4. ASTROLOGICAL UTILITY FUNCTIONS ---
window.formatYM = (decYear) => {
  const y = Math.floor(decYear);
  const m = Math.floor((decYear - y) * 12) + 1;
  return `${y}-${String(m).padStart(2, '0')}`;
};

window.getPlanetaryDignity = (planet, sign) => {
  const ownership = { Sun: ["Leo"], Moon: ["Cancer"], Mars: ["Aries", "Scorpio"], Mercury: ["Gemini", "Virgo"], Jupiter: ["Sagittarius", "Pisces"], Venus: ["Taurus", "Libra"], Saturn: ["Capricorn", "Aquarius"], Rahu: ["Aquarius"], Ketu: ["Scorpio"] };
  const exaltation = { Sun: "Aries", Moon: "Taurus", Mars: "Capricorn", Mercury: "Virgo", Jupiter: "Cancer", Venus: "Pisces", Saturn: "Libra", Rahu: "Taurus", Ketu: "Scorpio" };
  const debilitation = { Sun: "Libra", Moon: "Scorpio", Mars: "Cancer", Mercury: "Pisces", Jupiter: "Capricorn", Venus: "Virgo", Saturn: "Aries", Rahu: "Scorpio", Ketu: "Taurus" };

  if (exaltation[planet] === sign) return { status: "Exalted", color: "#34D399" };
  if (debilitation[planet] === sign) return { status: "Debilitated", color: "#F87171" };
  if (ownership[planet]?.includes(sign)) return { status: "Own Sign", color: "#FBBF24" };
  return { status: "Neutral", color: "rgba(242,239,230,0.7)" };
};

window.getAntardashas = (mahaLord, startYear, endYear) => {
  const order = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const years = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
  const totalYears = endYear - startYear;
  const startIdx = order.indexOf(mahaLord);
  let cur = startYear;
  
  return order.map((lord, i) => {
    const lordIdx = (startIdx + i) % 9;
    const actualLord = order[lordIdx];
    const duration = totalYears * (years[actualLord] / 120);
    const s = cur;
    const e = cur + duration;
    cur = e;
    return { lord: actualLord, start: s, end: e };
  });
};

window.getPratyantarDashas = (antarLord, startYear, endYear) => {
  const order = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const years = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
  const totalYears = endYear - startYear;
  const startIdx = order.indexOf(antarLord);
  let cur = startYear;
  
  return order.map((lord, i) => {
    const lordIdx = (startIdx + i) % 9;
    const actualLord = order[lordIdx];
    const duration = totalYears * (years[actualLord] / 120);
    const s = cur;
    const e = cur + duration;
    cur = e;
    return { lord: actualLord, start: s, end: e };
  });
};

// --- 5. BIORHYTHM & DYNAMIC ENGINE CALCS ---
window.bio = (dobStr, targetDate, utcOffset = 5.5) => {
  const dob = new Date(dobStr);
  const target = new Date(targetDate);
  const diffDays = (target - dob) / (1000 * 60 * 60 * 24);
  return {
    p: Math.sin((2 * Math.PI * diffDays) / 23),
    e: Math.sin((2 * Math.PI * diffDays) / 28),
    i: Math.sin((2 * Math.PI * diffDays) / 33)
  };
};

window.generateDeepGochara = (ch, lagnaSign, date, weekday, scores) => {
  return {
    health: { sc: Math.max(35, Math.min(95, scores.p * 100 + 50)), text: `With transits affecting your ${lagnaSign} ascendant and Moon in ${ch.moonSign}, your physical vitality currently sits at ${Math.round(scores.p * 100)}%.` },
    wealth: { sc: Math.max(40, Math.min(92, scores.e * 100 + 55)), text: `Financial alignment highlights prudent resource allocation and structured budgeting.` },
    career: { sc: Math.max(45, Math.min(98, scores.i * 100 + 50)), text: `Professional momentum benefits from active planetary periods under your current Dasha horizon.` },
    home: { sc: Math.max(30, Math.min(90, ((scores.p + scores.e) / 2) * 100 + 50)), text: `Domestic equilibrium remains steady with favorable lunar aspects supporting family harmony.` }
  };
};

window.runVedicRuleEngine = (query, pr, ch, date) => {
  return `### Comprehensive Astrological Outlook for ${pr.name}\n\n**Current Horizon (${date.toDateString()})**: Analyzing your Lagna (${ch.d1.lagna}) and Moon Sign (${ch.moonSign}), cosmic energies indicate steady progress across professional and personal milestones.\n\n* **Primary Focus**: Maintain mindfulness during key decision-making windows.\n* **Key Recommendation**: Align actions with your daily planetary hora and recommended charity practices.`;
};

window.calculatePlanetaryDetails = (placements, degrees) => {
  const details = {};
  Object.keys(placements || {}).forEach(p => {
    details[p] = { rashi: placements[p], longitudeStr: (degrees[p] || 0).toFixed(2) + "°", nakshatra: window.NAKSHATRAS[Math.floor(Math.random()*27)], pada: 2, status: "Direct" };
  });
  return details;
};

window.calculateJaiminiKarakas = (degrees) => {
  if (!degrees) return {};
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const sorted = planets.sort((a, b) => (degrees[b] % 30) - (degrees[a] % 30));
  return {
    "Atmakaraka (Soul)": sorted[0] || "Sun", "Amatyakaraka (Career)": sorted[1] || "Moon", "Bhratrukaraka (Siblings)": sorted[2] || "Mars", 
    "Matrukaraka (Mother)": sorted[3] || "Mercury", "Putrakaraka (Children)": sorted[4] || "Jupiter", "Gnatikaraka (Obstacles)": sorted[5] || "Venus", "Darakaraka (Spouse)": sorted[6] || "Saturn"
  };
};

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

window.panchang = (dateStr) => {
  const d = new Date(dateStr || Date.now());
  const sr = new Date(d); sr.setHours(6, 15, 0);
  const ss = new Date(d); ss.setHours(18, 45, 0);
  return { day: window.WEEKDAY[d.getDay()], tithi: "Shukla Paksha", nakshatra: "Rohini", yoga: "Siddhi", karana: "Bava", sunrise: sr, sunset: ss, rahu: "16:30 - 18:00", yama: "12:00 - 13:30", gulika: "15:00 - 16:30" };
};
