function validateSignupForm(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Full Name validation
    if (fullName.length < 2) {
        document.getElementById('fullNameError').textContent = 'Please enter your full name';
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    }

    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Student ID validation (assuming format: 2 letters followed by 6 numbers)
    if (!/^[A-Z]{2}\d{6}$/.test(studentId)) {
        document.getElementById('studentIdError').textContent = 'Invalid Student ID format (e.g., ST123456)';
        document.getElementById('studentIdError').style.display = 'block';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert('Account created successfully!');
        window.location.href = 'login.html';
    }

    return false;
}

function validateSignupForm(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.style.display = 'none';
    });
    
    let isValid = true;

    // Validate Full Name (at least 2 characters)
    if (fullName.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Validate Email
    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validate Student ID (format: 2 letters followed by 6 numbers)
    const studentIdPattern = /^[A-Z]{2}\d{6}$/;
    if (!studentIdPattern.test(studentId)) {
        document.getElementById('studentIdError').textContent = 'Student ID must be 2 letters followed by 6 numbers';
        document.getElementById('studentIdError').style.display = 'block';
        isValid = false;
    }

    // Validate Password (at least 6 characters)
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // For demo purposes, show success message and redirect
        alert('Account created successfully!');
        window.location.href = 'user-dashboard.html';
    }

    return false;
}