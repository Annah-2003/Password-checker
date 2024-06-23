// script.js

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const passwordStrength = document.getElementById('passwordStrength');
  
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️'; // Change eye emoji based on visibility
    });
  
    // Check password strength on input
    passwordInput.addEventListener('input', function() {
      const password = passwordInput.value;
      const strengthColor = checkPasswordStrength(password);
  
      // Update password strength indicator
      passwordStrength.innerHTML = `<div class="progress mt-2">
                                      <div class="progress-bar ${strengthColor}" role="progressbar" style="width: ${password ? '100' : '0'}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>`;
    });
  
    // Function to check password strength
    function checkPasswordStrength(password) {
      // Basic implementation, can be extended for more complex criteria
      if (password.length <= 5) {
        return 'bg-danger'; // Weak password
      }
      if (password.length <= 10) {
        return 'bg-warning'; // Medium password
      }
      return 'bg-success'; // Strong password
    }
  });
  