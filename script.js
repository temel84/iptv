// ===========================================
// KAPTAN IPTV - JAVASCRIPT
// ===========================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const pricingGrid = document.getElementById('pricing-grid');

// Prices Data
const prices = {
    tr: [
        { months: 3, price: 590, vip: 790 },
        { months: 6, price: 790, vip: 990 },
        { months: 12, price: 1290, vip: 1690 },
        { months: '12+1', price: 1790, oldPrice: 2390, double: 2690 },
        { months: '24+1', price: 2490, oldPrice: 3090, double: 3990 },
        { months: '36+1', price: 3490, oldPrice: 3800, double: 5690 }
    ],
    ab: [
        { months: 3, price: 35, vip: 45 },
        { months: 6, price: 45, vip: 60 },
        { months: 12, price: 75, vip: 100 },
        { months: '12+1', price: 100, oldPrice: 150, double: 150 },
        { months: '24+1', price: 140, oldPrice: 200, double: 200 },
        { months: '36+1', price: 200, oldPrice: 250, double: 280 }
    ]
};

// Initialize particles (optimized for mobile)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;

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
    if (!navMenu || !navToggle) return;

    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

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

// Touch handling for mobile menu
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    // Swipe right to open menu
    if (diff < -swipeThreshold && navMenu && !navMenu.classList.contains('active')) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    // Swipe left to close menu
    else if (diff > swipeThreshold && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchend', handleTouchEnd, { passive: true });

// Smooth scroll for navigation links
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu first
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }

                // Then scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
}

// Active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Animate stat numbers
function animateStats() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    return num.toLocaleString('tr-TR');
}

// Pricing toggle
function initPricingToggle() {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');

            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update prices
            updatePrices(type);
        });
    });
}

function updatePrices(type) {
    const currentPrices = prices[type];
    const pricingCards = pricingGrid.querySelectorAll('.pricing-card');
    const currency = type === 'tr' ? '₺' : '€';

    pricingCards.forEach((card, index) => {
        if (currentPrices[index]) {
            const priceData = currentPrices[index];
            const priceElement = card.querySelector('.pricing-price .amount');
            const currencyElement = card.querySelector('.pricing-price .currency');
            const oldPriceElement = card.querySelector('.old-price');
            const vipElement = card.querySelector('.pricing-vip span');
            const vipSmall = card.querySelector('.pricing-vip small');

            // Update main price
            priceElement.textContent = priceData.price;
            currencyElement.textContent = currency;

            // Update old price if exists
            if (priceData.oldPrice && oldPriceElement) {
                oldPriceElement.textContent = currency + priceData.oldPrice;
            }

            // Update VIP price
            if (priceData.vip) {
                vipElement.textContent = `VIP Paket: ${currency}${priceData.vip}`;
                vipSmall.textContent = '(Çift giriş + öncelikli destek)';
            } else if (priceData.double) {
                vipElement.textContent = `Çift Giriş: ${currency}${priceData.double}`;
                vipSmall.textContent = '(2 cihazda aynı anda)';
            }

            // Update WhatsApp links
            const whatsappLinks = card.querySelectorAll('a[href^="https://wa.me/"]');
            whatsappLinks.forEach(link => {
                const href = link.getAttribute('href');
                let newHref = href;

                if (type === 'ab') {
                    // For Europe prices, you might want to change the WhatsApp message
                    // This is a placeholder - update with actual Europe WhatsApp number if different
                    newHref = href.replace('905555555555', '491234567890');
                }

                link.setAttribute('href', newHref);
            });
        }
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

// Typing effect for hero (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Parallax effect for background elements
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-device');

        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Netflix Style Loading Screen
function initNetflixLoader() {
    const loader = document.getElementById('netflix-loader');
    const particlesContainer = document.getElementById('loader-particles');

    // Create loader particles
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'loader-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Prevent scroll during loading
    document.body.classList.add('loading');

    // Hide loader after animations complete
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 3500); // 3.5 seconds total loading time
}

// Add loading animation
window.addEventListener('load', () => {
    // Initialize Netflix loader first
    initNetflixLoader();

    // Initialize all features
    createParticles();
    animateStats();
    initScrollAnimations();
    initPricingToggle();
    initSmoothScroll();
    initTouchFeedback();

    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Event listeners
window.addEventListener('scroll', () => {
    handleScroll();
    updateActiveNavLink();
});

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle || !navMenu) return;

    // Check if click is outside menu and toggle button
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            console.log('Menu closed by outside click');
        }
    }
});

// Add touch feedback to buttons
function initTouchFeedback() {
    const buttons = document.querySelectorAll('button, a, .btn-primary, .btn-secondary, .btn-price, .pricing-card, .feature-card, .device-item');

    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });

        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });
}

// Initialize touch feedback
initTouchFeedback();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Kaptan IPTV - Tüm hakları saklıdır.`;
}

// Add hover effect to pricing cards
function initPricingHover() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'scale(1)';
            });
        });
    });
}

// Initialize pricing hover effect
initPricingHover();

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const rippleEffect = button.getElementsByClassName('ripple')[0];

    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);
}

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-price, .btn-price-vip, .btn-buy, .btn-cta, .btn-cta-secondary');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .btn-price, .btn-price-vip, .btn-buy, .btn-cta, .btn-cta-secondary {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.3);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console branding
console.log(
    '%c⚓ KAPTAN IPTV ⚓',
    'font-size: 24px; font-weight: bold; color: #00f5ff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
);
console.log(
    '%cPremium IPTV Servisi',
    'font-size: 14px; color: #7b2cbf;'
);
console.log(
    '%c300.000+ İçerik | 4K Kalite | 7/24 Destek',
    'font-size: 12px; color: #a8b2d1;'
);

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedScroll, { passive: true });

// Optimize scroll performance on mobile
if ('IntersectionObserver' in window) {
    // Use passive listeners for better scroll performance
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
}

// Detect mobile device and optimize accordingly
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth < 768);
}

// Apply mobile optimizations
if (isMobileDevice()) {
    // Reduce particle animations on mobile
    document.documentElement.style.setProperty('--particle-count', '20');

    // Optimize rendering
    document.body.style.willChange = 'transform';

    // Add smooth scroll with fallback
    try {
        document.documentElement.style.scrollBehavior = 'smooth';
    } catch (e) {
        // Fallback for browsers that don't support smooth scroll
        console.log('Smooth scroll not supported');
    }
}

// Add smooth reveal animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Export functions for potential external use
window.KaptanIPTV = {
    createParticles,
    animateStats,
    updatePrices,
    toggleMobileMenu
};
