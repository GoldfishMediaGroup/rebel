import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
function aboutHero() {
  const section = document.querySelector('.about-hero');

  if (!section) return;

  const bgSwiper = new Swiper('.about-hero__bg-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    pagination: {
      el: section.querySelector('.about-hero__fraction'),
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        const formattedCurrent = String(current).padStart(2, '0');
        const formattedTotal = String(total).padStart(2, '0');
        return `
      <span class="swiper-pagination-current">${formattedCurrent}</span>
      / 
      <span class="swiper-pagination-total">${formattedTotal}</span>
    `;
      }
    },
    on: {
      slideChangeTransitionEnd() {
        ScrollTrigger.refresh();
      }
    }
  });
  const titleSwiper = new Swiper('.about-hero__title-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false
  });

  const textSwiper = new Swiper('.about-hero__text-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false
  });
  const previewSwiper = new Swiper('.about-hero__preview-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    initialSlide: 1,
    fadeEffect: {
      crossFade: true
    },
        autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    loop: true,
    allowTouchMove: false,
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    }
  });

  bgSwiper.controller.control = [titleSwiper, textSwiper];
}

export default aboutHero;
