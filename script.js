// ===========================================
// KAPTAN IPTV - JAVASCRIPT
// ===========================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const menuOverlay = document.getElementById('menu-overlay');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize particles (optimized for mobile)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const isSmallMobile = window.innerWidth < 480;
    const particleCount = isSmallMobile ? 12 : (isMobile ? 20 : 50);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navbar scroll effect
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    if (!navMenu || !navToggle || !menuOverlay) return;

    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (isActive) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }

    console.log('Menu toggled:', isActive ? 'OPEN' : 'CLOSED');
}

// Touch handling for mobile menu with better gesture support
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only register horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Swipe right to open menu
        if (diffX < -swipeThreshold && !navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        // Swipe left to close menu
        else if (diffX > swipeThreshold && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Close menu when clicking on a link
function closeMenuOnLinkClick() {
    if (navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Animate statistics counter
function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString('fr-FR');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString('fr-FR');
            }
        };

        updateCounter();
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .device-item, .testimonial-card, .contact-card, .category-item, .app-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Hide loading screen when page is loaded
function hideLoadingScreen() {
    const loader = document.getElementById('netflix-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 400);
        }, 2000); // Show loader for 2 seconds
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initScrollAnimations();
    animateCounters();
    hideLoadingScreen();
    initBackToTop();

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    navToggle.addEventListener('click', toggleMobileMenu);
    menuOverlay.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });

    // Touch events for mobile swipe
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    console.log('Kaptan IPTV - Site initialisé avec succès');
});

// Back to top functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
