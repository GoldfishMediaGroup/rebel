import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

const gallery = () => {
  const section = document.querySelector('.gallery');

  if (!section) return;
  // Инициализация Swiper с автоматической высотой, горизонтальным направлением и одним видимым слайдом за раз

  //   const swiper = new Swiper('.gallery__swiper', {
  //     slidesPerView: 1,
  //     loop: true,
  //     grabCursor: true,
  //     spaceBetween: 20,
  //     speed: 800,
  //     // allowTouchMove: false,

  //     // navigation: {
  //     //     nextEl: '.range__swiper-slide-swiper--1 .range__swiper-button-next',
  //     //     prevEl: '.range__swiper-slide-swiper--1 .range__swiper-button-prev',
  //     // },

  //     breakpoints: {
  //       768: {
  //         slidesPerView: 'auto',
  //         spaceBetween: 40
  //       }
  //     }
  //   });

  const swiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(3.5),
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    breakpoints : {
      768: {
            slidesPerView: 'auto',
      }
    }
  });
};

export default gallery;
