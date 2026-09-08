// Navbar elements
const weatherSection = document.getElementById('weatherSection');
const rainEffect = document.getElementById('rainEffect');
const weatherIcon = document.getElementById('weatherIcon');
const tempText = document.getElementById('tempText');
const conditionText = document.getElementById('conditionText');

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

// Real current time check pannu - automatic day/night
const hour = new Date().getHours();
const isDay = hour >= 6 && hour < 18;   // 6AM - 6PM = day, illana night

// Weather condition ("clear", "rainy", "thunder" - idhu mattum)


// Day/Night + weather condition combine pannu
function applyWeather(condition, isDay) {
    weatherSection.className = 'current-weather'; // reset
    rainEffect.classList.remove('active');
    weatherSection.classList.remove('thunder-flash');

    if (condition === "clear") {
        weatherSection.classList.add(isDay ? 'day-clear' : 'night-clear');
        weatherIcon.className = isDay ? 'fa-solid fa-sun weather-icon' : 'fa-solid fa-moon weather-icon';
        tempText.textContent = isDay ? "34°C" : "24°C";
        conditionText.textContent = "Clear Sky";
    }
    else if (condition === "rainy") {
        weatherSection.classList.add(isDay ? 'day-rainy' : 'night-rainy');
        weatherIcon.className = 'fa-solid fa-cloud-rain weather-icon';
        tempText.textContent = "27°C";
        conditionText.textContent = "Rainy";
        rainEffect.classList.add('active');
    }
    else if (condition === "thunder") {
        weatherSection.classList.add(isDay ? 'day-rainy' : 'night-rainy');
        weatherIcon.className = 'fa-solid fa-bolt weather-icon';
        tempText.textContent = "25°C";
        conditionText.textContent = "Thunderstorm";
        rainEffect.classList.add('active');
        weatherSection.classList.add('thunder-flash');
    }
}




// whether api link 
const LATITUDE = 11.7480;   // Cuddalore latitude
const LONGITUDE = 79.7714;  // Cuddalore longitude

async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const data = await response.json();
        const current = data.current;

        // Real data-a page-la kaattu
        tempText.textContent = Math.round(current.temperature_2m) + "°C";
        document.querySelector('.weather-details span:first-child').innerHTML =
            `<i class="fa-solid fa-droplet"></i> Humidity: ${current.relative_humidity_2m}%`;
        document.querySelector('.weather-details span:last-child').innerHTML =
            `<i class="fa-solid fa-wind"></i> Wind: ${current.wind_speed_10m} km/h`;

        // weather_code number-a vachu condition decide pannu (WMO weather codes)
        const code = current.weather_code;
        let weatherCondition = "clear";
        let description = "Clear Sky";

        if (code >= 51 && code <= 67) { weatherCondition = "rainy"; description = "Rainy"; }
        else if (code >= 80 && code <= 82) { weatherCondition = "rainy"; description = "Rain Showers"; }
        else if (code >= 95) { weatherCondition = "thunder"; description = "Thunderstorm"; }
        else if (code >= 1 && code <= 3) { description = "Partly Cloudy"; }
        else if (code >= 45 && code <= 48) { description = "Foggy"; }

        conditionText.textContent = description;
        applyWeather(weatherCondition, isDay);

    } catch (error) {
        console.error("Weather fetch failed:", error);
        conditionText.textContent = "Unable to load weather data";
    }
}

fetchWeather();

// 7 day 

async function fetchForecast() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max,weather_code&timezone=auto`
        );
        const data = await response.json();
        const daily = data.daily;

        const cards = document.querySelectorAll('#forecastCards .forecast-card');
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        cards.forEach((card, i) => {
            if (!daily.time[i]) return;

            const date = new Date(daily.time[i]);
            card.querySelector('.day-name').textContent = i === 0 ? "Today" : dayNames[date.getDay()];
            card.querySelector('.day-temp').textContent = Math.round(daily.temperature_2m_max[i]) + "°C";

            const code = daily.weather_code[i];
            const icon = card.querySelector('.day-icon');
            if (code >= 95) icon.className = "fa-solid fa-bolt day-icon";
            else if (code >= 51 && code <= 82) icon.className = "fa-solid fa-cloud-rain day-icon";
            else if (code >= 1 && code <= 3) icon.className = "fa-solid fa-cloud-sun day-icon";
            else icon.className = "fa-solid fa-sun day-icon";
        });

    } catch (error) {
        console.error("Forecast fetch failed:", error);
    }
}

fetchForecast();