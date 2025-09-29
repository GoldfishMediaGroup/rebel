import { gsap, ScrollTrigger } from 'gsap/all';

function headerBurger() {
  const burger = document.querySelector('.header__burger');
  if (!burger) return;


  const body = document.body;

  const logo = document.querySelector('.header__logo');
  const navWrapper = document.querySelector('.header__inner');

  // Класс для блокировки скролла
  const disableScrollClass = 'no-scroll';

  function openBurger() {

    body.classList.add(disableScrollClass);

    burger.classList.add('isActive');
    navWrapper.classList.add('isActive');

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  function closeBurger() {
    body.classList.remove(disableScrollClass);

    burger.classList.remove('isActive');
    navWrapper.classList.remove('isActive');
  }


  burger.addEventListener('click', () => {
    burger.classList.contains('isActive') ? closeBurger() : openBurger();
  });
 


  
  logo.addEventListener('click', closeBurger);


  navWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__nav-link') || e.target.classList.contains('header__nav-btn')) {
      closeBurger();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && burger.classList.contains('isActive')) {
      closeBurger();
    }
  });
}

export default headerBurger;
