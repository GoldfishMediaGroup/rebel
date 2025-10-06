import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const rows = section.querySelectorAll('.horisontal__row');
  const screens = section.querySelectorAll('.horisontal__screen');
  const totalWidth = window.innerWidth > 768 ? (screens.length - 1) * 1400 : screens.length * 600;

  const navSwiper = section.querySelector('.horisontal__nav-swiper');
  const links = section.querySelectorAll('.horisontal__nav-link');

  rows.forEach((row, index) => {
    const innerScreens = row.querySelectorAll('.horisontal__screen');
    innerScreens.forEach((screen, index) => {
      if (index === 0) {
        gsap.set(screen, { x: 0 });
      } else {
        gsap.set(screen, { x: '+=111%' });
      }
    });
    if (index === 0) {
      gsap.set(row, { y: 0 });
    } else {
      gsap.set(row, { y: '+=150%' });
    }
  });

  const swiper = new Swiper(navSwiper, {
    slidesPerView: 'auto',
    spaceBetween: rem(3.2)
    // freeMode: true,
  });

  let animTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      pin: true,
      end: `+=${totalWidth}`,
      scrub: true,
      pin: true,
      pinSpacer: true,
      invalidateOnRefresh: true,
      anticipatePin: 0,
      pinType: 'fixed',
      immediatelyRender: true,
      onUpdate: (self) => {
        const time = animTimeline.time();
        let activeRowIndex = 0;
        for (let i = rows.length - 1; i >= 0; i--) {
          const startTime = animTimeline.labels[`row${i}Start`];
          if (time >= startTime - 1) {
            activeRowIndex = i;
            break;
          }
        }

        links.forEach((innerLink, index) => {
          innerLink.classList.toggle('isActive', index === activeRowIndex);
        });

        swiper.slideTo(activeRowIndex);
      }
    }
  });

  rows.forEach((row, rowIndex) => {
    animTimeline.addLabel(`row${rowIndex}Start`);
    const innerScreens = row.querySelectorAll('.horisontal__screen');

    //         links[i]?.classList.add('isActive');
    // Показываем текущий ряд (если не первый)
    if (rowIndex > 0) {
      animTimeline.to(
        row,
        {
          opacity: 1,
          y: 0,
          duration: 1
        },
        '<'
      );
    }

    for (let i = 0; i < innerScreens.length - 1; i++) {
      const currentScreen = innerScreens[i];
      const nextScreen = innerScreens[i + 1];

      animTimeline.to(
        currentScreen,
        {
          x: '-111%',
          duration: 2
        },
        '>'
      );
      animTimeline.to(
        nextScreen,
        {
          x: '0',
          duration: 2
        },
        '<'
      );
    }

    if (rowIndex < rows.length - 1) {
      animTimeline.to(
        row,
        {
          y: '0',
          opacity: 0,
          duration: 1
        },
        '>'
      );
    }
    animTimeline.addLabel(`row${rowIndex}End`);
  });

  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      links.forEach((innerLink) => innerLink.classList.remove('isActive'));
      link.classList.add('isActive');

      const label = `row${index}Start`;
      const scrollTrigger = animTimeline.scrollTrigger;

      const scrollPos =
        scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * (animTimeline.labels[label] / animTimeline.duration());

      gsap.to(window, {
        scrollTo: { y: scrollPos, autoKill: false },
        duration: 1,
        ease: 'power2.inOut'
      });

    });
  });
}

export default horisontal;
