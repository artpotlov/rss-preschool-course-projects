console.log('My total points: 75');

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