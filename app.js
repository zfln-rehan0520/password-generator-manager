// app.js — UI logic with master password support

let masterPassword = null;

// Ask for master password on load
window.addEventListener('load', () => {
  masterPassword = prompt('🔐 Enter your Master Password to unlock your vault:');
  if (!masterPassword) {
    alert('No master password entered. Saved passwords cannot be loaded.');
  }
  renderList();
});

// Generate
document.getElementById('generateBtn').addEventListener('click', () => {
  const length     = parseInt(document.getElementById('length').value);
  const useUpper   = document.getElementById('uppercase').checked;
  const useLower   = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
  document.getElementById('generatedPassword').value = password;
});

// Copy
document.getElementById('copyBtn').addEventListener('click', () => {
  const pwd = document.getElementById('generatedPassword').value;
  if (!pwd) return alert('Generate a password first!');
  navigator.clipboard.writeText(pwd).then(() => alert('✅ Copied!'));
});

// Save (encrypted)
document.getElementById('saveBtn').addEventListener('click', async () => {
  const pwd = document.getElementById('generatedPassword').value;
  if (!pwd) return alert('Nothing to save!');
  if (!masterPassword) return alert('No master password set!');
  await savePassword(pwd, masterPassword);
  renderList();
});

// Render saved passwords (shows fingerprint only, decrypt on demand)
function renderList() {
  const list = document.getElementById('passwordList');
  const passwords = getPasswords();
  list.innerHTML = '';

  passwords.forEach((entry, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `🔒 Fingerprint: ${entry.fingerprint}`;

    const revealBtn = document.createElement('button');
    revealBtn.textContent = '👁 Reveal';
    revealBtn.style.marginRight = '8px';
    revealBtn.addEventListener('click', async () => {
      const decrypted = await decryptEntry(index, masterPassword);
      if (decrypted) {
        span.textContent = `🔓 ${decrypted}`;
        setTimeout(() => { span.textContent = `🔒 Fingerprint: ${entry.fingerprint}`; }, 5000);
      } else {
        alert('❌ Wrong master password or corrupted data!');
      }
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑 Delete';
    delBtn.addEventListener('click', () => {
      deletePassword(index);
      renderList();
    });

    li.appendChild(span);
    li.appendChild(revealBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
document.getElementById('exportBtn').addEventListener('click', () => {
  const passwords = getPasswords();
  if (passwords.length === 0) return alert('No saved passwords to export!');

  const blob = new Blob([JSON.stringify(passwords, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'password-vault-backup.json';
  a.click();

  URL.revokeObjectURL(url);
  alert('✅ Vault exported! Keep this file safe.');
});
