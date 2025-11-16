import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function brandsGallery () {
  const section = document.querySelector('.brands-gallery');

  if (!section) return;

  const swiper = new Swiper('.brands-gallery__swiper', {
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
    breakpoints: {
      768: {
        slidesPerView: 'auto'
      }
    }
  });
};

export default brandsGallery;
