document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const generatePasswordButton = document.getElementById('generatePassword');
    const copyPasswordButton = document.getElementById('copyPassword');
    const requirements = {
        length: document.getElementById('lengthCriteria'),
        uppercase: document.getElementById('uppercaseCriteria'),
        number: document.getElementById('numberCriteria'),
        specialChar: document.getElementById('specialCharCriteria')
    };

    // Password expiry date
    const passwordExpiryDays = 90; // Set password expiry duration
    let passwordCreationDate = new Date();

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Check password strength on input
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strengthInfo = checkPasswordStrength(password);

        // Update password strength indicator
        passwordStrength.innerHTML = `<div class="progress mt-2">
                                        <div class="progress-bar ${strengthInfo.color}" role="progressbar" style="width: ${strengthInfo.width}%" aria-valuenow="${strengthInfo.width}" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>`;

        // Update requirements
        updateRequirements(password);

        // Calculate and display entropy
        const entropy = calculatePasswordEntropy(password);
        document.getElementById('passwordEntropy').innerText = `Entropy: ${entropy.toFixed(2)} bits`;
    });

    // Generate strong password
    generatePasswordButton.addEventListener('click', function() {
        const password = generateStrongPassword();
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event('input'));
    });

    // Copy password to clipboard
    copyPasswordButton.addEventListener('click', function() {
        passwordInput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard');
    });

    // Check password breach on blur
    passwordInput.addEventListener('blur', function() {
        const password = passwordInput.value;
        if (password) {
            checkPasswordBreach(password);
        }
    });

    // Function to check password strength
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        if (/[\W_]/.test(password)) strength += 25;

        let color = 'bg-danger';
        if (strength > 50 && strength < 75) color = 'bg-warning';
        if (strength >= 75) color = 'bg-success';

        return {
            width: strength,
            color: color
        };
    }

    // Update requirements indicators
    function updateRequirements(password) {
        requirements.length.classList.toggle('text-success', password.length >= 8);
        requirements.length.classList.toggle('text-muted', password.length < 8);
        requirements.uppercase.classList.toggle('text-success', /[A-Z]/.test(password));
        requirements.uppercase.classList.toggle('text-muted', !/[A-Z]/.test(password));
        requirements.number.classList.toggle('text-success', /\d/.test(password));
        requirements.number.classList.toggle('text-muted', !/\d/.test(password));
        requirements.specialChar.classList.toggle('text-success', /[\W_]/.test(password));
        requirements.specialChar.classList.toggle('text-muted', !/[\W_]/.test(password));
    }

    // Function to generate a strong password
    function generateStrongPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Function to calculate password entropy
    function calculatePasswordEntropy(password) {
        const uniqueChars = new Set(password).size;
        return uniqueChars * Math.log2(uniqueChars);
    }

    // Function to check if the password has been involved in a data breach
    async function checkPasswordBreach(password) {
        const sha1 = new jsSHA('SHA-1', 'TEXT');
        sha1.update(password);
        const hash = sha1.getHash('HEX').toUpperCase();
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();

        if (data.includes(suffix)) {
            alert('This password has been found in a data breach. Please choose a different password.');
        }
    }

    // Function to check password expiry
    function checkPasswordExpiry() {
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - passwordCreationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= passwordExpiryDays) {
            alert('Your password has expired. Please change it.');
        }
    }

    // Check password expiry daily
    setInterval(checkPasswordExpiry, 86400000); // Check daily
});
