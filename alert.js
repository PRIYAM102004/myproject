// Hamburger menu toggle
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

// Login/Logout status check
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('loginLink').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
    }
};

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = "index.html";
}

// Dismiss alert
function dismissAlert(button) {
    const card = button.closest('.alert-card');
    card.remove();

    // ella alerts-um dismiss aayiducha nu check pannu
    const remaining = document.querySelectorAll('.alert-card').length;
    if (remaining === 0) {
        document.getElementById('noAlertsMsg').style.display = "block";
    }
}


// Alerts data - timestamp kaatha, dismiss panna
document.addEventListener("DOMContentLoaded", () => {
    setTimestamps();
    setupDismissButtons();
    checkEmptyState();
});

// ஒவ்வொரு alert-ku timestamp kaattu (e.g. "2 hours ago")
function setTimestamps() {
    const times = document.querySelectorAll(".alert-time");
    const sampleTimes = ["2 hours ago", "5 hours ago", "1 day ago"]; // ungaloda data logic-a maathikko

    times.forEach((el, index) => {
        el.textContent = sampleTimes[index] || "Just now";
    });
}

// Dismiss button click -> andha alert card remove pannu
function setupDismissButtons() {
    const dismissButtons = document.querySelectorAll(".dismiss-btn");

    dismissButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".alert-card");
            card.style.opacity = "0";
            card.style.transform = "translateX(20px)";
            card.style.transition = "all 0.3s ease";

            setTimeout(() => {
                card.remove();
                checkEmptyState(); // dismiss aana pinnadi, ellam empty-ah irukka nu check pannu
            }, 300);
        });
    });
}

// Ella alerts-um dismiss pannitanga na, empty-state kaattu
function checkEmptyState() {
    const alertsList = document.querySelector(".alerts-list");
    const remainingAlerts = alertsList.querySelectorAll(".alert-card");

    if (remainingAlerts.length === 0) {
        alertsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <h3>All Caught Up!</h3>
                <p>You have no new alerts right now.</p>
            </div>
        `;
    }
}