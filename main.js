// Nexus Clean - Main Script

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initGreeting();
    initCursor();
    initScrollAnimations();
    registerServiceWorker();

    // Dynamic Year (from Task 5)
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// 1. Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const fadeOut = () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
        }, 500);
    };

    if (document.readyState === 'complete') {
        fadeOut();
    } else {
        window.addEventListener('load', fadeOut);
    }
}

// 2. Dynamic Greeting
function initGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greetingText = 'Bienvenidos'; // Default

    if (hour >= 6 && hour < 12) {
        greetingText = 'Buenos días';
    } else if (hour >= 12 && hour < 20) {
        greetingText = 'Buenas tardes';
    } else {
        greetingText = 'Buenas noches';
    }

    greetingElement.textContent = greetingText;
}

// 3. Magnetic Cursor (Desktop Only)
function initCursor() {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Movement
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover Effect
    const interactables = document.querySelectorAll('a, button, input, .step, .bento-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
}

// 4. Scroll Animations (IntersectionObserver)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Target sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .bento-card, .trust-item, .timeline .step');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-section');
        observer.observe(el);
    });
}

// 5. PWA Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}
