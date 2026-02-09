import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
function advantages() {
  const section = document.querySelector('.advantages');
  const swiperEl = document.querySelector('.advantages__swiper');

  if (!section) return;

  let swiper;
  let isMobile = window.innerWidth < 769; // текущий флаг

  function initSwiper() {
    const currentMobile = window.innerWidth < 769;

    // если состояние не поменялось — не пересоздаём
    if (currentMobile === isMobile && swiper) return;

    isMobile = currentMobile;

    if (swiper) swiper.destroy(true, true); // уничтожаем старый свайпер

    swiper = new Swiper(swiperEl, {
      slidesPerView: currentMobile ? 1 : 4,
      spaceBetween: currentMobile ? 0 : rem(4),
      speed: 800,
      grabCursor: true,
      grid: currentMobile ? { rows: 2 } : {},
      pagination: {
        el: section.querySelector('.swiper-pagination')
      }
    });
  }

  // инициализация
  initSwiper();

  // обновление при ресайзе
  window.addEventListener('resize', initSwiper);
}

export default advantages;
