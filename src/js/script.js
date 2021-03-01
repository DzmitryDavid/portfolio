'use strict';
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('form');
    const burger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const closeElem = document.querySelector('.menu__close');
    const overlay = document.querySelector('.menu__overlay');
    const pageUp = document.querySelector('.pageup');
    const promoSection = document.querySelector('.promo');
    const aboutLink = document.querySelector('.promo__link');
    const worksLink = document.querySelector('.promo__link-works');
    const checkboxLabel = document.querySelector('.checkbox__label')
    const nav = document.querySelector('.header__nav');


    const stickyBurger = function(entries) {
        const [entry] = entries;

        if (entry.isIntersecting) burger.classList.remove('sticky');
        else burger.classList.add('sticky');
    }
    
    const burgerObserver = new IntersectionObserver(stickyBurger, {
        root: null,
        threshold: 0
    });
    burgerObserver.observe(promoSection)
    
    
    const handleHover = (e, opacity ) => {
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link.closest('.header__nav').querySelectorAll('.nav__link');
            siblings.forEach(el => {
                if (el !== link)
                el.style.opacity = opacity
                
            });
        }
    };

    nav.addEventListener('mouseover', (e) => {
        handleHover(e, '0.4')
    });
    nav.addEventListener('mouseout', (e) => {
        handleHover(e, '1')
    });
    
    

    burger.addEventListener('click', () =>{
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
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
    };

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');
        
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                checkboxLabel.classList.add('error__label');
                // formAddError(input);

                error++;

            } else {
                if(input.value === '') {

                    formAddError(input)
                    checkboxLabel.classList.remove('error__label');

                    error++;
                }
            }
        }
        return error;
    };

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');

    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    };

    
    async function formSend(e) {
        e.preventDefault();
        
        let error = formValidate(form); 
        console.log(error);
        
        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            form.classList.remove('_sending');

            } else {
                alert(`Sorry, doesn't support here!`);
                form.classList.remove('_sending');

            }
        } else {
            alert('fill in required fields')
        }
    };
        
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
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

    form.addEventListener('submit', formSend);
});



