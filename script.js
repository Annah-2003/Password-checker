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

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️'; // Change eye emoji based on visibility
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
});
