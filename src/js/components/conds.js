import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function conds() {
  const section = document.querySelector('.conds');
  if (!section) return;

  const swiper = new Swiper('.conds__swiper', {
    slidesPerView: 2,
    spaceBetween: rem(1.6),
    speed: 800,
    loop: true,
    pagination: {
      el: section.querySelector('.conds__fraction')
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button-prev'),
      nextEl: section.querySelector('.swiper-button-next')
    },
    breakpoints: {
      769: {
        slidesPerView: 4,
        spaceBetween: rem(4),
        pagination: {
          el: section.querySelector('.conds__fraction'),
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
        }
      }
    }
  });
}

export default conds;
