// menu 
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Empty check
    if (email === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Email format check (basic pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number check (10 digits)
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email) && !phonePattern.test(email)) {
        alert("Please enter a valid email or 10-digit phone number.");
        return;
    }

    // Password length check
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // All valid
    alert("Login successful! Redirecting to Dashboard...");
    window.location.href = "my-priject.html";
});

// storage 

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email) && !phonePattern.test(email)) {
        alert("Please enter a valid email or 10-digit phone number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Login status + user email localStorage-la save pannu
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    alert("Login successful! Redirecting to Dashboard...");
    window.location.href = "dashboard.html";
});