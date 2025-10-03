import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const rows = section.querySelectorAll('.horisontal__row');
  const links = section.querySelectorAll('.horisontal__nav-link');
  const nav = section.querySelector('.horisontal__nav');
  const nextBtn = section.querySelector('.horisontal__next-btn');

  const navSwiper = section.querySelector('.horisontal__nav-swiper');

  const swiper = new Swiper(navSwiper, {
    slidesPerView: 'auto',
    spaceBetween: rem(3.2)
    // freeMode: true,
  });

  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      links.forEach((l) => l.classList.remove('isActive'));
      link.classList.add('isActive');
      swiper.slideTo(index);
    });
  });

  rows.forEach((row, i) => {
    const totalScriins = Array.from(row.querySelectorAll('.horisontal__screen')).length;
    const totalWidth = totalScriins * window.innerWidth;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: row,
        start: 'top top',
        end: () => {
          const base = row.offsetWidth;
          return `+=${window.innerWidth > 768 ? base - window.innerWidth : base * 2}`;
        },

        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true,
        onEnter: () => {
          if (i > 0) rows[i - 1].classList.add('isOpacity');
          links.forEach((l) => l.classList.remove('isActive'));
          links[i]?.classList.add('isActive');
          swiper.slideTo(i);
        },
        onEnterBack: () => {
          links.forEach((l) => l.classList.remove('isActive'));
          links[i]?.classList.add('isActive');
          swiper.slideTo(i);
          if (i === rows.length - 1) {
            rows.forEach((r, idx) => {
              if (idx !== rows.length - 1) r.classList.add('isFixed');
            });
          } else {
            row.classList.remove('isFixed');
          }
        },

        onLeave: () => {
          if (i !== rows.length - 1) {
            row.classList.add('isFixed');
            row.style.transform = `translateX(-${100 - 100 / totalScriins}%) translateY(0px)`;
          } else {
            rows.forEach((r) => r.classList.remove('isFixed'));
          }
        },
        onLeaveBack: () => {
          if (i > 0) rows[i - 1].classList.remove('isOpacity');
        }
      }
    });

    for (let j = 0; j < totalScriins; j++) {
      const currentX = (100 / totalScriins) * j;

      if (j === 0) {
        // Только opacity для первого экрана
        tl.to(row, {
          opacity: 1,
          duration: window.innerWidth > 768 ? 0.1 : 0.4
        });
      } else {
        // Сначала opacity, потом перемещение
        tl.to(row, {
          x: () => `-${currentX}%`
        }).to(row, {
          opacity: 1,
          duration: window.innerWidth > 768 ? 0.1 : 0.4
        });
      }
    }
  });

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => {
        nav && nav.classList.add('isFixed');
        nextBtn && nextBtn.classList.add('isFixed');
      },
      onLeave: () => {
        nav && nav.classList.remove('isFixed');
        nav && nav.classList.add('isLeave');
        nextBtn && nextBtn.classList.remove('isFixed');
        nextBtn && nextBtn.classList.add('isLeave');
      },
      onLeaveBack: () => {
        nav && nav.classList.remove('isFixed');
        nextBtn && nextBtn.classList.remove('isFixed');
        rows.forEach((row) => {
          row.classList.remove('isFixed');
        });
      },
      onEnterBack: () => {
        nav && nav.classList.add('isFixed');
        nav && nav.classList.remove('isLeave');
        nextBtn && nextBtn.classList.add('isFixed');
        nextBtn && nextBtn.classList.remove('isLeave');
      }
    }
  });

  // window.addEventListener('resize', () => {
  //   ScrollTrigger.refresh();
  // });

  window.addEventListener('load', () => {
    setTimeout(() => {
      rows.forEach((row, i) => {
        const totalScriins = Array.from(row.querySelectorAll('.horisontal__screen')).length;
        if (row.classList.contains('isFixed')) {
          row.style.transform = `translateX(-${100 - 100 / totalScriins}%) translateY(0px)`;
        }
      });
    }, 500);
  });
}

export default horisontal;
