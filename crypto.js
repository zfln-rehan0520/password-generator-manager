const CryptoEngine = {
    ITERATIONS: 310000,
    async deriveKey(password, salt) {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt, iterations: this.ITERATIONS, hash: 'SHA-256' },
            keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
        );
    },
    async encrypt(text, master) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(master, salt);
        const encoded = new TextEncoder().encode(text);
        const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
        return {
            ct: btoa(String.fromCharCode(...new Uint8Array(ct))),
            iv: btoa(String.fromCharCode(...iv)),
            salt: btoa(String.fromCharCode(...salt))
        };
    },
    async decrypt(data, master) {
        try {
            const salt = new Uint8Array(atob(data.salt).split('').map(c => c.charCodeAt(0)));
            const iv = new Uint8Array(atob(data.iv).split('').map(c => c.charCodeAt(0)));
            const ct = new Uint8Array(atob(data.ct).split('').map(c => c.charCodeAt(0)));
            const key = await this.deriveKey(master, salt);
            const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
            return new TextDecoder().decode(dec);
        } catch (e) { return "INVALID MASTER KEY"; }
    },
    generateRaw(len, opt) {
        let p = '';
        if(opt.u) p += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(opt.l) p += 'abcdefghijklmnopqrstuvwxyz';
        if(opt.n) p += '0123456789';
        if(opt.s) p += '!@#$%^&*()_+';
        const arr = new Uint32Array(len);
        crypto.getRandomValues(arr);
        return Array.from(arr).map(x => p[x % p.length]).join('');
    }
};
