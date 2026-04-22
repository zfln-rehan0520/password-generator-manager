const UI = {
    render() {
        const root = document.getElementById('app');
        root.innerHTML = `
            <h1>🔐 VAULT v1.0</h1>
            <input type="password" id="master-input" placeholder="Enter Master Password">
            
            <div class="tool-box">
                <h3>Generator</h3>
                <input type="text" id="label-input" placeholder="Service Name (e.g. Github)">
                <button id="gen-btn">Generate & Save</button>
            </div>

            <div id="vault-display"></div>
            <button id="export-btn" style="margin-top:20px; background:#444; color:white;">Backup Vault (JSON)</button>
        `;
        this.bindEvents();
        this.refreshVault();
    },

    async handleSave() {
        const master = document.getElementById('master-input').value;
        const label = document.getElementById('label-input').value;
        if (!master || !label) return alert("Need Master Password and Label!");

        const rawPass = CryptoEngine.generateRaw(16, { numbers: true, symbols: true });
        const encrypted = await CryptoEngine.encrypt(rawPass, master);
        
        VaultStorage.add({ label, ...encrypted, id: Date.now() });
        this.refreshVault();
    },

    refreshVault() {
        const list = document.getElementById('vault-display');
        const data = VaultStorage.get();
        list.innerHTML = '<h3>Saved Keys</h3>';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'vault-card';
            div.innerHTML = `
                <strong>${item.label}</strong><br>
                <small>Fingerprint: ${item.ct.substring(0, 10)}...</small>
                <button onclick="UI.reveal('${item.id}')">Reveal</button>
                <div id="p-${item.id}" class="hidden" style="color:var(--accent); margin-top:5px;"></div>
            `;
            list.appendChild(div);
        });
    },

    async reveal(id) {
        const master = document.getElementById('master-input').value;
        if(!master) return alert("Enter Master Pass first!");
        
        const entry = VaultStorage.get().find(e => e.id == id);
        const pass = await CryptoEngine.decrypt(entry, master);
        
        const display = document.getElementById(`p-${id}`);
        display.innerText = pass;
        display.classList.remove('hidden');
        
        setTimeout(() => display.classList.add('hidden'), 5000);
    },

    bindEvents() {
        document.getElementById('gen-btn').onclick = () => this.handleSave();
        document.getElementById('export-btn').onclick = () => {
            const data = localStorage.getItem(VaultStorage.KEY);
            const blob = new Blob([data], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'vault_backup.json';
            a.click();
        };
    }
};

UI.render();
