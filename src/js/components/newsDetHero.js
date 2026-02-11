import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function newsDetHero() {
  const section = document.querySelector('.news-det-hero');


  const swiper = new Swiper('.news-det-hero__swiper', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
            spaceBetween: rem(2.8),
      }
    }
  });

  const slides = document.querySelectorAll('.news-det-hero__slide');
  slides.forEach((item) => item.classList.add('isTransition'));


  
}

export default newsDetHero;
