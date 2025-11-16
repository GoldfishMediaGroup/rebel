import Swiper from 'swiper/bundle';

function hero() {
  const section = document.querySelector('.hero');

  if (!section) return;

  const bgSwiper = new Swiper('.hero__bg-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.hero__bar',
      type: 'progressbar'
    }
  });
  const titleSwiper = new Swiper('.hero__title-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false
  });

  const btnSwiper = new Swiper('.hero__btn-swiper', {
    direction: 'vertical', // вертикальный слайдер
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 10,
    reverseDirection: true,
    loop: true,
    allowTouchMove: false
  });

  const textSwiper = new Swiper('.hero__text-swiper', {
    speed: 800,
    slidesPerView: '1',
    effect: 'fade',    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    allowTouchMove: false
  });
  const numSwiper = new Swiper('.hero__num-swiper', {
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    allowTouchMove: false
  });

  bgSwiper.controller.control = [titleSwiper, btnSwiper, textSwiper, numSwiper];
}

export default hero;
