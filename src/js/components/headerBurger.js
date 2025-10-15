import { gsap, ScrollTrigger } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

function headerBurger() {
  const section = document.querySelector('header');
  if (!section) return;

  const burger = document.querySelector('.header__burger');
  if (!burger) return;
  const body = document.body;

  const logo = document.querySelector('.header__logo');
  const navWrapper = document.querySelector('.header__nav');

  const lang = document.querySelector('.header__lang');

  // Класс для блокировки скролла
  const disableScrollClass = 'no-scroll';

  function openBurger() {
    body.classList.add(disableScrollClass);

    burger.classList.add('isOpen');
    navWrapper.classList.add('isOpen');
    lang.classList.remove('isOpenMob');
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
  }

  function closeBurger() {
    body.classList.remove(disableScrollClass);

    burger.classList.remove('isOpen');
    navWrapper.classList.remove('isOpen');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('isOpen') ? closeBurger() : openBurger();
  });

  logo.addEventListener('click', closeBurger);

  navWrapper.addEventListener('click', (e) => {
    if (
      e.target.closest('.header__nav-modal-list') ||
      e.target.closest('.header__social') ||
      e.target.closest('.header__burger-lang-label')
    ) {
      closeBurger();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && burger.classList.contains('isOpen')) {
      closeBurger();
    }
  });

  function langDeskHover() {
    if (!lang) return;
    lang.addEventListener('mouseenter', () => {
      lang.classList.add('isActive');
    });
    lang.addEventListener('mouseleave', () => {
      lang.classList.remove('isActive');
    });
  }
  function langMobClick() {
    if (!lang) return;
    const langTop = lang.querySelector('.header__lang-top');
    const langBottomWrap = lang.querySelector('.header__lang-bottom-wrap');
    langTop.addEventListener('click', () => {
      lang.classList.toggle('isOpenMob');
      if (lang.classList.contains('isOpenMob')) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      burger.classList.remove('isOpen');
      navWrapper.classList.remove('isOpen');
    });

    langBottomWrap.addEventListener('click', (e) => {
      if (e.target === langBottomWrap) {
        e.stopPropagation();
        lang.classList.remove('isOpenMob');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  function syncLangRadios() {
    const allLangRadios = section.querySelectorAll('input[type="radio"][data-lang]');
    const textItem = document.querySelector('.header__lang-top-text');
    if (!allLangRadios.length) return;
    const lang = document.querySelector('.header__lang');
    allLangRadios.forEach((radio) => {
      radio.addEventListener('change', function () {
        lang && lang.classList.remove('isActive');
        lang && lang.classList.remove('isOpenMob');
        document.body.classList.remove('no-scroll');
        if (this.checked) {
          const selectedLang = this.getAttribute('data-lang');
          textItem.textContent = selectedLang;
          allLangRadios.forEach((otherRadio) => {
            if (otherRadio.getAttribute('data-lang') === selectedLang && otherRadio !== this) {
              otherRadio.checked = true;
            }
          });
        }
      });
    });
  }
  function navItemsHoverClick() {
    const navItems = document.querySelectorAll('.header__nav-item');
    if (!navItems.length) return;
    navItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('isActive');
      });
    });
    navItems.forEach((item) => {
      item.addEventListener('mouseleave', () => {
        item.classList.remove('isActive');
      });
    });

    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        $(item.querySelector('.header__nav-modal')).slideToggle();
      });
    });
  }

  langDeskHover();
  langMobClick();
  navItemsHoverClick();
  syncLangRadios();
}

export default headerBurger;
