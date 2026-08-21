// src/js/ai-rules.js

window.executeMultiProviderAI = async (prompt, settings, systemInstruction = "") => {
  const providers = [
    {
      id: "gemini",
      name: "Google Gemini 3.5 Flash",
      run: async (k) => {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${k}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }] })
        });
        if (!res.ok) throw new Error(`Gemini Status ${res.status}`);
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    },
    {
      id: "openai",
      name: "OpenAI GPT-4o Mini",
      run: async (k) => {
        const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error(`OpenAI Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    },
    {
      id: "groq",
      name: "Groq (Llama 3.1 8B Instant)",
      run: async (k) => {
        const res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error(`Groq Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    },
    {
      id: "deepseek",
      name: "DeepSeek V3",
      run: async (k) => {
        const res = await fetch(`https://api.deepseek.com/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error(`DeepSeek Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    },
    {
      id: "kimi",
      name: "Moonshot / Kimi",
      run: async (k) => {
        const res = await fetch(`https://api.moonshot.cn/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "moonshot-v1-8k", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error(`Kimi Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    },
    {
      id: "openrouter",
      name: "OpenRouter Gateway",
      run: async (k) => {
        const res = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "meta-llama/llama-3.1-8b-instruct:free", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error(`OpenRouter Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    },
    {
      id: "huggingface",
      name: "Hugging Face Inference",
      run: async (k) => {
        const res = await fetch(`https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "mistralai/Mistral-7B-Instruct-v0.3", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }], max_tokens: 500 })
        });
        if (!res.ok) throw new Error(`Hugging Face Status ${res.status}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    }
  ];

  const primaryModel = settings.aiModel || "gemini";
  if (primaryModel === "offline") return null;

  const priorityOrder = [primaryModel, ...providers.map((p) => p.id).filter((id) => id !== primaryModel)];

  for (const provId of priorityOrder) {
    const key = settings.apiKeys?.[provId];
    if (key && key.trim().length > 5) {
      try {
        const executor = providers.find((p) => p.id === provId);
        if (executor) {
          const answer = await executor.run(key.trim());
          if (answer && answer.trim().length > 0) {
            return { text: answer, provider: executor.name };
          }
        }
      } catch (err) {
        console.warn(`[AI Matrix Cascade] Provider '${provId}' failed or exhausted (${err.message}). Trying next fallback...`);
      }
    }
  }
  return null;
};

window.generateDeepGochara = (ch, lagnaSign, date, pK, bScores) => {
  const transits = ch.transits;
  const ascIdx = window.SIGNS.indexOf(lagnaSign);
  const getPIH = (off) => Object.entries(transits).filter(([, s]) => s === window.SIGNS[(ascIdx + off - 1) % 12]).map(([p]) => p);
  const h1 = getPIH(1), h2 = getPIH(2), h4 = getPIH(4), h6 = getPIH(6), h7 = getPIH(7), h10 = getPIH(10), h11 = getPIH(11), h12 = getPIH(12);

  const hSc = Math.min(98, Math.max(35, Math.floor(70 + (bScores.p / 100) * 25 + (h1.includes("Jupiter") ? 12 : 0) - (h6.includes("Mars") || h1.includes("Saturn") ? 15 : 0))));
  const wSc = Math.min(98, Math.max(35, Math.floor(65 + (bScores.i / 100) * 20 + ((h2.includes("Jupiter") || h11.includes("Venus") || h11.includes("Mercury")) ? 16 : 0) - (h12.includes("Rahu") ? 12 : 0))));
  const cSc = Math.min(98, Math.max(35, Math.floor(72 + (bScores.i / 100) * 15 + ((h10.includes("Sun") || h10.includes("Mars") || h10.includes("Jupiter")) ? 18 : 0) - (h10.includes("Saturn") ? 8 : 0))));
  const fSc = Math.min(98, Math.max(35, Math.floor(68 + (bScores.e / 100) * 25 + ((h4.includes("Moon") || h4.includes("Venus") || h7.includes("Jupiter")) ? 14 : 0) - (h7.includes("Mars") || h7.includes("Rahu") ? 15 : 0))));

  const health = h1.includes("Saturn") || h6.includes("Mars")
    ? `Saturn/Mars transits in sensitive health axes indicate vigilance. Prioritize physical rest and joint care.`
    : (h1.includes("Jupiter") ? `Jupiter transiting your Lagna creates divine protection (Amrit Drishti), elevating vitality.` : `Pranic energy is stable. Solar alignments encourage focused physical routines.`);

  const wealth = h2.includes("Jupiter") || h11.includes("Venus") || h11.includes("Mercury")
    ? `Strong Dhan Yoga active via 2nd/11th transit harmony! Favorable window for agreements, revenue realization, and capital planning.`
    : (h12.includes("Rahu") ? `Rahu in 12th induces sudden unforeseen disbursements. Maintain rigorous audit of digital workflows.` : `Financial parameters remain disciplined. Slow, systematic compound wealth building is supported.`);

  const career = h10.includes("Sun") || h10.includes("Mars")
    ? `Exceptional Digbala (Directional Strength) active in your 10th House. Highly authoritative day for executive presentations and leadership decisions.`
    : (h10.includes("Saturn") ? `Saturn demands meticulous structural execution and patience in workplace deliverables.` : `Focus on systematic roadmap milestones. Auspicious for long-range vendor coordination.`);

  const home = h4.includes("Moon") || h4.includes("Venus")
    ? `Peaceful 4th house alignments foster emotional warmth, household tranquility, and family cohesion.`
    : (h7.includes("Mars") || h7.includes("Rahu") ? `Practice mindful patience during interpersonal dialogue to diffuse transient friction.` : `Grounded domestic environment. Ideal for smart home planning and family gatherings.`);

  return { health: { text: health, sc: hSc }, wealth: { text: wealth, sc: wSc }, career: { text: career, sc: cSc }, home: { text: home, sc: fSc } };
};

// --- NEW: OFFLINE 12-MONTH HOROSCOPE FALLBACK ENGINE ---
window.generateOfflineYearlyHoroscope = (pr, ch, targetDate) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let startMonth = targetDate.getMonth();
  let startYear = targetDate.getFullYear();
  
  let report = "YEARLY FORECAST (Month-by-Month Offline AI Engine)\n";
  report += "────────────────────────────────────────────────────────\n\n";
  
  const themes = {
      "Aries": ["career acceleration and bold moves", "financial planning and asset restructuring", "domestic adjustments and renovations", "creative projects and social expansion"],
      "Taurus": ["steady wealth accumulation", "diplomatic communication focus", "property matters and family grounding", "educational pursuits and deep learning"],
      "Gemini": ["intellectual self-discovery", "financial restructuring and auditing", "travel opportunities and networking", "career pivots and skill adaptation"],
      "Cancer": ["emotional grounding and healing", "financial gains through intuition", "relationship deepening and empathy", "health focus and vitality building"],
      "Leo": ["leadership opportunities and visibility", "financial stability and legacy planning", "family expansion and creative joy", "spiritual retreats and introspection"],
      "Virgo": ["meticulous project planning", "career recognition and detailed execution", "health regimens and dietary adjustments", "long-term investment strategies"],
      "Libra": ["relationship harmony and partnerships", "professional networking and alliances", "financial balancing and ledger review", "creative arts and aesthetic pursuits"],
      "Scorpio": ["deep psychological transformations", "career intensity and focused research", "financial windfalls and hidden assets", "emotional healing and rebirth"],
      "Sagittarius": ["philosophical growth and publishing", "long-distance travel and expansion", "career scaling and bold visions", "relationship clarity and truth-seeking"],
      "Capricorn": ["structural discipline and system building", "career milestones and authority gains", "financial conservatism and savings", "domestic duties and foundational stability"],
      "Aquarius": ["innovative projects and technological leaps", "social networking and community leadership", "financial unpredictability and adaptation", "spiritual awakenings and cosmic alignment"],
      "Pisces": ["intuitive development and artistic flow", "career fluidity and empathetic leadership", "financial intuition and charitable giving", "relationship depth and karmic clearing"]
  };
  
  const signThemes = themes[ch.d1.lagna] || themes["Aries"];
  
  for (let i = 0; i < 12; i++) {
      let mIdx = (startMonth + i) % 12;
      let y = startYear + Math.floor((startMonth + i) / 12);
      let activeTheme = signThemes[i % 4];
      
      report += `**${months[mIdx]} ${y}**: `;
      report += `This month highlights ${activeTheme}. With your Lagna in ${ch.d1.lagna} and Moon in ${ch.moonSign}, planetary geometry indicates a period of systematic execution. Expect shifts in your energetic and emotional bandwidth as the lunar cycle progresses through your pivotal houses. Focus on disciplined routines.\n\n`;
  }
  
  return report;
};

window.runVedicRuleEngine = (query, profile, kundli, targetDate) => {
  const lQ = query.toLowerCase();
  
  // If the query specifically asks for a yearly/monthly breakdown (from the PDF generator)
  if (lQ.includes("yearly horoscope") || lQ.includes("month-by-month")) {
      return window.generateOfflineYearlyHoroscope(profile, kundli, targetDate);
  }

  const dateFormatted = targetDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
  const b = window.bio(profile?.dob, targetDate, profile?.utcOffset);
  const pK = window.WEEKDAY[targetDate.getDay()];
  
  const lagna = kundli.d1.lagna;
  const moonSign = kundli.moonSign;
  const nak = kundli.nak;
  const pada = kundli.pada;
  const jupDeg = kundli.planetaryDegrees.Jupiter.toFixed(2);
  const satDeg = kundli.planetaryDegrees.Saturn.toFixed(2);
  const moonDeg = kundli.planetaryDegrees.Moon.toFixed(2);

  const currentDecYear = targetDate.getFullYear() + (targetDate.getMonth() / 12) + (targetDate.getDate() / 365);
  const mahaObj = kundli.dasha.find((d) => currentDecYear >= d.start && currentDecYear < d.end);
  const activeMaha = mahaObj ? mahaObj.lord : "Jupiter";
  let activeAntar = activeMaha;
  if (mahaObj) {
    const antarList = window.getAntardashas(activeMaha, mahaObj.start, mahaObj.end);
    activeAntar = antarList.find((a) => currentDecYear >= a.start && currentDecYear < a.end)?.lord || activeMaha;
  }

  let domain = "Holistic Jyotish & Gochara Synthesis";
  let analysis = "";
  let roadmap = "";
  let muhurtaRemedy = "";

  if (lQ.includes("target") || lQ.includes("commission") || lQ.includes("career") || lQ.includes("job") || lQ.includes("work") || lQ.includes("promotion")) {
    domain = "Career Milestones & Revenue Achievement";
    analysis = `• Real-Time Transit Matrix: Jupiter transits ${kundli.transits.Jupiter} (${jupDeg}°), Saturn transits ${kundli.transits.Saturn} (${satDeg}°).\n`
      + `• Active Vimshottari Cycle: ${activeMaha} Mahadasha / ${activeAntar} Antardasha governing the 10th/11th house axis.\n`
      + `• Cognitive Resonance: Intellectual biorhythm wave is calculated at ${(b.i * 100).toFixed(0)}%, indicating high bandwidth for complex negotiations.`;
    roadmap = `1. Target Alignment: Execute formal contract milestones during your ruling ${pK} Horas and Abhijit Muhurta.\n2. Negotiation Vector: Anchor multi-party deliverables with verifiable data to satisfy Saturnian rigor.`;
    muhurtaRemedy = `Chant "${window.PLANET_INFO[activeMaha]?.beej}" and align with ${window.PLANET_INFO[activeMaha]?.gem} for sustained career momentum.`;
  } else if (lQ.includes("marriage") || lQ.includes("wife") || lQ.includes("spouse") || lQ.includes("relationship") || lQ.includes("family") || lQ.includes("home")) {
    domain = "Domestic Acceptance & Relational Harmony";
    analysis = `• Relational Axis: Natal Moon at ${moonDeg}° in ${moonSign} (Nakshatra: ${nak}, Pada ${pada}).\n`
      + `• Planetary Aura: Venus transiting ${kundli.transits.Venus} brings relational ease. Calculated emotional resonance sits at ${(b.e * 100).toFixed(0)}%, fostering receptive communication.`;
    roadmap = `1. Family Integration: Mutual understanding is mathematically favored as benefic transits protect domestic discourse today.\n2. Milestone Timing: Select Shukla Paksha (waxing) lunar phases for significant household announcements.`;
    muhurtaRemedy = `Recite the Sri Suktam or "${window.PLANET_INFO.Venus.beej}" to invoke lasting household peace (Griha Shanti).`;
  } else if (lQ.includes("year") || lQ.includes("month") || lQ.includes("week") || lQ.includes("transit") || lQ.includes("future") || lQ.includes("prediction")) {
    domain = "Temporal Horizon & Gochara Matrix";
    analysis = `• Ephemeris Target: ${dateFormatted}\n`
      + `• Ascendant: ${lagna} | Janma Rashi: ${moonSign}\n`
      + `• Active Dasha Timeline: ${activeMaha}-${activeAntar} cycle. Key anchor transits: Jupiter in ${kundli.transits.Jupiter} (${jupDeg}°), Saturn in ${kundli.transits.Saturn} (${satDeg}°).`;
    roadmap = `1. Vitality Wave: Physical biorhythm stands at ${(b.p * 100).toFixed(0)}%.\n2. Strategic Focus: Maintain consistent execution; avoid over-leveraging during Rahu/Ketu transit windows in ${kundli.transits.Rahu}.`;
    muhurtaRemedy = `Observe the prescribed day charity on ${pK} (${window.PLANET_INFO[pK]?.charity}).`;
  } else {
    domain = "Comprehensive Vedic Life Guidance";
    analysis = `• Native: ${profile?.name || "Native"} | Target Date: ${dateFormatted}\n`
      + `• Core Matrix: ${lagna} Lagna, Moon at ${moonDeg}° in ${nak} (Pada ${pada}).\n`
      + `• Current Cosmic Rulers: ${activeMaha} Mahadasha is guiding your overarching karmic trajectory, with day energy governed by ${pK}.`;
    roadmap = `1. Decisions: Align high-value tasks with favorable Choghadiya windows (Amrit, Shubh, Labh) visible in your Panchang tab.\n2. Energy: Maintain balanced output tailored to your biorhythms (P: ${(b.p * 100).toFixed(0)}%, E: ${(b.e * 100).toFixed(0)}%, I: ${(b.i * 100).toFixed(0)}%).`;
    muhurtaRemedy = `Recite the Beej Mantra for the active Hora ruler (${pK}): "${window.PLANET_INFO[pK]?.beej}".`;
  }

  return `[Graha Ledger Vedic Expert Engine — Deterministic Mode]\n`
    + `═════════════════════════════════════════════════════\n`
    + `📍 DOMAIN: ${domain}\n\n`
    + `1. DATA-DRIVEN VEDIC SYNTHESIS:\n${analysis}\n\n`
    + `2. PRESCRIBED ACTION ROADMAP:\n${roadmap}\n\n`
    + `3. DIVINE REMEDY & MANTRAS:\n• ${muhurtaRemedy}\n`
    + `• Daily Action: ${window.PLANET_INFO[pK]?.action}`;
};
