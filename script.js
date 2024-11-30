const upperSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerSet = 'abcdefghijklmnopqrstuvwxyz';
const numberSet = '1234567890';
const symbol = '!@#$%^&';

const displayBox = document.querySelector('.display');
const totalNumber = document.querySelector('#totalNumber');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const number = document.querySelector('#number');
const special = document.querySelector('#symbol');
const button = document.querySelector('button');
const MAX_LENGTH = 20;

const randomNumber = (passSet) => {
    return passSet[Math.floor(Math.random() * passSet.length)];
};

// Function to generate password
const generateNumber = () => {
    let password = '';

    const selectedSets = [];
    if (uppercase.checked) selectedSets.push(upperSet);
    if (lowercase.checked) selectedSets.push(lowerSet);
    if (number.checked) selectedSets.push(numberSet);
    if (special.checked) selectedSets.push(symbol);

    if (selectedSets.length === 0) {
        displayBox.textContent = 'Select at least one option.';
        return;
    }

    const passwordLength = parseInt(totalNumber.value);
    if (passwordLength > MAX_LENGTH) {
        displayBox.textContent = `Max length is ${MAX_LENGTH}`;
        totalNumber.value = MAX_LENGTH;  // Set the input value to 20
        return;
    }

    // Generate the password with selected sets
    while (password.length < totalNumber.value) {
        const randomSet = selectedSets[Math.floor(Math.random() * selectedSets.length)];
        password += randomNumber(randomSet);
    }

    // Trim the password to the get desired length
    password = password.substring(0, totalNumber.value);

    // Display the generated password
    displayBox.textContent = password;
};

const copyPassword = () => {
    const passwordToCopy = displayBox.textContent; // Get the password text content
    navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
        const originalText = displayBox.textContent;
        displayBox.textContent = "Copied!";
        setTimeout(() => {
            displayBox.textContent = originalText;
        }, 500);
    })
    .catch((err) => {
        console.error('Failed to copy text: ', err);
    });
}

displayBox.addEventListener('click', copyPassword);

button.addEventListener('click', () => {
    generateNumber();
});

generateNumber();
