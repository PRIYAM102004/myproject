// Hamburger menu toggle
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

// Login form submit
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
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

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    alert("Login successful! Redirecting to Dashboard...");
    window.location.href = "dashboard.html";
});
