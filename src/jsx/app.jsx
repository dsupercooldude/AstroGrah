// src/jsx/app.jsx
let bootAttempts = 0;
const bootInterval = setInterval(() => {
  bootAttempts++;
  const deps = { React: !!window.React, ErrorBoundary: !!window.ErrorBoundary, KundaliRenderer: !!window.KundaliRenderer, SetupModal: !!window.SetupModal, AuthModal: !!window.AuthModal, SettingsModal: !!window.SettingsModal, GhostPDFReport: !!window.GhostPDFReport, PersonTab: !!window.PersonTab, PanchangTab: !!window.PanchangTab, CompatTab: !!window.CompatTab, AskTab: !!window.AskTab, ReportsTab: !!window.ReportsTab, TabOrchestrator: !!window.TabOrchestrator };
  if (Object.values(deps).every(v => v)) {
    clearInterval(bootInterval);
    document.getElementById("bootloader").style.display = "none";

    const { ErrorBoundary, SetupModal, AuthModal, ForcePasswordChange, AdminAuthModal, AdminConsoleModal, SettingsModal, TabOrchestrator, SageLogo, Icon, AppDB, CryptoUtils, GhostPDFReport } = window;
    var { useState, useEffect, useMemo, Fragment } = window.React;

    function AppContent() {
      const [dbC, setDbC] = useState(() => AppDB.loadConfig()); const [u, setU] = useState(null); const [dt, setDt] = useState(new Date()); const [ss, setSs] = useState(false); const [ed, setEd] = useState(null); const [activeProfileId, setActiveProfileId] = useState(null); const [adminAuthOpen, setAdminAuthOpen] = useState(false); const [adminConsoleOpen, setAdminConsoleOpen] = useState(false);
      // FIX: Ensure Devta parameters are in state
      const [formData, setFormData] = useState({ name: "", dob: "2000-01-01", time: "12:00", place: "", lat: "", lon: "", utcOffset: "5.5", gotra: "", jaati: "", kulDevta: "", gramDevta: "", sthanDevta: "" });

      window.useIdleTimeout(() => { if (u) { try { localStorage.removeItem("gl_active_user"); } catch (e) {} setU(null); alert("Session timed out."); } }, 300000);

      useEffect(() => {
        const fetchVaultIfConfigured = async () => {
          if (dbC) {
            try {
              const sess = localStorage.getItem("gl_active_user");
              if (sess) {
                const pS = JSON.parse(sess); const vaultFile = await AppDB.getFile(`gl_vault_${pS.emailHash}.json`);
                let pr = []; try { pr = typeof vaultFile.content.profiles === "string" ? JSON.parse(CryptoUtils.decrypt(vaultFile.content.profiles)) : vaultFile.content.profiles || []; } catch(e){}
                let se = {}; try { se = typeof vaultFile.content.settings === "string" ? JSON.parse(CryptoUtils.decrypt(vaultFile.content.settings)) : vaultFile.content.settings || {}; } catch(e){}
                setU({ email: pS.email, emailHash: pS.emailHash, profiles: pr, settings: se, mfaEnabled: pS.mfaEnabled });
                if (pr.length) setActiveProfileId(pr[0].id);
              }
            } catch (e) {}
          }
        };
        fetchVaultIfConfigured();
      }, [dbC]);

      const prs = Array.isArray(u?.profiles) ? u.profiles : [];
      const set = u?.settings || { aiModel: "auto", monthSystem: "amanta", kundaliStyle: "north", apiKeys: {} };
      const chs = useMemo(() => { const o = {}; if (Array.isArray(prs)) { prs.forEach((p) => { if (p && p.id && window.computeKundli) { o[p.id] = window.computeKundli(p, dt); } }); } return o; }, [prs, dt]);
      const aP = prs.find((p) => p.id === activeProfileId) || (prs.length > 0 ? prs[0] : null);

      useEffect(() => {
        const handlePdf = async () => {
          const el = document.getElementById('pdf-render-target'); if (!el) return; el.classList.remove('hidden'); el.style.left = '0';
          try {
            const canvas = await window.html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#0b0d19' });
            const imgData = canvas.toDataURL('image/jpeg', 0.9); const pdf = new window.jspdf.jsPDF('p', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth(); const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight); pdf.save(`${aP?.name?.replace(/\s+/g, '_') || 'Graha_Ledger'}_Astrology_Report.pdf`);
          } catch(e) { alert("PDF Failed."); } finally { el.style.left = '-9999px'; el.classList.add('hidden'); }
        };
        window.addEventListener('generate-pdf', handlePdf); return () => window.removeEventListener('generate-pdf', handlePdf);
      }, [aP]);

      const logoutUser = () => { try { localStorage.removeItem("gl_active_user"); } catch (e) {} setU(null); };
      const handleOpenEdit = (profileObj = {}) => { setFormData({ id: profileObj.id || null, name: profileObj.name || "", dob: profileObj.dob || "2000-01-01", time: profileObj.time || "12:00", place: profileObj.place || "", lat: profileObj.lat || "", lon: profileObj.lon || "", utcOffset: profileObj.utcOffset || "5.5", gotra: profileObj.gotra || "", jaati: profileObj.jaati || "", kulDevta: profileObj.kulDevta || "", gramDevta: profileObj.gramDevta || "", sthanDevta: profileObj.sthanDevta || "" }); setEd(profileObj); };
      const hSave = async (e) => { e.preventDefault(); const pD = { ...formData, lat: parseFloat(formData.lat) || 0, lon: parseFloat(formData.lon) || 0, utcOffset: parseFloat(formData.utcOffset) || 5.5, id: formData.id || Date.now().toString() }; const nP = formData.id ? prs.map((p) => (p.id === pD.id ? pD : p)) : [...prs, pD]; const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = CryptoUtils.encrypt(nP); vaultFile.content.settings = vaultFile.content.settings || CryptoUtils.encrypt(set); await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha); setU({ ...u, profiles: nP }); setActiveProfileId(pD.id); setEd(null); };
      const updateSettings = async (ns) => { const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.settings = CryptoUtils.encrypt(ns); await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha); setU({ ...u, settings: ns }); };

      if (!dbC) return <SetupModal onConfig={() => setDbC(true)} />;
      if (!u) return <AuthModal onLogin={(d) => { setU(d); if (d?.profiles?.length) setActiveProfileId(d.profiles[0].id); }} />;
      if (u?.requiresPasswordChange) return <ForcePasswordChange email={u.email} emailHash={u.emailHash} onComplete={() => setU({ ...u, requiresPasswordChange: false })} />;

      return (
        <div className="min-h-screen w-full font-sans pb-10 relative">
          <datalist id="gotras">{window.GOTRAS?.map((g) => (<option key={g} value={g} />))}</datalist>
          <datalist id="jaatis">{window.JAATIS?.map((j) => (<option key={j} value={j} />))}</datalist>

          {ss && <SettingsModal u={u} settings={set} onClose={() => setSs(false)} onUpdateSettings={updateSettings} onMfaSuccess={() => setU({ ...u, mfaEnabled: true })} />}

          <div className="bgcard2 border-b border-white/10 sticky top-0 z-30 shadow-lg">
            <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3"><SageLogo size={32} /><div><h1 className="font-serif text-lg text-amber-300 leading-tight">Graha Ledger V3.0</h1><div className="text-[9px] font-mono t50 uppercase tracking-widest">{u.email}</div></div></div>
              <div className="flex items-center gap-2">
                {prs.length > 1 && ( <select value={aP?.id || ""} onChange={(e) => setActiveProfileId(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 font-serif text-xs text-amber-200 outline-none max-w-[80px] sm:max-w-[120px] truncate">{prs.map((p) => (<option key={p.id} value={p.id}>{p.name.split(" ")[0]}</option>))}</select> )}
                <button onClick={() => handleOpenEdit({})} className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="user-plus" size={17} /></button>
                <button onClick={() => setSs(true)} className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="gear" size={17} /></button>
                <button onClick={logoutUser} className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-red-400"><Icon name="sign-out" size={17} /></button>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-6 relative z-10">
            {prs.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-white/20 rounded-3xl mt-10 bgfaint gl-fadein"><h2 className="font-serif text-2xl mb-2 text-amber-300">Welcome to Graha Ledger</h2><button onClick={() => handleOpenEdit({})} className="px-8 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 mt-4">Create Natal Profile</button></div>
            ) : ( <TabOrchestrator pr={aP} ch={chs[aP?.id]} date={dt} setDate={setDt} settings={set} onEditProfile={handleOpenEdit} prs={prs} chs={chs} u={u} setU={setU} updateSettings={updateSettings} /> )}

            {/* EDIT MODAL WITH SPIRITUAL LINEAGE FORCED VISIBLE */}
            {ed && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={() => setEd(null)}>
                <form onClick={(e) => e.stopPropagation()} onSubmit={hSave} className="w-full max-w-md bgcard2 rounded-3xl border border-white/10 p-6 space-y-3.5 max-h-[90vh] overflow-y-auto gl-fadein shadow-2xl relative custom-scrollbar">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3"><h3 className="font-serif text-lg text-white">{formData.id ? "Modify Profile" : "Create Natal Profile"}</h3>{formData.id && ( <button type="button" onClick={() => { if(confirm("Delete?")){ const nP = prs.filter(p=>p.id!==formData.id); setU({...u, profiles: nP}); setEd(null); } }} className="text-[10px] text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/20">Delete</button> )}</div>
                  <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Full Name</label><input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Date of Birth</label><input required type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" /></div>
                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Time (24h)</label><input required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" /></div>
                  </div>
                  <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Birth Place Name</label><input required value={formData.place} onChange={(e) => setFormData({ ...formData, place: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" placeholder="Type city..." /></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Latitude</label><input required type="number" step="any" value={formData.lat} onChange={(e) => setFormData({ ...formData, lat: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white" /></div>
                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Longitude</label><input required type="number" step="any" value={formData.lon} onChange={(e) => setFormData({ ...formData, lon: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white" /></div>
                    <div><label className="text-[9px] text-amber-300 uppercase font-mono mb-1 block font-bold">UTC Offset</label><input required type="number" step="any" value={formData.utcOffset} onChange={(e) => setFormData({ ...formData, utcOffset: e.target.value })} className="w-full bg-black/40 border border-amber-400/40 rounded-xl px-2 py-2 text-xs outline-none text-amber-300 font-bold" /></div>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-[10px] text-amber-400 uppercase font-mono mb-3 tracking-widest text-center">Spiritual Lineage (Sankalp)</div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gotra</label><input list="gotras" value={formData.gotra} onChange={(e) => setFormData({ ...formData, gotra: e.target.value })} placeholder="e.g. Kashyapa" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" /></div>
                      <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Jaati / Varg</label><input list="jaatis" value={formData.jaati} onChange={(e) => setFormData({ ...formData, jaati: e.target.value })} placeholder="e.g. Brahmin" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Kul Devta</label><input value={formData.kulDevta} onChange={(e) => setFormData({ ...formData, kulDevta: e.target.value })} placeholder="e.g. Chamunda" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" /></div>
                      <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gram Devta</label><input value={formData.gramDevta} onChange={(e) => setFormData({ ...formData, gramDevta: e.target.value })} placeholder="e.g. Bhairava" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" /></div>
                    </div>
                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Sthan Devta</label><input value={formData.sthanDevta} onChange={(e) => setFormData({ ...formData, sthanDevta: e.target.value })} placeholder="e.g. Hanumanji" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" /></div>
                  </div>
                  <button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-4 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">Save Encrypted Vault Profile</button>
                </form>
              </div>
            )}
          </div>
          {aP && chs[aP.id] && <GhostPDFReport profile={aP} ch={chs[aP.id]} bioScores={window.bio ? window.bio(aP.dob, dt, aP.utcOffset) : {p:0,e:0,i:0}} date={dt} />}
        </div>
      );
    }
    const root = window.React.StrictMode ? window.ReactDOM.createRoot(document.getElementById("root")) : null;
    if (root) { root.render(<ErrorBoundary><AppContent /></ErrorBoundary>); }
  }
}, 50);
