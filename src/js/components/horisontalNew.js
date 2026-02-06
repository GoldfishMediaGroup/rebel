import { gsap, ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

function horisontalNew() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const links = section.querySelectorAll('.horisontal__nav-link');
  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
  const nextBtn = section.querySelector('.horisontal__next-btn');
  const mainSwiperEl = section.querySelector('.horisontal__swiper-main');
  const subSwiperEls = section.querySelectorAll('.horisontal__swiper');

  const navSwiper = new Swiper(navSwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    breakpoints: {
      768: { spaceBetween: rem(3.2) }
    }
  });

  const mainSwiper = new Swiper(mainSwiperEl, {
    allowTouchMove: false,
    speed: 800,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    on: {
      slideChange: function () {
        const activeIndex = this.activeIndex;
        links.forEach((link, i) => {
          link.classList.toggle('isActive', i === activeIndex);
        });
        if (navSwiper) navSwiper.slideTo(activeIndex);
      }
    }
  });

  const subSwipers = [];
  let totalHorizontalSlides = 0;

  subSwiperEls.forEach((el) => {
    const slides = el.querySelectorAll('.horisontal__screen');
    const instance = new Swiper(el, {
      speed: 800,
      allowTouchMove: false,
      mousewheel: false
    });

    subSwipers.push({
      instance: instance,
      count: slides.length,
      startAt: totalHorizontalSlides,
      endAt: totalHorizontalSlides + slides.length
    });

    totalHorizontalSlides += slides.length;
  });

  const vhPerSlide = 150;
  section.style.height = `${totalHorizontalSlides * vhPerSlide}vh`;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const currentGlobalSlide = progress * (totalHorizontalSlides - 0.01);

      subSwipers.forEach((brand, index) => {
        if (currentGlobalSlide >= brand.startAt && currentGlobalSlide < brand.endAt) {
          
          if (mainSwiper.activeIndex !== index) {
            mainSwiper.slideTo(index);
          }

          const localProgress = (currentGlobalSlide - brand.startAt) / brand.count;
          const targetIndex = Math.floor(localProgress * brand.count);

          if (brand.instance.activeIndex !== targetIndex) {
            brand.instance.slideTo(targetIndex);
          }
        }
      });
    }
  });

  function scrollToBrand(num) {
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const brandStart = subSwipers[num].startAt;
    const progress = brandStart / (totalHorizontalSlides - 1);

    window.scrollTo({
      top: section.offsetTop + (progress * scrollableHeight),
      behavior: 'smooth'
    });
  }

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToBrand(i);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = mainSwiper.activeIndex + 1;
      if (nextIdx < subSwipers.length) {
        scrollToBrand(nextIdx);
      }
    });
  }
}

export default horisontalNew;
