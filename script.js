document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const lengthCriteria = document.getElementById('lengthCriteria');
    const numberCriteria = document.getElementById('numberCriteria');
    const specialCharCriteria = document.getElementById('specialCharCriteria');
  
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️'; // Change eye emoji based on visibility
    });
  
    // Check password strength on input
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        updateCriteria(password);
  
        // Update password strength indicator
        passwordStrength.innerHTML = `<div class="progress mt-2">
                                        <div class="progress-bar ${strength.color}" role="progressbar" style="width: ${strength.percentage}%" aria-valuenow="${strength.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>`;
    });
  
    // Function to check password strength
    function checkPasswordStrength(password) {
        let strength = {
            color: 'bg-danger',
            percentage: 0
        };
  
        if (password.length > 7) strength.percentage += 40;
        if (/\d/.test(password)) strength.percentage += 30;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.percentage += 30;
  
        if (strength.percentage > 70) {
            strength.color = 'bg-success';
        } else if (strength.percentage > 40) {
            strength.color = 'bg-warning';
        }
  
        return strength;
    }
  
    // Function to update criteria
    function updateCriteria(password) {
        lengthCriteria.classList.toggle('text-success', password.length > 7);
        lengthCriteria.classList.toggle('text-muted', password.length <= 7);
  
        numberCriteria.classList.toggle('text-success', /\d/.test(password));
        numberCriteria.classList.toggle('text-muted', !/\d/.test(password));
  
        specialCharCriteria.classList.toggle('text-success', /[!@#$%^&*(),.?":{}|<>]/.test(password));
        specialCharCriteria.classList.toggle('text-muted', !/[!@#$%^&*(),.?":{}|<>]/.test(password));
    }
});
