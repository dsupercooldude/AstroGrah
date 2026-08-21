// src/jsx/app.jsx
let bootAttempts = 0;
const bootInterval = setInterval(() => {
  bootAttempts++;
  
  const deps = {
    React: !!window.React,
    ErrorBoundary: !!window.ErrorBoundary,
    KundaliRenderer: !!window.KundaliRenderer,
    SetupModal: !!window.SetupModal,
    AuthModal: !!window.AuthModal,
    SettingsModal: !!window.SettingsModal,
    GhostPDFReport: !!window.GhostPDFReport,
    PersonTab: !!window.PersonTab,
    PanchangTab: !!window.PanchangTab,
    CompatTab: !!window.CompatTab,
    AskTab: !!window.AskTab,
    ReportsTab: !!window.ReportsTab,
    TabOrchestrator: !!window.TabOrchestrator
  };

  const allLoaded = Object.values(deps).every(v => v);

  if (allLoaded) {
    clearInterval(bootInterval);
    document.getElementById("bootloader").style.display = "none";

    const { ErrorBoundary, SetupModal, AuthModal, ForcePasswordChange, AdminAuthModal, AdminConsoleModal, SettingsModal, TabOrchestrator, SageLogo, Icon, AppDB, CryptoUtils } = window;
    const { useState, useEffect, useMemo, Fragment } = window.React;

    function AppContent() {
      const [dbC, setDbC] = useState(() => AppDB.loadConfig());
      
      const [u, setU] = useState(null);
      const [dt, setDt] = useState(new Date());
      const [ss, setSs] = useState(false);
      const [ed, setEd] = useState(null);
      const [activeProfileId, setActiveProfileId] = useState(null);
      const [adminAuthOpen, setAdminAuthOpen] = useState(false);
      const [adminConsoleOpen, setAdminConsoleOpen] = useState(false);

      const [formData, setFormData] = useState({ name: "", dob: "2000-01-01", time: "12:00", place: "", lat: "", lon: "", utcOffset: "5.5", gotra: "", jaati: "", kulDevta: "", gramDevta: "", sthanDevta: "" });

      window.useIdleTimeout(() => {
        if (u) {
          try { localStorage.removeItem("gl_active_user"); } catch (e) {}
          setU(null);
          alert("Session timed out after 5 minutes of inactivity.");
        }
      }, 300000);

      useEffect(() => {
        const fetchVaultIfConfigured = async () => {
          if (dbC) {
            try {
              const sess = localStorage.getItem("gl_active_user");
              if (sess) {
                const parsedSess = JSON.parse(sess);
                const vaultFile = await AppDB.getFile(`gl_vault_${parsedSess.emailHash}.json`);
                
                // INTEGRITY SAFEGUARD: Safely parse and decrypt profiles array
                let profRaw = vaultFile.content.profiles;
                let prof = [];
                if (typeof profRaw === "string") {
                  try {
                    const decrypted = CryptoUtils.decrypt(profRaw);
                    prof = typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
                  } catch (err) {
                    prof = [];
                  }
                } else {
                  prof = profRaw || [];
                }
                if (!Array.isArray(prof)) prof = [];

                // INTEGRITY SAFEGUARD: Safely parse and decrypt settings object
                let settRaw = vaultFile.content.settings;
                let sett = {};
                if (typeof settRaw === "string") {
                  try {
                    const decryptedSet = CryptoUtils.decrypt(settRaw);
                    sett = typeof decryptedSet === "string" ? JSON.parse(decryptedSet) : decryptedSet;
                  } catch (err) {
                    sett = {};
                  }
                } else {
                  sett = settRaw || {};
                }
                if (!sett || typeof sett !== "object") sett = {};

                setU({ email: parsedSess.email, emailHash: parsedSess.emailHash, profiles: prof, settings: sett, mfaEnabled: parsedSess.mfaEnabled });
                if (prof.length) setActiveProfileId(prof[0].id);
              }
            } catch (e) {
              console.error("Vault loading integrity error:", e);
            }
          }
        };
        fetchVaultIfConfigured();
      }, [dbC]);

      const logoutUser = () => { try { localStorage.removeItem("gl_active_user"); } catch (e) {} setU(null); };
      const resetDbConfig = () => { try { localStorage.removeItem("gl_active_user"); } catch (e) {} AppDB.clearConfig(); setDbC(false); setU(null); setAdminConsoleOpen(false); };

      // STRICT ARRAY GUARANTEE: Prevents any 'forEach is not a function' faults
      const prs = Array.isArray(u?.profiles) ? u.profiles : [];
      const set = u?.settings || { aiModel: "auto", monthSystem: "amanta", kundaliStyle: "north", apiKeys: {} };
      
      const chs = useMemo(() => {
        const o = {};
        if (Array.isArray(prs)) { 
          prs.forEach((p) => {
            if (p && p.id) {
              o[p.id] = window.computeKundli(p, dt);
            }
          }); 
        }
        return o;
      }, [prs, dt]);

      const aP = prs.find((p) => p.id === activeProfileId) || (prs.length > 0 ? prs[0] : null);

      if (!dbC) return <SetupModal onConfig={() => setDbC(true)} />;
      if (!u) return <AuthModal onLogin={(d) => { setU(d); if (d?.profiles?.length) setActiveProfileId(d.profiles[0].id); }} />;
      if (u?.requiresPasswordChange) return <ForcePasswordChange email={u.email} emailHash={u.emailHash} onComplete={() => setU({ ...u, requiresPasswordChange: false })} />;

      const calculateTimezone = (lat, lon) => {
        if (lat >= 22.5 && lat <= 26.5 && lon >= 51.0 && lon <= 56.5) return "4.0"; // UAE
        if (lat >= 6.0 && lat <= 37.5 && lon >= 68.0 && lon <= 97.5) return "5.5";  // India
        if (lat >= 49.5 && lat <= 61.0 && lon >= -8.0 && lon <= 2.0) return "0.0";  // UK
        return (Math.round((lon / 15) * 2) / 2).toFixed(1);
      };

      const handleOpenEdit = (profileObj = {}) => {
        setFormData({
          id: profileObj.id || null,
          name: profileObj.name || "",
          dob: profileObj.dob || "2000-01-01",
          time: profileObj.time || "12:00",
          place: profileObj.place || "",
          lat: profileObj.lat !== undefined ? profileObj.lat : "",
          lon: profileObj.lon !== undefined ? profileObj.lon : "",
          utcOffset: profileObj.utcOffset !== undefined ? profileObj.utcOffset : "5.5",
          gotra: profileObj.gotra || "",
          jaati: profileObj.jaati || "",
          kulDevta: profileObj.kulDevta || "",
          gramDevta: profileObj.gramDevta || "",
          sthanDevta: profileObj.sthanDevta || ""
        });
        setEd(profileObj);
      };

      const fetchCityCoordinates = async () => {
        const query = formData.place;
        if (!query) return alert("Please type a city name first.");
        const preset = window.CITY_PRESETS?.find((c) => c.name.toLowerCase().includes(query.toLowerCase()));
        if (preset) {
          setFormData((prev) => ({ ...prev, place: preset.name, lat: preset.lat.toString(), lon: preset.lon.toString(), utcOffset: preset.utc.toString() }));
          return;
        }
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
          const data = await res.json();
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const tz = calculateTimezone(lat, lon);
            setFormData((prev) => ({ ...prev, place: data[0].display_name.split(",")[0], lat: lat.toFixed(4), lon: lon.toFixed(4), utcOffset: tz }));
          } else {
            alert("City coordinates not found. Enter latitude and longitude manually.");
          }
        } catch (e) {
          alert("Network search failed. Enter coordinates manually.");
        }
      };

      const handleGPS = () => {
        if (!navigator.geolocation) return alert("Geolocation not supported on this browser.");
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const tz = calculateTimezone(lat, lon);
            let placeName = "GPS Location";
            try {
              const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
              const d = await r.json();
              placeName = d.address?.city || d.address?.town || d.address?.county || "Current Location";
            } catch (e) {}
            setFormData((prev) => ({ ...prev, place: placeName, lat: lat.toFixed(4), lon: lon.toFixed(4), utcOffset: tz }));
          },
          () => alert("GPS access denied.")
        );
      };

      const hSave = async (e) => {
        e.preventDefault();
        const pD = {
          ...formData,
          lat: parseFloat(formData.lat) || 0,
          lon: parseFloat(formData.lon) || 0,
          utcOffset: parseFloat(formData.utcOffset) || 5.5,
          id: formData.id || Date.now().toString()
        };
        const nP = formData.id ? prs.map((p) => (p.id === pD.id ? pD : p)) : [...prs, pD];
        const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`);
        vaultFile.content.profiles = CryptoUtils.encrypt(nP);
        vaultFile.content.settings = vaultFile.content.settings || CryptoUtils.encrypt(set);
        await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
        setU({ ...u, profiles: nP });
        setActiveProfileId(pD.id);
        setEd(null);
      };

      const deleteProfile = async (id) => {
        if (!confirm("Are you sure you want to delete this profile?")) return;
        const nP = prs.filter((p) => p.id !== id);
        const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`);
        vaultFile.content.profiles = CryptoUtils.encrypt(nP);
        await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
        setU({ ...u, profiles: nP });
        if (nP.length > 0) setActiveProfileId(nP[0].id);
        setEd(null);
      };

      const updateSettings = async (ns) => {
        const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`);
        vaultFile.content.settings = CryptoUtils.encrypt(ns);
        vaultFile.content.profiles = vaultFile.content.profiles || CryptoUtils.encrypt(prs);
        await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
        setU({ ...u, settings: ns });
      };

      return (
        <div className="min-h-screen w-full font-sans pb-10 relative">
          <datalist id="gotras">{window.GOTRAS?.map((g) => (<option key={g} value={g} />))}</datalist>
          <datalist id="jaatis">{window.JAATIS?.map((j) => (<option key={j} value={j} />))}</datalist>

          {adminAuthOpen && <AdminAuthModal u={u} onClose={() => setAdminAuthOpen(false)} onAuthenticated={() => { setAdminAuthOpen(false); setAdminConsoleOpen(true); }} />}
          {adminConsoleOpen && <AdminConsoleModal onClose={() => setAdminConsoleOpen(false)} onResetDb={resetDbConfig} />}
          {ss && <SettingsModal u={u} settings={set} onClose={() => setSs(false)} onUpdateSettings={updateSettings} onMfaSuccess={() => setU({ ...u, mfaEnabled: true })} />}

          <div className="bgcard2 border-b border-white/10 sticky top-0 z-30 shadow-lg">
            <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-3 flex justify-between items-center pr-36">
              <div className="flex items-center gap-3">
                <SageLogo size={32} />
                <div>
                  <h1 className="font-serif text-lg text-amber-300 leading-tight">Graha Ledger V3.0</h1>
                  <div className="text-[9px] font-mono t50 uppercase tracking-widest">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {prs.length > 1 && (
                  <select value={aP?.id || ""} onChange={(e) => setActiveProfileId(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 font-serif text-xs text-amber-200 outline-none max-w-[80px] sm:max-w-[120px] truncate">
                    {prs.map((p) => (<option key={p.id} value={p.id}>{p.name.split(" ")[0]}</option>))}
                  </select>
                )}
                <button onClick={() => handleOpenEdit({})} title="Add Profile" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300">
                  <Icon name="user-plus" size={17} />
                </button>
                <button onClick={() => setSs(true)} title="Settings" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300">
                  <Icon name="gear" size={17} />
                </button>
                <button onClick={() => setAdminAuthOpen(true)} title="Admin DB Console" className="p-2 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition text-amber-300">
                  <Icon name="database" size={17} />
                </button>
                <button onClick={logoutUser} title="Logout" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-red-400">
                  <Icon name="sign-out" size={17} />
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-6 relative z-10">
            {prs.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-white/20 rounded-3xl mt-10 bgfaint gl-fadein">
                <h2 className="font-serif text-2xl mb-2 text-amber-300">Welcome to Graha Ledger</h2>
                <button onClick={() => handleOpenEdit({})} className="px-8 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 mt-4">Create Natal Profile</button>
              </div>
            ) : (
              <TabOrchestrator pr={aP} ch={chs[aP?.id]} date={dt} setDate={setDt} settings={set} onEditProfile={handleOpenEdit} prs={prs} chs={chs} u={u} setU={setU} updateSettings={updateSettings} />
            )}

            {ed && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={() => setEd(null)}>
                <form onClick={(e) => e.stopPropagation()} onSubmit={hSave} className="w-full max-w-md bgcard2 rounded-3xl border border-white/10 p-6 space-y-3.5 max-h-[90vh] overflow-y-auto gl-fadein shadow-2xl relative">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="font-serif text-lg text-white">{formData.id ? "Modify Profile" : "Create Natal Profile"}</h3>
                    {formData.id && (
                      <button type="button" onClick={() => deleteProfile(formData.id)} className="text-[10px] text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/20">Delete</button>
                    )}
                  </div>
                  <div>
                    <label className="text-[9px] t50 uppercase font-mono mb-1 block">Full Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] t50 uppercase font-mono mb-1 block">Date of Birth</label>
                      <input required type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" />
                    </div>
                    <div>
                      <label className="text-[9px] t50 uppercase font-mono mb-1 block">Time (24h)</label>
                      <input required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] t50 uppercase font-mono mb-1 flex justify-between items-center">
                      <span>Birth Place Name</span>
                      <button type="button" onClick={handleGPS} className="text-amber-300 hover:text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded text-[10px]">Use GPS <Icon name="crosshair" /></button>
                    </label>
                    <div className="flex gap-2">
                      <input
                        required
                        value={formData.place}
                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); fetchCityCoordinates(); } }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"
                        placeholder="Type city (e.g. Dubai, Mumbai)..."
                      />
                      <button type="button" onClick={fetchCityCoordinates} className="px-3 py-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xl text-xs hover:bg-amber-400/30 transition">Auto-Fetch</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] t50 uppercase font-mono mb-1 block">Latitude</label>
                      <input required type="number" step="any" value={formData.lat} onChange={(e) => setFormData({ ...formData, lat: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white" />
                    </div>
                    <div>
                      <label className="text-[9px] t50 uppercase font-mono mb-1 block">Longitude</label>
                      <input required type="number" step="any" value={formData.lon} onChange={(e) => setFormData({ ...formData, lon: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white" />
                    </div>
                    <div>
                      <label className="text-[9px] text-amber-300 uppercase font-mono mb-1 block font-bold">UTC Offset</label>
                      <input required type="number" step="any" value={formData.utcOffset} onChange={(e) => setFormData({ ...formData, utcOffset: e.target.value })} className="w-full bg-black/40 border border-amber-400/40 rounded-xl px-2 py-2 text-xs outline-none text-amber-300 font-bold" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="text-[10px] text-amber-400 uppercase font-mono mb-2 tracking-widest text-center">Spiritual Lineage (Optional)</div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="text-[8px] t50 uppercase font-mono mb-1 block">Gotra</label>
                        <input list="gotras" value={formData.gotra} onChange={(e) => setFormData({ ...formData, gotra: e.target.value })} placeholder="e.g. Kashyapa" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" />
                      </div>
                      <div>
                        <label className="text-[8px] t50 uppercase font-mono mb-1 block">Jaati / Varg</label>
                        <input list="jaatis" value={formData.jaati} onChange={(e) => setFormData({ ...formData, jaati: e.target.value })} placeholder="e.g. Brahmin" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="text-[8px] t50 uppercase font-mono mb-1 block">Kul Devta</label>
                        <input value={formData.kulDevta} onChange={(e) => setFormData({ ...formData, kulDevta: e.target.value })} placeholder="e.g. Chamunda" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" />
                      </div>
                      <div>
                        <label className="text-[8px] t50 uppercase font-mono mb-1 block">Gram Devta</label>
                        <input value={formData.gramDevta} onChange={(e) => setFormData({ ...formData, gramDevta: e.target.value })} placeholder="e.g. Bhairava" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[8px] t50 uppercase font-mono mb-1 block">Sthan Devta</label>
                      <input value={formData.sthanDevta} onChange={(e) => setFormData({ ...formData, sthanDevta: e.target.value })} placeholder="e.g. Hanumanji" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-2 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">Save Encrypted Vault Profile</button>
                </form>
              </div>
            )}
          </div>
        </div>
      );
    }

    const root = window.React.StrictMode ? window.ReactDOM.createRoot(document.getElementById("root")) : null;
    if (root) {
      root.render(<ErrorBoundary><AppContent /></ErrorBoundary>);
    }
  } else if (bootAttempts > 80) { 
    const missing = Object.keys(deps).filter(k => !deps[k]).join(', ');
    const bl = document.getElementById("bootloader");
    if(bl) bl.innerHTML = `
      <div style="background:#1C1F3D; padding:30px; border-radius:16px; border:1px solid #F87171; text-align:center; max-width: 450px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <i class="ph ph-warning-octagon" style="font-size: 48px; color: #F87171; margin-bottom: 10px;"></i>
        <h2 style="color:#F87171; font-family:serif; margin-bottom: 10px; font-size: 24px;">System Under Maintenance</h2>
        <p style="color:rgba(255,255,255,0.8); font-size:13px; margin-bottom:20px; line-height: 1.5;">The astrological engine is currently undergoing an upgrade or syncing new modules. Please try refreshing.</p>
        <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 8px; margin-bottom: 20px; text-align: left;">
          <span style="color:#D4A574; font-family: monospace; font-size: 10px; display: block; margin-bottom: 4px;">TECHNICAL DIAGNOSTIC:</span>
          <span style="color:#F87171; font-family: monospace; font-size: 11px;">Missing Target: ${missing}</span>
        </div>
        <button onclick="try{localStorage.clear();}catch(e){} window.location.reload(true);" style="background:#F87171; color:black; padding:10px 20px; border-radius:8px; font-weight:bold; border:none; cursor:pointer; font-size: 14px; width: 100%; transition: background 0.2s;">Force Reload Engine</button>
      </div>`;
    clearInterval(bootInterval);
  }
}, 50);
