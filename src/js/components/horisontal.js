import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const isMobile = window.innerWidth < 768;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.ticker.lagSmoothing(1000, 16);

  const rows = section.querySelectorAll('.horisontal__row');
  const links = section.querySelectorAll('.horisontal__nav-link');
  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
  let navSwiper;

  rows.forEach((row, num) => {
    row.id = `row${num}`;

    const innerSectionCount = row.querySelectorAll('.horisontal__screen').length;
    const innerWrapp = row.querySelector('.horisontal__screen-wrapp');

    const calculatedHeight = isMobile ? `${innerSectionCount * 300}vw` : `${innerSectionCount * 150}vw`;

    // innerWrapp.style.width = `${innerSectionCount * 100}vw`;
    row.style.height = calculatedHeight;

    let animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top 10px',
        end: 'bottom bottom',
        scrub: true,
        onEnter: () => {
          setActiveLink(num);
        },
        onEnterBack: () => {
          setActiveLink(num);
        }
      }
    });

    animTimeline
      .to(
        innerWrapp,
        {
          xPercent: `-${100 - 100 / innerSectionCount}`,
          duration: 0.8
        },
        '<'
      )
      .to(innerWrapp, {
        opacity: num === rows.length - 1 ? 1 : 0,
        duration: 0.2
      });
  });
  
  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(`#row${i}`, {
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

export default horisontal;
