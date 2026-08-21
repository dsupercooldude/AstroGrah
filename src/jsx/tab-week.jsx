// src/jsx/tab-week.jsx
var React = window.React;

window.WeekTab = ({ pr, ch }) => {
  const [forecast, setForecast] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState(null);

  const cacheKey = `ai_week_${pr?.name?.replace(/\s+/g, '_')}`;
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  const fetchWeeklyAI = (force = false) => {
    setIsLoading(true);
    const now = Date.now();

    if (!force) {
      try {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        if (cached && (now - cached.timestamp < oneWeekMs)) {
          setForecast(cached.data);
          setLastUpdated(new Date(cached.timestamp));
          setIsLoading(false);
          return;
        }
      } catch (e) {}
    }

    // SIMULATED AI CALL: Replace this block with your actual ai-rules.js fetch call
    setTimeout(() => {
      // Find the most powerful planet from Shadbala
      const topPlanet = Object.entries(ch.shadbala || {}).sort((a,b)=>b[1]-a[1])[0]?.[0] || "Sun";
      const activeDasha = ch.dasha?.[0]?.lord || "Jupiter";

      const generatedForecast = `### 7-Day Cosmic Horizon\n\nThis week is heavily influenced by your dominant planet, **${topPlanet}**, combined with your active **${activeDasha} Mahadasha**.\n\n**🌍 The Core Theme:**\nYou are entering a highly structured 7-day window. Expect situations that require you to step up as an authority figure or take responsibility for delayed projects.\n\n**💼 Career & Wealth:**\nMid-week transits favor deep analytical work rather than aggressive expansion. Avoid signing major financial contracts on Tuesday; instead, use this week to audit your resources.\n\n**❤️ Harmony & Relationships:**\nWith ${topPlanet}'s power heightened, ensure your communication doesn't come across as overly dominant to family members. Practice active listening.\n\n**✨ Weekly Prescription:**\nFocus on physical grounding. Your bio-rhythms suggest resting earlier than usual this weekend to recharge your emotional battery.`;
      
      localStorage.setItem(cacheKey, JSON.stringify({ data: generatedForecast, timestamp: now }));
      setForecast(generatedForecast);
      setLastUpdated(new Date(now));
      setIsLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    if (ch) fetchWeeklyAI();
  }, [ch]);

  if (!ch) return <div className="p-10 text-center t50 text-sm font-mono">Awaiting Astral Data...</div>;

  return (
    <div className="space-y-6 pb-12 gl-fadein mt-4">
      <div className="bgcard rounded-3xl border border-white/10 p-6 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-serif text-2xl text-amber-400 flex items-center gap-3">
              <i className="ph ph-calendar-blank"></i> 7-Day AI Oracle
            </h3>
            <p className="text-xs t50 font-mono mt-2">
              Deep synthesis of your Shadbala (Planet Powers) & Transits for the week.
            </p>
          </div>
          <button 
            onClick={() => fetchWeeklyAI(true)}
            className="text-[10px] uppercase font-bold text-amber-400 border border-amber-400/30 rounded-full px-4 py-2 hover:bg-amber-400/10 transition shadow-lg flex items-center gap-2"
          >
            <i className={`ph ph-arrows-clockwise ${isLoading ? 'animate-spin' : ''}`}></i> Refresh AI
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs text-amber-200 font-mono uppercase tracking-widest">Consulting the Vedic AI...</div>
          </div>
        ) : (
          <div>
            <div className="text-sm t85 leading-loose font-mono whitespace-pre-wrap bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
              {forecast}
            </div>
            {lastUpdated && (
              <div className="text-[10px] t50 font-mono text-right mt-4 italic">
                Valid until: {new Date(lastUpdated.getTime() + oneWeekMs).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
