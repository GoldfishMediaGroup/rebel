import Swiper from 'swiper/bundle';

function benefits() {
  const section = document.querySelector('.benefits');

  if (!section) return;

  const swiper = new Swiper('.benefits__swiper', {
    slidesPerView: 1,    speed: 800,
    grid: {
      rows: 2
    },
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        spaceBetween: 0,

        grid: {
          rows: 2
        }
      }
    }
  });
}

export default benefits;
