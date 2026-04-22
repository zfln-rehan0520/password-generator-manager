const display = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');

// Update UI length display
lengthSlider.oninput = () => lengthVal.innerText = lengthSlider.value;

function generatePassword() {
    const length = lengthSlider.value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let characters = charset;
    if (document.getElementById('include-numbers').checked) characters += numbers;
    if (document.getElementById('include-symbols').checked) characters += symbols;

    let password = "";
    // High-security randomness
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += characters[array[i] % characters.length];
    }
    display.value = password;
}

generateBtn.addEventListener('click', generatePassword);
