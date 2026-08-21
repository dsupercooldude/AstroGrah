// src/jsx/pdf-report.jsx
const React = window.React;

window.GhostPDFReport = ({ pr, ch, date, activeMaha, activeAntar, scores, gochara, pI, pdfForecast }) => {
  const { KundaliRenderer, PLANET_INFO, getPlanetaryDignity, getAntardashas, getPratyantarDashas, formatYM } = window;
  const currentDecYear = date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365.25;

  // SMART MARKDOWN PARSER: Strips out code blocks and perfectly aligns text
  const renderFormattedText = (text) => {
    if (!text) return "Generating Forecast...";
    
    // Completely remove markdown code block ticks to prevent ascii blocks
    const cleanedText = text.replace(/```/g, ''); 

    return cleanedText.split('\n').map((line, i) => {
      let cleanLine = line.trim();
      if (cleanLine === '') return <div key={i} style={{ height: '8px' }}></div>;

      // Detect and format Headings
      let isHeading = false;
      if (cleanLine.startsWith('### ')) { cleanLine = cleanLine.substring(4); isHeading = true; }
      else if (cleanLine.startsWith('## ')) { cleanLine = cleanLine.substring(3); isHeading = true; }
      else if (cleanLine.startsWith('# ')) { cleanLine = cleanLine.substring(2); isHeading = true; }

      // Detect and format Lists
      let isListItem = false;
      if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
        cleanLine = cleanLine.substring(2);
        isListItem = true;
      }

      // Split the line by Markdown Bold Tags (**Text**)
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      
      return (
        <div key={i} style={{ 
          marginBottom: isHeading ? '12px' : '8px',
          fontSize: isHeading ? '16px' : '13px',
          color: isHeading ? '#D4A574' : 'rgba(255,255,255,0.9)',
          fontWeight: isHeading ? 'bold' : 'normal',
          lineHeight: '1.8',
          marginLeft: isListItem ? '15px' : '0',
          display: isListItem ? 'flex' : 'block'
        }}>
          {isListItem && <span style={{ marginRight: '8px', color: '#D4A574' }}>•</span>}
          <div>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                // Highlight bolded months in bright Gold/Amber
                return <strong key={j} style={{ color: '#FDE68A', fontWeight: 'bold' }}>{part.slice(2, -2)}</strong>;
              }
              return <span key={j}>{part}</span>;
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ height: 0, overflow: 'hidden' }}>
      <div id="ghost-pdf-report" style={{ width: '900px', backgroundColor: '#121426', padding: '50px', color: '#F2EFE6', fontFamily: 'Sora, sans-serif' }}>
        
        {/* REPORT HEADER */}
        <div style={{ borderBottom: '2px solid rgba(212,165,116,0.3)', paddingBottom: '25px', marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '36px', color: '#D4A574', margin: '0 0 10px 0' }}>Comprehensive Astrological Report</h1>
          <h2 style={{ fontSize: '26px', margin: '0 0 5px 0' }}>{pr.name}</h2>
          <p style={{ fontSize: '13px', color: 'rgba(242,239,230,0.7)', fontFamily: 'monospace' }}>
            DOB: {pr.dob} | Time: {pr.time} | Place: {pr.place} | Target Prediction Date: {date.toDateString()}
          </p>
        </div>

        {/* FOUNDATION & ACTIVE DASHAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Natal Foundation</h3>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              <div><strong>Ascendant (Lagna):</strong> {ch.d1.lagna}</div>
              <div><strong>Moon Sign (Rashi):</strong> {ch.moonSign}</div>
              <div><strong>Sun Sign:</strong> {ch.sunSign}</div>
              <div><strong>Nakshatra:</strong> {ch.nak} (Pada {ch.pada})</div>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Active Chronology</h3>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              <div><strong>Active Mahadasha:</strong> <span style={{color: '#FDE68A', fontWeight: 'bold'}}>{activeMaha}</span></div>
              <div><strong>Active Antardasha:</strong> <span style={{color: '#FDE68A', fontWeight: 'bold'}}>{activeAntar}</span></div>
              <div><strong>Current Biorhythms:</strong> P {scores.p}% / E {scores.e}% / I {scores.i}%</div>
            </div>
          </div>
        </div>

        {/* SHADBALA (TABLE FORMAT FOR CLEAN PDF) */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Planetary Strengths (Shadbala & Dignity)</h3>
            <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  <th style={{ paddingBottom: '10px' }}>Planet</th>
                  <th style={{ paddingBottom: '10px' }}>Placement</th>
                  <th style={{ paddingBottom: '10px' }}>Dignity Status</th>
                  <th style={{ paddingBottom: '10px' }}>Score (Rupas)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ch.shadbala).map(([planet, score]) => {
                  const signPlaced = ch.d1.houses[ch.d1.placements[planet]] || "Aries";
                  const dignity = getPlanetaryDignity(planet, signPlaced);
                  return (
                    <tr key={planet} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '10px 0', color: PLANET_INFO[planet]?.color, fontWeight: 'bold' }}>{planet}</td>
                      <td style={{ padding: '10px 0' }}>{signPlaced}</td>
                      <td style={{ padding: '10px 0', color: dignity.color }}>{dignity.status}</td>
                      <td style={{ padding: '10px 0', fontWeight: 'bold' }}>{(score/60).toFixed(1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>

        {/* 3-TIER VIMSHOTTARI DASHA TABLE (Maha -> Antar -> Pratyantar) */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Vimshottari Dasha Drilldown (Active Timeline)</h3>
            <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  <th style={{ paddingBottom: '10px' }}>Mahadasha</th>
                  <th style={{ paddingBottom: '10px' }}>Antardasha</th>
                  <th style={{ paddingBottom: '10px' }}>Pratyantar Dasha</th>
                  <th style={{ paddingBottom: '10px' }}>Start Timeline</th>
                  <th style={{ paddingBottom: '10px' }}>End Timeline</th>
                </tr>
              </thead>
              <tbody>
                {ch.dasha.map((d, i) => {
                  const isActiveMaha = currentDecYear >= d.start && currentDecYear < d.end;
                  let rows = [];
                  
                  // 1. Mahadasha Row
                  rows.push(
                    <tr key={`maha-${i}`} style={{ backgroundColor: isActiveMaha ? 'rgba(251,191,36,0.15)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px 10px', color: isActiveMaha ? '#FDE68A' : PLANET_INFO[d.lord]?.color, fontWeight: isActiveMaha ? 'bold' : 'normal' }}>{d.lord}</td>
                      <td style={{ padding: '8px 10px' }}>-</td>
                      <td style={{ padding: '8px 10px' }}>-</td>
                      <td style={{ padding: '8px 10px', fontWeight: isActiveMaha ? 'bold' : 'normal' }}>{formatYM(d.start)}</td>
                      <td style={{ padding: '8px 10px', fontWeight: isActiveMaha ? 'bold' : 'normal' }}>{formatYM(d.end)}</td>
                    </tr>
                  );

                  // 2. Expand ONLY the Active Mahadasha to show Antardashas
                  if (isActiveMaha) {
                    const antars = getAntardashas(d.lord, d.start, d.end);
                    antars.forEach((ant, idx) => {
                      const isActiveAntar = currentDecYear >= ant.start && currentDecYear < ant.end;
                      rows.push(
                        <tr key={`antar-${idx}`} style={{ backgroundColor: isActiveAntar ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '8px 10px' }}></td>
                          <td style={{ padding: '8px 10px', color: isActiveAntar ? '#FDE68A' : PLANET_INFO[ant.lord]?.color, fontWeight: isActiveAntar ? 'bold' : 'normal' }}>↳ {ant.lord}</td>
                          <td style={{ padding: '8px 10px' }}>-</td>
                          <td style={{ padding: '8px 10px', fontWeight: isActiveAntar ? 'bold' : 'normal' }}>{formatYM(ant.start)}</td>
                          <td style={{ padding: '8px 10px', fontWeight: isActiveAntar ? 'bold' : 'normal' }}>{formatYM(ant.end)}</td>
                        </tr>
                      );

                      // 3. Expand ONLY the Active Antardasha to show Pratyantar Dashas
                      if (isActiveAntar) {
                        const prats = getPratyantarDashas(ant.lord, ant.start, ant.end);
                        prats.forEach((prat, pIdx) => {
                          const isActivePrat = currentDecYear >= prat.start && currentDecYear < prat.end;
                          rows.push(
                            <tr key={`prat-${pIdx}`} style={{ backgroundColor: isActivePrat ? 'rgba(251,191,36,0.45)' : 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '8px 10px' }}></td>
                              <td style={{ padding: '8px 10px' }}></td>
                              <td style={{ padding: '8px 10px', color: isActivePrat ? '#FFFFFF' : PLANET_INFO[prat.lord]?.color, fontWeight: isActivePrat ? 'bold' : 'normal' }}>↳ {prat.lord}</td>
                              <td style={{ padding: '8px 10px', color: isActivePrat ? '#FFFFFF' : 'inherit', fontWeight: isActivePrat ? 'bold' : 'normal' }}>{formatYM(prat.start)}</td>
                              <td style={{ padding: '8px 10px', color: isActivePrat ? '#FFFFFF' : 'inherit', fontWeight: isActivePrat ? 'bold' : 'normal' }}>{formatYM(prat.end)}</td>
                            </tr>
                          );
                        });
                      }
                    });
                  }
                  return rows;
                })}
              </tbody>
            </table>
        </div>

        {/* CHARTS GRID D1 & D9 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-1 Rashi Chart (Foundation)</h4>
                <div style={{ width: '350px', height: '350px', margin: '0 auto' }}><KundaliRenderer ac={ch.d1} ch={ch} kpTable={ch.kpTable} style="north" isExpert={true} /></div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-9 Navamsha Chart (Destiny & Union)</h4>
                <div style={{ width: '350px', height: '350px', margin: '0 auto' }}><KundaliRenderer ac={ch.d9} ch={ch} kpTable={ch.kpTable} style="north" isExpert={true} /></div>
            </div>
        </div>

        {/* CHARTS GRID D7 & D10 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-7 Saptamsha (Legacy & Children)</h4>
                <div style={{ width: '350px', height: '350px', margin: '0 auto' }}><KundaliRenderer ac={ch.d7} ch={ch} kpTable={ch.kpTable} style="north" isExpert={true} /></div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>D-10 Dashamsha (Career & Milestones)</h4>
                <div style={{ width: '350px', height: '350px', margin: '0 auto' }}><KundaliRenderer ac={ch.d10} ch={ch} kpTable={ch.kpTable} style="north" isExpert={true} /></div>
            </div>
        </div>

        {/* GOCHARA & PRESCRIPTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Deep Gochara Forecast</h3>
            <div style={{ fontSize: '11px', lineHeight: '1.8' }}>
              <p><strong>Health & Vitality ({gochara.health.sc}%):</strong> {gochara.health.text}</p>
              <p><strong>Wealth & Finance ({gochara.wealth.sc}%):</strong> {gochara.wealth.text}</p>
              <p><strong>Career & Ambition ({gochara.career.sc}%):</strong> {gochara.career.text}</p>
              <p><strong>Home & Harmony ({gochara.home.sc}%):</strong> {gochara.home.text}</p>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px' }}>Daily Prescriptions ({pI.symbol})</h3>
            <div style={{ fontSize: '12px', lineHeight: '2' }}>
              <div><strong>Presiding Deity:</strong> {pI.adhidevata}</div>
              <div><strong>Active Beej Mantra:</strong> <em>"{pI.beej}"</em></div>
              <div><strong>Associated Gemstone:</strong> {pI.gem}</div>
              <div><strong>Prescribed Charity:</strong> {pI.charity}</div>
              <div><strong>Daily Action:</strong> {pI.action}</div>
            </div>
          </div>
        </div>

        {/* AI FORECAST: 12-MONTH HOROSCOPE */}
        <div style={{ background: 'rgba(212,165,116,0.08)', border: '1px solid rgba(212,165,116,0.4)', padding: '30px', borderRadius: '16px', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#D4A574', marginBottom: '15px', fontSize: '20px' }}>12-Month Astrological Horizon</h3>
            {/* INJECTED PARSER HERE */}
            <div style={{ padding: '10px 0' }}>
              {renderFormattedText(pdfForecast)}
            </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
            Generated securely by Graha Ledger Enterprise • Cryptographic Vault System
        </div>
      </div>
    </div>
  );
};
