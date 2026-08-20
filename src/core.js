window.CITY_PRESETS=[{name:"Dubai, UAE",lat:25.20,lon:55.27,utc:4.0},{name:"Phalodi, India",lat:27.13,lon:72.36,utc:5.5},{name:"Mumbai, India",lat:19.07,lon:72.87,utc:5.5},{name:"New Delhi, India",lat:28.61,lon:77.20,utc:5.5},{name:"Ujjain, India",lat:23.17,lon:75.78,utc:5.5},{name:"London, UK",lat:51.50,lon:-0.12,utc:0.0},{name:"New York, USA",lat:40.71,lon:-74.00,utc:-5.0}];
window.GOTRAS=["Kashyapa","Bharadwaj","Vatsa","Sandilya","Gautama","Gargya","Vishwamitra","Vasishtha","Atri","Agastya"]; 
window.JAATIS=["Brahmin","Kshatriya","Vaishya","Shudra","Kayastha","Rajput","Maratha","Jat"];
window.SIGNS=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
window.SIGN_TRAITS={"Aries":"bold, pioneering, high-energy","Taurus":"grounded, determined, value-focused","Gemini":"intellectual, versatile, adaptable","Cancer":"nurturing, deeply intuitive, protective","Leo":"charismatic, authoritative, creative","Virgo":"analytical, precision-driven, methodical","Libra":"diplomatic, aesthetic, balanced","Scorpio":"transformative, perceptive, strategic","Sagittarius":"philosophical, expansive, visionary","Capricorn":"ambitious, structured, disciplined","Aquarius":"innovative, unconventional, humanitarian","Pisces":"intuitive, empathetic, contemplative"};
window.NAKSHATRAS=["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
window.LUNAR_MASAS=["Chaitra","Vaishakha","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashvin","Kartika","Margashirsha","Pausha","Magha","Phalguna"];
window.YOGAS=["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
window.KARANAS=["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti (Bhadra)"]; 
window.WEEKDAY=["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn"]; 
window.SANSKRIT_DAYS={Sun:"Ravi",Moon:"Soma",Mars:"Mangala",Mercury:"Budha",Jupiter:"Brihaspati",Venus:"Shukra",Saturn:"Shani"};
window.PLANET_LORDS=["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"]; 
window.VIMSHOTTARI_YEARS={Ketu:7,Venus:20,Sun:6,Moon:10,Mars:7,Rahu:18,Jupiter:16,Saturn:19,Mercury:17};

window.PLANET_INFO={
  Sun:{symbol:"☉",color:"#E8A33D",adhidevata:"Lord Rama",gem:"Ruby",beej:"Om Hraam Hreem Hroum Sah Suryaya Namah",mantras:["Aditya Hrudaya Stotram"],charity:"Donate wheat/copper on Sunday.",action:"Offer Arghya facing east at dawn."},
  Moon:{symbol:"☽",color:"#9FB8D9",adhidevata:"Goddess Gauri",gem:"Pearl",beej:"Om Shraam Shreem Shroum Sah Chandraya Namah",mantras:["Chandra Kavacham"],charity:"Donate white rice/milk on Monday.",action:"Practice moonlit meditation."},
  Mars:{symbol:"♂",color:"#B23A48",adhidevata:"Lord Hanuman",gem:"Red Coral",beej:"Om Kraam Kreem Kroum Sah Bhaumaya Namah",mantras:["Hanuman Chalisa"],charity:"Donate red lentils on Tuesday.",action:"Physical discipline."},
  Mercury:{symbol:"☿",color:"#7C9473",adhidevata:"Lord Vishnu",gem:"Emerald",beej:"Om Braam Breem Broum Sah Budhaya Namah",mantras:["Vishnu Sahasranama"],charity:"Feed green spinach to cows on Wednesday.",action:"Refine business communication."},
  Jupiter:{symbol:"♃",color:"#D4A574",adhidevata:"Lord Dakshinamurthy",gem:"Yellow Sapphire",beej:"Om Graam Greem Groum Sah Gurave Namah",mantras:["Guru Stotram"],charity:"Donate yellow turmeric on Thursday.",action:"Seek guidance from mentors."},
  Venus:{symbol:"♀",color:"#C98CA7",adhidevata:"Goddess Lakshmi",gem:"Diamond",beej:"Om Draam Dreem Droum Sah Shukraya Namah",mantras:["Sri Suktam"],charity:"Donate white silk/ghee on Friday.",action:"Cultivate aesthetic harmony."},
  Saturn:{symbol:"♄",color:"#8288A0",adhidevata:"Lord Shani / Bhairava",gem:"Blue Sapphire",beej:"Om Praam Preem Proum Sah Shanaye Namah",mantras:["Shani Chalisa"],charity:"Donate black sesame, mustard oil on Saturday.",action:"Light a mustard-oil lamp at dusk."},
  Rahu:{symbol:"☊",color:"#A872B2",adhidevata:"Goddess Durga",gem:"Hessonite",beej:"Om Bhraam Bhreem Bhroum Sah Rahave Namah",mantras:["Durga Saptashati"],charity:"Feed stray animals.",action:"Avoid impulsive speculation."},
  Ketu:{symbol:"☋",color:"#72AAB2",adhidevata:"Lord Ganesha",gem:"Cat's Eye",beej:"Om Sraam Sreem Sroum Sah Ketave Namah",mantras:["Ganesha Atharvashirsha"],charity:"Donate multi-colored items.",action:"Observe silent contemplation."}
};

window.CryptoUtils={
    b64E:s=>btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g,(m,p)=>String.fromCharCode('0x'+p))),
    b64D:s=>decodeURIComponent(atob(s).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')),
    encrypt:d=>{if(!d)return d;let s=typeof d==='object'?JSON.stringify(d):String(d);let r='';for(let i=0;i<s.length;i++)r+=String.fromCharCode(s.charCodeAt(i)^"SAGE2026".charCodeAt(i%8));return window.CryptoUtils.b64E(r);},
    decrypt:b=>{if(!b)return b;try{if(!b.match(/^[A-Za-z0-9+/=]+$/))return b;let d=window.CryptoUtils.b64D(b);let r='';for(let i=0;i<d.length;i++)r+=String.fromCharCode(d.charCodeAt(i)^"SAGE2026".charCodeAt(i%8));try{return JSON.parse(r);}catch(e){return r;}}catch(e){return b;}},
    hashPassword:async(s)=>{const fb=(str)=>{let h=0;for(let i=0;i<str.length;i++)h=Math.imul(31,h)+str.charCodeAt(i)|0;return "h_"+Math.abs(h).toString(16);};try{if(!window.crypto||!window.crypto.subtle)return fb(s);const b=await window.crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');}catch(e){return fb(s);}}
};

window.AppDB={
  config:null,useLocal:false,
  setConfig(o,r,t){this.config={owner:o,repo:r,token:t};try{localStorage.setItem('gh_db_config',JSON.stringify(this.config));localStorage.setItem('gh_use_local','false');}catch(e){}this.useLocal=false;},
  clearConfig(){this.config=null;try{localStorage.removeItem('gh_db_config');localStorage.removeItem('gh_use_local');}catch(e){}},
  loadConfig(){try{if(localStorage.getItem('gh_use_local')==='true'){this.useLocal=true;return true;}const c=localStorage.getItem('gh_db_config');if(c){this.config=JSON.parse(c);return true;}}catch(e){}return false;},
  enableLocal(){this.useLocal=true;try{localStorage.setItem('gh_use_local','true');}catch(e){}},
  async callApi(m,p,b=null){if(!this.config)throw new Error("DB not configured.");const q=m==='GET'?`?t=${Date.now()}`:'';const u=`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${p}${q}`;const h={'Authorization':`token ${this.config.token}`,'Accept':'application/vnd.github.v3+json'};if(b)h['Content-Type']='application/json';const res=await fetch(u,{method:m,headers:h,body:b?JSON.stringify(b):null});if(!res.ok){if(res.status===404&&m==='GET')return null;throw new Error(res.status.toString());}return await res.json();},
  async getFile(f){if(this.useLocal){try{return{sha:null,content:JSON.parse(localStorage.getItem(f)||'{}')};}catch(e){return{sha:null,content:{}};}}try{const d=await this.callApi('GET',f);if(!d)return{sha:null,content:{}};return{sha:d.sha,content:JSON.parse(window.CryptoUtils.b64D(d.content.replace(/\n/g,'')))};}catch(e){return{sha:null,content:{}};}},
  async saveFile(f,c,s,ret=0){if(this.useLocal){try{localStorage.setItem(f,JSON.stringify(c));}catch(e){}return;}try{await this.callApi('PUT',f,{message:`Sync: ${f}`,content:window.CryptoUtils.b64E(JSON.stringify(c,null,2)),...(s?{sha:s}:{})});}catch(err){if((err.message==="409"||err.message==="422")&&ret<2){const l=await this.callApi('GET',f);if(l&&l.sha){await this.saveFile(f,c,l.sha,ret+1);return;}}throw new Error(`Sync Failed (${f}): ${err.message}`);}},
  async getGlobalAI(){if(this.useLocal){try{return{sha:null,history:JSON.parse(localStorage.getItem('graha_local_ai')||'[]')};}catch(e){return{sha:null,history:[]};}}try{const data=await this.callApi('GET','gl_global_ai.json');if(!data)return{sha:null,history:[]};const p=JSON.parse(window.CryptoUtils.b64D(data.content.replace(/\n/g,'')));return{sha:data.sha,history:Array.isArray(p)?p:[]};}catch(e){return{sha:null,history:[]};}},
  async appendGlobalAI(qaObj){const ds=await this.getGlobalAI();const uh=[...ds.history,window.CryptoUtils.encrypt(qaObj)];if(this.useLocal){try{localStorage.setItem('graha_local_ai',JSON.stringify(uh));}catch(e){}return;}try{await this.callApi('PUT','gl_global_ai.json',{message:"AI Sync",content:window.CryptoUtils.b64E(JSON.stringify(uh,null,2)),...(ds.sha?{sha:ds.sha}:{})});}catch(e){}},
  async hashKey(s){return await window.CryptoUtils.hashPassword(s);}
};

window.norm360 = (x) => { let v=x%360; return v<0?v+360:v; }; 
window.toRad = (d) => (d*Math.PI)/180;
window.julianDay = (dStr,tStr,utc) => { const [Y,M,D]=(dStr||"2026-01-01").split("-").map(Number); const [h,m]=(tStr||"12:00").split(":").map(Number); return (Date.UTC(Y,M-1,D,h,m,0)-((utc||0)*3600000))/86400000+2440587.5; };
window.getAya = (Y) => 23.85+(Y-2000)*0.013972;
window.sunLon = (T) => { const M=window.norm360(357.529+35999.05*T); const L=window.norm360(280.466+36000.77*T+1.915*Math.sin(window.toRad(M))); return {L, R:1.00014-0.01671*Math.cos(window.toRad(M))}; };
window.moonLon = (T) => { const D=window.norm360(297.85+445267.11*T),M=window.norm360(357.52+35999.05*T),Mp=window.norm360(134.96+477198.86*T); return window.norm360(218.316+481267.88*T+6.28*Math.sin(window.toRad(Mp))+1.27*Math.sin(window.toRad(2*D-Mp))); };

const PE = { Mercury: { a: 0.387, e: 0.205, i: 7.004, L: [252.25, 149472.67], peri: 77.45, node: 48.33 }, Venus: { a: 0.723, e: 0.006, i: 3.394, L: [181.97, 58517.81], peri: 131.60, node: 76.67 }, Mars: { a: 1.523, e: 0.093, i: 1.849, L: [-4.55, 19140.30], peri: -23.94, node: 49.55 }, Jupiter: { a: 5.202, e: 0.048, i: 1.304, L: [34.39, 3034.74], peri: 14.72, node: 100.47 }, Saturn: { a: 9.536, e: 0.053, i: 2.485, L: [49.95, 1222.49], peri: 92.59, node: 113.66 } };
window.helio = (n, T) => { const p=PE[n], a=p.a, e=p.e, i=window.toRad(p.i), L=p.L[0]+p.L[1]*T, peri=p.peri, node=p.node; const w=window.toRad(window.norm360(peri-node)), Om=window.toRad(window.norm360(node)), M=window.toRad(window.norm360(L-peri)); const E=M+e*Math.sin(M); const xo=a*(Math.cos(E)-e), yo=a*Math.sqrt(1-e*e)*Math.sin(E); const cw=Math.cos(w),sw=Math.sin(w),co=Math.cos(Om),so=Math.sin(Om),ci=Math.cos(i); return { x: (co*cw-so*sw*ci)*xo + (-co*sw-so*cw*ci)*yo, y: (so*cw+co*sw*ci)*xo + (-so*sw+co*cw*ci)*yo }; };

window.getKPLords = (lon) => {
    const nakIdx = Math.floor(lon / (360/27));
    const remInNak = lon % (360/27);
    const subLordIdx = (Math.floor(remInNak / ((360/27)/9)) + (nakIdx % 9)) % 9;
    return { starLord: window.PLANET_LORDS[nakIdx % 9], subLord: window.PLANET_LORDS[subLordIdx], subSubLord: window.PLANET_LORDS[(subLordIdx + 2) % 9] };
};

window.formatYM = (decimalYear) => {
    const year = Math.floor(decimalYear);
    const month = Math.round((decimalYear - year) * 12);
    const d = new Date(year, month);
    return d.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
};

window.calcDasha = (moonDeg, dobStr) => {
    const nakLen = 360 / 27; const nakIdx = Math.floor(moonDeg / nakLen); const passedPct = (moonDeg % nakLen) / nakLen;
    let lordIdx = nakIdx % 9; const mahaYrs = window.VIMSHOTTARI_YEARS[window.PLANET_LORDS[lordIdx]];
    const bDate = new Date(dobStr); let startYear = bDate.getFullYear() + (bDate.getMonth()/12) - (mahaYrs * passedPct);
    const periods = []; 
    for (let i = 0; i < 9; i++) { 
        const lrd = window.PLANET_LORDS[(lordIdx + i) % 9]; const dur = window.VIMSHOTTARI_YEARS[lrd]; 
        periods.push({ lord: lrd, start: startYear, end: startYear + dur }); startYear += dur; 
    }
    return periods;
};

window.getAntardashas = (mahaLord, mahaStart, mahaEnd) => {
    const periods = []; const mahaYears = window.VIMSHOTTARI_YEARS[mahaLord];
    let currentStart = mahaStart; let lordIdx = window.PLANET_LORDS.indexOf(mahaLord);
    for(let i=0; i<9; i++) {
        const antarLord = window.PLANET_LORDS[(lordIdx + i) % 9];
        const antarYears = (mahaYears * window.VIMSHOTTARI_YEARS[antarLord]) / 120;
        periods.push({ lord: antarLord, start: currentStart, end: currentStart + antarYears });
        currentStart += antarYears;
    }
    return periods;
};

window.getPratyantarDashas = (antarLord, antarStart, antarEnd) => {
    const periods = []; const antarYears = antarEnd - antarStart;
    let currentStart = antarStart; let lordIdx = window.PLANET_LORDS.indexOf(antarLord);
    for(let i=0; i<9; i++) {
        const pLord = window.PLANET_LORDS[(lordIdx + i) % 9];
        const pYears = (antarYears * window.VIMSHOTTARI_YEARS[pLord]) / 120;
        periods.push({ lord: pLord, start: currentStart, end: currentStart + pYears });
        currentStart += pYears;
    }
    return periods;
};

window.computeKundli = (profile, dateObj = null) => {
    if(!profile) return null;
    const targetDate = dateObj || new Date(); const JD = window.julianDay(profile.dob, profile.time, profile.utcOffset); const T = (JD-2451545)/36525; const [Y,Mo] = (profile.dob||"2026-01-01").split("-").map(Number); const aya = window.getAya(Y+(Mo-1)/12);
    const s = window.sunLon(T); const e = {x: s.R*Math.cos(window.toRad(window.norm360(s.L+180))), y: s.R*Math.sin(window.toRad(window.norm360(s.L+180)))};
    const sid = { Sun: window.norm360(s.L-aya), Moon: window.norm360(window.moonLon(T)-aya), Rahu: window.norm360(window.norm360(125.04-1934.13*T)-aya) }; sid.Ketu = window.norm360(sid.Rahu+180);
    ["Mercury","Venus","Mars","Jupiter","Saturn"].forEach(p => { const h=window.helio(p,T); sid[p] = window.norm360(Math.atan2(h.y-e.y, h.x-e.x)*180/Math.PI - aya); });
    const [hh,mm]=(profile.time||"12:00").split(":").map(Number); const ascL = window.norm360(sid.Sun + ((hh+mm/60)-6)*15);
    
    const getDiv = (lon, div) => {
        if(div===1) return window.SIGNS[Math.floor(lon/30)];
        if(div===7) return window.SIGNS[ ( (Math.floor(lon/30)%2!==0 ? Math.floor(lon/30)+6 : Math.floor(lon/30)) + Math.floor((lon%30)/(30/7)) ) % 12 ]; 
        if(div===9) return window.SIGNS[ ( [0,9,6,3,0,9,6,3,0,9,6,3][Math.floor(lon/30)] + Math.floor((lon%30)/(30/9)) ) % 12 ];
        if(div===10) return window.SIGNS[ ( (Math.floor(lon/30)%2!==0 ? Math.floor(lon/30)+8 : Math.floor(lon/30)) + Math.floor((lon%30)/3) ) % 12 ];
        if(div===60) return window.SIGNS[ Math.floor((lon*60)/30) % 12 ];
    };
    const genC = (div) => {
        const lg=getDiv(ascL,div); const idx=window.SIGNS.indexOf(lg);
        const hs={}, pl={}; for(let i=1;i<=12;i++){ hs[i]=window.SIGNS[(idx+i-1)%12]; }
        Object.entries(sid).forEach(([p, l]) => pl[p] = ((window.SIGNS.indexOf(getDiv(l,div))-idx+12)%12)+1);
        return { lagna: lg, houses: hs, placements: pl };
    };

    const kpTable = Array.from({length: 12}).map((_, i) => {
        const cuspDegree = window.norm360(ascL + i*30);
        return { cusp: i+1, sign: window.SIGNS[Math.floor(cuspDegree / 30)], deg: (cuspDegree % 30).toFixed(2), ...window.getKPLords(cuspDegree) };
    });

    const shadbala = {
        Sun: Math.floor(Math.abs(Math.sin(window.toRad(sid.Sun)))*100), Moon: Math.floor(Math.abs(Math.cos(window.toRad(sid.Moon)))*100),
        Mars: Math.floor(Math.abs(Math.sin(window.toRad(sid.Mars)))*100), Mercury: Math.floor(Math.abs(Math.cos(window.toRad(sid.Mercury)))*100),
        Jupiter: Math.floor((sid.Jupiter%180)/180 * 100), Venus: Math.floor((sid.Venus%180)/180 * 100), Saturn: Math.floor((sid.Saturn%180)/180 * 100)
    };

    const dasha = window.calcDasha(sid.Moon, profile.dob); const moonIdx = Math.floor(sid.Moon/(360/27));
    const trJD = window.julianDay(targetDate.toISOString().slice(0,10), "12:00", profile.utcOffset); const trT = (trJD-2451545)/36525;
    const ts = window.sunLon(trT); const te = {x: ts.R*Math.cos(window.toRad(window.norm360(ts.L+180))), y: ts.R*Math.sin(window.toRad(window.norm360(ts.L+180)))};
    const transits = { Sun: window.SIGNS[Math.floor(window.norm360(ts.L-aya)/30)], Moon: window.SIGNS[Math.floor(window.norm360(window.moonLon(trT)-aya)/30)] };
    ["Mercury","Venus","Mars","Jupiter","Saturn"].forEach(p => { const h=window.helio(p,trT); transits[p] = window.SIGNS[Math.floor(window.norm360(Math.atan2(h.y-te.y, h.x-te.x)*180/Math.PI - aya)/30)]; });

    return { 
        d1: genC(1), d7: genC(7), d9: genC(9), d10: genC(10), d60: genC(60), kpTable,
        moonSign: window.SIGNS[Math.floor(sid.Moon/30)], sunSign: window.SIGNS[Math.floor(sid.Sun/30)], 
        nak: window.NAKSHATRAS[moonIdx], pada: Math.floor((sid.Moon%(360/27))/((360/27)/4))+1, 
        planetaryDegrees: sid, transits, dasha, shadbala
    };
};

window.panchang = (dObj, ms="amanta", utc=5.5) => {
    const JD = window.julianDay(dObj.toISOString().slice(0,10), "12:00", utc); const T = (JD-2451545)/36525;
    const sl=window.sunLon(T).L, ml=window.moonLon(T); const diff=window.norm360(ml-sl); const tIdx=Math.floor(diff/12); const isS=tIdx<15; 
    const mIdx=Math.floor(window.norm360(sl)/30); const masa = ms==="purnimanta"&&!isS ? window.LUNAR_MASAS[(mIdx+1)%12] : window.LUNAR_MASAS[mIdx];
    
    const d = new Date(dObj.getTime()); d.setHours(6,0,0,0); const sr = new Date(d.getTime()); d.setHours(18,0,0,0); const ss = new Date(d.getTime());
    d.setHours(18,30,0,0); const mr = new Date(d.getTime()); d.setHours(6,30,0,0); const msr = new Date(d.getTime()); d.setDate(d.getDate()+1);
    const dMs = ss-sr; const getS = (s, dur) => ({ s: new Date(s), e: new Date(s+dur) });
    
    const dow = dObj.getDay(); const abh = getS(sr.getTime()+(dMs/15)*7, dMs/15);
    const ct = [{n:"Udveg", d:"Anxiety", c:"#B23A48"}, {n:"Amrit", d:"Nectar", c:"#8FB2D9"}, {n:"Rog", d:"Disease", c:"#B23A48"}, {n:"Labh", d:"Gain", c:"#8FC9A9"}, {n:"Shubh", d:"Auspicious", c:"#D4A574"}, {n:"Char", d:"Moving", c:"#9FB8D9"}, {n:"Kaal", d:"Loss", c:"#8288A0"}];
    const cm = {0:[0,5,3,1,2,4,6,0], 1:[1,2,4,6,0,5,3,1], 2:[2,4,6,0,5,3,1,2], 3:[3,1,2,4,6,0,5,3], 4:[4,6,0,5,3,1,2,4], 5:[5,3,1,2,4,6,0,5], 6:[6,0,5,3,1,2,4,6]};
    const chogDay = cm[dow].map((i, idx) => ({ ...ct[i], ...getS(sr.getTime()+idx*(dMs/8), dMs/8) }));
    const chogNight = cm[(dow+4)%7].map((i, idx) => ({ ...ct[i], ...getS(ss.getTime()+idx*(dMs/8), dMs/8) }));

    const hoOrder = [0,5,3,1,6,4,2]; const sHoIdx = [0,3,6,2,5,1,4][dow];
    const horas = Array.from({length:12}).map((_,i) => ({ p: window.WEEKDAY[hoOrder[(hoOrder.indexOf(sHoIdx)+i)%7]], ...getS(sr.getTime()+i*(dMs/12), dMs/12) }));

    const karana = window.KARANAS[Math.floor(diff/6)%7]||"Kimstughna";
    const bhadraApprox = (karana.includes('Bhadra') || karana.includes('Vishti')) ? getS(sr.getTime()+dMs*0.5, dMs*0.4) : null;

    return { 
        tithi: ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi",isS?"Purnima":"Amavasya"][tIdx%15],
        paksha: isS?"Shukla":"Krishna", masa, nak: window.NAKSHATRAS[Math.floor(ml/(360/27))], yoga: window.YOGAS[Math.floor(window.norm360(ml+sl)/(360/27))],
        karana, sr, ss, mr, msr, abh, chogDay, chogNight, horas, bhadra: bhadraApprox,
        rahu: getS(sr.getTime()+dMs*0.8, dMs*0.1), yamaganda: getS(sr.getTime()+dMs*0.4, dMs*0.1), gulika: getS(sr.getTime()+dMs*0.2, dMs*0.1), brahma: getS(sr.getTime()-dMs*0.15, dMs*0.08),
        vikram: dObj.getFullYear() + 57, saka: dObj.getFullYear() - 78
    };
};

window.bio = (dob, td, utc) => {
    const [Y,M,D]=(dob||"2026-01-01").split("-").map(Number);
    const eD = (Date.UTC(td.getFullYear(),td.getMonth(),td.getDate(),12,0,0)-((utc||0)*3600000) - (Date.UTC(Y,M-1,D,12,0,0)-((utc||0)*3600000))) / 86400000;
    return { p: Math.sin(2*Math.PI*eD/23), e: Math.sin(2*Math.PI*eD/28), i: Math.sin(2*Math.PI*eD/33), s: Math.sin(2*Math.PI*eD/38) };
};

window.executeMultiProviderAI = async (prompt, settings, systemInstruction = "") => {
    const providers = [
        { id: "gemini", run: async (k) => { const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.candidates?.[0]?.content?.parts?.[0]?.text; }},
        { id: "openai", run: async (k) => { const res = await fetch(`https://api.openai.com/v1/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }},
        { id: "kimi", run: async (k) => { const res = await fetch(`https://api.moonshot.cn/v1/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "moonshot-v1-8k", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }},
        { id: "deepseek", run: async (k) => { const res = await fetch(`https://api.deepseek.com/chat/completions`, { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: systemInstruction }, { role: "user", content: prompt }] }) }); if (!res.ok) throw new Error(); const data = await res.json(); return data.choices?.[0]?.message?.content; }}
    ];
    const primaryModel = settings.aiModel || "gemini";
    if (primaryModel === "offline") return null;
    const order = [primaryModel, ...providers.map(p=>p.id).filter(id=>id!==primaryModel)];
    for (const provId of order) {
        const key = settings.apiKeys?.[provId];
        if (key && key.trim().length > 5) {
            try { const executor = providers.find(p=>p.id===provId); if (executor) { const answer = await executor.run(key.trim()); if (answer) return { text: answer, provider: provId }; } } catch (e) {}
        }
    }
    return null;
};

window.generateDeepGochara = (ch, lagnaSign, bScores) => {
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
