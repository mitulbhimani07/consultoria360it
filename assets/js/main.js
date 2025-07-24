// Ensure carousel navigation works properly
$(document).ready(function () {
    // Initialize carousel
    $('#mainCarousel').carousel({
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: 'hover'
    });

    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    $('#mainCarousel').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('#mainCarousel').on('touchend', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (startX - endX > 50) {
            // Swipe left - next slide
            $('#mainCarousel').carousel('next');
        } else if (endX - startX > 50) {
            // Swipe right - previous slide
            $('#mainCarousel').carousel('prev');
        }
    }

    // Add keyboard navigation
    $(document).keydown(function (e) {
        if (e.keyCode == 37) { // Left arrow
            $('#mainCarousel').carousel('prev');
        } else if (e.keyCode == 39) { // Right arrow
            $('#mainCarousel').carousel('next');
        }
    });

    // Smooth navigation menu active state
    $('.nav-link').click(function (e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});

// Optional: Adjust parallax scroll using JS if needed
window.addEventListener("scroll", function () {
    const bg = document.querySelector(".nosotros-bg");
    const offset = window.pageYOffset;
    bg.style.transform = `translateY(${offset * 0.3}px)`; // Adjust scroll speed
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-section')) {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setupScrollAnimations();

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add parallax effect to particles
window.addEventListener('scroll', function () {
    const particles = document.querySelectorAll('.particle');
    const scrolled = window.pageYOffset;

    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = ["About", "Services", "contact"];
    const navLinks = document.querySelectorAll(".nav-link");

    function onScroll() {
        let scrollPos = window.scrollY + 120; // 120 for header height offset
        sections.forEach((id, idx) => {
            const section = document.getElementById(id);
            if (section) {
                if (
                    section.offsetTop <= scrollPos &&
                    section.offsetTop + section.offsetHeight > scrollPos
                ) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    navLinks[idx].classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", onScroll);
});