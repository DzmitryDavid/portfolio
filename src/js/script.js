const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const overlay = document.querySelector('.menu__overlay');

console.log(overlay);
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


