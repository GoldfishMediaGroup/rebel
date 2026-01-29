import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

function horisontalNew() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const cards = gsap.utils.toArray('.horisontal__screen');

  const swiper = new Swiper('.horisontal__swiper', {
    speed: 1000,
    slidesPerView: 1,
    grabCursor: true,
    // mousewheel: false, // ВАЖНО: выключаем, теперь рулит ScrollTrigger
    // keyboard: true
  });

//   const animTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: section,
//       start: 'top top',
//       pin: true,
//       // Увеличиваем end, чтобы на каждый слайд приходилось достаточно "пути" скролла
//       end: () => `+=${cards.length * 150}%`,
//       scrub: true,
//       anticipatePin: 1,
//       invalidateOnRefresh: true,
//       snap: {
//         snapTo: 1 / (cards.length - 1),
//         duration: { min: 0.2, max: 0.5 },
//         delay: 0,
//         ease: 'power1.inOut'
//       },
//       onUpdate: (self) => {
//         // Вычисляем, какой слайд должен быть активен исходя из прогресса (0...1)
//         const progress = self.progress;
//         const totalSlides = cards.length - 1;
//         const targetIndex = Math.round(progress * totalSlides);

//         // Переключаем Swiper только если индекс реально изменился
//         if (swiper.activeIndex !== targetIndex) {
//           swiper.slideTo(targetIndex);
//         }
//       }
//     }
//   });
}

export default horisontalNew;