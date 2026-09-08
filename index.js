

// storage 
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}
// contact section 
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
    }

    alert("Thank you " + name + "! Your message has been sent.");
    this.reset();
});


// states section 

const counters = document.querySelectorAll(".counter");

const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100;

    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// login log out 
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        document.getElementById('getStartedBtn').textContent = "Go to Dashboard";
        document.getElementById('getStartedLink').setAttribute('href', 'dashboard.html');

        document.getElementById('loginLink').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
    }
};

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    location.reload();
}

// extra products 

function toggleCrops() {
    const extraCards = document.querySelectorAll('.extra-crop');
    const btn = document.getElementById('seeMoreBtn');

    extraCards.forEach(card => card.classList.toggle('show'));

    if (btn.textContent === "See More") {
        btn.textContent = "See Less";
    } else {
        btn.textContent = "See More";
    }
}

// model over ley button 
const shopData = {
    seeds: { title: "Seeds We Offer", items: ["Paddy Seeds", "Wheat Seeds", "Cotton Seeds", "Vegetable Seed Kits", "Maize Seeds"] },
    fertilizer: { title: "Fertilizers We Offer", items: ["Urea", "DAP", "Potash", "Organic Compost", "NPK Mix"] },
    pesticides: { title: "Pesticides We Offer", items: ["Insecticides", "Fungicides", "Herbicides", "Neem-based Sprays"] },
    tools: { title: "Tools & Equipment", items: ["Hand Tools Set", "Sprayers", "Irrigation Pipes", "Tractors (Rental)"] }
};

function showShopModal(category) {
    const data = shopData[category];
    document.getElementById('modalTitle').textContent = data.title;

    const list = document.getElementById('modalList');
    list.innerHTML = "";
    data.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });

    document.getElementById('shopModal').classList.add('active');
}

function closeShopModal() {
    document.getElementById('shopModal').classList.remove('active');
}