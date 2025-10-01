import Swiper from 'swiper/bundle';

function cooperations() {
  const section = document.querySelector('.cooperations');

  if (!section) return;

  const swiper = new Swiper('.cooperations__swiper', {
    slidesPerView: 1,
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

export default cooperations;
