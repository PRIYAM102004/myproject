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

// Crop recommendation lookup table
const cropData = {
    "clay-kharif": { crop: "Rice (Paddy)", tip: "Clay soil holds water well, perfect for paddy during monsoon." },
    "clay-rabi": { crop: "Chickpea", tip: "Clay soil with residual moisture suits chickpea in winter." },
    "clay-summer": { crop: "Sugarcane", tip: "Clay soil retains water, good for sugarcane in summer with irrigation." },

    "sandy-kharif": { crop: "Groundnut", tip: "Sandy soil drains well, ideal for groundnut during monsoon." },
    "sandy-rabi": { crop: "Mustard", tip: "Sandy soil with good drainage suits mustard in winter." },
    "sandy-summer": { crop: "Watermelon", tip: "Sandy soil with good drainage works well for summer melons." },

    "loamy-kharif": { crop: "Maize", tip: "Loamy soil's balanced texture suits maize well in monsoon." },
    "loamy-rabi": { crop: "Wheat", tip: "Loamy soil with good drainage suits wheat in winter season." },
    "loamy-summer": { crop: "Vegetables (Tomato/Okra)", tip: "Loamy soil is ideal for summer vegetable cultivation." },

    "black-kharif": { crop: "Cotton", tip: "Black soil retains moisture well, ideal for cotton during monsoon." },
    "black-rabi": { crop: "Sorghum (Jowar)", tip: "Black soil's moisture retention suits jowar in winter." },
    "black-summer": { crop: "Sunflower", tip: "Black soil works well for sunflower with proper irrigation." }
};

function recommendCrop() {
    const soil = document.getElementById('soilType').value;
    const season = document.getElementById('season').value;
    const key = soil + "-" + season;

    const result = cropData[key];

    document.getElementById('resultCropName').textContent = result.crop;
    document.getElementById('resultTip').textContent = result.tip;
    document.getElementById('resultCard').style.display = "block";
}