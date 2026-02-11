import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
function newsHero() {
  const section = document.querySelector('.news-hero');

 

  const bgSwiper = new Swiper('.news-hero__bg-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: true,
    autoplay: {
      delay: 60000,
      disableOnInteraction: false
    },
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    breakpoints: {
      768: {
        allowTouchMove: false,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        }
      }
    }
  });
  const newsSwiper = new Swiper('.news-hero__news-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: true,
    breakpoints: {
      768: {
        allowTouchMove: false
      }
    }
  });

  const nextSwiper = new Swiper('.news-hero__next-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    initialSlide: 1,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false,
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
  });

  bgSwiper.controller.control = [newsSwiper];
  newsSwiper.controller.control = [bgSwiper];
}

export default newsHero;
