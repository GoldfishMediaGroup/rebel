

import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from 'gsap/all';

export let lenis;

function smoothScroll() {
  // lenis = new Lenis({
  //   duration: 0.5,
  //   easing: (t) => t,
  //   direction: 'vertical',
  //   smoothWheel: true
  // });

  // lenis.on('scroll', ScrollTrigger.update);

  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000);
  // });

  // gsap.ticker.lagSmoothing(0);
}

// function smoothScroll() {
//   gsap.registerPlugin(ScrollTrigger);

//   lenis = new Lenis({
//     // smooth: true,
//     duration: 1, // Длительность скролла
//     easing: (t) => t, // Функция easing для плавности
//     direction: 'vertical', // Вертикальный или горизонтальный скролл
//     gestureDirection: 'vertical',
//     smooth: true,
//     smoothTouch: true,
//     syncTouch: true,
//     syncTouchLerp: 0.075,
//     touchInertiaMultiplier: 40,
//     infinite: false,
//     autoResize: true
//   });

//   lenis.on('scroll', ScrollTrigger.update);

//   // gsap.ticker.add((time) => {
//   //   lenis.raf(time * 1000);
//   // });
//   // gsap.ticker.lagSmoothing(0);

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);
//   gsap.ticker.lagSmoothing(0);

//   // Function to initialize Lenis
//   // function initializeLenis() {
//   //   let lenis = new Lenis({
//   //     duration: 6,
//   //     easing: (t) => Math.min(1, 1.001 - Math.pow(4, -10 * t)),
//   //     direction: 'vertical',
//   //     gestureDirection: 'vertical',
//   //     smooth: true,
//   //     smoothTouch: true,
//   //     syncTouch: true,
//   //     syncTouchLerp: 0.015,
//   //     touchInertiaMultiplier: 18,
//   //     infinite: false,
//   //     autoResize: true,
//   //     // autoToggle: true,
//   //     // overscroll: false,
//   //     // allowNestedScroll:  true,
//   //     // prevent: (node) => {
//   //     //   node.classList.contains('header');
//   //     // }
//   //   });

//   //   lenis.on('scroll', (e) => {});

//   //   function raf(time) {
//   //     lenis.raf(time);
//   //     requestAnimationFrame(raf);
//   //   }

//   //   requestAnimationFrame(raf);
//   //   gsap.ticker.lagSmoothing(0);
//   // }

//   // // Check screen width on initial load
//   // initializeLenis();
// }
export default smoothScroll;
