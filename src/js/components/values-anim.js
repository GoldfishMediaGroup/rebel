import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';

function valuesAnim() {
  const section = document.querySelector('.values-anim');
  if (!section) return;
  const swiperEls = section.querySelectorAll('.values-anim__swiper');
  const imgSwiper = section.querySelector('.values-anim__img-swiper');

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  swiperEls.forEach((swiper) => {
    const sliderContent = new Swiper(swiper, {
      speed: 1000,
      slidesPerView: 1,
      grabCursor: true,
      effect: 'creative',
      allowTouchMove: false,
      creativeEffect: {
        prev: {
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }
    });
  });

  const sliderImg = new Swiper(imgSwiper, {
    speed: 1000,
    slidesPerView: 1,
    grabCursor: true,
    effect: 'creative',
    allowTouchMove: false,
    creativeEffect: {
      prev: {
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    }
  });

  gsap.matchMedia().add('(min-width: 768px)', () => {
    let animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        pin: true,
        end: '+=1500',
        scrub: true,
        pin: true,
        pinSpacer: true,
        invalidateOnRefresh: true,
        anticipatePin: 0,
        pinType: 'fixed',
        immediatelyRender: true,
        onUpdate: (self) => {
          const slides = swiperEls[0].querySelectorAll('.swiper-slide').length;
          const total = slides - 0.5;
          const sectionProgressPerSlide = 1 / total;
          const slideIndex = Math.floor((self.progress + sectionProgressPerSlide / 2) * total);
          swiperEls.forEach((swiperInner) => {
            swiperInner.swiper.slideTo(slideIndex);
          });
          imgSwiper.swiper.slideTo(slideIndex);
        }
      }
    }); 
  });
}

// function valuesAnim() {
//   const section = document.querySelector('.values-anim');
//   if (!section) return;

//   let swiperInstances = [];
//   let imgSwiperInstance = null;
//   let animTimeline = null;
//   let isDesktop = window.innerWidth >= 769; // флаг текущего состояния

//     const swiperEls = section.querySelectorAll('.values-anim__swiper');
//     const imgSwiperEl = section.querySelector('.values-anim__img-swiper');

//   function initSwipers() {
//     const currentDesktop = window.innerWidth >= 769;

//     // если состояние не поменялось — пересоздавать не нужно
//     if (currentDesktop === isDesktop && swiperInstances.length) return;
//     isDesktop = currentDesktop;

//     // Удаляем старые инстансы
//     swiperInstances.forEach((swiper) => swiper.destroy(true, true));
//     swiperInstances = [];
//     if (imgSwiperInstance) {
//       imgSwiperInstance.destroy(true, true);
//       imgSwiperInstance = null;
//     }

//     if (!currentDesktop) return; // на мобилке не создаём

//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//     swiperEls.forEach((swiperEl) => {
//       const swiperInstance = new Swiper(swiperEl, {
//         speed: 800,
//         slidesPerView: 1,
//         grabCursor: true,
//         effect: 'creative',
//         allowTouchMove: false,
//         creativeEffect: {
//           prev: { translate: ['-20%', 0, -1] },
//           next: { translate: ['100%', 0, 0] }
//         }
//       });
//       swiperInstances.push(swiperInstance);
//     });

//     imgSwiperInstance = new Swiper(imgSwiperEl, {
//       speed: 800,
//       slidesPerView: 1,
//       grabCursor: true,
//       effect: 'creative',
//       allowTouchMove: false,
//       creativeEffect: {
//         prev: { translate: ['-20%', 0, -1] },
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
//         end: swiperEls[0].querySelectorAll('.swiper-slide').length * 1500,
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

//           const slides = swiperEls[0].querySelectorAll('.swiper-slide').length-1;
//           const total = slides;
//           const slideIndex = Math.round((slides * self.progress));

//           swiperInstances.forEach((swiperInstance) => {
//             if (swiperInstance && !swiperInstance.destroyed && swiperInstance.activeIndex !== slideIndex) {
//               swiperInstance.slideTo(slideIndex);
//             }
//           });

//           if (imgSwiperInstance && !imgSwiperInstance.destroyed && imgSwiperInstance.activeIndex !== slideIndex) {
//             imgSwiperInstance.slideTo(slideIndex);
//           }
//         }
//       }
//     });
//   }

//   initSwipers();

//   window.addEventListener('resize', initSwipers); // пересоздание только при смене десктоп/мобил
// }

export default valuesAnim;
