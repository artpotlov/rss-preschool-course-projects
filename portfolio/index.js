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
        event.target.classList.remove('button-outline');
        event.target.classList.add('button');
    }
}

portfolioTabs.forEach(el => el.addEventListener('click', changePortfolioImages));



