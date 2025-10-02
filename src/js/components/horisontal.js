import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';

// function horisontal() {
//   const section = document.querySelector('.horisontal');
//   if (!section) return;

//   gsap.registerPlugin(ScrollTrigger);
//   // document.querySelectorAll('.horisontal__row').forEach((row, i) => {
//   //   const screens = row.querySelectorAll('.horisontal__screen');

//   //   // общая ширина ряда (все экраны подряд)
//   //   const totalWidth = screens.length * window.innerWidth;

//   //   gsap.to(row, {
//   //     x: () => -(totalWidth - window.innerWidth), // пролистываем все экраны в ряд
//   //     onEnter: () => {
//   //       document.querySelectorAll('.horisontal__row').forEach((innerRow, innerI) => {
//   //         console.log('123')
//   //         if (innerI < i) {
//   //           innerRow.style.position = 'fixed';
//   //         }
//   //       });
//   //     },
//   //     ease: 'none',
//   //     scrollTrigger: {
//   //       trigger: row,
//   //       start: 'top top',
//   //       end: () => '+=' + (totalWidth - window.innerWidth), // длина скролла = ширина контента
//   //       scrub: true,
//   //       pin: true, // фиксируем ряд
//   //       anticipatePin: 1,
//   //       markers: false
//   //     }
//   //   });
//   // });

//   const rows = section.querySelectorAll('.horisontal__row');
//   const links = section.querySelectorAll('.horisontal__nav-link');

//   links.forEach((item) => {
//     item.addEventListener('click', () => {
//       links.forEach((item) => item.classList.remove('isActive'));
//       item.classList.add('isActive');
//     });
//   });

//   rows.forEach((row, i) => {
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: row,
//         start: 'top top',
//         end: () => '+=' + (row.offsetWidth - window.innerWidth),
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//         onEnter: (self) => {
//           rows[i - 1] && rows[i - 1].classList.add('isOpacity');
//           links.forEach((item) => item.classList.remove('isActive'));
//           links[i].classList.add('isActive');
//         },
//         onLeaveBack: (self) => {
//           rows[i - 1] && rows[i - 1].classList.remove('isOpacity');
//         },
//         onLeave: (self) => {
//           if (i != rows.length - 1) {
//             row.classList.add('isFixed');
//             const style = getComputedStyle(row);
//             const matrix = new DOMMatrixReadOnly(style.transform); // читаем текущий трансформ
//             row.style.transform = `translateX(${matrix.m41}px) translateY(0px)`;
//           } else {
//             rows.forEach((item) => item.classList.remove('isFixed'));
//           }
//         },
//         onEnterBack: (self) => {
//           links.forEach((item) => item.classList.remove('isActive'));
//           links[i].classList.add('isActive');
//           if (i === rows.length - 1) {
//             rows.forEach((item, i) => {
//               if (i != rows.length - 1) item.classList.add('isFixed');
//             });
//           } else {
//             row.classList.remove('isFixed');
//           }
//         }
//       },
//       defaults: { ease: 'none' }
//     });

//     tl.to(row, {
//       x: () => -(row.offsetWidth - window.innerWidth) // пролистываем все экраны в ряд
//     });
//   });

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '.horisontal',
//       start: 'top top',
//       end: 'bottom bottom',

//       onEnter: (self) => {
//         document.querySelector('.horisontal__nav').classList.add('isFixed');
//       },

//       onLeave: (self) => {
//         document.querySelector('.horisontal__nav').classList.remove('isFixed');
//         document.querySelector('.horisontal__nav').classList.add('isLeave');
//       },

//       onLeaveBack: (self) => {
//         document.querySelector('.horisontal__nav').classList.remove('isFixed');
//       },
//       onEnterBack: (self) => {
//         document.querySelector('.horisontal__nav').classList.add('isFixed');
//         document.querySelector('.horisontal__nav').classList.remove('isLeave');
//       }
//     },
//     defaults: { ease: 'none' }
//   });
// }

function horisontal() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const rows = section.querySelectorAll('.horisontal__row');
  const links = section.querySelectorAll('.horisontal__nav-link');
  const nav = section.querySelector('.horisontal__nav');


  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      links.forEach((l) => l.classList.remove('isActive'));
      link.classList.add('isActive');
    });
  });

  rows.forEach((row, i) => {
    const totalWidth = Array.from(row.querySelectorAll('.horisontal__screen')).length * window.innerWidth;

    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: row,
          start: 'top top',
          end: () => `+=${row.offsetWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onEnter: () => {
            if (i > 0) rows[i - 1].classList.add('isOpacity');
            links.forEach((l) => l.classList.remove('isActive'));
            links[i]?.classList.add('isActive');
          },
          onLeaveBack: () => {
            if (i > 0) rows[i - 1].classList.remove('isOpacity');
          },
          onLeave: () => {
            if (i !== rows.length - 1) {
              row.classList.add('isFixed');
              const matrix = new DOMMatrixReadOnly(getComputedStyle(row).transform);
              row.style.transform = `translateX(${matrix.m41}px) translateY(0px)`;
            } else {
              rows.forEach((r) => r.classList.remove('isFixed'));
            }
          },
          onEnterBack: () => {
            links.forEach((l) => l.classList.remove('isActive'));
            links[i]?.classList.add('isActive');

            if (i === rows.length - 1) {
              rows.forEach((r, idx) => {
                if (idx !== rows.length - 1) r.classList.add('isFixed');
              });
            } else {
              row.classList.remove('isFixed');
            }
          }
        }
      })
      .to(row, {
        x: () => -(row.offsetWidth - window.innerWidth)
      });
  });

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => nav.classList.add('isFixed'),
      onLeave: () => {
        nav.classList.remove('isFixed');
        nav.classList.add('isLeave');
      },
      onLeaveBack: () => nav.classList.remove('isFixed'),
      onEnterBack: () => {
        nav.classList.add('isFixed');
        nav.classList.remove('isLeave');
      }
    }
  });
}

export default horisontal;
