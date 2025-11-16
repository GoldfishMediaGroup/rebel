import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function gallery  () {
  const section = document.querySelector('.gallery');

  if (!section) return;
  

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
