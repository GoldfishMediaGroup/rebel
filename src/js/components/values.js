import Swiper from 'swiper/bundle';

function values() {
  const section = document.querySelector('.values');



  const swiper = new Swiper('.values__swiper', {
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

export default values;
