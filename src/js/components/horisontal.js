import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

// function horisontal() {
//   const section = document.querySelector('.horisontal');
//   if (!section) return;

//   const isMobile = window.innerWidth < 768;

//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
//   gsap.ticker.lagSmoothing(1000, 16);

//   const rows = section.querySelectorAll('.horisontal__row');
//   const links = section.querySelectorAll('.horisontal__nav-link');
//   const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
//   let navSwiper;

//   rows.forEach((row, num) => {
//     row.id = `row${num}`;

//     const innerSectionCount = row.querySelectorAll('.horisontal__screen').length;
//     const innerWrapp = row.querySelector('.horisontal__screen-wrapp');

//     const calculatedHeight = isMobile ? `${innerSectionCount * 300}vw` : `${innerSectionCount * 150}vw`;

//     // innerWrapp.style.width = `${innerSectionCount * 100}vw`;
//     row.style.height = calculatedHeight;

//     let animTimeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: row,
//         start: 'top 10px',
//         end: 'bottom bottom',
//         scrub: true,
//         onEnter: () => {
//           setActiveLink(num);
//         },
//         onEnterBack: () => {
//           setActiveLink(num);
//         }
//       }
//     });

//     animTimeline
//       .to(
//         innerWrapp,
//         {
//           xPercent: `-${100 - 100 / innerSectionCount}`,
//           duration: 0.8
//         },
//         '<'
//       )
//       .to(innerWrapp, {
//         opacity: num === rows.length - 1 ? 1 : 0,
//         duration: 0.2
//       });
//   });

//   links.forEach((link, i) => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       lenis.scrollTo(`#row${i}`, {
//         offset: 0,
//         immediate: true
//       });
//     });
//   });

//   navSwiper = new Swiper(navSwiperEl, {
//     slidesPerView: 'auto',
//     spaceBetween: rem(0.8),
//     breakpoints: {
//       768: {
//         spaceBetween: rem(3.2)
//       }
//     }
//   });

//   function setActiveLink(num) {
//     links.forEach((innerLink) => innerLink.classList.remove('isActive'));
//     links[num].classList.add('isActive');
//     if (navSwiper) navSwiper.slideTo(num);
//   }
// }

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const isMobile = window.innerWidth < 768;
  const calculatedHeight = isMobile ? `1600px` : `2000px`;


  const cards = section.querySelectorAll('.horisontal__card');
  const brandCards = Array.from(cards).filter((card) => card.querySelector('.horisontal__screen--1'));

  const links = section.querySelectorAll('.horisontal__nav-link');
  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
  let navSwiper;

  cards.forEach((card, num) => {
    card.style.height = calculatedHeight;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: card,
          start: '50% 80%',
          end: 'bottom bottom',
          scrub: true
        }
      })
      .to(card, {
        opacity: num === cards.length - 1 ? 1 : 0,
        duration: 0.8
      });

    if (card.querySelector('.horisontal__screen--1')) {
      const brandIndex = brandCards.indexOf(card);

      card.id = `card${brandIndex}`;

      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: true,
        onEnter: () => setActiveLink(brandIndex),
        onLeaveBack: () => {
          if (brandIndex > 0) {
            setActiveLink(brandIndex - 1);
          }
        }
      });
    }
  });

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(`#card${i}`, {
        offset: 0,
        immediate: true
      });
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

  function setActiveLink(num) {
    links.forEach((innerLink) => innerLink.classList.remove('isActive'));
    links[num].classList.add('isActive');
    if (navSwiper) navSwiper.slideTo(num);
  }
}

// function horisontal() {
//   const section = document.querySelector('.horisontal');
//   if (!section) return;

//   const isMobile = window.innerWidth < 768;
//   let isScrollingByClick = false;

//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//   const rows = section.querySelectorAll('.horisontal__row');
//   const links = section.querySelectorAll('.horisontal__nav-link');
//   const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
//   let navSwiper;

//   links.forEach((link, i) => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();

//       isScrollingByClick = true;

//       lenis.scrollTo(`#row${i}`, {
//         offset: 0,
//         immediate: true,
//         onComplete: () => {
//           setTimeout(() => {
//             isScrollingByClick = false;
//           }, 50);
//         }
//       });
//     });
//   });

//   navSwiper = new Swiper(navSwiperEl, {
//     slidesPerView: 'auto',
//     spaceBetween: rem(0.8),
//     breakpoints: {
//       768: {
//         spaceBetween: rem(3.2)
//       }
//     }
//   });

//   rows.forEach((row, num) => {
//     row.id = `row${num}`;
//     const innerWrapp = row.querySelector('.horisontal__screen-wrapp');
//     const screens = row.querySelectorAll('.horisontal__screen');
//     const count = screens.length;

//     const calculatedHeight = isMobile ? `${count * 400}vw` : `${count * 150}vw`;
//     row.style.height = calculatedHeight;

//     let currentX = 0;
//     let targetX = 0;
//     const maxDistance = (count - 1) * window.innerWidth;

//     let currentOpacity = 1;
//     let targetOpacity = 1;

//     function update() {
//       if (isScrollingByClick) return;

//       currentX += (targetX - currentX) * 0.1;
//       currentOpacity += (targetOpacity - currentOpacity) * 0.1;

//       innerWrapp.style.transform = `translate3d(${-currentX}px, 0, 0)`;
//       if (num !== rows.length - 1) {
//         innerWrapp.style.opacity = currentOpacity;
//       }

//       if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetOpacity - currentOpacity) > 0.01) {
//         requestAnimationFrame(update);
//       }
//     }

//     ScrollTrigger.create({
//       trigger: row,
//       start: 'top 10px',
//       end: 'bottom bottom',
//       onUpdate: (self) => {
//         const moveProgress = Math.min(self.progress / 0.9, 1);
//         targetX = moveProgress * maxDistance;

//         if (num !== rows.length - 1) {
//           targetOpacity = self.progress > 0.9 ? (1 - self.progress) * 10 : 1;
//           targetOpacity = Math.max(0, Math.min(1, targetOpacity));
//         }

//         if (isScrollingByClick) {
//           currentX = targetX;
//           currentOpacity = targetOpacity;
//           innerWrapp.style.transform = `translate3d(${-targetX}px, 0, 0)`;
//           if (num !== rows.length - 1) innerWrapp.style.opacity = targetOpacity;
//         } else {
//           requestAnimationFrame(update);
//         }

//         if (self.isActive) setActiveLink(num);
//       }
//     });
//   });

//   function setActiveLink(num) {
//     links.forEach((innerLink) => innerLink.classList.remove('isActive'));
//     links[num].classList.add('isActive');
//     if (navSwiper) navSwiper.slideTo(num);
//   }
// }

export default horisontal;
