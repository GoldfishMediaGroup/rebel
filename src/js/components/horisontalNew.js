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

//   });

//   const animTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: section,
//       start: 'top top',
//       pin: true,
//       end: () => `+=${cards.length * 100}%`,
//       scrub: true,
//       anticipatePin: 1,
//       invalidateOnRefresh: true,
//       snap: {
//         snapTo: 1 / (cards.length - 1), // Математически делит скролл на равные части по слайдам
//         duration: 0.5,
//         delay: 0.1,
//         ease: 'power1.inOut'
//       },
//       onUpdate: (self) => {
//         swiper.setProgress(self.progress);
//       }
//     }
//   });
// }

// function horisontalNew() {
//   const section = document.querySelector('.horisontal');
//   const swiperEls = document.querySelectorAll('.horisontal__swiper');

//   swiperEls.forEach((swiperEl) => {
//     if (section && swiperEl) {
//       const slides = swiperEl.querySelectorAll('.horisontal__screen');

//       // 1. Инициализируем Swiper
//       const swiper = new Swiper(swiperEl, {
//         speed: 800,
//         slidesPerView: 1,
//         mousewheel: false, // Отключаем, чтобы не было конфликта со скроллом страницы
//         allowTouchMove: true
//       });

//       // 2. Настраиваем высоту контейнера
//       // 100vh на каждый слайд. Если 30 слайдов = 3000vh общей высоты.
//       const vhPerSlide = 150;
//       swiperEl.parentElement.style.height = `${slides.length * vhPerSlide}vh`;

//       // 3. Логика переключения
//       const handleScroll = () => {
//         const rect = swiperEl.parentElement.getBoundingClientRect();
//         const sectionHeight = swiperEl.parentElement.offsetHeight;
//         const screenHeight = window.innerHeight;

//         // Вычисляем, на сколько процентов проскроллена секция (0...1)
//         // rect.top отрицательный, когда начало секции выше края экрана
//         let progress = -rect.top / (sectionHeight - screenHeight - screenHeight / 2);

//         // Ограничиваем прогресс, чтобы не выходить за пределы 0 и 1
//         progress = Math.max(0, Math.min(1, progress));

//         // Находим индекс текущего слайда
//         const totalSlides = slides.length - 1;
//         const targetIndex = Math.round(progress * totalSlides);

//         // Переключаем Swiper только если индекс реально изменился
//         if (swiper.activeIndex !== targetIndex) {
//           swiper.slideTo(targetIndex);
//         }
//       };

//       // Слушаем скролл окна
//       window.addEventListener('scroll', handleScroll, { passive: true });
//     }
//   });
// }

function horisontalNew() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const links = section.querySelectorAll('.horisontal__nav-link');
  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
  let navSwiper;

  const nextBtn = section.querySelector('.horisontal__next-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = mainSwiper.activeIndex + 1;
      mainSwiper.slideTo(nextIdx, 0);
      subSwipers.forEach((brand) => {
        brand.instance.slideTo(brand.count - 1, 0);
      });
    });
  }

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveLink(i);
    });
  });

  navSwiper = new Swiper(navSwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    breakpoints: {
      768: {
        spaceBetween: rem(3.2)
      }
    }
  });

  const mainSwiper = new Swiper('.horisontal__swiper-main', {
    allowTouchMove: false,
    speed: 800,
    // effect: 'creative',
    // creativeEffect: {
    //   limitProgress: 2,
    //   prev: {
    //     translate: [0, '0', 0], // Немного смещаем вверх и вглубь
    //     opacity: 0 // Полностью исчезает
    //   },
    //   next: {
    //     translate: [0, '100%', 0], // Начинает снизу
    //     opacity: 1 // Изначально виден (или можно поставить 0 для fade-in)
    //   }
    // },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    on: {
      slideChange: function () {
        const activeIndex = this.activeIndex;
        links.forEach((link) => link.classList.remove('isActive'));
        if (links[activeIndex]) {
          links[activeIndex].classList.add('isActive');
        }
        const navSwiperEl = document.querySelector('.horisontal__nav-swiper');
        if (navSwiperEl && navSwiperEl.swiper) {
          navSwiperEl.swiper.slideTo(activeIndex);
        }
      }
    }
  });

  const subSwipers = [];
  let totalHorizontalSlides = 0;

  const subSwiperEls = section.querySelectorAll('.horisontal__swiper');

  subSwiperEls.forEach((el, index) => {
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

  const vhPerSlide = 200;
  section.style.height = `${totalHorizontalSlides * vhPerSlide}vh`;

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const screenHeight = window.innerHeight;

    if (rect.top > 0 || rect.bottom < screenHeight) return;

    let progress = -rect.top / (sectionHeight - screenHeight);
    progress = Math.max(0, Math.min(1, progress));

    const currentGlobalSlide = progress * totalHorizontalSlides;

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
  };

  //   function setActiveLink(index) {
  //     scrollToBrand(index);
  //   }
  //   function scrollToBrand(num) {
  //     const sectionHeight = section.offsetHeight;
  //     const screenHeight = window.innerHeight;
  //     const scrollableHeight = sectionHeight - screenHeight;
  //     const brandStart = subSwipers[num].startAt;
  //     const progress = brandStart / (totalHorizontalSlides - 1);
  //     const targetScroll = section.offsetTop + progress * scrollableHeight;
  //     window.scrollTo({
  //       top: targetScroll,
  //       behavior: 'instant'
  //     });
  //   }

  function setActiveLink(num) {
    const sectionHeight = section.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrollableHeight = sectionHeight - screenHeight;
    const brandStart = subSwipers[num].startAt;
    const progress = brandStart / (totalHorizontalSlides - 1);
    const targetScroll = section.offsetTop + progress * scrollableHeight;
    window.scrollTo({ top: targetScroll, behavior: 'instant' });
    mainSwiper.slideTo(num, 0);
    subSwipers.forEach((brand, index) => {
       if (index < num) {
        brand.instance.slideTo(brand.count - 1, 0);
      } else {
        brand.instance.slideTo(0, 0);
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
}

export default horisontalNew;
