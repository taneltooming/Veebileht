document.addEventListener('DOMContentLoaded', () => { /*Ootab, kuni kogu lehekülje sisu on laetud */
    window.addEventListener('scroll', () => { /*Lisab kerimise sündmusele kuulaja */
        let scrollPosition = window.scrollY * 0.25; /*Vähendab kerimisasendit, et taust liiguks aeglasemalt*/
        document.documentElement.style.setProperty('--scroll-offset', `${scrollPosition}px`); /*CSS muutuja väärtuseks uue arvutatud kerimisasendi */
    });
});

