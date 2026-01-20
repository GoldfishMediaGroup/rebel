import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

    // Если нужно, чтобы Swiper тоже прокручивался к активному пункту
    if (navSwiper) {
      navSwiper.slideTo(index);
    }
  };
  links.forEach((link, i) => {
    link.href = `#row${i}`;
    link.addEventListener('click', (e) => {
      setTimeout(() => {
        links.forEach((innerLink) => innerLink.classList.remove('isActive'));
        link.classList.add('isActive');
      }, 300);
      //  navSwiper.slideTo(i);
    });
  });

  const rows = section.querySelectorAll('.horisontal__row');

  rows.forEach((row, num) => {
    const innerSectionCount = row.querySelectorAll('.horisontal__screen').length;
    row.style.width = `${innerSectionCount * 100}vw`;

    const inner = row.querySelector('.horisontal__row-inner');
    // добавляем пустые итемы
    for (let i = 0; i < innerSectionCount; i++) {
      const spacer = document.createElement('div');
      spacer.classList.add('vertical-spacer');
      spacer.style.minHeight = '100vh';
      spacer.style.height = '100vh';
      row.after(spacer);
      if (i === innerSectionCount - 1) {
        spacer.id = `row${num}`;
      }
    }

    let animTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top top',
        pin: true,
        end: num === rows.length - 1 ? `+=${(innerSectionCount - 1) * 100}%` : `+=${(innerSectionCount - 0.1) * 100}%`,
        scrub: true,

        onEnter: () => {
          ScrollTrigger.refresh();
          setActiveLink(num);
        },
        onEnterBack: () => {
          ScrollTrigger.refresh();
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

  // const totalWidth = window.innerWidth > 768 ? (screens.length - 1) * 1400 : screens.length * 600;
  // const navSwiper = section.querySelector('.horisontal__nav-swiper');
  // const links = section.querySelectorAll('.horisontal__nav-link');

  // rows.forEach((row, index) => {
  //   const innerScreens = row.querySelectorAll('.horisontal__screen');
  //   innerScreens.forEach((screen, index) => {
  //     if (index === 0) {
  //       gsap.set(screen, { x: 0 });
  //     } else {
  //       gsap.set(screen, { x: '+=111%' });
  //     }
  //   });
  //   if (index === 0) {
  //     gsap.set(row, { y: 0 });
  //   } else {
  //     gsap.set(row, { y: '+=150%' });
  //   }
  // });

  // const swiper = new Swiper(navSwiper, {
  //   slidesPerView: 'auto',
  //   spaceBetween: rem(0.8),
  //   // freeMode: true,
  //   breakpoints: {
  //     768: {
  //           spaceBetween: rem(3.2),
  //     }
  //   }
  // });

  // let animTimeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: section,
  //     start: 'top top',
  //     pin: true,
  //     end: `+=${totalWidth}`,
  //     scrub: true,
  //     pin: true,
  //     pinSpacer: true,
  //     invalidateOnRefresh: true,
  //     anticipatePin: 0,
  //     pinType: 'fixed',
  //     immediatelyRender: true,
  //     onUpdate: (self) => {
  //       const time = animTimeline.time();
  //       let activeRowIndex = 0;
  //       for (let i = rows.length - 1; i >= 0; i--) {
  //         const startTime = animTimeline.labels[`row${i}Start`];
  //         if (time >= startTime - 1) {
  //           activeRowIndex = i;
  //           break;
  //         }
  //       }

  //       links.forEach((innerLink, index) => {
  //         innerLink.classList.toggle('isActive', index === activeRowIndex);
  //       });

  //       swiper.slideTo(activeRowIndex);
  //     }
  //   }
  // });

  // rows.forEach((row, rowIndex) => {
  //   animTimeline.addLabel(`row${rowIndex}Start`);
  //   const innerScreens = row.querySelectorAll('.horisontal__screen');

  //   //         links[i]?.classList.add('isActive');
  //   // Показываем текущий ряд (если не первый)
  //   if (rowIndex > 0) {
  //     animTimeline.to(
  //       row,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1
  //       },
  //       '<'
  //     );
  //   }

  //   for (let i = 0; i < innerScreens.length - 1; i++) {
  //     const currentScreen = innerScreens[i];
  //     const nextScreen = innerScreens[i + 1];

  //     animTimeline.to(
  //       currentScreen,
  //       {
  //         x: '-111%',
  //         duration: 2
  //       },
  //       '>'
  //     );
  //     animTimeline.to(
  //       nextScreen,
  //       {
  //         x: '0',
  //         duration: 2
  //       },
  //       '<'
  //     );
  //   }

  //   if (rowIndex < rows.length - 1) {
  //     animTimeline.to(
  //       row,
  //       {
  //         y: '0',
  //         opacity: 0,
  //         duration: 1
  //       },
  //       '>'
  //     );
  //   }
  //   animTimeline.addLabel(`row${rowIndex}End`);
  // });
}

export default horisontal;
