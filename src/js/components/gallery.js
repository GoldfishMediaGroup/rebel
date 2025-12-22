import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function gallery() {
  const section = document.querySelector('.gallery');

  if (!section) return;

  const swiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),
    effect: 'fade',
      allowTouchMove: true,

    fadeEffect: {
      // crossFade: 'fade'
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    breakpoints: {
      768: {
         allowTouchMove: false,
      }
    }
  });

  const swiperThumb = new Swiper('.gallery__swiper-thumb', {
    slidesPerView: 2,   initialSlide: 1,
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),
        allowTouchMove: false,
            navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    breakpoints: {
      // 768: {
      //       slidesPerView: 'auto',
      // }
    }
  });

  // swiperThumb.controller.control = [swiper];
  // swiper.controller.control = [swiperThumb];


}

export default gallery;
