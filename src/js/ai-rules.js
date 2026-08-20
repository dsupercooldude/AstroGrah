window.executeMultiProviderAI = async (prompt, settings, systemInstruction = "") => {
    const providers = [
        { id: "gemini", run: async (k) => { const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.candidates?.[0]?.content?.parts?.[0]?.text; }},
        { id: "openai", run: async (k) => { const res = await fetch(`https://api.openai.com/v1/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }},
        { id: "kimi", run: async (k) => { const res = await fetch(`https://api.moonshot.cn/v1/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "moonshot-v1-8k", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }},
        { id: "deepseek", run: async (k) => { const res = await fetch(`https://api.deepseek.com/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }}
    ];
    const primaryModel = settings.aiModel || "gemini"; if (primaryModel === "offline") return null;
    const order = [primaryModel, ...providers.map(p=>p.id).filter(id=>id!==primaryModel)];
    for (const provId of order) { const key = settings.apiKeys?.[provId]; if (key && key.trim().length > 5) { try { const executor = providers.find(p=>p.id===provId); if (executor) { const answer = await executor.run(key.trim()); if (answer) return { text: answer, provider: provId }; } } catch (e) {} } }
    return null;
};

window.generateDeepGochara = (ch, lagnaSign, date, pK, bScores) => {
    const transits = ch.transits; const ascIdx = window.SIGNS.indexOf(lagnaSign);
    const getPIH = (off) => Object.entries(transits).filter(([,s]) => s === window.SIGNS[(ascIdx + off - 1) % 12]).map(([p]) => p);
    const h1 = getPIH(1), h2 = getPIH(2), h4 = getPIH(4), h6 = getPIH(6), h10 = getPIH(10), h11 = getPIH(11), h12 = getPIH(12);
    
    const hSc = Math.min(98, Math.max(35, Math.floor(70 + (bScores.p/100)*25 + (h1.includes("Jupiter")?10:0) - (h6.includes("Mars")?15:0))));
    const wSc = Math.min(98, Math.max(35, Math.floor(65 + (bScores.i/100)*20 + ((h2.includes("Jupiter")||h11.includes("Venus"))?15:0) - (h12.includes("Rahu")?15:0))));
    const cSc = Math.min(98, Math.max(35, Math.floor(72 + (bScores.i/100)*15 + ((h10.includes("Sun")||h10.includes("Mars"))?15:0))));
    const fSc = Math.min(98, Math.max(35, Math.floor(68 + (bScores.e/100)*25 + ((h4.includes("Moon")||h4.includes("Venus"))?10:0))));

    const health = h1.includes("Saturn") || h6.includes("Mars") ? "Saturn/Mars transits in health houses suggest prioritizing rest." : (h1.includes("Jupiter") ? "Jupiter transiting Lagna grants immense vitality." : "Steady prana flow. Perfect for physical exertion.");
    const wealth = h2.includes("Jupiter") || h11.includes("Venus") ? "Auspicious Dhan Yoga active via transit! Excellent day for investments." : (h12.includes("Rahu") ? "Rahu induces unexpected expenses. Audit transactions." : "Financial parameters stable. Support slow wealth planning.");
    const career = h10.includes("Sun") || h10.includes("Mars") ? "Powerful Digbala in the 10th House. Highly authoritative day for career." : "Focus on backend strategy. Avoid direct management confrontations.";
    const home = h4.includes("Moon") || h4.includes("Venus") ? "Harmonious domestic aura. Auspicious for property matters." : "Practice mindful patience during family discourse to avoid friction.";
    return { health: { text: health, sc: hSc }, wealth: { text: wealth, sc: wSc }, career: { text: career, sc: cSc }, home: { text: home, sc: fSc } };
};

window.runVedicRuleEngine = (q, pr, ch, date) => {
    const lQ = q.toLowerCase(); const b = window.bio(pr?.dob, date, pr?.utcOffset); const pK = window.WEEKDAY[date.getDay()]; const lagna = ch.d1.lagna;
    const currentDecYear = date.getFullYear() + (date.getMonth()/12) + (date.getDate()/365);
    const activeMaha = ch.dasha.find(d => currentDecYear >= d.start && currentDecYear < d.end)?.lord || "Jupiter";

    let dom = "General Life Navigation", assess = "", strat = "";
    if (lQ.includes('target') || lQ.includes('commission') || lQ.includes('career') || lQ.includes('job') || lQ.includes('work')) {
        dom = "Career & Financial Target Achievement";
        assess = `Your 10th house (Career) and 11th house (Gains/Commissions) are heavily influenced by your active ${activeMaha} Mahadasha. With Jupiter currently transiting ${ch.transits.Jupiter}, structural career expansion is mathematically favored. Your intellectual biorhythm is currently at ${(b.i*100).toFixed(0)}%, indicating high executive capacity.`;
        strat = `Execute backend contract alignments during your favorable planetary horas. Avoid speculative deviations and anchor commitments before the next lunar transition.`;
    } else if (lQ.includes('marriage') || lQ.includes('wife') || lQ.includes('spouse') || lQ.includes('family') || lQ.includes('home')) {
        dom = "Union, Marriage & Domestic Harmony";
        assess = `Your 7th house of partnerships and 4th house of domestic acceptance are evaluated. Venus currently transiting ${ch.transits.Venus} indicates smooth relational stabilization. Emotional resonance sits at ${(b.e*100).toFixed(0)}%, fostering healthy communication.`;
        strat = `Prioritize mutual dialogue and seek auspicious Muhurta windows (such as Abhijit) for major household milestones.`;
    } else if (lQ.includes('month') || lQ.includes('year') || lQ.includes('week')) {
        dom = "Macro-Timeline Horizon";
        assess = `Across the current temporal horizon, your ${lagna} lagna is supported by ${activeMaha} Mahadasha. Gochara movements highlight disciplined, incremental gains over the period.`;
        strat = `Maintain regular physical rhythm (vitality: ${(b.p*100).toFixed(0)}%) and practice daily remedial focus on ${pK} to balance sensitive transits.`;
    } else {
        dom = "Holistic Astrological Synthesis";
        assess = `Synthesizing your ${lagna} Ascendant with Moon in ${ch.moonSign} under the ${ch.nak} nakshatra. Current active hora planet is ${pK}.`;
        strat = `Focus on grounded, objective execution. Recite ${window.PLANET_INFO[pK]?.beej.split('(')[0]} for mental calm.`;
    }
    return `[Graha Ledger Vedic Rule-Based Expert Engine]\n\n• Analysis for: ${pr?.name || 'Native'}\n• Domain Scope: ${dom}\n• Active Dasha: ${activeMaha} Mahadasha | Day Ruler: ${pK}\n\n1. Astrological Assessment:\n${assess}\n\n2. Prescribed Strategy:\n${strat}\n\n3. Daily Remedy:\nChant "${window.PLANET_INFO[pK]?.beej}" and align with ${window.PLANET_INFO[pK]?.gem}.`;
};
