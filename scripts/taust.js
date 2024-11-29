document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY * 0.5;
        document.documentElement.style.setProperty('--scroll-offset', `${scrollPosition}px`);
    });
});

