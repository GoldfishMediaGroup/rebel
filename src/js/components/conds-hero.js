import Swiper from 'swiper/bundle';

function condsHero() {
  const swiperEl = document.querySelector('.conds-hero__vac-swiper');
  if (!swiperEl) return;
  const section = document.querySelector('.conds-hero');

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    speed: 800,
    loop: true,
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    navigation: {
      nextEl: section.querySelector('.conds-hero__vac-next-btn')
    },
    breakpoints: {
      769: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });
}

export default condsHero;
