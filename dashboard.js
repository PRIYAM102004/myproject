// Login check - login pannala na dashboard access panna koodathu
if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert("Please login to access the dashboard.");
    window.location.href = "login.html";
}

// idhukku keela unnoda existing code (toggleMenu, window.onload, logoutUser) continue aagum
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

window.onload = function() {
    document.getElementById('loginLink').style.display = "none";
    document.getElementById('logoutBtn').style.display = "inline-block";
};

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = "index.html";
}

function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}

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

// whether api 
const LATITUDE = 11.7480;   // Cuddalore
const LONGITUDE = 79.7714;

async function fetchDashboardWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code`
        );
        const data = await response.json();
        const current = data.current;
        const code = current.weather_code;

        let description = "Clear";
        let iconClass = "fa-solid fa-sun";

        if (code >= 1 && code <= 3) { description = "Partly Cloudy"; iconClass = "fa-solid fa-cloud-sun"; }
        else if (code >= 45 && code <= 48) { description = "Foggy"; iconClass = "fa-solid fa-smog"; }
        else if (code >= 51 && code <= 82) { description = "Rainy"; iconClass = "fa-solid fa-cloud-rain"; }
        else if (code >= 95) { description = "Thunderstorm"; iconClass = "fa-solid fa-bolt"; }

        document.getElementById('dashWeatherTemp').textContent = Math.round(current.temperature_2m) + "°C, " + description;
        document.getElementById('dashWeatherDesc').textContent = "Today's Weather";
        document.getElementById('dashWeatherIcon').className = iconClass;

    } catch (error) {
        console.error("Dashboard weather fetch failed:", error);
        document.getElementById('dashWeatherTemp').textContent = "Unable to load";
    }
}

fetchDashboardWeather();
