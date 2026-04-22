<div align="center">

# 🔐 Password Generator & Manager

**Built for people who take their privacy seriously.**

![Version](https://img.shields.io/badge/version-1.0.0-7c3aed)
![License](https://img.shields.io/badge/license-MIT-a78bfa)
![Security](https://img.shields.io/badge/encryption-AES--256--GCM-4ade80)
![Platform](https://img.shields.io/badge/platform-browser-60a5fa)

</div>

### Tech Stack
- **PBKDF2**: Key stretching with 310,000 iterations.
- **AES-256-GCM**: Military-grade encryption.
- **Vanilla JS**: No frameworks, no dependencies.

---

## 🔐 Password Generator & Manager
### *Private. Lightweight. Bank-Grade Security.*

Built for people who take their privacy seriously. No servers, no accounts, just pure encryption.

---

## 🛠 Why I Built This
Most password managers are either bloated apps that require a subscription and an account, or simple tools that store your passwords in plain text. I wanted something in between **lightweight, private, and actually secure.**

This tool runs **entirely in your browser.** Nothing is ever sent to a server. No account is needed. No tracking scripts. You own your data.

---

## 🧠 How It Works
The security of this application relies on the **Web Crypto API**, ensuring that your Master Password is the only way to access your data.

1.  **The Master Password:** When you open the app, you set a master password. This is used to derive a high-entropy encryption key.
2.  **Encryption:** We use **AES-256-GCM**, the same encryption standard trusted by banks and governments worldwide. 
3.  **Brute-Force Protection:** Every saved password gets its own unique key derived using **PBKDF2 with 310,000 rounds of SHA-256**. This makes traditional brute-force attacks practically impossible on modern hardware.
4.  **Zero Persistence:** The master password itself is never stored—not in `localStorage`, and not even in memory once the tab is closed.

---

## ✨ Features

### **Password Generator**
* **Custom Length:** Generate keys anywhere from **6 to 64 characters**.
* **Granular Control:** Toggle uppercase, lowercase, numbers, and symbols.
* **True Randomness:** Uses `crypto.getRandomValues()` for cryptographic-grade entropy never `Math.random()`.
* **One-Click Copy:** Quickly move your generated password to your clipboard.

### **Password Vault**
* **Local Storage:** Save unlimited entries encrypted locally in your browser.
* **Privacy First:** Each entry shows only a **SHA-256 fingerprint**. The actual password stays hidden.
* **Timed Reveal:** Clicking "Reveal" decrypts and shows the password for **5 seconds** before it automatically hides itself.
* **Easy Management:** Delete any entry whenever you want.

### **Backup & Restore**
* **Full Portability:** Export your entire vault as an encrypted JSON file.
* **Cross-Device:** Import your JSON backup on any browser or device to restore your access.
* **Safety Net:** Since data lives in `localStorage`, we recommend exporting after every important change.

---

## 🚀 Getting Started
There is no installation. No setup. Just clone and open.

```bash
git clone [https://github.com/zfln-rehan0520/password-generator-manager.git](https://github.com/zfln-rehan0520/password-generator-manager.git)

Open index.html in Chrome, Firefox, or Edge. That’s it.
📂 Project Structure

password-generator-manager/
├── index.html        # Minimal UI skeleton
├── style.css         # Handcrafted notebook-style design
├── app.js            # Main UI rendering and event logic
├── crypto.js         # Encryption, PBKDF2, and generation logic
├── storage.js        # LocalStorage abstraction layer
├── assets/           # Icons and SVG assets
├── images/           # Project screenshots
├── docs/             # Technical specifications & notes
├── LICENSE           # MIT License
└── README.md         # You are here

Layer,Technology
Generation,crypto.getRandomValues()
Fingerprinting,SHA-256
Key Derivation,"PBKDF2 (310,000 rounds)"
Encryption,AES-256-GCM
Salt/IV,Unique random Salt + IV per entry

Layer,Technology
Generation,crypto.getRandomValues()
Fingerprinting,SHA-256
Key Derivation,"PBKDF2 (310,000 rounds)"
Encryption,AES-256-GCM
Salt/IV,Unique random Salt + IV per entry
