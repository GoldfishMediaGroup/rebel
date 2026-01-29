import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

function horisontalNew() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const cards = gsap.utils.toArray('.horisontal__screen');

  gsap.set(cards, {
    // Проверяем каждую карточку индивидуально
    x: (i, target) => {
      if (i === 0) return 0; // Первую не трогаем
      // Если класса нет — двигаем вправо на ширину окна, если есть — оставляем 0
      return !target.classList.contains('horisontal__screen--1') ? window.innerWidth + 100 : i * -3;
    },

    y: (i, target) => {
      if (i === 0) return 0; // Первую не трогаем
      // Если класс есть — двигаем вниз, если нет — оставляем 0
      return target.classList.contains('horisontal__screen--1') ? window.innerHeight + 100 : 0;
    },

    zIndex: (i) => i,
    autoAlpha: 1
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.horisontal__inner',
      start: 'top top',
      end: `+=${cards.length * 200}%`,
      pin: true,
      scrub: 2,
      invalidateOnRefresh: true
    }
  });

  cards.forEach((card, i) => {
    tl.to(card, {
      y: 0,
      x: 0,
      duration: 1,
      ease: 'power2.out'
    });
    if (cards[i - 1]) {
      tl.to(
        cards[i - 1],
        {
          opacity: cards[i].classList.contains('horisontal__screen--1') ? 0 : 1,
          x: cards[i].classList.contains('horisontal__screen--1') ?  0  : '-100%',

          duration: 0.8,
          ease: 'power1.out'
        },
        '-=1',
        ''
      );
    }
  });
}

export default horisontalNew;
