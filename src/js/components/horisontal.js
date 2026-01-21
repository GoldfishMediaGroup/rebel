import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { lenis } from './smoothScroll';

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.ticker.lagSmoothing(1000, 16);

  //фиксация блока со свайпером и кнопкой пропустить
  const nav = section.querySelector('.horisontal__nav');

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => {
      nav.classList.add('is-fixed');
    },
    onLeave: () => {
      nav.classList.remove('is-fixed');
      nav.classList.add('is-bottom');
    },
    onEnterBack: () => {
      nav.classList.add('is-fixed');
      nav.classList.remove('is-bottom');
    },
    onLeaveBack: () => {
      nav.classList.remove('is-fixed');
    }
  });

  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');
  const navSwiper = new Swiper(navSwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    breakpoints: {
      768: {
        spaceBetween: rem(3.2)
      }
    }
  });

  const links = section.querySelectorAll('.horisontal__nav-link');

  const setActiveLink = (index) => {
    links.forEach((link, i) => {
      link.classList.toggle('isActive', i === index);
    });
    if (navSwiper) {
      navSwiper.slideTo(index);
    }
  };

  links.forEach((link, i) => {
    link.href = `#row${i}`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach((innerLink) => innerLink.classList.remove('isActive'));
      link.classList.add('isActive');

      if (navSwiper) navSwiper.slideTo(i);

      const targetId = link.getAttribute('href');

      lenis.scrollTo(targetId, {
        offset: 0,
        immediate: true
      });
    });
  });

  const rows = section.querySelectorAll('.horisontal__row');

  rows.forEach((row, num) => {
    const innerSectionCount = row.querySelectorAll('.horisontal__screen').length;
    row.style.width = `${innerSectionCount * 100}vw`;

    const inner = row.querySelector('.horisontal__row-inner');

    const spacer = document.createElement('div');
    spacer.id = `row${num}`;
    spacer.classList.add('vertical-spacer');
    spacer.style.minHeight = `${innerSectionCount}00vh`;
    spacer.style.height = `${innerSectionCount}00vh`;
    row.after(spacer);

    let animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top top',
        pin: true,
        end: num === rows.length - 1 ? `+=${(innerSectionCount - 1) * 100}%` : `+=${(innerSectionCount - 0.1) * 100}%`,
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
        inner,
        {
          x: `-${100 - 100 / innerSectionCount}%`,
          duration: 0.8
        },
        '<'
      )
      .to(inner, {
        opacity: num === rows.length - 1 ? 1 : 0,
        duration: 0.2
      });
  });
}

export default horisontal;
