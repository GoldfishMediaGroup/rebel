import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
function vacancies() {
  const section = document.querySelector('.vacancies');
  const swiperEl = document.querySelector('.vacancies__swiper');

  let swiper;
  let isMobile = window.innerWidth < 769; // текущий флаг

  function initSwiper() {
    const currentMobile = window.innerWidth < 769;

    // если состояние не поменялось — не пересоздаём
    if (currentMobile === isMobile && swiper) return;

    isMobile = currentMobile;

    if (swiper) swiper.destroy(true, true); // уничтожаем старый свайпер

    swiper = new Swiper(swiperEl, {
      slidesPerView: currentMobile ? 1 : 2,
      spaceBetween: currentMobile ? 0 : rem(4),
      speed: 800,
      grabCursor: true,
      grid: currentMobile ? { rows: 2 } : {},
      loop: true,
      pagination: {
        el: section.querySelector('.vacancies__fraction')
      },
      navigation: {
        prevEl: section.querySelector('.swiper-button-prev'),
        nextEl: section.querySelector('.swiper-button-next')
      },
      breakpoints: {
        769: {
          pagination: {
            el: section.querySelector('.vacancies__fraction'),
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

  // инициализация
  initSwiper();

  // обновление при ресайзе
  window.addEventListener('resize', initSwiper);
}

export default vacancies;
