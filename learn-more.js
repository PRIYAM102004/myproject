// Hamburger menu toggle
function toggleMenu() {
    document.querySelector('.nav-bar ul').classList.toggle('active');
}


const counters = document.querySelectorAll('.count-up');

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;  // 100 steps-la reach aagum

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + "+";
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 20);
}

// Scroll pannum bodhu trigger aaga IntersectionObserver use pannu
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);  // ஒரே தடவை மட்டும் run aagum
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));