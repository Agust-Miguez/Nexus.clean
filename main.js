/**
 * NEXUS CLEAN - MAIN CONTROLLER
 * Arquitectura: Modular ES6
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    handlePreloader();
    setDynamicGreeting();
    initScrollAnimations();
    initCustomCursor();
    registerServiceWorker();
}
/* =========================================
   1. PRELOADER (Con retardo forzado)
   ========================================= */
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    const minTime = 1500; // Forzamos que dure al menos 1.5 segundos
    const startLoad = Date.now();

    window.addEventListener('load', () => {
        const endLoad = Date.now();
        const timeElapsed = endLoad - startLoad;
        const delay = Math.max(0, minTime - timeElapsed);

        setTimeout(() => {
            document.body.classList.add('loaded');
            
            // Eliminar del DOM tras la transición CSS
            setTimeout(() => {
                if (preloader) preloader.style.display = 'none';
            }, 500); // Coincide con el transition del CSS
        }, delay);
    });
}

/* =========================================
   2. SALUDO DINÁMICO
   ========================================= */
function setDynamicGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greetingText = 'Bienvenido';

    if (hour >= 5 && hour < 12) {
        greetingText = 'Buenos días';
    } else if (hour >= 12 && hour < 19) {
        greetingText = 'Buenas tardes';
    } else {
        greetingText = 'Buenas noches';
    }

    // Efecto de escritura simple
    greetingElement.textContent = `${greetingText}`;
}

/* =========================================
   3. SCROLL ANIMATIONS (Intersection Observer)
   ========================================= */
function initScrollAnimations() {
    // Elementos a animar: Secciones y Tarjetas
    const elementsToAnimate = document.querySelectorAll('section, .bento-card, .trust-item');

    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez animado (Mejora rendimiento)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-on-scroll'); // Clase base CSS
        observer.observe(el);
    });
}

/* =========================================
   4. CURSOR MAGNÉTICO (Solo Desktop)
   ========================================= */
function initCustomCursor() {
    // Detectar si el dispositivo tiene puntero fino (Mouse/Trackpad)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Hacer visibles los cursores custom
    cursorDot.style.display = 'block';
    cursorOutline.style.display = 'block';

    // Movimiento
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot sigue al mouse instantáneamente
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline sigue con un ligero delay (efecto fluido)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Efecto Hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, input, .bento-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovering');
            cursorDot.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovering');
            cursorDot.classList.remove('hovering');
        });
    });
}

/* =========================================
   5. PWA SERVICE WORKER
   ========================================= */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Nexus SW registrado: ', registration.scope);
                })
                .catch(err => {
                    console.log('Nexus SW falló: ', err);
                });
        });
    }
}