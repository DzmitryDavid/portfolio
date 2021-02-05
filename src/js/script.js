const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const overlay = document.querySelector('.menu__overlay');
const pageUp = document.querySelector('.pageup');
const aboutLink = document.querySelector('.promo__link');
const worksLink = document.querySelector('[works]');

console.log(worksLink);

burger.addEventListener('click', () =>{
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        console.log('done');
        menu.classList.remove('active');
    }
});

function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        pageUp.style.display = 'block';
    }
    if (scrolled < 1650) {
        pageUp.style.display = 'none';
    
    }
}

window.addEventListener('scroll', trackScroll);
pageUp.addEventListener('click', () => {
    scrollTo(0, 0)
});

window.addEventListener('mouseover',(e) => {
    if (e.target === worksLink) {
        aboutLink.style.color = '#fff';
        aboutLink.style.boxShadow = 'none';
    } else {
        aboutLink.style.color = '#ff133e';
        aboutLink.style.boxShadow = '0 5px 0 #ff133e';
    }
    
});



