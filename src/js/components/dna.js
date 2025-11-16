import Swiper from 'swiper/bundle';

function dna() {
  const section = document.querySelector('.dna');

  if (!section) return;

  const swiper = new Swiper('.dna__swiper', {
    speed: 800,
    slidesPerView: '1',
    loop: true,
    allowTouchMove: true,
    spaceBetween: 20,
    autoHeight: true,
    pagination: {
      el: section.querySelector('.swiper-pagination')
    },
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        allowTouchMove: false
      }
    }
  });
}

export default dna;
