// src/jsx/tabs.jsx
var React = window.React;
var { useState, Fragment } = window.React;

window.TabOrchestrator = ({ pr, ch, date, setDate, settings, onEditProfile, prs, chs, u, setU, updateSettings }) => {
  const { PersonTab, ReportsTab, PanchangTab, CompatTab, AskTab, WeekTab, MonthTab } = window;
  const [tb, setTb] = useState("person");

  return (
    <Fragment>
      {/* FIX: Added scrollbar-hide to remove the ugly horizontal bar */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide rounded-2xl border border-white/10 bgcard p-1 font-mono text-[11px] shadow-inner mb-2">
        {[
          { id: "person", l: "Astrology & Dasha" },
          { id: "reports", l: "Advanced Reports" },
          { id: "panchang", l: "Panchang & Muhurta" },
          { id: "union", l: "Union Milan" },
          { id: "week", l: "7-Day AI" },
          { id: "month", l: "30-Day Macro" },
          { id: "ask", l: "Vedic AI Sage" }
        ].map((t) => (
          <button key={t.id} onClick={() => setTb(t.id)} className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition ${tb === t.id ? "bg-amber-400/20 text-amber-300 font-bold shadow" : "t50 hover:t100"}`}>
            {t.l}
          </button>
        ))}
      </div>
      
      {tb === "person" && <PersonTab pr={pr} ch={ch} date={date} setDate={setDate} settings={settings} onEdit={onEditProfile} bioScores={window.bio ? window.bio(pr?.dob, date, pr?.utcOffset) : {p:0,e:0,i:0}} />}
      {tb === "reports" && <ReportsTab pr={pr} ch={ch} date={date} />}
      {tb === "panchang" && <PanchangTab d={date} setDate={setDate} p={pr} utc={pr?.utcOffset || 5.5} settings={settings} />}
      {tb === "union" && <CompatTab prs={prs} chs={chs} settings={settings} date={date} />}
      {tb === "week" && <WeekTab pr={pr} ch={ch} />}
      {tb === "month" && <MonthTab pr={pr} ch={ch} />}
      {tb === "ask" && <AskTab em={u.email} emHash={u.emailHash} set={settings} pr={pr} ch={ch} date={date} />}
    </Fragment>
  );
};
