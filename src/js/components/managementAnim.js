import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';

import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function managementAnim() {
  const section = document.querySelector('.management-anim');



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

  function initSwiper() {
    const isDesktop = window.innerWidth >= 768;

    const swiperConfig = {
      speed: 800,
      slidesPerView: 1,
      grabCursor: true,
      allowTouchMove: !isDesktop,
      spaceBetween: isDesktop ? 0 : rem(2),
      pagination: {
        el: section.querySelector('.swiper-pagination')
      }
    };

    if (isDesktop) {
      swiperConfig.effect = 'creative';
      swiperConfig.creativeEffect = {
        prev: { translate: ['-20%', 0, -50] },
        next: { translate: ['100%', 0, 0] }
      };
      swiperConfig.speed = 1000;
      swiperConfig.pagination = {
        el: section.querySelector('.swiper-pagination'),
        type: 'progressbar'
      };
    }

    return new Swiper('.management-anim__content-swiper', swiperConfig);
  }

  let swiperContent = initSwiper();

  //   gsap.matchMedia().add('(min-width: 768px)', () => {
  //     const animTimeline = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: 'top top',
  //         pin: true,
  //         end: swiperContent.slides.length * 2500,
  //         scrub: true,
  //         pinSpacer: true,
  //         invalidateOnRefresh: true,
  //         anticipatePin: 0,
  //         pinType: 'fixed',
  //         immediatelyRender: true,
  //         onUpdate: (self) => {
  //           const slides = swiperContent.slides.length - 1;
  //           const slideIndex = Math.round(slides * self.progress);
  //           swiperBg.slideTo(slideIndex);
  //           swiperContent.slideTo(slideIndex);
  //         }
  //       }
  //     });
  //   });

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const slidesCount = swiperContent.slides.length;

    const all = section.querySelector('.management-anim__pagination-all');
    const current = section.querySelector('.management-anim__pagination-current');

    all.textContent = String(slidesCount).padStart(2, '0');

    const animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        pin: true,
        end: () => `+=${slidesCount * 250}%`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    for (let i = 0; i < slidesCount; i++) {
      animTimeline
        .to(
          {},
          {
            onStart: () => {
              swiperBg.slideTo(i);
              swiperContent.slideTo(i);
              current.textContent = String(i+1).padStart(2, '0');
            },
            onReverseComplete: () => {
              swiperBg.slideTo(i - 1);
              swiperContent.slideTo(i - 1);
              current.textContent = String(i).padStart(2, '0');
            }
          }
        )
        .to(
          {},
          {
            duration: 1
          }
        );
    }
  });
}

export default managementAnim;
