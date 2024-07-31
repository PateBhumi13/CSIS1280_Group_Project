
document.getElementById('contact-form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;
    let errorMessage = '';

    if (!name) {
        valid = false;
        errorMessage += 'Name is required.\n';
    }
    if (!contactEmail) {
        valid = false;
        errorMessage += 'Email is required.\n';
    }
    if (!message) {
        valid = false;
        errorMessage += 'Message is required.\n';
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        valid = false;
        errorMessage += 'Phone number must be 10 digits.\n';
    }

    if (!valid) {
        alert(errorMessage);
        event.preventDefault(); // Prevent form submission
    }
});
