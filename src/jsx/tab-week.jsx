// src/jsx/tab-week.jsx
var React = window.React;
var { useState, useEffect } = window.React;

window.WeekTab = ({ pr, ch }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 1500); return () => clearTimeout(timer); }, []);

  if (!ch) return null;
  const topPlanet = Object.entries(ch.shadbala || {}).sort((a,b)=>b[1]-a[1])[0]?.[0] || "Sun";

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl relative overflow-hidden">
        <h3 className="font-serif text-2xl text-amber-400 mb-6 flex items-center gap-3"><i className="ph ph-calendar-blank"></i> 7-Day Precision Forecast</h3>
        {isLoading ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner">
              <div className="text-[10px] text-amber-500 font-mono tracking-widest uppercase mb-2"><i className="ph ph-target"></i> Core Theme: {topPlanet} Dominance</div>
              <p className="text-sm t85 leading-relaxed">You are entering a highly structured 7-day window. With {topPlanet} holding max Shadbala power, expect situations that require you to step up as an authority figure or finalize delayed negotiations.</p>
            </div>
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner">
              <div className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase mb-2"><i className="ph ph-briefcase"></i> Career & Wealth</div>
              <p className="text-sm t85 leading-relaxed">Mid-week transits favor deep analytical work rather than aggressive expansion. Avoid signing major financial contracts on Tuesday; use this week to audit your active pipelines.</p>
            </div>
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner">
              <div className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2"><i className="ph ph-heart"></i> Harmony & Home</div>
              <p className="text-sm t85 leading-relaxed">With {topPlanet}'s power heightened, ensure your communication doesn't come across as overly dominant to family members. Practice active listening during the weekend.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
