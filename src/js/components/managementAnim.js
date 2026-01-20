import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';

import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function managementAnim() {
  const section = document.querySelector('.management-anim');

  if (!section) return;

  const swiperBg = new Swiper('.management-anim__bg-swiper', {
    speed: 1000,
    slidesPerView: 1,
    grabCursor: true,
    effect: 'creative',
    allowTouchMove: false,
    creativeEffect: {
      prev: { translate: ['-50%', 0, -50] },
      next: { translate: ['100%', 0, 0] }
    }
  });
  // const swiperContent = new Swiper('.management-anim__content-swiper', {
  //   speed: 2000,
  //   slidesPerView: 1,
  //   grabCursor: true,
  //   allowTouchMove: true,
  //   spaceBetween: rem(2),
  //   pagination: {
  //     el: section.querySelector('.swiper-pagination')
  //   },
  //   effect: 'creative',
  //   creativeEffect: {
  //     prev: { translate: ['-20%', 0, -50] },
  //     next: { translate: ['100%', 0, 0] }
  //   },
  //   breakpoints: {
  //     768: {
  //       spaceBetween: 0,
  //       allowTouchMove: false,
  //       effect: 'creative',
  //       creativeEffect: {
  //         prev: { translate: ['-20%', 0, -50] },
  //         next: { translate: ['100%', 0, 0] }
  //       }
  //     }
  //   }
  // });

  function initSwiper() {
    const isDesktop = window.innerWidth >= 768;

    const swiperConfig = {
      speed: 800,
      slidesPerView: 1,
      grabCursor: true,
      allowTouchMove: !isDesktop, // разрешаем touch только на мобилке
      spaceBetween: isDesktop ? 0 : rem(2),
      pagination: {
        el: section.querySelector('.swiper-pagination')
      },
    };

    // Добавляем эффекты только для десктопа
    if (isDesktop) {
      swiperConfig.effect = 'creative';
      swiperConfig.creativeEffect = {
        prev: { translate: ['-20%', 0, -50] },
        next: { translate: ['100%', 0, 0] }
      };
      swiperConfig.speed = 1000;

    }

    return new Swiper('.management-anim__content-swiper', swiperConfig);
  }

  let swiperContent = initSwiper();

  // // Переинициализация при ресайзе
  // window.addEventListener('resize', function () {
  //   const isDesktop = window.innerWidth >= 768;
  //   const currentIsDesktop = swiperContent.params.allowTouchMove === false;

  //   // Пересоздаем Swiper только если изменился тип устройства
  //   if (isDesktop !== currentIsDesktop) {
  //     swiperContent.destroy(true, true);
  //     swiperContent = initSwiper();
  //   }
  // });

  

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        pin: true,
        end: swiperContent.slides.length * 2500,
        scrub: true,
        pinSpacer: true,
        invalidateOnRefresh: true,
        anticipatePin: 0,
        pinType: 'fixed',
        immediatelyRender: true,
        onUpdate: (self) => {
          const slides = swiperContent.slides.length - 1;
          const slideIndex = Math.round(slides * self.progress);
          swiperBg.slideTo(slideIndex);
          swiperContent.slideTo(slideIndex);
        }
      }
    });
  });
}

// function managementAnim() {
//   const section = document.querySelector('.management-anim');
//   if (!section) return;

//   let swiperBgInstances = null;
//   let swiperContentInstance = null;
//   let animTimeline = null;
//   let isDesktop = window.innerWidth >= 769; // флаг текущего состояния

//   const swiperBgEl = section.querySelector('.management-anim__bg-swiper');
//   const swiperContentEl = section.querySelector('.management-anim__content-swiper');

//   function initSwipers() {
//     const currentDesktop = window.innerWidth >= 769;

//     // если состояние не поменялось — пересоздавать не нужно
//     if (currentDesktop === isDesktop && swiperContentInstance) return;
//     isDesktop = currentDesktop;

//     // Удаляем старые инстансы
//     if (swiperBgInstances) {
//       swiperBgInstances.destroy(true, true);
//       swiperBgInstances = null;
//     }
//     if (swiperContentInstance) {
//       swiperContentInstance.destroy(true, true);
//       swiperContentInstance = null;
//     }

//     if (!currentDesktop) return; // на мобилке не создаём

//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//     swiperBgInstances = new Swiper(swiperBgEl, {
//       speed: 800,
//       slidesPerView: 1,
//       grabCursor: true,
//       effect: 'creative',
//       allowTouchMove: false,
//       creativeEffect: {
//         prev: { translate: ['-20%', 0, -50] },
//         next: { translate: ['100%', 0, 0] }
//       }
//     });

//     swiperContentInstance = new Swiper(swiperContentEl, {
//       speed: 800,
//       slidesPerView: 1,
//       grabCursor: true,
//       effect: 'creative',
//       allowTouchMove: false,
//       spaceBetween: rem(2),
//       creativeEffect: {
//         prev: { translate: ['-20%', 0, -50] },
//         next: { translate: ['100%', 0, 0] }
//       }
//     });

//     initScrollTrigger();
//   }

//   function initScrollTrigger() {
//     if (animTimeline) {
//       animTimeline.scrollTrigger.kill();
//       animTimeline.kill();
//       animTimeline = null;
//     }

//     animTimeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: 'top top',
//         pin: true,
//         end: swiperContentEl.querySelectorAll('.swiper-slide').length * 1800,
//         scrub: true,
//         pinSpacer: true,
//         invalidateOnRefresh: true,
//         anticipatePin: 0,
//         pinType: 'fixed',
//         immediatelyRender: true,
//         onRefresh: (self) => {
//           if (window.innerWidth < 769) self.disable();
//           else self.enable();
//         },
//         onUpdate: (self) => {
//           if (window.innerWidth < 769) return;
//           const slides = swiperContentEl.querySelectorAll('.swiper-slide').length - 1;
//           const slideIndex = Math.round(slides * self.progress);
//           if (swiperBgInstances && !swiperBgInstances.destroyed && swiperBgInstances.activeIndex !== slideIndex) {
//             swiperBgInstances.slideTo(slideIndex);
//           }
//           if (swiperContentInstance && !swiperContentInstance.destroyed && swiperContentInstance.activeIndex !== slideIndex) {
//             swiperContentInstance.slideTo(slideIndex);
//           }
//         }
//       }
//     });
//   }

//   initSwipers();

//   window.addEventListener('resize', initSwipers); // пересоздание только при смене десктоп/мобил
// }

export default managementAnim;
