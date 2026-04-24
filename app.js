const UI = {
    render() {
        document.getElementById('app').innerHTML = `
            <h1>🔐 ZeroCrypt 🔐 (v1.02)</h1>
            
            <p class="highlight-credit">
                Designed by MOHAMMED REHAN | @zfln-rehan0520
            </p>
            
            <label>Master Security Key</label>
            <input type="password" id="m-pass" placeholder="••••••••">
            
            <div class="options-grid">
                <label class="option-item"><input type="checkbox" id="c-u" checked> Uppercase</label>
                <label class="option-item"><input type="checkbox" id="c-l" checked> Lowercase</label>
                <label class="option-item"><input type="checkbox" id="c-n" checked> Numbers</label>
                <label class="option-item"><input type="checkbox" id="c-s" checked> Symbols</label>
            </div>
            
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                <span style="font-size:0.8rem; opacity:0.6;">Length:</span>
                <input type="number" id="p-len" value="16" min="6" max="64" style="margin:0; width: 80px;">
            </div>

            <label>Service Name</label>
            <input type="text" id="l-in" placeholder="e.g. GitHub">
            
            <button onclick="UI.handleSave()">Generate & Save</button>
            
            <div id="v-list"></div>
            
            <div style="display: flex; gap: 10px; margin-top: 30px;">
                <button onclick="UI.export()" class="btn-white">Backup (.json)</button>
                <button onclick="document.getElementById('file-input').click()" class="btn-white">Restore (.json)</button>
            </div>
            <input type="file" id="file-input" class="hidden" accept=".json" onchange="UI.handleImport(event)">
            
            <p class="highlight-warning">
                Note: Losing your Master Key means losing access to your data forever.
            </p>
        `;
        this.refresh();
    },

    async handleSave() {
        const m = document.getElementById('m-pass').value;
        const l = document.getElementById('l-in').value;
        const len = parseInt(document.getElementById('p-len').value);
        const opt = { u: document.getElementById('c-u').checked, l: document.getElementById('c-l').checked, n: document.getElementById('c-n').checked, s: document.getElementById('c-s').checked };
        
        if(!m || !l) return alert("Fill Master Password and Service Name!");
        const raw = CryptoEngine.generateRaw(len, opt);
        const enc = await CryptoEngine.encrypt(raw, m);
        VaultStorage.add({ label: l.toUpperCase(), ...enc, id: Date.now() });
        document.getElementById('l-in').value = '';
        this.refresh();
    },

    async handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data) && data.length > 0 && data[0].ct) {
                    if (confirm(`Import ${data.length} entries?`)) {
                        VaultStorage.save(data);
                        this.refresh();
                        alert("Vault Restored!");
                    }
                }
            } catch (err) { alert("Error reading file."); }
        };
        reader.readAsText(file);
    },

    refresh() {
        const list = document.getElementById('v-list');
        const data = VaultStorage.get();
        list.innerHTML = '<h3 style="font-size:0.7rem; margin-top:25px; opacity:0.5; text-align:center;">VAULT ENTRIES</h3>';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'vault-card';
            
            // We use event.stopPropagation() on the delete click to prevent 
            // the whole card from reacting when you click the X.
            div.innerHTML = `
                <span class="entry-label">${item.label}</span>
                <button class="delete-btn" onclick="UI.del(event, '${item.id}')">✕</button>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="UI.reveal('${item.id}')" style="width:auto; padding:6px 12px; margin:0; font-size:0.7rem;">Reveal</button>
                    <span id="p-${item.id}" style="color:var(--accent); font-weight:bold; font-family:monospace;"></span>
                </div>
            `;
            list.appendChild(div);
        });
    },

    async reveal(id) {
        const m = document.getElementById('m-pass').value;
        if(!m) return alert("Enter Master Key!");
        const entry = VaultStorage.get().find(e => e.id == id);
        const pass = await CryptoEngine.decrypt(entry, m);
        const span = document.getElementById(`p-${id}`);
        span.innerText = pass;
        setTimeout(() => { span.innerText = ''; }, 5000);
    },

    del(event, id) {
        // Prevents the click from bubbling up to the parent card
        event.stopPropagation(); 
        
        if(confirm("Delete permanently?")) {
            VaultStorage.delete(id);
            this.refresh();
        }
    },

    export() {
        const data = localStorage.getItem(VaultStorage.KEY);
        const blob = new Blob([data], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `vault_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
    }
};

document.addEventListener('DOMContentLoaded', () => UI.render());
