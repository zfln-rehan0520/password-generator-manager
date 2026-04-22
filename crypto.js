// crypto.js — Password generation logic

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  if (useUpper) charset += upper;
  if (useLower) charset += lower;
  if (useNumbers) charset += numbers;
  if (useSymbols) charset += symbols;

  if (!charset) return alert('Select at least one character type!') || '';

  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array); // uses browser's secure random
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}
