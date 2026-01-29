import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

// function horisontalNew() {
//   const section = document.querySelector('.horisontal');
//   if (!section) return;

//   const cards = gsap.utils.toArray('.horisontal__screen');

//   const swiper = new Swiper('.horisontal__swiper', {
//     speed: 1000,
//     slidesPerView: 1,
//     grabCursor: true,
//     // mousewheel: false, // ВАЖНО: выключаем, теперь рулит ScrollTrigger
//     // keyboard: true
//   });

// //   const animTimeline = gsap.timeline({
// //     scrollTrigger: {
// //       trigger: section,
// //       start: 'top top',
// //       pin: true,
// //       // Увеличиваем end, чтобы на каждый слайд приходилось достаточно "пути" скролла
// //       end: () => `+=${cards.length * 150}%`,
// //       scrub: true,
// //       anticipatePin: 1,
// //       invalidateOnRefresh: true,
// //       snap: {
// //         snapTo: 1 / (cards.length - 1),
// //         duration: { min: 0.2, max: 0.5 },
// //         delay: 0,
// //         ease: 'power1.inOut'
// //       },
// //       onUpdate: (self) => {
// //         // Вычисляем, какой слайд должен быть активен исходя из прогресса (0...1)
// //         const progress = self.progress;
// //         const totalSlides = cards.length - 1;
// //         const targetIndex = Math.round(progress * totalSlides);

// //         // Переключаем Swiper только если индекс реально изменился
// //         if (swiper.activeIndex !== targetIndex) {
// //           swiper.slideTo(targetIndex);
// //         }
// //       }
// //     }
// //   });
// }
function horisontalNew() {
  const section = document.querySelector('.horisontal');
  const swiperEl = document.querySelector('.horisontal__swiper');

  if (section && swiperEl) {
    const slides = swiperEl.querySelectorAll('.horisontal__screen');

    // 1. Инициализируем Swiper
    const swiper = new Swiper('.horisontal__swiper', {
      speed: 800,
      slidesPerView: 1,
      mousewheel: false, // Отключаем, чтобы не было конфликта со скроллом страницы
      allowTouchMove: true
    });

    // 2. Настраиваем высоту контейнера
    // 100vh на каждый слайд. Если 30 слайдов = 3000vh общей высоты.
    const vhPerSlide = 100;
    section.style.height = `${slides.length * vhPerSlide}vh`;

    // 3. Логика переключения
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const screenHeight = window.innerHeight;

      // Вычисляем, на сколько процентов проскроллена секция (0...1)
      // rect.top отрицательный, когда начало секции выше края экрана
      let progress = -rect.top / (sectionHeight - screenHeight);

      // Ограничиваем прогресс, чтобы не выходить за пределы 0 и 1
      progress = Math.max(0, Math.min(1, progress));

      // Находим индекс текущего слайда
      const totalSlides = slides.length - 1;
      const targetIndex = Math.round(progress * totalSlides);

      // Переключаем Swiper только если индекс реально изменился
      if (swiper.activeIndex !== targetIndex) {
        swiper.slideTo(targetIndex);
      }
    };

    // Слушаем скролл окна
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

export default horisontalNew;
