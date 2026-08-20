window.AppDB = {
    config: null, useLocal: false,
    setConfig(o, r, t) { this.config = { owner: o, repo: r, token: t }; try { localStorage.setItem('gh_db_config', JSON.stringify(this.config)); localStorage.setItem('gh_use_local', 'false'); } catch(e){} this.useLocal = false; },
    clearConfig() { this.config = null; try { localStorage.removeItem('gh_db_config'); localStorage.removeItem('gh_use_local'); } catch(e){} },
    loadConfig() { try { if(localStorage.getItem('gh_use_local') === 'true') { this.useLocal = true; return true; } const c = localStorage.getItem('gh_db_config'); if (c) { this.config = JSON.parse(c); return true; } } catch(e){} return false; },
    enableLocal() { this.useLocal = true; try { localStorage.setItem('gh_use_local', 'true'); } catch(e){} },
    async callApi(m, p, b = null) {
        if (!this.config) throw new Error("DB not configured.");
        const qs = m === 'GET' ? `?t=${Date.now()}` : ''; 
        const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${p}${qs}`;
        const headers = { 'Authorization': `token ${this.config.token}`, 'Accept': 'application/vnd.github.v3+json' };
        if (body) headers['Content-Type'] = 'application/json';
        const res = await fetch(url, { method: m, headers, body: b ? JSON.stringify(b) : null });
        if (!res.ok) { if (res.status === 404 && m === 'GET') return null; throw new Error(res.status.toString()); }
        return await res.json();
    },
    async getFile(f) {
        if(this.useLocal) { try { return { sha: null, content: JSON.parse(localStorage.getItem(f)||'{}') }; } catch(e) { return { sha: null, content: {} }; } }
        try { const d = await this.callApi('GET', f); if (!d) return { sha: null, content: {} }; return { sha: d.sha, content: JSON.parse(window.CryptoUtils.b64D(d.content.replace(/\n/g, ''))) }; } catch(e) { return { sha: null, content: {} }; }
    },
    async saveFile(f, c, s, ret = 0) {
        if(this.useLocal) { try { localStorage.setItem(f, JSON.stringify(c)); } catch(e){} return; }
        try { await this.callApi('PUT', f, { message: `Sync: ${f}`, content: window.CryptoUtils.b64E(JSON.stringify(c, null, 2)), ...(s ? { sha: s } : {}) }); } 
        catch (err) { if ((err.message === "409" || err.message === "422") && ret < 2) { const l = await this.callApi('GET', f); if (l && l.sha) { await this.saveFile(f, c, l.sha, ret + 1); return; } } throw new Error(`Sync Failed (${f}): ${err.message}`); }
    },
    async getGlobalAI() {
        if(this.useLocal) { try { return { sha: null, history: JSON.parse(localStorage.getItem('graha_local_ai')||'[]') }; } catch(e) { return { sha: null, history: [] }; } }
        try { const data = await this.callApi('GET', 'gl_global_ai.json'); if (!data) return { sha: null, history: [] }; const parsed = JSON.parse(window.CryptoUtils.b64D(data.content.replace(/\n/g, ''))); return { sha: data.sha, history: Array.isArray(parsed) ? parsed : [] }; } catch(e) { return { sha: null, history: [] }; }
    },
    async appendGlobalAI(qaObject) {
        const ds = await this.getGlobalAI(); const uh = [...ds.history, window.CryptoUtils.encrypt(qaObject)];
        if(this.useLocal) { try { localStorage.setItem('graha_local_ai', JSON.stringify(uh)); } catch(e){} return; }
        try { await this.callApi('PUT', 'gl_global_ai.json', { message: "AI Sync", content: window.CryptoUtils.b64E(JSON.stringify(uh, null, 2)), ...(ds.sha ? { sha: ds.sha } : {}) }); } catch(e){}
    },
    async hashKey(str) { return await window.CryptoUtils.hashPassword(str); }
};
