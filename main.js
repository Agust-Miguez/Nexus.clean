// Nexus Clean - Main Script

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Remove Preloader (Simulated for now, as real loading logic might be more complex)
    // For visual verification, we keep it or let user handle it.
    // But usually a "Senior Architect" would add a window load listener.
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Slight delay for branding impact
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
            }, 1000);
        }
    });

    // Magnetic Cursor Logic could go here, but avoiding over-engineering unless requested.
    // Task 5 focused on Conversion and Mobile.
});
