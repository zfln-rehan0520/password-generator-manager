<div align="center">

# 🔐 Password Generator & Manager

**Built for people who take their privacy seriously.**

![Version](https://img.shields.io/badge/version-1.0.0-7c3aed)
![License](https://img.shields.io/badge/license-MIT-a78bfa)
![Security](https://img.shields.io/badge/encryption-AES--256--GCM-4ade80)
![Platform](https://img.shields.io/badge/platform-browser-60a5fa)

</div>

---

## Why I built this

Most password managers are either bloated apps that require an account, 
or simple tools that store your passwords in plain text. 
I wanted something in between lightweight, private, and actually secure.

This tool runs entirely in your browser. Nothing is sent to any server. 
No account needed. No tracking. Just open the file and use it.

---

## How it works

When you open the app, you set a master password. That master password 
is used to encrypt every password you save :- using AES-256-GCM, the 
same encryption standard used by banks and governments. The master 
password itself is never stored anywhere, not even in memory after 
you close the tab.

Every saved password gets its own unique encryption key derived from 
your master password using PBKDF2 with 310,000 rounds of SHA-256
making brute force attacks practically impossible.

---

## Features

**Password Generator**
- Choose your password length anywhere from 6 to 64 characters
- Toggle uppercase, lowercase, numbers and symbols
- Uses the browser's built-in crypto API for true randomness — not Math.random()
- Copy to clipboard in one click

**Password Vault**
- Save as many passwords as you want, all encrypted locally
- Each entry shows only a SHA-256 fingerprint , the actual password stays hidden
- Click Reveal to decrypt and view a password for 5 seconds, then it hides itself again
- Delete any entry whenever you want

**Backup & Restore**
- Export your entire vault as an encrypted JSON file anytime
- Import it back on any browser or device to restore your passwords
- Since everything lives in your browser's localStorage, exporting regularly is strongly recommended

---

## Getting started

No installation. No setup. Just download and open.

```bash
git clone https://github.com/zfln-rehan0520/password-generator-manager.git
```

Open `index.html` in Chrome, Firefox, or Edge. That's it.

---

## Project structure
password-generator-manager/
```
password-generator-manager/
├── index.html        # The whole UI lives here
├── style.css         # Handcrafted notebook-style design
├── app.js            # Handles all user interactions
├── crypto.js         # Encryption, decryption, password generation
├── storage.js        # Reads and writes to localStorage
├── assets/           # Icons
├── images/           # Screenshots
├── docs/             # Technical notes
├── LICENSE
└── README.md
```
---

## Security stack

| What | How |
|------|-----|
| Password generation | `crypto.getRandomValues()` |
| Fingerprinting | SHA-256 |
| Key derivation | PBKDF2 + SHA-256, 310,000 rounds |
| Encryption | AES-256-GCM with random salt + IV per entry |

---

## A few things to keep in mind

Your passwords live in your browser's localStorage. That means:

- They survive closing and reopening the browser **just fine**
- But clearing your browser history or cache will **wipe them permanently**
- They won't show up on a different browser or device unless you **import your backup**

So please — **export your vault after saving anything important.**
The export file is still encrypted, so it's safe to store anywhere.

And never forget your **master password**. There is no reset,
no recovery email, no backdoor. <ins>That's the point.</ins>

---

## License

MIT © [zfln-rehan0520](https://github.com/zfln-rehan0520)
