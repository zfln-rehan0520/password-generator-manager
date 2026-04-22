/**
 * app.js - Refactored for Custom Toggles
 */

const UI = {
    render() {
        const root = document.getElementById('app');
        root.innerHTML = `
            <h1>🔐 VAULT v1.0</h1>
            <input type="password" id="master-input" placeholder="Enter Master Password">
            
            <div class="tool-box">
                <h3>Generator Options</h3>
                <div class="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px; background: #1a1a1a; margin-bottom: 10px;">
                    <label><input type="checkbox" id="check-upper" checked> Upper (ABC)</label>
                    <label><input type="checkbox" id="check-lower" checked> Lower (abc)</label>
                    <label><input type="checkbox" id="check-num" checked> Numbers (123)</label>
                    <label><input type="checkbox" id="check-sym" checked> Symbols (!@#)</label>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <span>Length: </span>
                    <input type="number" id="pass-len" value="16" min="6" max="64" style="width: 60px; padding: 5px;">
                </div>
                
                <input type="text" id="label-input" placeholder="Service Name (e.g. Github)">
                <button id="gen-btn">Generate & Save</button>
            </div>

            <div id="vault-display"></div>
            <button id="export-btn" style="margin-top:20px; background:#444; color:white;">Backup Vault (JSON)</button>
        `;
        
        // Re-bind events after rendering the HTML
        this.bindEvents();
        this.refreshVault();
    },

    async handleSave() {
        const master = document.getElementById('master-input').value;
        const label = document.getElementById('label-input').value;
        const length = parseInt(document.getElementById('pass-len').value) || 16;

        // Capture checkbox states
        const options = {
            upper: document.getElementById('check-upper').checked,
            lower: document.getElementById('check-lower').checked,
            numbers: document.getElementById('check-num').checked,
            symbols: document.getElementById('check-sym').checked
        };

        if (!master || !label) {
            alert("Please enter both Master Password and a Label.");
            return;
        }

        // Check if at least one option is selected
        if (!options.upper && !options.lower && !options.numbers && !options.symbols) {
            alert("Please select at least one character type!");
            return;
        }

        try {
            // 1. Generate password via crypto.js
            const rawPass = CryptoEngine.generateRaw(length, options);
            
            // 2. Encrypt password
            const encrypted = await CryptoEngine.encrypt(rawPass, master);
            
            // 3. Save via storage.js
            VaultStorage.add({ 
                label: label.toUpperCase(), 
                ...encrypted, 
                id: Date.now() 
            });

            // 4. Reset Label and Refresh
            document.getElementById('label-input').value = '';
            this.refreshVault();
        } catch (err) {
            console.error(err);
            alert("Encryption error. Make sure you are using Live Server!");
        }
    },

    refreshVault() {
        const list = document.getElementById('vault-display');
        const data = VaultStorage.get();
        list.innerHTML = '<h3>Saved Keys</h3>';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'vault-card';
            div.style.marginBottom = "15px";
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <strong>${item.label}</strong>
                    <button onclick="UI.deleteItem('${item.id}')" style="width:auto; padding:0 5px; background:transparent; color:red; border:none;">X</button>
                </div>
                <small style="opacity:0.5;">Fingerprint: ${item.ct.substring(0, 10)}</small><br>
                <button onclick="UI.reveal('${item.id}')" style="width:auto; padding:5px 10px; margin-top:5px;">Reveal</button>
                <div id="p-${item.id}" class="hidden" style="color:#00ff41; margin-top:5px; font-weight:bold;"></div>
            `;
            list.appendChild(div);
        });
    },

    async reveal(id) {
        const master = document.getElementById('master-input').value;
        if (!master) return alert("Enter Master Password first!");
        
        const entry = VaultStorage.get().find(e => e.id == id);
        const pass = await CryptoEngine.decrypt(entry, master);
        
        const display = document.getElementById(`p-${id}`);
        display.innerText = pass;
        display.classList.remove('hidden');
        
        setTimeout(() => {
            display.innerText = '';
            display.classList.add('hidden');
        }, 5000);
    },

    deleteItem(id) {
        if (confirm("Delete this entry?")) {
            VaultStorage.deleteEntry(id);
            this.refreshVault();
        }
    },

    bindEvents() {
        const genBtn = document.getElementById('gen-btn');
        const exportBtn = document.getElementById('export-btn');

        if (genBtn) genBtn.onclick = () => this.handleSave();
        
        if (exportBtn) {
            exportBtn.onclick = () => {
                const data = localStorage.getItem(VaultStorage.KEY);
                const blob = new Blob([data], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'vault_backup.json';
                a.click();
            };
        }
    }
};

// Initialize once the DOM is ready
document.addEventListener('DOMContentLoaded', () => UI.render());
