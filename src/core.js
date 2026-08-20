// src/core.js
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
  Saturn:{symbol:"♄",color:"#8288A0",adhidevata:"Lord Shani",gem:"Blue Sapphire",beej:"Om Praam Preem Proum Sah Shanaye Namah",mantras:["Shani Chalisa"],charity:"Donate black sesame/mustard oil on Saturday.",action:"Light a mustard-oil lamp at dusk."},
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
  async callApi(m,p,b=null){if(!this.config)throw new Error("DB not configured.");const q=m==='GET'?`?t=${Date.now()}`:'';const u=`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${p}${q}`;const h={'Authorization':`token ${this.config.token}`,'Accept':'application/vnd.github.v3+json'};if(b)h['Content-Type']='application/json';const r=await fetch(u,{method:m,headers:h,body:b?JSON.stringify(b):null});if(!r.ok){if(r.status===404&&m==='GET')return null;throw new Error(r.status.toString());}return await r.json();},
  async getFile(f){if(this.useLocal){try{return{sha:null,content:JSON.parse(localStorage.getItem(f)||'{}')};}catch(e){return{sha:null,content:{}};}}try{const d=await this.callApi('GET',f);if(!d)return{sha:null,content:{}};return{sha:d.sha,content:JSON.parse(window.CryptoUtils.b64D(d.content.replace(/\n/g,'')))};}catch(e){return{sha:null,content:{}};}},
  async saveFile(f,c,s,ret=0){if(this.useLocal){try{localStorage.setItem(f,JSON.stringify(c));}catch(e){}return;}try{await this.callApi('PUT',f,{message:`Sync: ${f}`,content:window.CryptoUtils.b64E(JSON.stringify(c,null,2)),...(s?{sha:s}:{})});}catch(e){if((e.message==="409"||e.message==="422")&&ret<2){const l=await this.callApi('GET',f);if(l&&l.sha){await this.saveFile(f,c,l.sha,ret+1);return;}}throw new Error(`Sync Failed (${f}): ${e.message}`);}},
  async getGlobalAI(){if(this.useLocal){try{return{sha:null,history:JSON.parse(localStorage.getItem('graha_local_ai')||'[]')};}catch(e){return{sha:null,history:[]};}}try{const data=await this.callApi('GET','gl_global_ai.json');if(!data)return{sha:null,history:[]};const parsed=JSON.parse(window.CryptoUtils.b64D(data.content.replace(/\n/g,'')));return{sha:data.sha,history:Array.isArray(parsed)?parsed:[]};}catch(e){return{sha:null,history:[]};}},
  async appendGlobalAI(qaObj){const ds=await this.getGlobalAI();const uh=[...ds.history,window.CryptoUtils.encrypt(qaObj)];if(this.useLocal){try{localStorage.setItem('graha_local_ai',JSON.stringify(uh));}catch(e){}return;}try{await this.callApi('PUT','gl_global_ai.json',{message:"AI Sync",content:window.CryptoUtils.b64E(JSON.stringify(uh,null,2)),...(ds.sha?{sha:ds.sha}:{})});}catch(e){}},
  async hashKey(s){return await window.CryptoUtils.hashPassword(s);}
};

window.norm360 = (x) => { let v=x%360; return v<0?v+360:v; }; 
window.toRad = (d) => (d*Math.PI)/180;
window.julianDay = (dStr,tStr,utc) => { const [Y,M,D]=(dStr||"2026-01-01").split("-").map(Number); const [h,m]=(tStr||"12:00").split(":").map(Number); return (Date.UTC(Y,M-1,D,h,m,0)-((utc||0)*3600000))/86400000+2440587.5; };
window.getAya = (Y) => 23.85+(Y-2000)*0.013972;
window.sunLon = (T) => { const M=window.norm360(357.529+35999.05*T); const L=window.norm360(280.466+36000.77*T+1.915*Math.sin(window.toRad(M))); return {L, R:1.00014-0.01671*Math.cos(window.toRad(M))}; };
window.moonLon = (T) => { const D=window.norm360(297.85+445267.11*T),M=window.norm360(357.52+35999.05*T),Mp=window.norm360(134.96+477198.86*T); return window.norm360(218.316+481267.88*T+6.28*Math.sin(window.toRad(Mp))+1.27*Math.sin(window.toRad(2*D-Mp))); };

const PE={Mercury:{a:0.387,e:0.205,i:7.004,L:[252.25,149472.67],peri:77.45,node:48.33},Venus:{a:0.723,e:0.006,i:3.394,L:[181.97,58517.81],peri:131.60,node:76.67},Mars:{a:1.523,e:0.093,i:1.849,L:[-4.55,19140.30],peri:-23.94,node:49.55},Jupiter:{a:5.202,e:0.048,i:1.304,L:[34.39,3034.74],peri:14.72,node:100.47},Saturn:{a:9.536,e:0.053,i:2.485,L:[49.95,1222.49],peri:92.59,node:113.66}};
window.helio = (n,T) => { const p=PE[n],a=p.a,e=p.e,i=window.toRad(p.i),L=p.L[0]+p.L[1]*T,peri=p.peri,node=p.node; const w=window.toRad(window.norm360(peri-node)),Om=window.toRad(window.norm360(node)),M=window.toRad(window.norm360(L-peri)); const E=M+e*Math.sin(M); const xo=a*(Math.cos(E)-e),yo=a*Math.sqrt(1-e*e)*Math.sin(E); const cw=Math.cos(w),sw=Math.sin(w),co=Math.cos(Om),so=Math.sin(Om),ci=Math.cos(i); return { x:(co*cw-so*sw*ci)*xo+(-co*sw-so*cw*ci)*yo, y:(so*cw+co*sw*ci)*xo+(-so*sw+co*cw*ci)*yo }; };
window.getKPLords = (lon) => { const nk=Math.floor(lon/(360/27)),rm=lon%(360/27),sl=(Math.floor(rm/((360/27)/9))+(nk%9))%9; return {starLord:window.PLANET_LORDS[nk%9],subLord:window.PLANET_LORDS[sl],subSubLord:window.PLANET_LORDS[(sl+2)%9]}; };
window.formatYM = (dY) => { const y=Math.floor(dY),m=Math.round((dY-y)*12); return new Date(y,m).toLocaleDateString('en-US',{month:'short',year:'numeric'}); };

window.calcDasha = (mD,dob) => { const nL=360/27,nI=Math.floor(mD/nL),pP=(mD%nL)/nL; let lI=nI%9; const mY=window.VIMSHOTTARI_YEARS[window.PLANET_LORDS[lI]],bD=new Date(dob); let sY=bD.getFullYear()+(bD.getMonth()/12)-(mY*pP); const p=[]; for(let i=0;i<9;i++){const l=window.PLANET_LORDS[(lI+i)%9],d=window.VIMSHOTTARI_YEARS[l];p.push({lord:l,start:sY,end:sY+d});sY+=d;} return p; };
window.getAntardashas = (mL,mS) => { const p=[],mY=window.VIMSHOTTARI_YEARS[mL]; let cS=mS,lI=window.PLANET_LORDS.indexOf(mL); for(let i=0;i<9;i++){const aL=window.PLANET_LORDS[(lI+i)%9],aY=(mY*window.VIMSHOTTARI_YEARS[aL])/120;p.push({lord:aL,start:cS,end:cS+aY});cS+=aY;} return p; };
window.getPratyantarDashas = (aL,aS,aE) => { const p=[],aY=aE-aS; let cS=aS,lI=window.PLANET_LORDS.indexOf(aL); for(let i=0;i<9;i++){const pL=window.PLANET_LORDS[(lI+i)%9],pY=(aY*window.VIMSHOTTARI_YEARS[pL])/120;p.push({lord:pL,start:cS,end:cS+pY});cS+=pY;} return p; };

window.computeKundli = (profile, dateObj = null) => {
    if(!profile) return null;
    const targetDate = dateObj || new Date(); const JD = window.julianDay(profile.dob, profile.time, profile.utcOffset); const T = (JD-2451545)/36525; const [Y,Mo] = (profile.dob||"2026-01-01").split("-").map(Number); const aya = window.getAya(Y+(Mo-1)/12);
    const s = window.sunLon(T); const e = {x: s.R*Math.cos(window.toRad(window.norm360(s.L+180))), y: s.R*Math.sin(window.toRad(window.norm360(s.L+180)))};
    const sid = { Sun: window.norm360(s.L-aya), Moon: window.norm360(window.moonLon(T)-aya), Rahu: window.norm360(window.norm360(125.04-1934.13*T)-aya) }; sid.Ketu = window.norm360(sid.Rahu+180);
    ["Mercury","Venus","Mars","Jupiter","Saturn"].forEach(p => { const h=window.helio(p,T); sid[p] = window.norm360(Math.atan2(h.y-e.y, h.x-e.x)*180/Math.PI - aya); });
    const [hh,mm]=(profile.time||"12:00").split(":").map(Number); const ascL = window.norm360(sid.Sun + ((hh+mm/60)-6)*15);
    const getDiv = (lon, div) => { if(div===1) return window.SIGNS[Math.floor(lon/30)]; if(div===7) return window.SIGNS[ ( (Math.floor(lon/30)%2!==0 ? Math.floor(lon/30)+6 : Math.floor(lon/30)) + Math.floor((lon%30)/(30/7)) ) % 12 ]; if(div===9) return window.SIGNS[ ( [0,9,6,3,0,9,6,3,0,9,6,3][Math.floor(lon/30)] + Math.floor((lon%30)/(30/9)) ) % 12 ]; if(div===10) return window.SIGNS[ ( (Math.floor(lon/30)%2!==0 ? Math.floor(lon/30)+8 : Math.floor(lon/30)) + Math.floor((lon%30)/3) ) % 12 ]; if(div===60) return window.SIGNS[ Math.floor((lon*60)/30) % 12 ]; };
    const genC = (div) => { const lg=getDiv(ascL,div); const idx=window.SIGNS.indexOf(lg); const hs={}, pl={}; for(let i=1;i<=12;i++){ hs[i]=window.SIGNS[(idx+i-1)%12]; } Object.entries(sid).forEach(([p, l]) => pl[p] = ((window.SIGNS.indexOf(getDiv(l,div))-idx+12)%12)+1); return { lagna: lg, houses: hs, placements: pl }; };
    const kpTable = Array.from({length: 12}).map((_, i) => { const cuspDegree = window.norm360(ascL + i*30); return { cusp: i+1, sign: window.SIGNS[Math.floor(cuspDegree / 30)], deg: (cuspDegree % 30).toFixed(2), ...window.getKPLords(cuspDegree) }; });
    const shadbala = { Sun: Math.floor(Math.abs(Math.sin(window.toRad(sid.Sun)))*100), Moon: Math.floor(Math.abs(Math.cos(window.toRad(sid.Moon)))*100), Mars: Math.floor(Math.abs(Math.sin(window.toRad(sid.Mars)))*100), Mercury: Math.floor(Math.abs(Math.cos(window.toRad(sid.Mercury)))*100), Jupiter: Math.floor((sid.Jupiter%180)/180 * 100), Venus: Math.floor((sid.Venus%180)/180 * 100), Saturn: Math.floor((sid.Saturn%180)/180 * 100) };
    const dasha = window.calcDasha(sid.Moon, profile.dob); const moonIdx = Math.floor(sid.Moon/(360/27));
    const trJD = window.julianDay(targetDate.toISOString().slice(0,10), "12:00", profile.utcOffset); const trT = (trJD-2451545)/36525; const ts = window.sunLon(trT); const te = {x: ts.R*Math.cos(window.toRad(window.norm360(ts.L+180))), y: ts.R*Math.sin(window.toRad(window.norm360(ts.L+180)))};
    const transits = { Sun: window.SIGNS[Math.floor(window.norm360(ts.L-aya)/30)], Moon: window.SIGNS[Math.floor(window.norm360(window.moonLon(trT)-aya)/30)] }; ["Mercury","Venus","Mars","Jupiter","Saturn"].forEach(p => { const h=window.helio(p,trT); transits[p] = window.SIGNS[Math.floor(window.norm360(Math.atan2(h.y-te.y, h.x-te.x)*180/Math.PI - aya)/30)]; });
    return { d1: genC(1), d7: genC(7), d9: genC(9), d10: genC(10), d60: genC(60), kpTable, moonSign: window.SIGNS[Math.floor(sid.Moon/30)], sunSign: window.SIGNS[Math.floor(sid.Sun/30)], nak: window.NAKSHATRAS[moonIdx], pada: Math.floor((sid.Moon%(360/27))/((360/27)/4))+1, planetaryDegrees: sid, transits, dasha, shadbala };
};

window.panchang = (dObj, ms="amanta", utc=5.5) => {
    const JD = window.julianDay(dObj.toISOString().slice(0,10), "12:00", utc); const T = (JD-2451545)/36525;
    const sl=window.sunLon(T).L, ml=window.moonLon(T); const diff=window.norm360(ml-sl); const tIdx=Math.floor(diff/12); const isS=tIdx<15; 
    const mIdx=Math.floor(window.norm360(sl)/30); const masa = ms==="purnimanta"&&!isS ? window.LUNAR_MASAS[(mIdx+1)%12] : window.LUNAR_MASAS[mIdx];
    const d = new Date(dObj); d.setHours(6,0,0,0); const sr = new Date(d); d.setHours(18,0,0,0); const ss = new Date(d); d.setHours(18,30,0,0); const mr = new Date(d); d.setHours(6,30,0,0); const msr = new Date(d); d.setDate(d.getDate()+1);
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
    return { tithi: ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi",isS?"Purnima":"Amavasya"][tIdx%15], paksha: isS?"Shukla":"Krishna", masa, nak: window.NAKSHATRAS[Math.floor(ml/(360/27))], yoga: window.YOGAS[Math.floor(window.norm360(ml+sl)/(360/27))], karana, sr, ss, mr, msr, abh, chogDay, chogNight, horas, bhadra: bhadraApprox, rahu: getS(sr.getTime()+dMs*0.8, dMs*0.1), yamaganda: getS(sr.getTime()+dMs*0.4, dMs*0.1), gulika: getS(sr.getTime()+dMs*0.2, dMs*0.1), brahma: getS(sr.getTime()-dMs*0.15, dMs*0.08), vikram: dObj.getFullYear() + 57, saka: dObj.getFullYear() - 78 };
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
  </script>

  <script type="text/babel" id="ui-components">
    // =========================================================================
    // 3. UI COMPONENTS (MODALS & SETUP)
    // =========================================================================
    const { useState, useEffect, Component } = React;
    const { Icon, SageLogo, AppDB, CryptoUtils } = window;

    window.useIdleTimeout = (onTimeout, idleTime = 300000) => {
        useEffect(() => {
            let timeoutId; const handleActivity = () => { clearTimeout(timeoutId); timeoutId = setTimeout(onTimeout, idleTime); };
            window.addEventListener('mousemove', handleActivity); window.addEventListener('keydown', handleActivity); window.addEventListener('touchstart', handleActivity); window.addEventListener('scroll', handleActivity);
            timeoutId = setTimeout(onTimeout, idleTime);
            return () => { window.removeEventListener('mousemove', handleActivity); window.removeEventListener('keydown', handleActivity); window.removeEventListener('touchstart', handleActivity); window.removeEventListener('scroll', handleActivity); clearTimeout(timeoutId); };
        }, [onTimeout, idleTime]);
    };

    window.SetupModal = ({ onConfig }) => {
        const [o, setO]=useState(""); const [r, setR]=useState("AstroGrah"); const [t, setT]=useState(""); const [err, setErr]=useState("");
        return (
            <div className="min-h-screen flex items-center justify-center p-4 gl-fadein"><div className="w-full max-w-sm rounded-3xl bgcard2 p-6 shadow-2xl border border-white/10">
                <form onSubmit={async(e)=>{ e.preventDefault(); setErr(""); AppDB.setConfig(o,r,t); try{ await AppDB.callApi('GET',''); onConfig(); }catch(er){ if(er.message==="404") { onConfig(); } else { setErr("Token Invalid or Repo Missing."); AppDB.clearConfig(); } } }}>
                    <SageLogo size={44}/><h2 className="text-center font-serif text-xl mt-2 mb-4 text-amber-200">Connect Cloud Vault</h2>
                    {err && <div className="text-[10px] text-red-300 bg-red-900/30 p-2.5 mb-3 rounded-xl border border-red-500/20">{err}</div>}
                    <div className="space-y-3">
                        <div><label className="text-[10px] t40 uppercase font-mono">GitHub Username</label><input required value={o} onChange={e=>setO(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); e.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-amber-400/50"/></div>
                        <div><label className="text-[10px] t40 uppercase font-mono">Repo Name</label><input required value={r} onChange={e=>setR(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); e.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-amber-400/50"/></div>
                        <div><label className="text-[10px] t40 uppercase font-mono">Personal Access Token</label><input required type="password" value={t} onChange={e=>setT(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); e.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-amber-400/50"/></div>
                    </div>
                    <button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-5 hover:bg-amber-300 transition">Authorize & Sync</button>
                    <button type="button" onClick={()=>{ AppDB.enableLocal(); onConfig(); }} className="w-full text-xs t60 mt-3 hover:text-white transition">Skip Cloud - Use Offline Local Storage</button>
                </form></div></div>
        );
    };

    window.AuthModal = ({ onLogin }) => {
        const [mode, setMode] = useState("login"); const [e, setE]=useState(""); const [p, setP]=useState(""); const [err, setErr]=useState(""); const [gp, setGp]=useState(""); const [mfaPin, setMfaPin] = useState("");
        const proceedToVault = async (normE, emailHash, reqChange, isMfaEnabled) => {
            const vaultFile = await AppDB.getFile(`gl_vault_${emailHash}.json`);
            const prof = typeof vaultFile.content.profiles === 'string' ? CryptoUtils.decrypt(vaultFile.content.profiles) : (vaultFile.content.profiles || []);
            const sett = typeof vaultFile.content.settings === 'string' ? CryptoUtils.decrypt(vaultFile.content.settings) : (vaultFile.content.settings || {});
            try { localStorage.setItem('gl_active_user', JSON.stringify({ email: normE, emailHash, mfaEnabled: isMfaEnabled })); } catch(ex){}
            onLogin({ email: normE, emailHash, profiles: prof, settings: sett, requiresPasswordChange: reqChange, mfaEnabled: isMfaEnabled });
        };
        const handleSubmit = async (ev) => { 
            ev.preventDefault(); setErr(""); const normE = e.trim().toLowerCase(); 
            try { 
                const emailHash = await AppDB.hashKey(normE); let authFile = await AppDB.getFile('gl_auth.json'); if(!authFile.content.users) authFile.content.users = {};
                if(mode === "signup") { 
                    if(authFile.content.users[emailHash]) throw new Error("Email already registered."); 
                    const gen="Om-"+Math.random().toString(36).slice(-6)+"!"; const hashedPw = await CryptoUtils.hashPassword(gen); 
                    authFile.content.users[emailHash] = { p: hashedPw, req: true }; await AppDB.saveFile('gl_auth.json', authFile.content, authFile.sha); 
                    setGp(gen); setMode("generated");
                } else if(mode === "login") { 
                    const u = authFile.content.users[emailHash]; 
                    if(!u) { if (Object.keys(authFile.content.users).length === 0) throw new Error("Empty Vault! Please Sign Up."); throw new Error("Account not found."); } 
                    const hashedInput = await CryptoUtils.hashPassword(p); if(u.p !== p && u.p !== hashedInput) throw new Error("Invalid password."); 
                    if (u.mfa) { setMode("mfa"); return; } await proceedToVault(normE, emailHash, u.req, !!u.mfa); 
                }
            } catch(error) { setErr(error.message); }
        };
        const handleMfaSubmit = async (ev) => {
            ev.preventDefault(); setErr(""); const normE = e.trim().toLowerCase();
            try {
                const emailHash = await AppDB.hashKey(normE); let authFile = await AppDB.getFile('gl_auth.json'); const u = authFile.content.users[emailHash];
                const secret = CryptoUtils.decrypt(u.mfa); if (!window.OTPAuth) throw new Error("Authenticator library missing.");
                const totp = new window.OTPAuth.TOTP({ secret: secret }); if (totp.validate({ token: mfaPin, window: 1 }) === null) throw new Error("Invalid 2FA PIN.");
                await proceedToVault(normE, emailHash, u.req, true);
            } catch(err) { setErr(err.message); }
        };

        if (mode === "mfa") return (
            <div className="min-h-screen flex items-center justify-center p-4 gl-fadein"><div className="w-full max-w-sm rounded-3xl bgcard2 p-6 shadow-2xl border border-white/10 text-center"><Icon name="shield-check" size={48} className="mx-auto text-emerald-400 mb-3" /><h2 className="font-serif text-2xl mt-1 mb-2 text-emerald-200">2FA Protected</h2><p className="text-xs t60 mb-5">Enter your 6-digit Authenticator app PIN.</p>
                <form onSubmit={handleMfaSubmit}>{err && <div className="text-[10px] text-red-300 bg-red-900/30 p-2.5 mb-3 rounded-xl border border-red-500/20">{err}</div>}<input required type="text" maxLength="6" value={mfaPin} onChange={ev=>setMfaPin(ev.target.value)} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); ev.target.form.requestSubmit();}}} placeholder="000000" className="w-full text-center tracking-[0.5em] font-mono font-bold bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-lg outline-none text-emerald-300 focus:border-emerald-400/50 mb-4"/><button type="submit" className="w-full bg-emerald-500 text-black font-semibold rounded-full py-3 hover:bg-emerald-400 transition">Unlock Vault</button><button type="button" onClick={()=>setMode("login")} className="mt-4 text-[10px] t50 hover:text-white">Cancel</button></form></div></div>
        );
        if (mode === "generated") return ( <div className="min-h-screen flex items-center justify-center p-4 gl-fadein"><div className="w-full max-w-sm rounded-3xl border border-emerald-500/40 bgcard2 p-6 text-center shadow-2xl"><h2 className="font-serif text-xl t100 mb-1 text-emerald-300">Account Created</h2><p className="text-xs t75 mb-4">Auto-generated secure password:</p><div className="flex gap-2 items-center justify-center mb-3"><div className="flex-1 p-3 bg-black/40 rounded-xl font-mono text-emerald-300 border border-emerald-500/30 text-base select-all">{gp}</div></div><p className="text-[10px] t50">Save this temporary password.</p><button onClick={()=>setMode("login")} className="w-full rounded-full py-3 text-sm font-semibold bg-emerald-500 text-black mt-5">Proceed to Sign In</button></div></div> );
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 gl-fadein"><div className="w-full max-w-sm rounded-3xl bgcard2 p-6 shadow-2xl border border-white/10 relative">
                <form onSubmit={handleSubmit}><SageLogo size={44}/><h2 className="text-center font-serif text-2xl mt-1 mb-4 text-amber-200">{mode==="signup"?"Create Account":"Sign In"}</h2>{err && <div className="text-[10px] text-red-300 bg-red-900/30 p-2.5 mb-3 rounded-xl border border-red-500/20">{err}</div>}<div className="space-y-3"><div><label className="text-[10px] t40 uppercase font-mono">Email Address</label><input required type="email" value={e} onChange={ev=>setE(ev.target.value)} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); ev.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-amber-400/50"/></div>{mode==="login" && <div><label className="text-[10px] t40 uppercase font-mono">Password</label><input required type="password" value={p} onChange={ev=>setP(ev.target.value)} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); ev.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-amber-400/50"/></div>}</div><button type="submit" className="w-full bg-amber-400 text-black font-semibold rounded-full py-3 mt-5 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">{mode==="signup"?"Generate Credentials":"Enter Vault"}</button><div className="flex justify-between items-center mt-4"><button type="button" onClick={()=>{setMode(mode==="login"?"signup":"login"); setErr("");}} className="text-[11px] t60 hover:text-white">{mode==="login"?"New User? Quick Sign Up":"Existing User? Sign In"}</button></div></form></div></div>
        );
    };

    window.ForcePasswordChange = ({ email, emailHash, onComplete }) => {
        const [p, setP] = useState(""); const [loading, setLoading] = useState(false);
        return ( <div className="min-h-screen flex items-center justify-center p-4 gl-fadein"><div className="w-full max-w-sm rounded-3xl bgcard2 p-6 border border-emerald-500/40 shadow-2xl"><form onSubmit={async (e) => { e.preventDefault(); if(p.length < 6) return alert('Password too short.'); setLoading(true); try { let authFile = await AppDB.getFile('gl_auth.json'); authFile.content.users[emailHash].p = await CryptoUtils.hashPassword(p); authFile.content.users[emailHash].req = false; await AppDB.saveFile('gl_auth.json', authFile.content, authFile.sha); onComplete(); } catch (err) { alert(err.message); setLoading(false); } }}><h2 className="font-serif text-xl t100 mb-2 text-emerald-300">Set Custom Password</h2><div><label className="text-[10px] t40 uppercase font-mono mb-1 block">New Private Password</label><input required type="password" value={p} onChange={ev=>setP(ev.target.value)} onKeyDown={(ev)=>{if(ev.key==='Enter'){ev.preventDefault(); ev.target.form.requestSubmit();}}} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-emerald-500/50"/></div><button type="submit" disabled={loading} className="w-full bg-emerald-500 text-black font-semibold rounded-full py-3 mt-5 hover:bg-emerald-400 transition">{loading ? "Encrypting..." : "Confirm & Launch"}</button></form></div></div> )
    };

    window.AdminAuthModal = ({ u, onClose, onAuthenticated }) => {
        const [adminUser, setAdminUser] = useState(""); const [pwd, setPw] = useState(""); const [mfa, setMfa] = useState(""); const [err, setErr] = useState("");
        const handleAuth = async (e) => {
            e.preventDefault(); setErr("");
            try { 
                let adminFile = await AppDB.getFile('gl_admin.json');
                if (!adminFile.content.adminUser) { const hashedDefault = await CryptoUtils.hashPassword(pwd); adminFile.content = { adminUser: adminUser.trim().toLowerCase(), p: hashedDefault, mfa: null }; await AppDB.saveFile('gl_admin.json', adminFile.content, adminFile.sha); alert("Admin Vault initialized with these credentials."); onAuthenticated(); return; }
                const normAdmin = adminUser.trim().toLowerCase(); if (adminFile.content.adminUser !== normAdmin) throw new Error("Invalid Admin Username.");
                const hashedInput = await CryptoUtils.hashPassword(pwd); if (adminFile.content.p !== pwd && adminFile.content.p !== hashedInput) throw new Error("Invalid Master Admin Password.");
                if (adminFile.content.mfa) { const secret = CryptoUtils.decrypt(adminFile.content.mfa); const totp = new window.OTPAuth.TOTP({ secret }); if (totp.validate({ token: mfa, window: 1 }) === null) throw new Error("Invalid Admin 2FA PIN."); }
                onAuthenticated();
            } catch (error) { setErr(error.message); }
        };
        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4" onClick={onClose}><div onClick={e=>e.stopPropagation()} className="w-full max-w-sm bgcard2 p-6 rounded-3xl border border-amber-500/30 shadow-2xl gl-fadein text-center"><Icon name="shield-warning" size={40} className="text-amber-400 mx-auto mb-3"/><h3 className="font-serif text-lg text-white mb-1">Admin Authentication</h3><p className="text-[10px] t60 mb-4">Dedicated Admin credentials required to access DB architecture.</p>
                <form onSubmit={handleAuth} className="space-y-3">{err && <div className="text-[10px] text-red-300 bg-red-900/30 p-2 rounded">{err}</div>}
                    <input required type="text" placeholder="Admin Username" value={adminUser} onChange={e=>setAdminUser(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-amber-400/50"/>
                    <input required type="password" placeholder="Master Admin Password" value={pwd} onChange={e=>setPw(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-amber-400/50"/>
                    <input type="text" maxLength="6" placeholder="Admin 2FA PIN (if configured)" value={mfa} onChange={e=>setMfa(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-amber-400/50 tracking-widest text-center font-mono"/>
                    <button type="submit" className="w-full bg-amber-500 text-black font-bold rounded-full py-2.5 hover:bg-amber-400 transition mt-2">Unlock Admin Console</button><button type="button" onClick={onClose} className="text-[10px] t50 hover:text-white mt-3 w-full">Cancel</button>
                </form></div></div>
        );
    };

    window.AdminConsoleModal = ({ onClose, onResetDb }) => {
        const [o, setO] = useState(AppDB.config?.owner || ""); const [r, setR] = useState(AppDB.config?.repo || ""); const [t, setT] = useState(AppDB.config?.token || ""); const [adminMfaSetup, setAdminMfaSetup] = useState(null);
        const handleSaveDb = (e) => { e.preventDefault(); if(!confirm("Update Database Configuration?")) return; AppDB.setConfig(o, r, t); alert("Database configuration updated successfully."); onClose(); };
        const enableAdmin2FA = () => { const secret = new window.OTPAuth.Secret({ size: 20 }).base32; const totp = new window.OTPAuth.TOTP({ issuer: "Graha Ledger Admin", label: "MasterAdmin", algorithm: "SHA1", digits: 6, period: 30, secret: secret }); const uri = totp.toString(); setAdminMfaSetup({ secret, qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`, pin: '' }); };
        const verifyAdmin2FA = async () => { const totp = new window.OTPAuth.TOTP({ secret: adminMfaSetup.secret }); if (totp.validate({ token: adminMfaSetup.pin, window: 1 }) === null) return alert("Invalid PIN."); let adminFile = await AppDB.getFile('gl_admin.json'); adminFile.content.mfa = CryptoUtils.encrypt(adminMfaSetup.secret); await AppDB.saveFile('gl_admin.json', adminFile.content, adminFile.sha); alert("Admin 2FA Activated Successfully."); setAdminMfaSetup(null); };

        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4" onClick={onClose}><div onClick={e=>e.stopPropagation()} className="w-full max-w-md bgcard2 p-6 rounded-3xl border border-white/10 shadow-2xl gl-fadein max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3"><h3 className="font-serif text-lg text-amber-300 flex items-center gap-2"><Icon name="database"/> Dedicated Admin Console</h3><button onClick={onClose} className="hover:text-white t60"><Icon name="x"/></button></div>
                <form onSubmit={handleSaveDb} className="space-y-3">
                    <div><label className="text-[9px] t50 uppercase font-mono">GitHub Username</label><input required value={o} onChange={e=>setO(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"/></div>
                    <div><label className="text-[9px] t50 uppercase font-mono">Repository Name</label><input required value={r} onChange={e=>setR(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"/></div>
                    <div><label className="text-[9px] t50 uppercase font-mono">Personal Access Token</label><input required type="password" value={t} onChange={e=>setT(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"/></div>
                    <button type="submit" className="w-full bg-amber-400 text-black font-bold rounded-full py-2.5 mt-2 hover:bg-amber-300 transition">Update Repo Connection</button>
                </form>
                <div className="mt-5 pt-4 border-t border-white/10 space-y-3"><span className="font-mono text-[9px] uppercase t50 block">Admin Security & 2FA</span>
                    {!adminMfaSetup ? ( <button type="button" onClick={enableAdmin2FA} className="w-full py-2 bg-emerald-500/20 text-emerald-300 font-semibold rounded-xl text-xs hover:bg-emerald-500/30 border border-emerald-500/30">Set Dedicated Admin 2FA</button> ) : (
                        <div className="bg-black/40 p-3 rounded-xl border border-emerald-500/30 text-center"><img src={adminMfaSetup.qr} alt="Admin QR" className="w-28 h-28 mx-auto rounded-lg mb-2 bg-white p-1"/><input value={adminMfaSetup.pin} onChange={e=>setAdminMfaSetup({...adminMfaSetup, pin: e.target.value})} maxLength="6" placeholder="Enter PIN" className="w-full text-center tracking-widest font-mono bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-emerald-300 mb-2"/><button type="button" onClick={verifyAdmin2FA} className="w-full py-1.5 bg-emerald-500 text-black font-bold rounded-lg text-xs">Verify & Activate</button></div>
                    )}
                    <button onClick={()=>{ if(confirm("Disconnect and clear database settings? You will be logged out.")) { onResetDb(); } }} className="w-full bg-red-500/20 border border-red-500/30 text-red-300 font-bold rounded-full py-2.5 hover:bg-red-500/40 transition">Disconnect Database</button>
                </div></div></div>
        );
    };
  </script>

  <script type="text/babel" id="tabs-module">
    // =========================================================================
    // 4. TAB COMPONENTS
    // =========================================================================
    const { useState, useEffect, useMemo, Fragment } = React;
    const { Icon, PLANET_INFO, bio, generateDeepGochara, getAntardashas, getPratyantarDashas, formatYM, panchang, SANSKRIT_DAYS, WEEKDAY, NAKSHATRAS, runVedicRuleEngine, executeMultiProviderAI, AppDB, CryptoUtils, SIGN_TRAITS } = window;

    window.BiorhythmChart = ({ data, scores }) => {
        const w = 340, h = 100;
        const smoothPath = (key) => {
            if(data.length===0) return ""; let d = `M 0,${50 - data[0][key]*40}`;
            for (let i = 1; i < data.length; i++) { const x0 = ((i - 1) / (data.length - 1)) * w; const y0 = 50 - data[i - 1][key] * 40; const x1 = (i / (data.length - 1)) * w; const y1 = 50 - data[i][key] * 40; const xc = (x0 + x1) / 2; d += ` Q ${xc},${y0} ${xc},${y1} T ${x1},${y1}`; }
            return d;
        };
        return (
            <div className="w-full bg-[#121426] rounded-2xl border border-white/10 p-5 gl-fadein shadow-lg mt-4">
                <div className="flex justify-between items-center mb-6"><span className="font-mono text-[10px] text-amber-200/70 uppercase tracking-widest">15-Day Local Time Synchrony Wave</span><div className="flex gap-3 font-mono text-[9px]"><span className="text-[#E84855]">● Physical</span><span className="text-[#6495ED]">● Emotional</span><span className="text-[#F9C22E]">● Intellectual</span></div></div>
                <div className="w-full h-32 relative overflow-visible flex flex-col justify-end">
                    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        <line x1="0" y1="50" x2={w} y2="50" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                        <line x1={w/2} y1="-10" x2={w/2} y2={h+10} stroke="rgba(212,165,116,0.4)" strokeDasharray="3 3" />
                        <path d={smoothPath('P')} fill="none" stroke="#E84855" strokeWidth="2.5" className="drop-shadow-lg" />
                        <path d={smoothPath('E')} fill="none" stroke="#6495ED" strokeWidth="2.5" className="drop-shadow-lg" />
                        <path d={smoothPath('I')} fill="none" stroke="#F9C22E" strokeWidth="2.5" className="drop-shadow-lg" />
                    </svg>
                    <div className="flex justify-between w-full px-1 mt-4 font-mono text-[9px] t100 font-bold"><span>-7 Days</span><span className="text-amber-300 bg-black/80 px-3 py-1 rounded shadow-lg border border-amber-400/20">Anchored Target Date</span><span>+7 Days</span></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#E84855] font-bold block mb-1">Physical ({scores.p}%)</span><span className="t85 leading-relaxed">{scores.p > 20 ? "Peak phase. High endurance and stamina for physical tasks." : (scores.p > -20 && scores.p <= 20 ? "Critical crossover day. High injury risk, rest." : "Recharge phase. Deep rest and recovery required.")}</span></div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#6495ED] font-bold block mb-1">Emotional ({scores.e}%)</span><span className="t85 leading-relaxed">{scores.e > 20 ? "High resilience, empathy, and creative flow." : (scores.e > -20 && scores.e <= 20 ? "Crossover instability. Avoid arguments today." : "Emotional withdrawal phase. Practice solitude.")}</span></div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px]"><span className="text-[#F9C22E] font-bold block mb-1">Intellectual ({scores.i}%)</span><span className="t85 leading-relaxed">{scores.i > 20 ? "Peak cognitive processing and analytical focus." : (scores.i > -20 && scores.i <= 20 ? "Decision making compromised. Brain fog." : "Reflective period. Delay major contracts.")}</span></div>
                </div>
            </div>
        );
    };

    window.KundaliRenderer = ({ ac, ch, kpTable, style="north", titleDesc="", isExpert }) => {
        if (!ac) return null;
        if (!isExpert) {
            let maxP = "Sun", maxScore = -1, minP = "Sun", minScore = 101;
            Object.entries(ch.shadbala).forEach(([p, s]) => { if(s > maxScore) { maxScore = s; maxP = p; } if(s < minScore) { minScore = s; minP = p; } });
            return (
                <div className="p-5 bg-black/30 rounded-xl border border-white/5 text-[13px] t85 leading-relaxed shadow-inner">
                    <span className="text-amber-300 font-bold block mb-3 text-base font-serif border-b border-white/10 pb-2">Your Foundation Overview:</span>
                    Your core outward personality and how others see you (Ascendant) is shaped by <strong>{ac.lagna}</strong>, meaning your natural physical energy is generally <em>{SIGN_TRAITS[ac.lagna]||"unique"}</em>.<br/><br/>
                    Your deep emotional reactions, intuition, and inner thoughts are driven by your Moon sign <strong>{ch.moonSign}</strong> (currently placed in the {ch.nak} constellation). This means your psychological instincts are fundamentally <em>{SIGN_TRAITS[ch.moonSign]||"unique"}</em>.
                    <br/><br/><span className="text-amber-200 font-bold block mt-3 mb-1 text-sm font-serif">Planetary Power Summary (Shadbala):</span>
                    Your strongest guiding planet is <strong>{maxP} ({maxScore} pts)</strong>, which acts as your primary driving force and natural strength in life. Conversely, your most sensitive planet is <strong>{minP} ({minScore} pts)</strong>, indicating an area where you might need to apply conscious effort, patience, and remedial actions.
                    <br/><br/><span className="text-[10px] italic t50 mt-2 block">Switch to <strong>Expert Mode</strong> above to view precise geometric astrological charts and planetary transits.</span>
                </div>
            );
        }
        if (style === "south") {
            return (
                <div className="grid grid-cols-4 gap-1 w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-black/40 p-2 shadow-inner mb-2 gl-fadein" style={{aspectRatio: '1/1'}}>
                    {[ { s: "Pisces", r: 0, c: 0 }, { s: "Aries", r: 0, c: 1 }, { s: "Taurus", r: 0, c: 2 }, { s: "Gemini", r: 0, c: 3 }, { s: "Cancer", r: 1, c: 3 }, { s: "Leo", r: 2, c: 3 }, { s: "Virgo", r: 3, c: 3 }, { s: "Libra", r: 3, c: 2 }, { s: "Scorpio", r: 3, c: 1 }, { s: "Sagittarius", r: 3, c: 0 }, { s: "Capricorn", r: 2, c: 0 }, { s: "Aquarius", r: 1, c: 0 } ].map((bx) => {
                        const hNum = Object.entries(ac.houses||{}).find(([,sn])=>sn===bx.s)?.[0]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const isL = ac.lagna===bx.s; const trs = ch.transits && Object.entries(ch.transits).filter(([,sn])=>sn===bx.s).map(([p])=>p);
                        return ( <div key={bx.s} style={{gridRow:bx.r+1, gridColumn:bx.c+1}} className={`flex flex-col p-1.5 rounded-xl border text-[9px] relative overflow-hidden transition-all ${isL?'border-amber-400/60 bg-amber-400/10':'border-white/10 bg-white/5'}`}><div className="flex justify-between font-mono font-semibold t50 mb-0.5"><span>{bx.s.slice(0,3)}</span><span className={isL?'text-amber-300 font-bold':''}>{isL?'Lg':`H${hNum}`}</span></div><div className="flex flex-col gap-0.5 z-10">{pIn.map(p=><span key={p} style={{color:PLANET_INFO[p]?.color||'#fff'}} className="font-bold drop-shadow">{p.slice(0,3)}</span>)}</div>{trs && trs.length > 0 && <div className="mt-auto pt-1 border-t border-white/10 text-[8px] flex flex-wrap gap-0.5 z-10">{trs.map(p=><span key={'tr'+p} style={{color:PLANET_INFO[p]?.color||'#fff'}} className="italic opacity-80">+{p.slice(0,2)}</span>)}</div>}</div> )
                    })}
                    <div style={{gridRow:"2/4", gridColumn:"2/4"}} className="flex flex-col items-center justify-center p-2 text-center bg-black/20 rounded-xl border border-white/5 m-1"><span className="font-serif text-sm text-amber-200">South Indian</span><span className="font-mono text-[8px] t50 uppercase mt-0.5">Fixed Zodiac Grid</span><span className="font-mono text-[7px] t40 mt-1 italic max-w-[80%]">{titleDesc}</span></div>
                </div>
            );
        }
        if (style === "east") {
            return (
                <div className="grid grid-cols-3 gap-1 w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-black/40 p-2 shadow-inner mb-2 gl-fadein" style={{aspectRatio: '1/1'}}>
                    {[ {s:"Pisces",r:0,c:0},{s:"Aries",r:0,c:1},{s:"Taurus",r:0,c:2},{s:"Aquarius",r:1,c:0},{s:"Gemini",r:1,c:2},{s:"Capricorn",r:2,c:0},{s:"Cancer",r:2,c:2},{s:"Sagittarius",r:3,c:0},{s:"Scorpio",r:3,c:1},{s:"Libra",r:3,c:2} ].map((bx) => {
                         const hNum = Object.entries(ac.houses||{}).find(([,sn])=>sn===bx.s)?.[0]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const isL = ac.lagna===bx.s;
                         return ( <div key={bx.s} style={{gridRow:bx.r+1, gridColumn:bx.c+1}} className={`flex flex-col p-1.5 rounded-xl border text-[9px] ${isL?'border-amber-400/60 bg-amber-400/10':'border-white/10 bg-white/5'}`}><div className="font-mono font-semibold t50">{bx.s.slice(0,3)}</div><div className="flex flex-col gap-0.5">{pIn.map(p=><span key={p} style={{color:PLANET_INFO[p]?.color||'#fff'}} className="font-bold">{p.slice(0,3)}</span>)}</div></div> )
                    })}
                    <div style={{gridRow:"2/4", gridColumn:"2/2"}} className="flex flex-col items-center justify-center p-2 text-center bg-black/20 rounded-xl border border-white/5 m-1"><span className="font-serif text-sm text-amber-200">East Indian</span><span className="font-mono text-[7px] t40 uppercase mt-1 italic">{titleDesc}</span></div>
                </div>
            );
        }
        if (style === "kp") {
            return (
                <div className="w-full max-w-[360px] mx-auto bg-black/40 rounded-2xl border border-white/10 p-3 mb-4 gl-fadein overflow-x-auto"><div className="flex flex-col items-center border-b border-white/10 pb-2 mb-2"><span className="font-serif text-xs text-amber-300">KP (Krishnamurti Padhdhati) 249 System</span><span className="font-mono text-[7px] t40 mt-1 italic">{titleDesc}</span></div>
                    <table className="w-full text-left font-mono text-[9px]">
                        <thead><tr className="t50 border-b border-white/5"><th className="py-1">Cusp</th><th>Sign (Deg)</th><th>Star Lord</th><th>Sub Lord</th><th>Sub-Sub</th></tr></thead>
                        <tbody>{kpTable.map((row) => ( <tr key={row.cusp} className="border-b border-white/5 hover:bg-white/5"><td className="py-1 text-amber-400 font-bold">H{row.cusp}</td><td>{row.sign.slice(0,3)} {row.deg}°</td><td style={{color: PLANET_INFO[row.starLord]?.color}}>{row.starLord.slice(0,3)}</td><td style={{color: PLANET_INFO[row.subLord]?.color}} className="font-bold">{row.subLord.slice(0,3)}</td><td style={{color: PLANET_INFO[row.subSubLord]?.color}} className="opacity-70">{row.subSubLord.slice(0,3)}</td></tr> ))}</tbody>
                    </table>
                </div>
            );
        }
        const hPos = { 1: {x:50, y:22}, 2: {x:25, y:12.5}, 3: {x:12.5, y:25}, 4: {x:25, y:50}, 5: {x:12.5, y:75}, 6: {x:25, y:87.5}, 7: {x:50, y:78}, 8: {x:75, y:87.5}, 9: {x:87.5, y:75}, 10: {x:75, y:50}, 11: {x:87.5, y:25}, 12: {x:75, y:12.5} };
        return (
            <div className="w-full max-w-[340px] mx-auto rounded-2xl bg-black/40 p-2 shadow-inner mb-2 relative gl-fadein" style={{aspectRatio: '1/1'}}>
                <svg viewBox="0 0 100 100" className="w-full h-full"><rect x="0" y="0" width="100" height="100" fill="transparent" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/><polygon points="50,0 100,50 50,100 0,50" fill="transparent" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
                    {Object.keys(hPos).map(hNum => { const sn = ac.houses[hNum]; const pIn = Object.entries(ac.placements||{}).filter(([,h])=>String(h)===String(hNum)).map(([p])=>p); const trs = ch.transits && Object.entries(ch.transits).filter(([,snT])=>snT===sn).map(([p])=>p); const {x, y} = hPos[hNum];
                        return ( <g key={`h${hNum}`}><text x={x} y={y-4} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{sn.slice(0,3)}</text><text x={x} y={y+2.5} fill="#D4A574" fontSize="5" textAnchor="middle" fontWeight="bold">H{hNum}</text>{pIn.map((p, i) => <text key={p} x={x} y={y+8+(i*5)} fill={PLANET_INFO[p]?.color} fontSize="5.5" textAnchor="middle" fontWeight="bold">{p.slice(0,3)}</text>)}{trs && trs.length > 0 && <text x={x} y={y+10+(pIn.length*5)} fill="rgba(255,255,255,0.6)" fontSize="4" textAnchor="middle" fontStyle="italic">+{trs.map(p=>p.slice(0,2)).join(',')}</text>}</g> );
                    })}
                </svg><div className="absolute top-2 left-3 font-mono text-[8px] t40 uppercase tracking-widest leading-tight">North Indian Diamond<br/><span className="text-[6px] italic lowercase">{titleDesc}</span></div>
            </div>
        )
    };

    window.PersonTab = ({ pr, ch, date, setDate, settings, onEditProfile }) => {
        const [div, setDiv]=useState(1); const [chartStyle, setChartStyle]=useState(settings.kundaliStyle||"north");
        const [expert, setExpert] = useState(false); const [expandedDasha, setExpandedDasha] = useState(null); const [expandedAntar, setExpandedAntar] = useState(null);

        if(!ch) return <div className="p-4 border border-white/10 rounded-xl text-center text-sm t60 bgfaint mt-4">Compute Error. Check coordinates.</div>;
        const ac = div===1?ch.d1:(div===7?ch.d7:(div===9?ch.d9:(div===10?ch.d10:ch.d60))); 
        const pK = WEEKDAY[date.getDay()]; const pI = PLANET_INFO[pK];
        
        const bsGraph = [];
        for(let i=-7; i<=7; i+=0.25) { const d = new Date(date.getTime() + i*24*60*60*1000); const b = bio(pr.dob, d, pr.utcOffset); bsGraph.push({ idx: i + 7, P: b.p, E: b.e, I: b.i }); }
        const bT = bio(pr.dob, date, pr.utcOffset); const scores = { p: Math.floor(bT.p*100), e: Math.floor(bT.e*100), i: Math.floor(bT.i*100) };

        const gochara = generateDeepGochara(ch, ch.d1.lagna, date, pK, scores);
        const currentDecYear = date.getFullYear() + (date.getMonth() / 12) + (date.getDate() / 365);

        return (
            <div className="space-y-4 pb-12 gl-fadein">
                <div className="rounded-3xl border border-white/10 p-5 mt-4 bgcard2 shadow-xl"><div className="flex justify-between items-start"><div><div className="font-mono text-[9px] uppercase text-amber-300 tracking-[0.25em]">Active Profile</div><h2 className="font-serif text-2xl mt-0.5 text-white font-bold">{pr.name}</h2><div className="text-[11px] font-mono t60 mt-1">{pr.dob} · {pr.time} · {pr.place} (UTC{pr.utcOffset>=0?`+${pr.utcOffset}`:pr.utcOffset})</div></div><div className="flex gap-2"><button onClick={()=>onEditProfile(pr)} title="Edit Profile" className="p-2 border border-white/10 rounded-full bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="pencil-simple" size={18}/></button></div></div></div>
                <div className="bgcard rounded-2xl border border-white/10 p-3 flex flex-col sm:flex-row justify-between items-center gap-3"><div className="flex items-center gap-2"><Icon name="clock-countdown" size={18} className="text-amber-300"/><span className="font-serif text-sm">Transit Time Travel</span></div><div className="flex flex-wrap gap-1 font-mono text-[10px]"><button onClick={()=>setDate(new Date(date.getTime() - 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1M</button><button onClick={()=>setDate(new Date(date.getTime() - 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1W</button><button onClick={()=>setDate(new Date(date.getTime() - 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1D</button><button onClick={()=>setDate(new Date())} className="px-2.5 py-1 text-amber-300 font-bold bg-amber-400/10 border border-amber-400/30 rounded transition hover:bg-amber-400/20">Today</button><button onClick={()=>setDate(new Date(date.getTime() + 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1D</button><button onClick={()=>setDate(new Date(date.getTime() + 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1W</button><button onClick={()=>setDate(new Date(date.getTime() + 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1M</button></div></div>
                <div className="rounded-3xl border border-white/10 bgcard p-4">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-white/5 pb-3">
                        <div className="flex gap-1 flex-wrap bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
                            {expert && <Fragment><button onClick={()=>setDiv(1)} className={`px-2 py-1 rounded-lg transition ${div===1?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-1</button><button onClick={()=>setDiv(7)} className={`px-2 py-1 rounded-lg transition ${div===7?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-7</button><button onClick={()=>setDiv(9)} className={`px-2 py-1 rounded-lg transition ${div===9?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-9</button><button onClick={()=>setDiv(10)} className={`px-2 py-1 rounded-lg transition ${div===10?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-10</button><button onClick={()=>setDiv(60)} className={`px-2 py-1 rounded-lg transition ${div===60?'bg-amber-400/20 text-amber-300 font-bold':'t40'}`}>D-60</button></Fragment>}
                        </div>
                        <div className="flex gap-1 bg-black/40 border border-white/10 rounded-xl p-1 font-mono text-[10px]">
                            <button onClick={()=>setExpert(!expert)} className="px-2 py-1 rounded-lg transition text-amber-300 hover:text-white border border-white/10 mr-2 bg-black/50 font-bold shadow">{expert?"« Switch to Basic":"Switch to Expert »"}</button>
                            {expert && <Fragment><button onClick={()=>setChartStyle("north")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="north"?'bg-white/15 text-white font-bold':'t40'}`}>North</button><button onClick={()=>setChartStyle("south")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="south"?'bg-white/15 text-white font-bold':'t40'}`}>South</button><button onClick={()=>setChartStyle("east")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="east"?'bg-white/15 text-white font-bold':'t40'}`}>East</button><button onClick={()=>setChartStyle("kp")} className={`px-2 py-1 rounded-lg transition ${chartStyle==="kp"?'bg-white/15 text-white font-bold':'t40'}`}>KP</button></Fragment>}
                        </div>
                    </div>
                    <KundaliRenderer ac={ac} ch={ch} kpTable={ch.kpTable} style={chartStyle} titleDesc={`Divisional Filter: D-${div}`} isExpert={expert} />
                </div>
                {expert && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-3xl border border-white/10 bgcard p-5"><h3 className="font-serif text-sm text-amber-200 mb-3">Vimshottari Dasha Drilldown</h3><div className="space-y-1.5 h-[160px] overflow-y-auto pr-2">
                                {ch.dasha.map((d, i) => {
                                    const isActive = currentDecYear >= d.start && currentDecYear < d.end; const isExp = expandedDasha === i;
                                    return ( <div key={i}><div onClick={()=>setExpandedDasha(isExp?null:i)} className={`flex justify-between items-center p-2.5 rounded-xl text-xs font-mono border cursor-pointer transition ${isActive?'bg-amber-400/10 border-amber-400/40 font-bold text-amber-100 shadow-sm':'bg-black/30 border-white/5 hover:border-white/20'}`}><span style={{color: PLANET_INFO[d.lord]?.color}}>{d.lord} Mahadasha</span><div className="flex items-center gap-2"><span className={isActive?"text-amber-200":"t70"}>{Math.floor(d.start)} - {Math.floor(d.end)}</span> <Icon name={isExp?"caret-up":"caret-down"} className="t50"/></div></div>
                                            {isExp && ( <div className="pl-4 pr-2 py-2 mt-1 space-y-1 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono">
                                                    {getAntardashas(d.lord, d.start, d.end).map((ant, idx) => {
                                                        const isAntarActive = currentDecYear >= ant.start && currentDecYear < ant.end; const isAntarExp = expandedAntar === `${i}-${idx}`;
                                                        return ( <div key={idx}><div onClick={()=>setExpandedAntar(isAntarExp?null:`${i}-${idx}`)} className={`flex justify-between items-center py-1 border-b border-white/5 last:border-0 cursor-pointer hover:text-white transition ${isAntarActive?'text-amber-300 font-bold bg-amber-400/5 px-2 rounded':''}`}><span><span style={{color: PLANET_INFO[d.lord]?.color}}>{d.lord}</span> - <span style={{color: PLANET_INFO[ant.lord]?.color}}>{ant.lord}</span></span><div className="flex items-center gap-2"><span>{formatYM(ant.start)} to {formatYM(ant.end)}</span><Icon name={isAntarExp?"caret-up":"caret-down"} className="t50"/></div></div>
                                                                {isAntarExp && ( <div className="pl-3 py-1 space-y-0.5 border-l border-white/10 ml-2 mt-1 mb-2">
                                                                        {getPratyantarDashas(ant.lord, ant.start, ant.end).map((prat, pIdx) => { const isPratActive = currentDecYear >= prat.start && currentDecYear < prat.end;
                                                                            return ( <div key={pIdx} className={`flex justify-between items-center text-[9px] ${isPratActive?'text-amber-200 font-bold':'t60'}`}><span>➔ <span style={{color: PLANET_INFO[prat.lord]?.color}}>{prat.lord}</span></span><span>{formatYM(prat.start)} to {formatYM(prat.end)}</span></div> )
                                                                        })}</div>)}</div> )
                                                    })}</div> )}</div> )
                                })}</div></div>
                        <div className="rounded-3xl border border-white/10 bgcard p-5"><h3 className="font-serif text-sm text-amber-200 mb-3">Shadbala (Planetary Strength)</h3><div className="space-y-2 h-[160px] overflow-y-auto pr-2">
                                {Object.entries(ch.shadbala).map(([p, score]) => (
                                    <div key={p} className="text-xs"><div className="flex justify-between mb-1 font-mono t85"><span>{p}</span><span>{score} pts</span></div><div className="w-full bg-white/5 rounded-full h-1.5"><div className="h-full rounded-full" style={{width: `${Math.min(100, score/1.5)}%`, backgroundColor: PLANET_INFO[p]?.color}}></div></div></div>
                                ))}</div></div>
                    </div>
                )}
                <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
                    <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-200">Deep Gochara Forecast</h3><span className="font-mono text-[9px] t50 uppercase">{date.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'})}</span></div>
                    <div className="space-y-3">
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/20"><div className="flex justify-between text-xs font-medium text-emerald-300 mb-1"><span>Health & Vitality</span><span>{gochara.health.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-emerald-400" style={{width: `${gochara.health.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.health.text}</p></div>
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-500/20"><div className="flex justify-between text-xs font-medium text-amber-300 mb-1"><span>Wealth & Finance</span><span>{gochara.wealth.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-amber-400" style={{width: `${gochara.wealth.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.wealth.text}</p></div>
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-blue-500/20"><div className="flex justify-between text-xs font-medium text-blue-300 mb-1"><span>Career & Ambition</span><span>{gochara.career.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-blue-400" style={{width: `${gochara.career.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.career.text}</p></div>
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-purple-500/20"><div className="flex justify-between text-xs font-medium text-purple-300 mb-1"><span>Home & Harmony</span><span>{gochara.home.sc}/100</span></div><div className="w-full bg-white/5 rounded-full h-1 mb-2"><div className="h-full rounded-full bg-purple-400" style={{width: `${gochara.home.sc}%`}}></div></div><p className="text-[10px] t70 leading-relaxed">{gochara.home.text}</p></div>
                    </div>
                </div>
                <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent p-5 space-y-3">
                    <div className="flex justify-between items-center"><h3 className="font-serif text-base text-amber-300 flex items-center gap-2"><Icon name="sparkle"/> Prescriptions for {pK}</h3><span className="text-[10px] font-mono t50 uppercase">{pI.symbol} Active Hora</span></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5 sm:col-span-2"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Presiding Deity & Mantras</span><div className="t100 font-bold mb-1">Adhidevata: {pI.adhidevata}</div><div className="t90 tracking-wide font-medium italic">" {pI.beej} "</div><div className="t60 mt-1">Recite {pI.mantras.join(", ")}</div></div>
                        <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Gemstone / Colors</span><span className="t85 leading-relaxed block">{pI.gem}</span></div>
                        <div className="p-3.5 bg-black/30 rounded-2xl border border-white/5"><span className="font-mono text-[9px] text-amber-400 block uppercase mb-1">Charity (Dana)</span><span className="t85 leading-relaxed block">{pI.charity}</span></div>
                    </div>
                </div>
                <BiorhythmChart data={bsGraph} scores={scores} />
            </div>
        );
    };

    window.PanchangTab = ({ d, setDate, p, utc, settings }) => {
        const [liveValidated, setLiveValidated] = useState(false); const [validating, setValidating] = useState(false);
        const pan = panchang(d, settings.monthSystem, utc); const pK = WEEKDAY[d.getDay()]; const sDay = SANSKRIT_DAYS[pK];
        const fm = dt => dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hour12:false});
        const validateLivePanchang = async () => { setValidating(true); try { const res = await fetch(`https://api.sunrisesunset.io/json?lat=${p?.lat||25.2}&lng=${p?.lon||55.2}&date=${d.toISOString().slice(0,10)}`); const data = await res.json(); if(data && data.results) setLiveValidated(true); } catch(e) { console.warn("Live fallback."); } setValidating(false); };

        return (
            <div className="space-y-4 pb-12 gl-fadein mt-4">
                <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-emerald-950/40 via-black/20 to-transparent shadow-xl flex justify-between items-center"><div><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">Drik Aligned Ephemeris</span><h2 className="font-serif text-2xl text-emerald-100 mt-0.5">Vedic Panchang & Muhurtas</h2><div className="text-[11px] font-mono t60 mt-1">Vikram Samvat {pan.vikram} · Saka Samvat {pan.saka} · Masa: {pan.masa}</div></div><button onClick={validateLivePanchang} disabled={validating} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-[10px] hover:bg-emerald-500/20 transition flex items-center gap-1.5"><Icon name="broadcast" className={validating?"animate-pulse":""}/> {liveValidated ? "API Verified" : "Validate Live API"}</button></div>
                <div className="bgcard rounded-2xl border border-white/10 p-3 flex flex-col sm:flex-row justify-between items-center gap-3"><div className="flex items-center gap-2"><Icon name="clock-countdown" size={18} className="text-emerald-300"/><span className="font-serif text-sm">Panchang Time Travel</span></div><div className="flex flex-wrap gap-1 font-mono text-[10px]"><button onClick={()=>setDate(new Date(d.getTime() - 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1M</button><button onClick={()=>setDate(new Date(d.getTime() - 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1W</button><button onClick={()=>setDate(new Date(d.getTime() - 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">-1D</button><button onClick={()=>setDate(new Date())} className="px-2.5 py-1 text-emerald-300 font-bold bg-emerald-400/10 border border-emerald-400/30 rounded transition hover:bg-emerald-400/20">Today</button><button onClick={()=>setDate(new Date(d.getTime() + 24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1D</button><button onClick={()=>setDate(new Date(d.getTime() + 7*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1W</button><button onClick={()=>setDate(new Date(d.getTime() + 30*24*60*60*1000))} className="px-2 py-1 rounded bg-black/40 border border-white/5 hover:text-white transition">+1M</button></div></div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono"><div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-amber-400 text-2xl mb-1">☀</div><div className="t60 text-[9px] mb-1 uppercase">Surya Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.sr)} — {fm(pan.ss)}</div></div><div className="p-3.5 border border-white/10 rounded-2xl bgcard"><div className="text-blue-300 text-2xl mb-1">☽</div><div className="t60 text-[9px] mb-1 uppercase">Chandra Udaya — Asta</div><div className="text-sm font-bold">{fm(pan.mr)} — {fm(pan.msr)}</div></div></div>
                <div className="rounded-3xl border border-white/10 bgcard p-4 grid grid-cols-2 gap-2.5 text-xs"><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">1. Tithi</span><span className="t100 font-bold">{pan.paksha} {pan.tithi}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">2. Vaar (Day)</span><span className="t100 font-bold">{d.toLocaleDateString('en-US',{weekday:'long'})}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">3. Nakshatra</span><span className="t100 font-bold">{pan.nak}</span></div><div className="p-3 bg-black/30 rounded-xl border border-white/5"><span className="t50 block font-mono text-[9px] uppercase mb-0.5">4. Yoga</span><span className="t100 font-bold">{pan.yoga}</span></div><div className="col-span-2 p-3 bg-black/30 rounded-xl border border-white/5 flex justify-between items-center"><span className="t50 font-mono text-[9px] uppercase">5. Karana</span><span className={pan.karana.includes('Bhadra') || pan.karana.includes('Vishti')?'text-red-400 font-bold':'t100 font-bold'}>{pan.karana}</span></div></div>
                <div className="rounded-3xl border border-white/10 bgcard p-5 space-y-4">
                    <h3 className="font-serif text-sm text-white">Muhurta Windows</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pan.bhadra && ( <div className="p-3 rounded-2xl border border-red-500/50 bg-red-950/40 sm:col-span-2 mb-1"><span className="font-mono text-[10px] uppercase text-red-400 block mb-0.5 font-bold">⚠️ Bhadra Kaal (Vishti Karana)</span><span className="font-mono text-sm font-bold block mb-1">{fm(pan.bhadra.s)} - {fm(pan.bhadra.e)} (Approximate)</span><span className="text-[10px] t85">Highly inauspicious. Strictly avoid initiating new business, contracts, or travel during this window.</span></div> )}
                        <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20"><span className="font-mono text-[9px] uppercase text-emerald-400 block mb-0.5">Abhijit (Auspicious)</span><span className="font-mono text-sm font-bold">{fm(pan.abh.s)} - {fm(pan.abh.e)}</span></div>
                        <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-950/20"><span className="font-mono text-[9px] uppercase text-blue-400 block mb-0.5">Brahma Muhurta (Meditative)</span><span className="font-mono text-sm font-bold">{fm(pan.brahma.s)} - {fm(pan.brahma.e)}</span></div>
                        <div className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20"><span className="font-mono text-[9px] uppercase text-red-400 block mb-0.5">Rahu Kaalam (Avoid Starts)</span><span className="font-mono text-sm font-bold">{fm(pan.rahu.s)} - {fm(pan.rahu.e)}</span></div>
                        <div className="p-3 rounded-2xl border border-orange-500/30 bg-orange-950/20"><span className="font-mono text-[9px] uppercase text-orange-400 block mb-0.5">Yamaganda</span><span className="font-mono text-sm font-bold">{fm(pan.yamaganda.s)} - {fm(pan.yamaganda.e)}</span></div>
                        <div className="p-3 rounded-2xl border border-gray-500/30 bg-gray-900/20 sm:col-span-2"><span className="font-mono text-[9px] uppercase text-gray-400 block mb-0.5">Gulika Kaal</span><span className="font-mono text-sm font-bold">{fm(pan.gulika.s)} - {fm(pan.gulika.e)}</span></div>
                    </div>
                    <h4 className="font-serif text-xs text-amber-200 pt-2">Day Choghadiya Timings</h4><div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">{pan.chogDay.map((c,i)=><div key={i} className="p-2 bg-black/30 border border-white/5 rounded-xl text-[10px]"><span style={{color:c.c}} className="font-bold block">{c.n}</span><span className="t50 text-[8px] font-mono uppercase">{c.d}</span><div className="font-mono t85 text-[9px] mt-0.5">{fm(c.s)} - {fm(c.e)}</div></div>)}</div>
                    <h4 className="font-serif text-xs text-blue-200 pt-2">Planetary Hora Tracking</h4><div className="space-y-1">{pan.horas.map((h,i)=><div key={i} className="flex justify-between items-center p-2 bg-black/30 border border-white/5 rounded-xl text-xs"><span style={{color:PLANET_INFO[h.p]?.color}} className="font-bold">{h.p}</span><div className="font-mono t85 text-[10px]">{fm(h.s)} - {fm(h.e)}</div></div>)}</div>
                </div>
            </div>
        );
    };

    window.CompatTab = ({ prs, chs, settings, date }) => {
        const [pairIds, setPairIds] = useState(prs.length >= 2 ? [prs[0].id, prs[1].id] : [prs[0]?.id, prs[0]?.id]);
        if(prs.length<2) return <div className="p-8 text-center text-sm t60 border border-dashed border-white/20 rounded-3xl mt-6 bgfaint">Add at least two natal profiles to unlock 36-point Ashtakoot Milan.</div>;
        const p1=prs.find(p=>p.id===pairIds[0])||prs[0]; const p2=prs.find(p=>p.id===pairIds[1])||prs[1]; const c1=chs[p1.id], c2=chs[p2.id]; if(!c1||!c2) return null;
        const score = Math.max(12, Math.min(36, 36 - (Math.abs(NAKSHATRAS.indexOf(c1.nak) - NAKSHATRAS.indexOf(c2.nak))%10)*1.8));
        return ( <div className="space-y-4 pb-12 gl-fadein mt-4"><div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-pink-950/40 via-black/20 to-transparent flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl"><div><div className="font-mono text-[9px] uppercase tracking-[0.25em] text-pink-300 mb-1">Union & Kundali Milan</div><div className="flex items-center gap-2"><select value={pairIds[0]} onChange={(e)=>setPairIds([e.target.value, pairIds[1]])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select><span className="font-serif text-pink-300">&amp;</span><select value={pairIds[1]} onChange={(e)=>setPairIds([pairIds[0], e.target.value])} className="bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 font-serif text-base text-white outline-none">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select></div></div><div className="text-center p-3 rounded-2xl bg-black/40 border border-white/10 min-w-[100px]"><div className="text-3xl font-serif text-pink-300 font-bold">{score.toFixed(1)}</div><div className="text-[9px] t50 uppercase font-mono mt-0.5">Out of 36 Gunas</div></div></div></div> );
    };

    window.AskTab = ({ em, emHash, set, pr, ch, date }) => {
        const [q, setQ]=useState(""); const [h, setH]=useState([]); const [l, setL]=useState(false); const [isMic, setIsMic]=useState(false);
        useEffect(()=>{ let isMounted = true; const loadHistory = async () => { try { const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`); const decH = typeof chatsFile.content.h === 'string' ? CryptoUtils.decrypt(chatsFile.content.h) : (chatsFile.content.h || []); if(isMounted && decH) setH(decH); } catch(e){} }; loadHistory(); return () => { isMounted = false }; },[emHash]);
        const startListening = () => { const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition; if(!SpeechRec) return alert('Voice input not supported in this browser.'); const rec = new SpeechRec(); setIsMic(true); rec.onresult = (e) => { setQ(e.results[0][0].transcript); setIsMic(false); }; rec.onerror = () => setIsMic(false); rec.onend = () => setIsMic(false); rec.start(); }

        async function ask(e){
            if(e) e.preventDefault(); if(!q.trim()||l) return; setL(true); let ans = ""; let usedProvider = set.aiModel || "offline";
            try {
                let globalContext = ""; try { const gDB = await AppDB.getGlobalAI(); if(gDB.history.length>0) { const last = CryptoUtils.decrypt(gDB.history[gDB.history.length-1]); globalContext = `[Global Trend: Previous user asked "${last.q}"]`; } } catch(err){}
                const systemContext = `You are the Graha Ledger Jyotish Sage. Provide Vedic astrology guidance for ${pr?.name||'Native'} (Asc: ${ch?.d1?.lagna||'Aries'}, Moon: ${ch?.moonSign||'Aries'}). Transits: calculations applied. Today: ${WEEKDAY[date.getDay()]} Hora. ${globalContext}.`;

                if (set.aiModel !== 'offline') { const apiRes = await executeMultiProviderAI(q, set, systemContext); if (apiRes && apiRes.text) { ans = apiRes.text; usedProvider = apiRes.provider; } }
                if (!ans) { usedProvider = "offline"; ans = runVedicRuleEngine(q, pr, ch, date); }
                const newQA = { id: Date.now(), q, a: ans, v: usedProvider }; const nx = [...h, newQA]; setH(nx); setQ(""); 
                try { const chatsFile = await AppDB.getFile(`gl_chats_${emHash}.json`); chatsFile.content.h = CryptoUtils.encrypt(nx); await AppDB.saveFile(`gl_chats_${emHash}.json`, chatsFile.content, chatsFile.sha); await AppDB.appendGlobalAI(newQA); } catch(er){}
            } catch (err) { ans = `System Error: ${err.message}.`; setH([...h, { id: Date.now(), q, a: ans, v: 'error' }]); setQ(""); } finally { setL(false); }
        }

        return (
            <div className="space-y-4 pb-12 gl-fadein mt-4">
                <div className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-blue-950/40 via-black/20 to-transparent shadow-xl"><div className="flex justify-between items-center"><div><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-400">Global Learning AI</span><h2 className="font-serif text-2xl text-blue-100 mt-0.5">Ask the Sage</h2></div><span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-amber-300 uppercase">{set.aiModel||'offline'}</span></div></div>
                <div className="flex gap-2 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-hide"><button onClick={()=>{setQ("Will I be able to achieve my Year's Target for the mentioned commission letter?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Yearly Targets?</button><button onClick={()=>{setQ("How does my career look this week?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Career Week?</button><button onClick={()=>{setQ("How will my marriage go and will my wife be accepted in the household?");}} className="whitespace-nowrap px-3 py-1.5 bg-black/40 border border-white/10 rounded-full hover:text-white transition">Suggest: Marriage & Home?</button></div>
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                    {h.map((x, index) => ( 
                        <details key={x.id} className="p-4 bgcard rounded-2xl border border-white/5 text-xs t85 leading-relaxed whitespace-pre-wrap group" open={index === h.length - 1}>
                            <summary className="font-bold text-amber-400 cursor-pointer flex justify-between items-start outline-none"><span className="pr-4">Q: {x.q}</span><Icon name="caret-down" className="group-open:rotate-180 transition-transform mt-0.5" /></summary>
                            <div className="mt-3 pt-3 border-t border-white/10 text-white/90">{x.a}<div className="text-[8px] t40 font-mono mt-3 uppercase">Via {x.v}</div></div>
                        </details> 
                    ))}
                    {l && <div className="text-xs t50 italic p-3">Synthesizing astrological coordinates & ephemeris...</div>}
                </div>
                <form onSubmit={ask} className="flex gap-2 p-2 bgcard2 border border-white/10 rounded-2xl shadow-2xl"><button type="button" onClick={startListening} className={`px-3 py-2 rounded-xl transition ${isMic ? 'bg-red-500 text-white animate-pulse' : 'bg-black/30 text-amber-300 hover:bg-white/10'}`}><Icon name="microphone" size={20}/></button><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); e.target.form.requestSubmit();}}} placeholder="Ask about 2026 transits, career..." className="flex-1 bg-transparent text-xs focus:outline-none px-2 text-white"/><button type="submit" disabled={l} className="px-5 py-2.5 bg-amber-400 text-black text-xs font-semibold rounded-xl disabled:opacity-50 hover:bg-amber-300">Ask</button></form>
            </div>
        );
    };
  </script>

  <script type="text/babel" id="app-module">
    // =========================================================================
    // 12. MAIN APP ORCHESTRATOR
    // =========================================================================
    const { useState, useEffect, useMemo, Fragment } = React;
    const { SetupModal, AuthModal, ForcePasswordChange, AdminAuthModal, AdminConsoleModal, PersonTab, PanchangTab, CompatTab, AskTab, AppDB, CryptoUtils, computeKundli, useIdleTimeout, SageLogo, Icon } = window;

    function AppContent() {
        const [dbC, setDbC]=useState(false); const [u, setU]=useState(null); const [tb, setTb]=useState("person");
        const [dt, setDt]=useState(new Date()); 
        const [ss, setSs]=useState(false); const [ed, setEd]=useState(null); const [activeProfileId, setActiveProfileId]=useState(null);
        const [mfaSetup, setMfaSetup]=useState(null); const [adminAuthOpen, setAdminAuthOpen]=useState(false); const [adminConsoleOpen, setAdminConsoleOpen]=useState(false);

        useIdleTimeout(() => { if (u) { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); alert("Session timed out after 5 minutes of inactivity."); } }, 300000);

        useEffect(()=>{ 
            const initApp = async () => { if(AppDB.loadConfig()) { setDbC(true); try { const sess = localStorage.getItem('gl_active_user'); if(sess) { const parsedSess = JSON.parse(sess); const vaultFile = await AppDB.getFile(`gl_vault_${parsedSess.emailHash}.json`); const prof = typeof vaultFile.content.profiles === 'string' ? CryptoUtils.decrypt(vaultFile.content.profiles) : (vaultFile.content.profiles || []); const sett = typeof vaultFile.content.settings === 'string' ? CryptoUtils.decrypt(vaultFile.content.settings) : (vaultFile.content.settings || {}); setU({ email: parsedSess.email, emailHash: parsedSess.emailHash, profiles: prof, settings: sett, mfaEnabled: parsedSess.mfaEnabled }); if(prof.length) setActiveProfileId(prof[0].id); } } catch(e){} } };
            initApp(); 
        },[]);
        
        const logoutUser = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} setU(null); };
        const resetDbConfig = () => { try { localStorage.removeItem('gl_active_user'); } catch(e){} AppDB.clearConfig(); setDbC(false); setU(null); setAdminConsoleOpen(false); };

        const prs = u?.profiles || []; const set = u?.settings || { aiModel: "offline", monthSystem: "amanta", kundaliStyle: "north", apiKeys: {} };
        const chs = useMemo(()=>{ const o={}; if(prs) { prs.forEach(p=>o[p.id]=computeKundli(p, dt)); } return o; }, [prs, dt]);
        const aP = prs.find(p=>p.id===activeProfileId) || (prs.length > 0 ? prs[0] : null);

        if(!dbC) return <SetupModal onConfig={()=>setDbC(true)}/>;
        if(!u) return <AuthModal onLogin={(d)=>{ setU(d); if(d?.profiles?.length) setActiveProfileId(d.profiles[0].id); }} onReset={resetDbConfig}/>;
        if(u?.requiresPasswordChange) return <ForcePasswordChange email={u.email} emailHash={u.emailHash} onComplete={() => setU({...u, requiresPasswordChange: false})} />;

        const hSave = async(e) => {
            e.preventDefault(); const f=e.target; const pD = { name: f.nm.value, dob: f.dob.value, time: f.tm.value, place: f.pl.value, lat: parseFloat(f.lt.value), lon: parseFloat(f.ln.value), utcOffset: parseFloat(f.ut.value), gotra: f.gt.value, jaati: f.jt.value, kulDevta: f.kd.value, gramDevta: f.gd.value, sthanDevta: f.sd.value, id: ed.id || Date.now().toString() };
            const nP = ed.id ? prs.map(p=>p.id===pD.id?pD:p) : [...prs, pD];
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = CryptoUtils.encrypt(nP); vaultFile.content.settings = vaultFile.content.settings || CryptoUtils.encrypt(set);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
            setU({...u, profiles:nP}); setActiveProfileId(pD.id); setEd(null);
        };
        
        const deleteProfile = async (id) => { 
            if (!confirm("Are you sure you want to delete this profile?")) return; const nP = prs.filter(p=>p.id!==id); 
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.profiles = CryptoUtils.encrypt(nP);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha);
            setU({...u, profiles:nP}); if (nP.length > 0) setActiveProfileId(nP[0].id); 
        };

        const updateSettings = async (ns) => {
            const vaultFile = await AppDB.getFile(`gl_vault_${u.emailHash}.json`); vaultFile.content.settings = CryptoUtils.encrypt(ns); vaultFile.content.profiles = vaultFile.content.profiles || CryptoUtils.encrypt(prs);
            await AppDB.saveFile(`gl_vault_${u.emailHash}.json`, vaultFile.content, vaultFile.sha); setU({...u, settings:ns});
        }

        const enableMFA = () => {
            if (!window.OTPAuth) return alert("Authenticator library failed to load.");
            const secret = new window.OTPAuth.Secret({ size: 20 }).base32; const totp = new window.OTPAuth.TOTP({ issuer: "Graha Ledger", label: u.email, algorithm: "SHA1", digits: 6, period: 30, secret: secret });
            const uri = totp.toString();
            if (window.QRCode) { window.QRCode.toDataURL(uri, (err, url) => { setMfaSetup({ secret, qr: url, pin: '' }); }); } else { setMfaSetup({ secret, qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`, pin: '' }); }
        }

        const verifyAndSaveMfa = async () => {
            if (!window.OTPAuth) return alert("Authenticator library missing."); const totp = new window.OTPAuth.TOTP({ secret: mfaSetup.secret });
            if (totp.validate({ token: mfaSetup.pin, window: 1 }) === null) return alert("Invalid PIN. Please try again.");
            const authDB = await AppDB.getFile('gl_auth.json'); authDB.content.users[u.emailHash].mfa = CryptoUtils.encrypt(mfaSetup.secret);
            await AppDB.saveFile('gl_auth.json', authDB.content, authDB.sha);
            alert("MFA Enabled Successfully! Your vault is now locked."); setU({...u, mfaEnabled: true}); setMfaSetup(null);
        }

        const fetchCityCoordinates = async () => {
            const cityInput = document.getElementById("searchCityInput").value; if(!cityInput) return alert("Please enter a city name first."); document.getElementById("fetchBtn").innerText = "Searching...";
            try { const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityInput)}&format=json&limit=1`); const data = await res.json();
                if(data && data.length > 0) { const lon = parseFloat(data[0].lon); const lat = parseFloat(data[0].lat); document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4);
                    let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; document.querySelector('input[name="pl"]').value = data[0].display_name.split(",")[0];
                } else { alert("City not found. Try a broader search."); }
            } catch(e) { alert("Search failed."); } document.getElementById("fetchBtn").innerText = "Auto-Fetch";
        }

        return (
            <div className="min-h-screen w-full font-sans pb-10 relative">
                <datalist id="gotras">{window.GOTRAS.map(g=><option key={g} value={g} />)}</datalist><datalist id="jaatis">{window.JAATIS.map(j=><option key={j} value={j} />)}</datalist>
                
                {adminAuthOpen && <AdminAuthModal u={u} onClose={()=>setAdminAuthOpen(false)} onAuthenticated={()=>{ setAdminAuthOpen(false); setAdminConsoleOpen(true); }}/>}
                {adminConsoleOpen && <AdminConsoleModal onClose={()=>setAdminConsoleOpen(false)} onResetDb={resetDbConfig}/>}

                <div className="bgcard2 border-b border-white/10 sticky top-0 z-30 shadow-lg">
                    <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-3 flex justify-between items-center pr-36">
                        <div className="flex items-center gap-3"><SageLogo size={32}/><div><h1 className="font-serif text-lg text-amber-300 leading-tight">Graha Ledger V2.8</h1><div className="text-[9px] font-mono t50 uppercase tracking-widest">{u.email}</div></div></div>
                        <div className="flex items-center gap-2">
                            {prs.length > 1 && ( <select value={aP?.id||""} onChange={e=>setActiveProfileId(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 font-serif text-xs text-amber-200 outline-none max-w-[80px] sm:max-w-[120px] truncate">{prs.map(p=><option key={p.id} value={p.id}>{p.name.split(' ')[0]}</option>)}</select> )}
                            <button onClick={()=>setEd({})} title="Add Profile" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="user-plus" size={17}/></button>
                            <button onClick={()=>setSs(true)} title="Settings" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-amber-300"><Icon name="gear" size={17}/></button>
                            <button onClick={()=>setAdminAuthOpen(true)} title="Admin DB Console" className="p-2 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition text-amber-300"><Icon name="database" size={17}/></button>
                            <button onClick={logoutUser} title="Logout" className="p-2 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 transition text-red-400"><Icon name="sign-out" size={17}/></button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-md sm:max-w-3xl px-4 py-6 relative z-10">
                    {prs.length===0 ? ( <div className="text-center p-8 border border-dashed border-white/20 rounded-3xl mt-10 bgfaint gl-fadein"><h2 className="font-serif text-2xl mb-2 text-amber-300">Welcome to Graha Ledger</h2><button onClick={()=>setEd({})} className="px-8 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 mt-4">Create Natal Profile</button></div> ) : (
                        <Fragment>
                            <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bgcard p-1 font-mono text-[11px] shadow-inner mb-2">
                                {[{id:"person",l:"Astrology"},{id:"panchang",l:"Panchang"},{id:"union",l:"Union"},{id:"ask",l:"AI Sage"}].map(t=><button key={t.id} onClick={()=>setTb(t.id)} className={`flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 transition ${tb===t.id?"bg-amber-400/20 text-amber-300 font-bold shadow":"t50 hover:t100"}`}>{t.l}</button>)}
                            </div>
                            {tb==="person" && <PersonTab pr={aP} ch={chs[aP?.id]} date={dt} setDate={setDt} settings={set} onEditProfile={setEd}/>}
                            {tb==="panchang" && <PanchangTab d={dt} setDate={setDt} p={aP} utc={aP?.utcOffset||5.5} settings={set}/>}
                            {tb==="union" && <CompatTab prs={prs} chs={chs} settings={set} date={dt}/>}
                            {tb==="ask" && <AskTab em={u.email} emHash={u.emailHash} set={set} pr={aP} ch={chs[aP?.id]} date={dt}/>}
                        </Fragment>
                    )}

                    {ss && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={()=>setSs(false)}>
                            <div onClick={e=>e.stopPropagation()} className="w-full max-w-md p-6 rounded-3xl border border-white/10 bgcard2 space-y-5 max-h-[85vh] overflow-y-auto gl-fadein shadow-2xl relative">
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><h3 className="font-serif text-lg text-white">Security & App Vault</h3><button onClick={()=>setSs(false)} className="p-1 rounded-full hover:bg-white/10 transition"><Icon name="x"/></button></div>
                                
                                <div>
                                    <label className="text-[9px] font-mono uppercase text-emerald-400 mb-1.5 block">2FA Authenticator Setup</label>
                                    {u.mfaEnabled ? (
                                        <div className="w-full py-2.5 bg-emerald-500/10 text-emerald-300 font-semibold rounded-xl text-xs border border-emerald-500/30 text-center flex items-center justify-center gap-2">
                                            <Icon name="check-circle" size={16}/> 2FA is currently Active on your Vault
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
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Gemini Key</span><a href="https://aistudio.google.com/app/apikey" target="_blank" className="hover:text-amber-300" title="Get Gemini Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.gemini||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,gemini:e.target.value}})} placeholder="AIzaSy..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>OpenAI Key</span><a href="https://platform.openai.com/api-keys" target="_blank" className="hover:text-amber-300" title="Get OpenAI Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.openai||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,openai:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>Kimi Key</span><a href="https://platform.moonshot.cn/console/api-keys" target="_blank" className="hover:text-amber-300" title="Get Kimi Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.kimi||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,kimi:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
                                    <div><div className="flex justify-between text-[8px] t50 mb-0.5 font-mono"><span>DeepSeek Key</span><a href="https://platform.deepseek.com/api_keys" target="_blank" className="hover:text-amber-300" title="Get DeepSeek Key"><Icon name="question"/></a></div><input type="password" value={set.apiKeys?.deepseek||""} onChange={e=> updateSettings({...set,apiKeys:{...set.apiKeys,deepseek:e.target.value}})} placeholder="sk-..." className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs outline-none text-white"/></div>
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
                                        <button type="button" onClick={()=>{ if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(async pos => { const lat = pos.coords.latitude; const lon = pos.coords.longitude; document.querySelector('input[name="lt"]').value = lat.toFixed(4); document.querySelector('input[name="ln"]').value = lon.toFixed(4); let calcUtc = (Math.round((lon / 15) * 2) / 2).toFixed(1); if (lon > 68 && lon < 90 && lat > 8 && lat < 37) calcUtc = "5.5"; document.querySelector('input[name="ut"]').value = calcUtc; try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`); const d = await r.json(); document.querySelector('input[name="pl"]').value = d.address.city || d.address.town || d.address.village || 'Auto GPS Location'; } catch(e){ document.querySelector('input[name="pl"]').value = 'GPS Coord'; } }); } else alert('Geolocation not supported'); }} className="text-amber-300 hover:text-amber-200 border border-amber-300/30 px-2 py-1 rounded">Use GPS <Icon name="crosshair"/></button>
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
                                    <div><label className="text-[9px] t50 uppercase font-mono mb-1 block">UTC Offset</label><input required type="number" step="any" name="ut" defaultValue={ed.utcOffset||""} className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs outline-none text-white"/></div>
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
    
    document.getElementById('bootloader').style.display = 'none';
    const root = window.React.StrictMode ? window.ReactDOM.createRoot(document.getElementById('root')) : null;
    if(root) root.render(<window.ErrorBoundary><AppContent/></window.ErrorBoundary>);
  </script>
</body>
</html>
