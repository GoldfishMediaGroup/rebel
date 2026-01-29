import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

function horisontalNew() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const cards = gsap.utils.toArray('.horisontal__screen');

  gsap.set(cards, {
    force3D: true,

    x: (i, target) => {
      if (i === 0) return 0;

      return !target.classList.contains('horisontal__screen--1') ? window.innerWidth + 100 : i * -3;
    },

    y: (i, target) => {
      if (i === 0) return 0;
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
      scrub: 1.5,
      invalidateOnRefresh: true
    }
  });

  cards.forEach((card, i) => {
    tl.to(card, {
      y: 0,
      x: 0,
      duration: 1,
      ease: 'power1.inOut',
      onStart: () => {
        card.style.willChange = 'transform, opacity';
      },
      // ВЫКЛЮЧАЕМ, когда анимация закончилась, чтобы освободить память GPU
      onComplete: () => {
        card.style.willChange = 'auto';
      }
    });
    if (cards[i - 1]) {
      const isVertical = card.classList.contains('horisontal__screen--1');
      tl.to(
        cards[i - 1],
        {
          opacity: isVertical ? 0 : 1,
          x: isVertical ? 0 : '-100%',
          force3D: true, // Критично для плавности уходящей карты
          force3D: true,
          duration: 0.8,
          ease: 'power1.out'
        },
        '-=0.8', // Синхронизируем чуть точнее
        ''
      );
    }
  });
}

export default horisontalNew;
