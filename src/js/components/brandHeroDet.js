import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
function brandHeroDet() {
  const section = document.querySelector('.brand-hero-det');
  if (!section) return;

  const swiper = new Swiper('.brand-hero-det__swiper', {
    slidesPerView: 2,
    spaceBetween: rem(1.6),
    speed: 800,
    loop: true,
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    breakpoints: {
      769: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });
}

export default brandHeroDet;
