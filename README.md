<div align="center">

# 🔐 ZeroCrypt 🔐 (v1.02)

**Built for people who take their privacy seriously.**

### **Private. Lightweight. Bank-Grade Security.**

![Version](https://img.shields.io/badge/version-1.0.2-ff8c00)
![License](https://img.shields.io/badge/license-MIT-white)
![Security](https://img.shields.io/badge/encryption-AES--256--GCM-00ffff)
![Platform](https://img.shields.io/badge/platform-browser-orange)

Built for people who take their privacy seriously. No servers, no accounts, just pure client-side encryption. 

</div>

---

## 🛠 Tech Stack & Security Specs

* **PBKDF2**: Key stretching with **310,000 iterations** of SHA-256 to prevent brute-force attacks.
* **AES-256-GCM**: Military-grade authenticated encryption for data confidentiality and integrity.
* **Vanilla JS**: Modular architecture with zero frameworks and zero dependencies.
* **Web Crypto API**: Utilizing native browser cryptographic primitives for maximum security.

---

## 🧠 Why I Built This

Most password managers are either bloated cloud-based subscriptions or simple tools that store data in plain text. I wanted something in between: **lightweight, portable, and truly private.**

This tool runs **entirely in your browser**. Nothing is ever sent to a server. You own your keys; you own your data.

---

## 🛡️ The Master Key & Security Architecture

The "Root of Trust" in this application is your **Master Security Key**. It is designed with a **Zero-Knowledge Architecture**:

* **Key Derivation (PBKDF2)**: Your Master Key is never used directly. It is stretched using **310,000 iterations** of SHA-256. This makes GPU-based brute-force attacks mathematically unfeasible.
* **Zero Persistence**: The Master Key is **never stored** not in `localStorage`, cookies, or logs. It exists only in volatile RAM and is destroyed the moment the tab is closed.
* **AES-256-GCM Encryption**: It uses authenticated encryption to ensure that your data cannot be tampered with. Each entry uses a unique, cryptographically secure **Salt** and **IV**.
* **⚠️ The Recovery Warning**: Because there are no backdoors, if you lose your Master Key, the data in your `vault.json` becomes permanent digital noise. **There is no "Forgot Password" link.**

---

## ✨ Features

### **Smart Password Generator**
* **Cryptographic Entropy**: Uses `crypto.getRandomValues()` instead of `Math.random()`.
* **Granular Control**: Toggle Uppercase, Lowercase, Numbers, and Symbols.
* **Custom Length**: Support for high-entropy keys from 6 to 64 characters.

### **Encrypted Local Vault**
* **Zero-Knowledge Architecture**: Your Master Key is never stored on the device or in memory.
* **Timed Reveal**: Decrypted passwords are shown for only **5 seconds** before auto-hiding.
* **Visual Fingerprinting**: Each entry is represented by its encrypted ciphertext hash for identification.

### **Backup & Portability**
* **Encrypted JSON Export**: Take your data with you in a secure, portable format.
* **Seamless Restore**: Import your backup file on any device to instantly regain access.

---

## 📂 Project Structure

To maintain a professional Model-View-Controller (MVC) approach, the project is split into functional modules:

```text
ZeroCrypt/
├── index.html        # Minimal UI skeleton
├── style.css         # Custom Dark-Mode UI (Orange & Cyan Theme)
├── crypto.js         # Encryption Engine (AES-GCM & PBKDF2 logic)
├── storage.js        # LocalStorage Abstraction Layer
├── app.js            # Main UI Rendering & Event Controller
├── assets/           # Icons and SVG assets
└── image/            # Project screenshots
```
| Layer | Technology |
|:------|:-----------|
| 🔑 Generation | `crypto.getRandomValues()` |
| 🔐 Key Derivation | `PBKDF2 (310,000 rounds)` |
| 🛡️ Encryption | `AES-256-GCM` |
| 💾 Storage | Browser `localStorage` (Device-Only) |
| 🎲 Salt/IV | Unique random 16-byte Salt + 12-byte IV per entry |


## 🚀 Getting Started

### 1. Clone the Repo
First, clone the repository to your local machine using the terminal:
```bash
git clone [ https://github.com/zfln-rehan0520/ZeroCrypt ]
```
Run Locally
You can run this application without any complex setup:

Locate the index.html file in the project folder.

Open it with any modern browser (Brave, Chrome, Firefox, or Edge).

Security Recommendation
For the best experience and to ensure all Web Crypto API features function correctly, it is recommended to:

Use a local development server (like the VS Code Live Server extension).

Host the project on GitHub Pages to ensure it runs over a secure HTTPS connection.

---
**made by Mohammed Rehan | github: [zfln-rehan0520] (https://github.com/zfln-rehan0520)*
