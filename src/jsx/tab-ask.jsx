// src/jsx/tab-ask.jsx
var React = window.React;
const { useState, useEffect } = window.React;

window.AskTab = ({ emHash, set, pr, ch, date }) => {
  const { Icon, AppDB, CryptoUtils, WEEKDAY, executeMultiProviderAI, runVedicRuleEngine } = window;
  const [q, setQ] = useState("");
  const [h, setH] = useState([]);
  const [l, setL] = useState(false);
  const [isMic, setIsMic] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadHistory = async () => {
      try {
        const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`);
        const decH = typeof chatsFile.content.h === "string" ? CryptoUtils.decrypt(chatsFile.content.h) : chatsFile.content.h || [];
        if (isMounted && decH) setH(decH);
      } catch (e) {}
    };
    loadHistory();
    return () => { isMounted = false; };
  }, [emHash]);

  const startListening = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return alert("Voice input not supported in this browser.");
    const rec = new SpeechRec();
    setIsMic(true);
    rec.onresult = (e) => { setQ(e.results[0][0].transcript); setIsMic(false); };
    rec.onerror = () => setIsMic(false);
    rec.onend = () => setIsMic(false);
    rec.start();
  };

  async function ask(e) {
    if (e) e.preventDefault();
    if (!q.trim() || l) return;
    setL(true);
    let ans = "";
    let usedProvider = set.aiModel || "offline";
    try {
      let globalContext = "";
      try {
        const gDB = await AppDB.getGlobalAI();
        if (gDB.history.length > 0) {
          const last = CryptoUtils.decrypt(gDB.history[gDB.history.length - 1]);
          globalContext = `[Global Trend: Previous user asked "${last.q}"]`;
        }
      } catch (err) {}

      const systemContext = `You are the Graha Ledger Jyotish Sage. Provide Vedic astrology guidance for ${pr?.name || "Native"} (Asc: ${ch?.d1?.lagna || "Aries"}, Moon: ${ch?.moonSign || "Aries"}). Target Date: ${date.toDateString()}. Today Hora: ${WEEKDAY[date.getDay()]}. ${globalContext}`;

      if (set.aiModel !== "offline") {
        const apiRes = await executeMultiProviderAI(q, set, systemContext);
        if (apiRes && apiRes.text) { ans = apiRes.text; usedProvider = apiRes.provider; }
      }

      if (!ans) {
        usedProvider = "offline";
        ans = runVedicRuleEngine(q, pr, ch, date);
      }

      const newQA = { id: Date.now(), q, a: ans, v: usedProvider };
      const nx = [...h, newQA];
      setH(nx);
      setQ("");
      
      try {
        const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`);
        chatsFile.content.h = CryptoUtils.encrypt(nx);
        await AppDB.saveFile(`gl_chats_${emHash}.json`, chatsFile.content, chatsFile.sha);
        await AppDB.appendGlobalAI(newQA);
      } catch (er) {}
    } catch (err) {
      ans = `System Error: ${err.message}.`;
      setH([...h, { id: Date.now(), q, a: ans, v: "error" }]);
      setQ("");
    } finally {
      setL(false);
    }
  }

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-blue-950/40 via-black/20 to-transparent shadow-xl">
        <div className="flex justify-between items-center">
          <div><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Global Learning AI</span><h2 className="font-serif text-2xl text-blue-100 mt-0.5">Ask the Sage</h2></div>
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300 uppercase">{set.aiModel || "offline"}</span>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-hide">
        <button onClick={() => setQ("Will I be able to achieve my Year's Target for the mentioned commission letter?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Yearly Targets?</button>
        <button onClick={() => setQ("How does my career look this week?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Career Week?</button>
        <button onClick={() => setQ("How will my marriage go and will my wife be accepted in the household?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Marriage & Home?</button>
      </div>
      <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
        {h.map((x, index) => (
          <details key={x.id} className="p-4 bgcard rounded-2xl border border-white/5 text-xs t85 leading-relaxed whitespace-pre-wrap group" open={index === h.length - 1}>
            <summary className="font-bold text-amber-400 cursor-pointer flex justify-between items-start outline-none"><span className="pr-4">Q: {x.q}</span><Icon name="caret-down" className="group-open:rotate-180 transition-transform mt-0.5" /></summary>
            <div className="mt-3 pt-3 border-t border-white/10 text-white/90">{x.a}<div className="text-[8px] t40 font-mono mt-3 uppercase">Engine: {x.v}</div></div>
          </details>
        ))}
        {l && <div className="text-xs t50 italic p-3">Synthesizing astrological coordinates & ephemeris...</div>}
      </div>
      <form onSubmit={ask} className="flex gap-2 p-2 bgcard2 border border-white/10 rounded-2xl shadow-2xl">
        <button type="button" onClick={startListening} className={`px-3 py-2 rounded-xl transition ${isMic ? "bg-red-500 text-white animate-pulse" : "bg-black/30 text-amber-300 hover:bg-white/10"}`}><Icon name="microphone" size={20} /></button>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.target.form.requestSubmit(); } }} placeholder="Ask about 2026 transits, targets, marriage..." className="flex-1 bg-transparent text-xs focus:outline-none px-2 text-white" />
        <button type="submit" disabled={l} className="px-5 py-2.5 bg-amber-400 text-black text-xs font-semibold rounded-xl disabled:opacity-50 hover:bg-amber-300">Ask</button>
      </form>
    </div>
  );
};
