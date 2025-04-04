function validateAdminForm(event) {
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    let isValid = true;

    // Reset error messages
    document.getElementById('adminIdError').style.display = 'none';
    document.getElementById('adminPasswordError').style.display = 'none';

    // Validate admin ID format
    if (!adminId.startsWith('ADMIN') || !/^\d+$/.test(adminId.slice(5))) {
        document.getElementById('adminIdError').textContent = 'Invalid Admin ID format';
        document.getElementById('adminIdError').style.display = 'block';
        isValid = false;
    }

    // Validate password length
    if (password.length < 8) {
        document.getElementById('adminPasswordError').textContent = 'Password must be at least 8 characters long';
        document.getElementById('adminPasswordError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}