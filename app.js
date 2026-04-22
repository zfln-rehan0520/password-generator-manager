const UI = {
    render() {
        const root = document.getElementById('app');
        root.innerHTML = `
            <h1>🔐 VAULT v1.0</h1>
            <input type="password" id="master-input" placeholder="Enter Master Password">
            
            <div class="tool-box">
                <h3>Generator Options</h3>
                <div class="options-grid">
                    <label><input type="checkbox" id="check-upper" checked> ABC</label>
                    <label><input type="checkbox" id="check-lower" checked> abc</label>
                    <label><input type="checkbox" id="check-num" checked> 123</label>
                    <label><input type="checkbox" id="check-sym" checked> !@#</label>
                </div>
                <div class="range-box">
                    <span>Length: </span><input type="number" id="pass-len" value="16" min="6" max="64" style="width: 60px;">
                </div>
                
                <input type="text" id="label-input" placeholder="Service Name (e.g. Github)" style="margin-top:15px;">
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
        const length = parseInt(document.getElementById('pass-len').value);

        // Get checkbox states
        const options = {
            upper: document.getElementById('check-upper').checked,
            lower: document.getElementById('check-lower').checked,
            numbers: document.getElementById('check-num').checked,
            symbols: document.getElementById('check-sym').checked
        };

        if (!master || !label) return alert("Need Master Password and Label!");
        if (!Object.values(options).some(v => v)) return alert("Select at least one character type!");

        // Generate with custom options
        const rawPass = CryptoEngine.generateRaw(length, options);
        const encrypted = await CryptoEngine.encrypt(rawPass, master);
        
        VaultStorage.add({ label: label.toUpperCase(), ...encrypted, id: Date.now() });
        document.getElementById('label-input').value = '';
        this.refreshVault();
    },
    // ... keep the rest of your UI functions (reveal, refreshVault, bindEvents)
};
