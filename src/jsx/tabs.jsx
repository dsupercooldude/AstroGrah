// src/jsx/tabs.jsx
const { useState, Fragment } = window.React;

window.TabOrchestrator = ({ pr, ch, date, setDate, settings, onEditProfile, prs, chs, u, setU, updateSettings }) => {
  const { PersonTab, PanchangTab, CompatTab, AskTab } = window;
  const [tb, setTb] = useState("person");

  return (
    <Fragment>
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bgcard p-1 font-mono text-[11px] shadow-inner mb-2">
        {[
          { id: "person", l: "Astrology & Dasha" },
          { id: "panchang", l: "Panchang & Muhurta" },
          { id: "union", l: "Union Milan" },
          { id: "ask", l: "Vedic AI Sage" }
        ].map((t) => (
          <button key={t.id} onClick={() => setTb(t.id)} className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition ${tb === t.id ? "bg-amber-400/20 text-amber-300 font-bold shadow" : "t50 hover:t100"}`}>
            {t.l}
          </button>
        ))}
      </div>
      
      {tb === "person" && <PersonTab pr={pr} ch={ch} date={date} setDate={setDate} settings={settings} onEditProfile={onEditProfile} />}
      {tb === "panchang" && <PanchangTab d={date} setDate={setDate} p={pr} utc={pr?.utcOffset || 5.5} settings={settings} />}
      {tb === "union" && <CompatTab prs={prs} chs={chs} settings={settings} date={date} />}
      {tb === "ask" && <AskTab em={u.email} emHash={u.emailHash} set={settings} pr={pr} ch={ch} date={date} />}
    </Fragment>
  );
};
