import i18Obj from './translate.js';

console.log('My total points: 75');



document.querySelector('.header__language-link_en').classList.add('link_active');

const header = document.querySelector('.header');
window.onscroll = () => {
    if (window.pageYOffset > 50) {
        header.classList.add('header_active');
    } else {
        header.classList.remove('header_active');
    }
};

const hamburger = document.querySelector('.header__hamburger');
const headerNav = document.querySelector('.header__nav');
const headerNavLinks = document.querySelector('.header__list');
const headerNavLinksItem = document.querySelectorAll('.header__item');
const toggleMenu = () => {
  if (!hamburger.classList.contains('open')) {
    hamburger.classList.add('open');
    headerNav.classList.add('open');
    headerNavLinks.classList.add('open');

  } else {
    hamburger.classList.remove('open');
    headerNav.classList.remove('open');
    headerNavLinks.classList.remove('open');
  }

};
hamburger.addEventListener('click', toggleMenu);
headerNavLinksItem.forEach((el) => el.addEventListener('click', toggleMenu));

const portfolioTabs = document.querySelectorAll('.portfolio__tabs');
const portfolioImages = document.querySelectorAll('.portfolio__picture');

const changePortfolioImages = (event) => {
    if(event.target.classList.contains('portfolio__btn')) {
        let season = 'autumn';
        switch (event.target.dataset.season) {
            case 'winter': 
                season = 'winter';
                break;
            case 'spring':
                season = 'spring';
                break;
            case 'summer':
                season = 'summer';
                break;
            case 'autumn':
                season = 'autumn';
                break
        }
        portfolioImages.forEach((img, index) => img.style.backgroundImage = `url('./assets/img/section-portfolio/${season}/${index + 1}.jpg')`);
        document.querySelectorAll('.portfolio__btn').forEach(item => {
            if (item.classList.contains('button')) {
                item.classList.remove('button');
                item.classList.add('button-outline');
            }
        })
        event.target.classList.add('button');
        event.target.classList.remove('button-outline');
    }
}

portfolioTabs.forEach(el => el.addEventListener('click', changePortfolioImages));

const switchTranslate = (lang) => {
    if (lang === 'en') {
        const dataElements = document.querySelectorAll('[data-i18]');
        dataElements.forEach(item => {
            item.textContent = i18Obj.en[item.dataset.i18];
        });
        document.querySelectorAll('.header__language-link').forEach(item => item.classList.remove('link_active'));
        document.querySelector('.header__language-link_en').classList.add('link_active');
    } else {
        const dataElements = document.querySelectorAll('[data-i18]');
        dataElements.forEach(item => {
            item.textContent = i18Obj.ru[item.dataset.i18];
        });
        document.querySelectorAll('.header__language-link').forEach(item => item.classList.remove('link_active'));
        document.querySelector('.header__language-link_ru').classList.add('link_active');
    }
}

const languageSwitch = document.querySelectorAll('.header__languager-switcher');
languageSwitch.forEach(el => el.addEventListener('click', event => {
    if (event.target.classList.contains('header__language-link_en')) {
        switchTranslate('en');
        localStorage.setItem('lang', 'en');
    } else {
        switchTranslate('ru');
        localStorage.setItem('lang', 'ru');
    }
}));

const themeSwitcher = (theme) => {
        const sections = ['skills', 'portfolio', 'video', 'price'];
        if (theme === 'dark') {
            sections.forEach(name => document.querySelector(`.${name}`).classList.remove('light-theme'));
            document.querySelectorAll('.price__descript').forEach(item => item.classList.remove('light-theme'));
            document.querySelectorAll('.h2__wrapper .h2__title').forEach(item => item.classList.remove('light-theme-h2-title'));
            document.querySelectorAll('.h2__line').forEach(item => item.classList.remove('light-theme-h2-line'));
            document.querySelectorAll('.button-outline').forEach(item => item.classList.remove('light-theme-button-outline'));
            document.querySelector('.header__theme-switcher').classList.remove('header__theme-switcher_light');
            document.querySelector('.header__theme-switcher').classList.add('header__theme-switcher_dark');
        } else {
            sections.forEach(name => document.querySelector(`.${name}`).classList.add('light-theme'));
            document.querySelectorAll('.price__descript').forEach(item => item.classList.add('light-theme'));
            document.querySelectorAll('.h2__wrapper .h2__title').forEach(item => item.classList.add('light-theme-h2-title'));
            document.querySelectorAll('.h2__line').forEach(item => item.classList.add('light-theme-h2-line'));
            document.querySelectorAll('.button-outline').forEach(item => item.classList.add('light-theme-button-outline'));
            document.querySelector('.header__theme-switcher').classList.remove('header__theme-switcher_dark');
            document.querySelector('.header__theme-switcher').classList.add('header__theme-switcher_light');
        }
}

document.querySelector('.header__theme-switcher').addEventListener('click', () => {
    if (document.querySelector('.skills').classList.contains('light-theme')) {
        themeSwitcher('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        themeSwitcher('light');
        localStorage.setItem('theme', 'light');
    }
});

const getLocalStorage = () => {
    if(localStorage.getItem('lang')) {
        if (localStorage.getItem('lang') === 'en') {
            switchTranslate('en');
        } else {
            switchTranslate('ru');
        }
    }
    if (localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'dark') {
            themeSwitcher('dark');
        } else {
            themeSwitcher('light');
        }
    }
}

window.addEventListener('load', getLocalStorage);