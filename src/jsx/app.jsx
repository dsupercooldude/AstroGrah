// src/jsx/app.jsx
const { useState, useEffect, useMemo, Fragment } = window.React;

function AppContent() {
    const [dbC, setDbC]=useState(false); const [u, setU]=useState(null); const [tb, setTb]=useState("person");
    const [dt, setDt]=useState(new Date()); 
    const [ss, setSs]=useState(false); const [ed, setEd]=useState(null); const [activeProfileId, setActiveProfileId]=useState(null);
    const [mfaSetup, setMfaSetup]=useState(null); const [adminAuthOpen, setAdminAuthOpen]=useState(false); const [adminConsoleOpen, setAdminConsoleOpen]=useState(false);

    window.useIdleTimeout(() => { if (u) { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); alert("Session timed out after 5 minutes of inactivity."); } }, 300000);

    useEffect(()=>{ 
        const initApp = async () => { if(window.AppDB.loadConfig()) { setDbC(true); try { const sess = localStorage.getItem('gl_active_user'); if(sess) { const parsedSess = JSON.parse(sess); const vaultFile = await window.AppDB.getFile(`gl_vault_${parsedSess.emailHash}.json`); const prof = typeof vaultFile.content.profiles === 'string' ? window.CryptoUtils.decrypt(vaultFile.content.profiles) : (vaultFile.content.profiles || []); const sett = typeof vaultFile.content.settings === 'string' ? window.CryptoUtils.decrypt(vaultFile.content.settings) : (vaultFile.content.settings || {}); setU({ email: parsedSess.email, emailHash: parsedSess.emailHash, profiles: prof, settings: sett, mfaEnabled: parsedSess.mfaEnabled }); if(prof.length) setActiveProfileId(prof[0].id); } } catch(e){} } };
        initApp(); 
    },[]);
    
    const logoutUser = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); };
    const resetDbConfig = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} window.AppDB.clearConfig(); setDbC(false); setU(null); setAdminConsoleOpen(false); };

    const prs = u?.profiles || []; const set = u?.settings || { aiModel: "offline", monthSystem: "amanta", kundaliStyle: "north", apiKeys: {} };
    const chs = useMemo(()=>{ const o={}; if(prs) { prs.forEach(p=>o[p.id]=window.computeKundli(p, dt)); } return o; }, [prs, dt]);
    const aP = prs.find(p=>p.id===activeProfileId) || (prs.length > 0 ? prs[0] : null);

    if(!dbC) return <window.SetupModal onConfig={()=>setDbC(true)}/>;
    if(!u) return <window.AuthModal onLogin={(d)=>{ setU(d); if(d?.profiles?.length) setActiveProfileId(d.profiles[0].id); }}/>;
    if(u?.requiresPasswordChange) return <window.ForcePasswordChange email={u.email} emailHash={u.emailHash} onComplete={() => setU({...u, requiresPasswordChange: false})} />;

    const hSave = async(e) => {
        e.preventDefault(); const f=e.target; const pD = { name: f.nm.value, dob: f.dob.value, time: f.tm.value, place: f.pl.value, lat: parseFloat(f.lt.value), lon: parseFloat(f.ln.value), utcOffset: parseFloat(f.ut.value), gotra: f.gt.value, jaati: f.jt.value, kulDevta: f.kd.value, gramDevta: f.gd.value, sthanDevta: f.sd.value, id: ed.id || Date.now().toString() };
        const nP = ed.id ? prs.map(p=>p.id===pD.id?pD:p) : [...prs, pD];
        const vaultFile = await window.AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = window.CryptoUtils.encrypt(nP); vaultFile.content.settings = vaultFile.content.settings || window.CryptoUtils.encrypt(set);
        await window.AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
        setU({...u, profiles:nP}); setActiveProfileId(pD.id); setEd(null);
    };
    
    const deleteProfile = async (id) => { 
        if (!confirm("Are you sure you want to delete this profile?")) return; const nP = prs.filter(p=>p.id!==id); 
        const vaultFile = await window.AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = window.CryptoUtils.encrypt(nP);
        await window.AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
        setU({...u, profiles:nP}); if (nP.length > 0) setActiveProfileId(nP[0].id); 
    };

    const updateSettings = async (ns) => {
        const vaultFile = await window.AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.settings = window.CryptoUtils.encrypt(ns); vaultFile.content.profiles = vaultFile.content.profiles || window.CryptoUtils.encrypt(prs);
        await window.AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha); setU({...u, settings:ns});
    };

    const enableMFA = () => {
        if (!window.OTPAuth) return alert("Authenticator library failed to load.");
        const secret = new window.OTPAuth.Secret({ size: 20 }).base32; const totp = new window.OTPAuth.TOTP({ issuer: "Graha Ledger", label: u.email, algorithm: "SHA1", digits: 6, period: 30, secret: secret });
        const uri = totp.toString();
        if (window.QRCode) { window.QRCode.toDataURL(uri, (err, url) => { setMfaSetup({ secret, qr: url, pin: '' }); }); } else { setMfaSetup({ secret, qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`, pin: '' }); }
    };

    const verifyAndSaveMfa = async () => {
        if (!window.OTPAuth) return alert("Authenticator library missing."); const totp = new window.OTPAuth.TOTP({ secret: mfaSetup.secret });
        if (totp.validate({ token: mfaSetup.pin, window: 1 }) === null) return alert("Invalid PIN. Please try again.");
        const authDB = await window.AppDB.getFile('gl_auth.json'); authDB.content.users[u.emailHash].mfa = window.CryptoUtils.encrypt(mfaSetup.secret);
        await window.AppDB.saveFile('gl_auth.json', authDB.content, authDB.sha);
        alert("MFA Enabled Successfully! Your vault is now locked."); setU({...u, mfaEnabled: true}); setMfaSetup(null);
    };

    const fetchCityCoordinates = async () => {
        const cityInput = document.getElementById("searchCityInput").value; if(!cityInput) return alert("Please enter a city name first."); document.getElementById("fetchBtn").innerText = "Searching...";
        try { const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityInput)}&format=json&limit=1`); const data = await res.json();
            if(data && data.length > 0) { const lon = parseFloat(data[0].lon); const lat = parseFloat(data[0].lat); document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4);
                let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; document.querySelector('input[name="pl"]').value = data[0].display_name.split(",")[0];
            } else { alert("City not found. Try a broader search."); }
        } catch(e) { alert("Search failed."); } document.getElementById("fetchBtn").innerText = "Auto-Fetch";
    };

    return (
        <div className="min-h-screen w-full font-sans pb-10 relative">
            <datalist id="gotras">{window.GOTRAS.map(g=><option key={g} value={g} />)}</datalist><datalist id="jaatis">{window.JAATIS.map(j=><option key={j} value={j} />)}</datalist>
            
            {adminAuthOpen && <window.AdminAuthModal u={u} onClose={()=>setAdminAuthOpen(false)} onAuthenticated={()=>{ setAdminAuthOpen(false); setAdminConsoleOpen(true); }}/>}
            {adminConsoleOpen && <window.AdminConsoleModal onClose={()=>setAdminConsoleOpen(false)} onResetDb={resetDbConfig}/>}

            <div className="bgcard2 border-b border-white/10 sticky top-0 z-30 shadow-lg">
                <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-3 flex justify-between items-center pr-36">
                    <div className="flex items-center gap-3"><window.SageLogo size={32}/><div><h1 className="font-serif text-lg text-amber-300 leading-tight">Graha Ledger V2.8</h1><div className="text-[9px] font-mono t50 uppercase tracking-widest">{u.email}</div></div></div>
                    <div className="flex items-center gap-2">
                        {prs.length > 1 && ( <select value={aP?.id||""} onChange={e=>setActiveProfileId(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 font-serif text-xs text-amber-200 outline-none max-w-[80px] sm:max-w-[120px] truncate">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select> )}
                        <button onClick={()=>setEd({})} title="Add Profile" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><window.Icon name="user-plus" size={17}/></button>
                        <button onClick={()=>setSs(true)} title="Settings" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><window.Icon name="gear" size={17}/></button>
                        <button onClick={()=>setAdminAuthOpen(true)} title="Admin DB Console" className="p-2 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition text-amber-300"><window.Icon name="database" size={17}/></button>
                        <button onClick={logoutUser} title="Logout" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-red-400"><window.Icon name="sign-out" size={17}/></button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-6 relative z-10">
                {prs.length===0 ? ( <div className="text-center p-8 border border-dashed border-white/20 rounded-3xl mt-10 bgfaint gl-fadein"><h2 className="font-serif text-2xl mb-2 text-amber-300">Welcome to Graha Ledger</h2><button onClick={()=>setEd({})} className="px-8 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 mt-4">Create Natal Profile</button></div> ) : (
                    <Fragment>
                        <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bgcard p-1 font-mono text-[11px] shadow-inner mb-2">
                            {[{id:"person",l:"Astrology"},{id:"panchang",l:"Panchang"},{id:"union",l:"Union"},{id:"ask",l:"AI Sage"}].map(t=><button key={t.id} onClick={()=>setTb(t.id)} className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition ${tb===t.id?"bg-amber-400/20 text-amber-300 font-bold shadow":"t50 hover:t100"}`}>{t.l}</button>)}
                        </div>
                        {tb==="person" && <window.PersonTab pr={aP} ch={chs[aP?.id]} date={dt} setDate={setDt} settings={set} onEditProfile={setEd}/>}
                        {tb==="panchang" && <window.PanchangTab d={dt} setDate={setDt} p={aP} utc={aP?.utcOffset||5.5} settings={set}/>}
                        {tb==="union" && <window.CompatTab prs={prs} chs={chs} settings={set} date={dt}/>}
                        {tb==="ask" && <window.AskTab em={u.email} emHash={u.emailHash} set={set} pr={aP} ch={chs[aP?.id]} date={dt}/>}
                    </Fragment>
                )}

                {ss && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={()=>setSs(false)}>
                        <div onClick={e=>e.stopPropagation()} className="w-full max-w-md p-6 rounded-3xl border border-white/10 bgcard2 space-y-5 max-h-[85vh] overflow-y-auto gl-fadein shadow-2xl relative">
                            <div className="flex justify-between items-center border-b border-white/10 pb-3"><h3 className="font-serif text-lg text-white">Security & App Vault</h3><button onClick={()=>setSs(false)} className="p-1 rounded-full hover:bg-white/10 transition"><window.Icon name="x"/></button></div>
                            
                            <div>
                                <label className="text-[9px] font-mono uppercase text-emerald-400 mb-1.5 block">2FA Authenticator Setup</label>
                                {u.mfaEnabled ? (
                                    <div className="w-full py-2.5 bg-emerald-500/10 text-emerald-300 font-semibold rounded-xl text-xs border border-emerald-500/30 text-center flex items-center justify-center gap-2">
                                        <window.Icon name="check-circle" size={16}/> 2FA is currently Active on your Vault
                                    </div>
                                ) : !mfaSetup ? (
                                    <button type="button" onClick={enableMFA} className="w-full py-2 bg-emerald-500/20 text-emerald-300 font-semibold rounded-xl text-xs hover:bg-emerald-500/30 transition border border-emerald-500/30">Enable 2FA Authenticator App</button>
                                ) : (
                                    <div className="bg-black/40 p-3 rounded-xl border border-emerald-500/30 text-center">
                                        <img src={mfaSetup.qr} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg mb-2 shadow-lg bg-white p-1"/>
                                        <div className="text-[9px] font-mono t85 mb-3 select-all">Secret: {mfaSetup.secret}</div>
                                        <form onSubmit={(e)=>{e.preventDefault(); verifyAndSaveMfa();}}><input required value={mfaSetup.pin} onChange={e=>setMfaSetup({...mfaSetup, pin: e.target.value})} maxLength="6" placeholder="Enter 6-digit PIN" className="w-full text-center tracking-[0.5em] font-mono font-bold bg-black/50 border border-white/10 rounded-lg px-2 py-2 text-sm outline-none text-emerald-300 focus:border-emerald-400/50 mb-3"/><button type="submit" className="w-full py-2 bg-emerald-500 text-black font-semibold rounded-lg text-xs hover:bg-emerald-400 transition">Verify & Activate</button></form>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div><label className="text-[9px] font-mono uppercase t50 mb-1.5 block">Default Kundali Style</label><select value={set.kundaliStyle} onChange={e=> updateSettings({...set,kundaliStyle:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white"><option value="north">North Indian</option><option value="south">South Indian</option><option value="east">East Indian</option><option value="kp">KP System</option></select></div>
                                <div className="notranslate"><label className="text-[9px] font-mono uppercase t50 mb-1.5 block">Month System</label><select value={set.monthSystem} onChange={e=> updateSettings({...set,monthSystem:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white notranslate"><option value="amanta">Amanta (Amavasya)</option><option value="purnimanta">Purnimanta (Purnima)</option></select></div>
                            </div>

                            <div>
                                <label className="text-[9px] font-mono uppercase t50 mb-1.5 block">AI Provider Engine</label>
                                <select value={set.aiModel} onChange={e=> updateSettings({...set,aiModel:e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white">
                                    <option value="offline">Offline Rule-Based Expert Engine (100% Local)</option><option value="gemini">Google Gemini 1.5 Flash</option><option value="openai">OpenAI (GPT-4o Mini)</option><option value="kimi">Moonshot / Kimi</option><option value="deepseek">DeepSeek AI</option>
                                </select>
                            </div>

                            <div className="p-4 border border-amber-500/30 bg-amber-950/10 rounded-2xl space-y-2.5">
                                <label className="text-[10px] text-amber-400 font-mono uppercase block">Encrypted Fallback API Keys</label>
                                <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Gemini Key</span><a href="https://aistudio.google.com/app/apikey" target="_blank" className="hover:text-amber-300" title="Get Gemini Key"><window.Icon name="question"/></a></div><input type="password" value={set.apiKeys?.gemini||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,gemini:e.target.value}})} placeholder="AIzaSy..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>OpenAI Key</span><a href="https://platform.openai.com/api-keys" target="_blank" className="hover:text-amber-300" title="Get OpenAI Key"><window.Icon name="question"/></a></div><input type="password" value={set.apiKeys?.openai||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,openai:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Kimi Key</span><a href="https://platform.moonshot.cn/console/api-keys" target="_blank" className="hover:text-amber-300" title="Get Kimi Key"><window.Icon name="question"/></a></div><input type="password" value={set.apiKeys?.kimi||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,kimi:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>DeepSeek Key</span><a href="https://platform.deepseek.com/api_keys" target="_blank" className="hover:text-amber-300" title="Get DeepSeek Key"><window.Icon name="question"/></a></div><input type="password" value={set.apiKeys?.deepseek||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,deepseek:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                            </div>
                        </div>
                    </div>
                )}

                {ed && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={()=>setEd(null)}>
                        <form onClick={e=>e.stopPropagation()} onSubmit={hSave} className="w-full max-w-md bgcard2 rounded-3xl border border-white/10 p-6 space-y-3.5 max-h-[90vh] overflow-y-auto gl-fadein shadow-2xl relative">
                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                <h3 className="font-serif text-lg text-white">{ed.id?"Modify Profile Details":"Create Natal Profile"}</h3>
                                {ed.id && <button type="button" onClick={()=>deleteProfile(ed.id)} className="text-[10px] text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/20">Delete</button>}
                            </div>
                            <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Full Name</label><input required name="nm" defaultValue={ed.name||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                            <div className="grid grid-cols-2 gap-2">
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Date of Birth</label><input required type="date" name="dob" defaultValue={ed.dob||"2000-01-01"} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Time (24h)</label><input required type="time" name="tm" defaultValue={ed.time||"12:00"} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white"/></div>
                            </div>
                            
                            <div className="pt-2 border-t border-white/10">
                                <label className="text-[9px] t50 uppercase font-mono mb-1 flex justify-between items-center">
                                    <span>GPS Auto-Locate</span>
                                    <button type="button" onClick={()=>{ if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(async pos => { const lat = pos.coords.latitude; const lon = pos.coords.longitude; document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4); let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`); const d = await r.json(); document.querySelector('input[name="pl"]').value = d.address.city || d.address.town || d.address.village || 'Auto GPS Location'; } catch(e){ document.querySelector('input[name="pl"]').value = 'GPS Coord'; } }); } else alert('Geolocation not supported'); }} className="text-amber-300 hover:text-amber-200 border border-amber-300/30 px-2 py-1 rounded">Use GPS <window.Icon name="crosshair"/></button>
                                </label>
                            </div>

                            <div>
                                <label className="text-[9px] t50 uppercase font-mono mb-1 block">Birth Place Name / Auto-Fetch</label>
                                <div className="flex gap-2">
                                    <input required list="cities" id="searchCityInput" name="pl" defaultValue={ed.place||""} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); fetchCityCoordinates();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none text-white" placeholder="Type city name..." />
                                    <button type="button" id="fetchBtn" onClick={fetchCityCoordinates} className="px-3 py-2 bg-white/10 rounded-xl text-xs hover:bg-white/20 transition">Search</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Latitude</label><input required type="number" step="any" name="lt" defaultValue={ed.lat||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">Longitude</label><input required type="number" step="any" name="ln" defaultValue={ed.lon||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
                                <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">UTC Offset</label><input required type="number" step="any" name="ut" defaultValue={ed.utcOffset||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-2 text-xs outline-none text-white"/></div>
                            </div>
                            <div className="pt-2 border-t border-white/10">
                                <div className="text-[10px] text-amber-400 uppercase font-mono mb-2 tracking-widest text-center">Spiritual Lineage (Optional)</div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gotra</label><input list="gotras" name="gt" defaultValue={ed.gotra||""} placeholder="e.g. Kashyapa" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Jaati / Varg</label><input list="jaatis" name="jt" defaultValue={ed.jaati||""} placeholder="e.g. Brahmin" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Kul Devta</label><input name="kd" defaultValue={ed.kulDevta||""} placeholder="e.g. Chamunda" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Gram Devta</label><input name="gd" defaultValue={ed.gramDevta||""} placeholder="e.g. Bhairava" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                </div>
                                <div><label className="text-[8px] t50 uppercase font-mono mb-1 block">Sthan Devta</label><input name="sd" defaultValue={ed.sthanDevta||""} placeholder="e.g. Hanumanji" className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                            </div>
                            <button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-2 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">Save Encrypted Vault Profile</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- BULLETPROOF BOOTLOADER ---
// Waits for Babel to finish compiling ALL external JSX files
const bootInterval = setInterval(() => {
    if (
        window.ErrorBoundary && 
        window.KundaliRenderer && 
        window.AuthModal && 
        window.PersonTab
    ) {
        clearInterval(bootInterval);
        document.getElementById('bootloader').style.display = 'none';
        const root = window.React.StrictMode ? window.ReactDOM.createRoot(document.getElementById('root')) : null;
        if(root) {
            root.render(<window.ErrorBoundary><AppContent/></window.ErrorBoundary>);
        }
    }
}, 50);
