// src/jsx/tab-ask.jsx
var React = window.React;
var { useState, useEffect, useRef } = window.React;

window.AskTab = ({ emHash, set, pr, ch, date }) => {
  const { Icon, AppDB, CryptoUtils, WEEKDAY, executeMultiProviderAI, runVedicRuleEngine } = window;
  const [q, setQ] = useState("");
  const [h, setH] = useState([]);
  const [l, setL] = useState(false);
  const [isMic, setIsMic] = useState(false);
  const scrollRef = useRef(null);

  // Load chat history from encrypted vault
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

  // Auto-scroll to latest response
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [h]);

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
    let usedProvider = set?.aiModel || "offline";
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

      if (set?.aiModel !== "offline" && executeMultiProviderAI) {
        const apiRes = await executeMultiProviderAI(q, set, systemContext);
        if (apiRes && apiRes.text) { ans = apiRes.text; usedProvider = apiRes.provider; }
      }

      if (!ans && runVedicRuleEngine) {
        usedProvider = "offline";
        ans = runVedicRuleEngine(q, pr, ch, date);
      }

      if (!ans) ans = "No AI response was returned. Check the selected provider API key and network access.";
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

  // CUSTOM ENTERPRISE AI TEXT FORMATTER (Handles Markdown without external libraries)
  const formatAIResponse = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      // 1. Handle Headers
      if (line.startsWith('### ')) return <h3 key={idx} className="text-sm font-bold text-amber-300 mt-4 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-base font-bold text-amber-400 mt-4 mb-2">{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) return <h1 key={idx} className="text-lg font-bold text-amber-500 mt-4 mb-2 border-b border-white/10 pb-1">{line.replace('# ', '')}</h1>;
      
      // 2. Handle Lists
      const isBulletList = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      const isNumberedList = /^\d+\.\s/.test(line.trim());
      let content = line.trim();
      if (isBulletList) content = content.replace(/^[\*\-]\s/, '');

      // 3. Handle Bolding (**text**)
      const parts = content.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-amber-200 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // 4. Render Layouts
      if (isBulletList) {
        return (
          <div key={idx} className="flex gap-2 mt-1.5 mb-1.5 pl-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span className="text-white/80">{parts}</span>
          </div>
        );
      }
      
      if (isNumberedList) {
        return <div key={idx} className="mt-1.5 mb-1.5 pl-2 text-white/80 font-medium">{parts}</div>;
      }
      
      if (line.trim() === '') return <div key={idx} className="h-2"></div>;

      // 5. Default Paragraph
      return <div key={idx} className="mb-2 leading-relaxed text-white/80">{parts}</div>;
    });
  };

  return (
    <div className="space-y-4 pb-12 gl-fadein mt-4">
      <style>{`
        .beauty-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .beauty-scroll::-webkit-scrollbar-track { background: transparent; }
        .beauty-scroll::-webkit-scrollbar-thumb { background-color: rgba(251, 191, 36, 0.2); border-radius: 10px; }
      `}</style>

      {/* HEADER WIDGET */}
      <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-blue-950/40 via-black/20 to-transparent shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Global Learning AI</span>
            <h2 className="font-serif text-2xl text-blue-100 mt-0.5">Ask the Sage</h2>
          </div>
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300 uppercase shadow-inner flex items-center gap-1.5">
            <Icon name="brain" /> {set?.aiModel || "offline"}
          </span>
        </div>
      </div>
      
      {/* QUICK SUGGESTIONS */}
      <div className="flex gap-2 overflow-x-auto pb-2 pt-1 text-[10px] font-mono beauty-scroll">
        <button onClick={() => setQ("Will I be able to achieve my Year's Target for the mentioned commission letter?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition">Suggest: Yearly Targets?</button>
        <button onClick={() => setQ("How does my career look this week?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition">Suggest: Career Week?</button>
        <button onClick={() => setQ("How will my marriage go and will my wife be accepted in the household?")} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition">Suggest: Marriage & Home?</button>
      </div>
      
      {/* AI CHAT LOG */}
      <div ref={scrollRef} className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 beauty-scroll scroll-smooth">
        {h.map((x, index) => (
          <details key={x.id} className="bgcard rounded-2xl border border-white/5 overflow-hidden group shadow-lg" open={index === h.length - 1}>
            <summary className="p-4 font-bold text-amber-400 cursor-pointer flex justify-between items-start outline-none bg-black/20 hover:bg-black/40 transition select-none">
              <span className="pr-4 flex gap-2"><Icon name="user" className="mt-0.5 text-amber-500" /> <span className="text-sm font-sans">{x.q}</span></span>
              <Icon name="caret-down" className="group-open:rotate-180 transition-transform mt-0.5 shrink-0 text-white/40" />
            </summary>
            <div className="p-6 border-t border-white/5 bg-[#0e101f] text-sm font-sans shadow-inner">
              
              {/* THE FORMATTED AI RESPONSE RENDERS HERE */}
              <div className="ai-response-body">
                {formatAIResponse(x.a)}
              </div>

              <div className="flex justify-end mt-6 pt-3 border-t border-white/5">
                <span className="text-[9px] text-blue-400 font-mono uppercase bg-blue-900/20 px-2.5 py-1 rounded border border-blue-500/20 flex items-center gap-1">
                  <Icon name="cpu" /> Engine: {x.v}
                </span>
              </div>
            </div>
          </details>
        ))}
        
        {/* LOADING INDICATOR */}
        {l && (
          <div className="p-5 bgcard rounded-2xl border border-white/5 flex items-center gap-3 shadow-lg">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs text-blue-200 font-mono animate-pulse">Synthesizing astrological coordinates & querying the Vedic Engine...</div>
          </div>
        )}
      </div>
      
      {/* INPUT FORM */}
      <form onSubmit={ask} className="flex gap-2 p-2 bgcard2 border border-white/10 rounded-2xl shadow-2xl mt-2">
        <button type="button" onClick={startListening} className={`px-3 py-2 rounded-xl transition flex items-center justify-center ${isMic ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20" : "bg-black/30 text-amber-300 hover:bg-white/10"}`}>
          <Icon name="microphone" size={20} />
        </button>
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Ask about 2026 transits, targets, marriage..." 
          className="flex-1 bg-transparent text-sm focus:outline-none px-2 text-white font-sans placeholder-white/30" 
        />
        <button type="submit" disabled={l || !q.trim()} className="px-6 py-2.5 bg-amber-400 text-black text-sm font-bold rounded-xl disabled:opacity-50 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20 flex items-center gap-2">
          Ask <Icon name="paper-plane-right" />
        </button>
      </form>
    </div>
  );
};
