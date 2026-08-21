// src/jsx/pdf-report.jsx
const React = window.React;

window.GhostPDFReport = React.forwardRef(({ profile, ch, bioScores, date }, ref) => {
  if (!profile || !ch) return <div ref={ref} className="hidden"></div>;

  const details = window.calculatePlanetaryDetails ? window.calculatePlanetaryDetails(ch.d1?.placements || {}, ch.planetaryDegrees) : {};
  const jaimini = window.calculateJaiminiKarakas ? window.calculateJaiminiKarakas(ch.planetaryDegrees) : {};

  return (
    <div ref={ref} className="bg-[#0b0d19] text-[#F2EFE6] p-10 w-[800px] font-sans absolute -left-[9999px] top-0" style={{ minHeight: '1122px' }}>
      
      {/* HEADER */}
      <div className="border-b border-amber-400/30 pb-6 mb-6">
        <h1 className="font-serif text-3xl text-amber-400 mb-2">Comprehensive Astrological Report</h1>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-sm t60 font-mono mt-2">
          DOB: {profile.dob} | Time: {profile.time} | Location: {profile.place} <br/>
          Report Generated: {date.toDateString()}
        </p>
      </div>

      {/* CORE NATAL FOUNDATION */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bgcard p-5 rounded-2xl border border-white/10">
          <h3 className="font-serif text-amber-200 mb-3 border-b border-white/10 pb-2">Natal Foundation</h3>
          <ul className="text-sm space-y-2 font-mono">
            <li><span className="t60">Ascendant:</span> {ch.d1.lagna}</li>
            <li><span className="t60">Moon Sign:</span> {ch.moonSign}</li>
            <li><span className="t60">Sun Sign:</span> {ch.sunSign}</li>
            <li><span className="t60">Active Dasha:</span> {ch.dasha[0]?.lord} Mahadasha</li>
          </ul>
        </div>
        
        {/* BIORHYTHM DATA */}
        <div className="bgcard p-5 rounded-2xl border border-white/10">
          <h3 className="font-serif text-amber-200 mb-3 border-b border-white/10 pb-2">Current Biorhythms</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-red-400">Physical</span>
              <span>{Math.round(bioScores.p * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-400">Emotional</span>
              <span>{Math.round(bioScores.e * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">Intellectual</span>
              <span>{Math.round(bioScores.i * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADVANCED PLANETARY LEDGER */}
      <div className="bgcard p-5 rounded-2xl border border-white/10 mb-8">
        <h3 className="font-serif text-amber-200 mb-3 border-b border-white/10 pb-2">Detailed Planetary Ledger</h3>
        <table className="w-full text-xs font-mono text-left">
          <thead>
            <tr className="t50 uppercase border-b border-white/10">
              <th className="pb-2">Graha</th>
              <th className="pb-2">Sign</th>
              <th className="pb-2">Longitude</th>
              <th className="pb-2">Nakshatra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {Object.entries(details).map(([planet, data]) => {
              const pInfo = window.PLANET_INFO[planet] || { color: '#a1a1aa', symbol: '●' };
              return (
                <tr key={planet}>
                  <td className="py-2 font-bold" style={{ color: pInfo.color }}>{pInfo.symbol} {planet}</td>
                  <td className="py-2 t90">{data.rashi}</td>
                  <td className="py-2 text-amber-200">{data.longitudeStr}</td>
                  <td className="py-2 t80">{data.nakshatra}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* JAIMINI KARAKAS */}
      <div className="bgcard p-5 rounded-2xl border border-white/10 mb-8">
        <h3 className="font-serif text-amber-200 mb-3 border-b border-white/10 pb-2">Jaimini Chara Karakas</h3>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          {Object.entries(jaimini).map(([karaka, planet]) => {
            const pInfo = window.PLANET_INFO[planet] || { color: '#fff' };
            return (
              <div key={karaka} className="flex justify-between p-2 bg-black/20 rounded">
                <span className="t60">{karaka}</span>
                <span className="font-bold" style={{ color: pInfo.color }}>{planet}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI OUTLOOK */}
      <div className="bgcard p-5 rounded-2xl border border-white/10">
        <h3 className="font-serif text-amber-200 mb-3 border-b border-white/10 pb-2">Vedic AI Synthesis</h3>
        <p className="text-sm t85 leading-relaxed">
          With the Ascendant in {ch.d1.lagna} and the Moon in {ch.moonSign}, current transits indicate a phase of strategic realignment. 
          The active {ch.dasha[0]?.lord} Mahadasha emphasizes structured growth and methodical execution. Focus on maintaining emotional equilibrium 
          while leveraging your intellectual highs ({Math.round(bioScores.i * 100)}%) for complex decision-making over the next 15 days.
        </p>
      </div>

    </div>
  );
});
