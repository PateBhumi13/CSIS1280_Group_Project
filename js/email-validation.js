document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      const email = emailInput.value.trim();
  
      if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        successMessage.textContent = ''; 
        return;
      }
  
      emailError.textContent = ''; 
      successMessage.textContent = 'Thank you for join, now you will receive a special offer!!!';
    });
  
    function isValidEmail(email) {
      // Basic regex for email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });
  