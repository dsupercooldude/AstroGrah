// src/js/ai-rules.js
window.executeMultiProviderAI = async (prompt, settings, systemInstruction = "") => {
  const providers = [
    {
      id: "gemini",
      run: async (k) => {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }] })
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      }
    },
    {
      id: "openai",
      run: async (k) => {
        const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
          method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] })
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
      }
    }
  ];

  const primaryModel = settings.aiModel || "gemini";
  if (primaryModel === "offline") return null;

  const order = [primaryModel, ...providers.map((p) => p.id).filter((id) => id !== primaryModel)];
  for (const provId of order) {
    const key = settings.apiKeys?.[provId];
    if (key && key.trim().length > 5) {
      try {
        const executor = providers.find((p) => p.id === provId);
        if (executor) {
          const answer = await executor.run(key.trim());
          if (answer) return { text: answer, provider: provId };
        }
      } catch (e) {}
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

  return {
    health: { text: health, sc: hSc },
    wealth: { text: wealth, sc: wSc },
    career: { text: career, sc: cSc },
    home: { text: home, sc: fSc }
  };
};

window.runVedicRuleEngine = (query, profile, kundli, targetDate) => {
  const lQ = query.toLowerCase();
  const dateFormatted = targetDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
  const b = window.bio(profile?.dob, targetDate, profile?.utcOffset);
  const pK = window.WEEKDAY[targetDate.getDay()];
  const lagna = kundli.d1.lagna;
  const moonSign = kundli.moonSign;
  const nak = kundli.nak;

  const currentDecYear = targetDate.getFullYear() + (targetDate.getMonth() / 12) + (targetDate.getDate() / 365);
  const activeMaha = kundli.dasha.find((d) => currentDecYear >= d.start && currentDecYear < d.end)?.lord || "Jupiter";
  const antarList = window.getAntardashas(activeMaha, 2024, 2030);
  const activeAntar = antarList.find((a) => currentDecYear >= a.start && currentDecYear < a.end)?.lord || activeMaha;

  let domain = "Holistic Jyotish & Gochara Synthesis";
  let analysis = "";
  let roadmap = "";
  let muhurtaRemedy = "";

  if (lQ.includes("target") || lQ.includes("commission") || lQ.includes("career") || lQ.includes("job") || lQ.includes("work") || lQ.includes("promotion")) {
    domain = "Career Milestones & Revenue Achievement";
    analysis = `• Assessment for: ${profile?.name || "Native"} (Ascendant: ${lagna}, Moon: ${moonSign})\n`
      + `• Active Vimshottari Cycle: ${activeMaha} Mahadasha / ${activeAntar} Antardasha.\n`
      + `• Transit Synthesis: Jupiter currently transiting ${kundli.transits.Jupiter} casts benefic aspects on executive houses, while Saturn in ${kundli.transits.Saturn} demands systematic delivery. Your cognitive biorhythm is at ${(b.i * 100).toFixed(0)}%, indicating high strategic bandwidth for negotiations.`;
    roadmap = `1. Target Alignment: Execute formal contract milestones during your ruling ${pK} Horas and Abhijit Muhurta.\n2. Negotiation Vector: Anchor multi-party deliverables with verifiable data. Your 10th/11th house lords support commission closure under steady diligence.`;
    muhurtaRemedy = `Chant "${window.PLANET_INFO[activeMaha]?.beej}" and wear ${window.PLANET_INFO[activeMaha]?.gem} for sustained career momentum.`;
  } else if (lQ.includes("marriage") || lQ.includes("wife") || lQ.includes("spouse") || lQ.includes("relationship") || lQ.includes("family") || lQ.includes("home")) {
    domain = "Domestic Acceptance, Union & Relational Harmony";
    analysis = `• Assessment for: ${profile?.name || "Native"}\n`
      + `• Relational Axis: 7th House (Partnership) and 4th House (Sukha Bhava / Home Acceptance).\n`
      + `• Planetary Aura: Venus transiting ${kundli.transits.Venus} brings relational ease. Moon in ${moonSign} (${nak} nakshatra) with emotional biorhythm at ${(b.e * 100).toFixed(0)}% indicates warm receptive instincts across the household.`;
    roadmap = `1. Family Integration: Mutual understanding is heavily favored as benefic transits protect domestic discourse.\n2. Milestone Timing: Select Shukla Paksha lunar days for significant family ceremonies or residence milestones.`;
    muhurtaRemedy = `Recite the Sri Suktam or "${window.PLANET_INFO.Venus.beej}" to invoke lasting household peace (Griha Shanti).`;
  } else if (lQ.includes("year") || lQ.includes("month") || lQ.includes("week") || lQ.includes("transit") || lQ.includes("future") || lQ.includes("prediction")) {
    domain = "Temporal Horizon & Gochara Matrix";
    analysis = `• Forecast anchored to: ${dateFormatted}\n`
      + `• Ascendant: ${lagna} | Janma Rashi: ${moonSign} (${nak} Pada ${kundli.pada})\n`
      + `• Primary Dashas: ${activeMaha}-${activeAntar} active. Key planetary transits place Jupiter in ${kundli.transits.Jupiter}, Saturn in ${kundli.transits.Saturn}, Rahu in ${kundli.transits.Rahu}, and Ketu in ${kundli.transits.Ketu}.`;
    roadmap = `1. Physical Rhythm: Vitality wave stands at ${(b.p * 100).toFixed(0)}%.\n2. Strategic Focus: Maintain consistent execution without over-leveraging during Rahu transit windows.`;
    muhurtaRemedy = `Observe the prescribed day charity on ${pK} (${window.PLANET_INFO[pK]?.charity}).`;
  } else {
    domain = "Comprehensive Vedic Life Guidance";
    analysis = `• Native: ${profile?.name || "Native"} | Anchored Target Date: ${dateFormatted}\n`
      + `• Core Matrix: ${lagna} Lagna, Moon in ${moonSign} under the auspicious ${nak} constellation.\n`
      + `• Current Cosmic Rulers: ${activeMaha} Mahadasha is guiding your overarching karmic trajectory, with day energy governed by ${pK} (${window.SANSKRIT_DAYS[pK]} Vara).`;
    roadmap = `1. Align high-value decisions with favorable Choghadiya windows (Amrit, Shubh, Labh).\n2. Maintain balanced energy output tailored to your current biorhythm levels (P: ${(b.p * 100).toFixed(0)}%, E: ${(b.e * 100).toFixed(0)}%, I: ${(b.i * 100).toFixed(0)}%).`;
    muhurtaRemedy = `Recite the Beej Mantra for ${pK}: "${window.PLANET_INFO[pK]?.beej}".`;
  }

  return `[Graha Ledger Vedic Expert Engine — Deterministic Mode]\n`
    + `═════════════════════════════════════════════════════\n`
    + `📍 DOMAIN: ${domain}\n`
    + `📅 ANCHORED TARGET DATE: ${dateFormatted}\n\n`
    + `1. VEDIC ASTROLOGICAL SYNTHESIS:\n${analysis}\n\n`
    + `2. PRESCRIBED ACTION ROADMAP:\n${roadmap}\n\n`
    + `3. DIVINE REMEDY & MANTRAS:\n• ${muhurtaRemedy}\n`
    + `• Daily Action: ${window.PLANET_INFO[pK]?.action}`;
};
