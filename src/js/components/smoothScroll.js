// import Lenis from '@studio-freight/lenis';

// import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
// export let lenis;
// function smoothScroll() {
//   // gsap.registerPlugin(ScrollTrigger);

//   lenis = new Lenis();
//   // //   {
//   // //   smooth: true,
//   // //   duration: 0.5, // Длительность скролла
//   // //   easing: (t) => t, // Функция easing для плавности
//   // //   direction: 'vertical' // Вертикальный или горизонтальный скролл
//   // // }

//   lenis.on('scroll', ScrollTrigger.update);

//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });

//   gsap.ticker.lagSmoothing(0);
// }
// export default smoothScroll;

// import Lenis from '@studio-freight/lenis';
// import { gsap, ScrollTrigger } from 'gsap/all';

// export let lenis;

// function smoothScroll() {
//   // Регистрация плагина внутри функции, если она вызывается при инициализации
//   gsap.registerPlugin(ScrollTrigger);

//   lenis = new Lenis({
//     duration: 0.5,           // Длительность скролла (из вашего комментария)
//     easing: (t) => t,        // Функция easing (линейная, как в комментарии)
//     direction: 'vertical',   // Направление (вертикальное)
//     smoothWheel: true,       // Включение плавного скролла для колеса мыши
//     // Если в закомментированном 'smooth: true' имелся в виду старый синтаксис,
//     // в новых версиях Lenis это контролируется через lerp или duration.
//   });

//   // Синхронизация ScrollTrigger с Lenis
//   lenis.on('scroll', ScrollTrigger.update);

//   // Добавление обработчика в тикер GSAP
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000); // Перевод времени в миллисекунды для Lenis
//   });

//   // Настройка сглаживания лагов.
//   // При использовании Lenis часто ставят 0, чтобы избежать "прыжков" при рассинхроне.
//   gsap.ticker.lagSmoothing(0);
// }

// export default smoothScroll;

import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from 'gsap/all';

export let lenis;

// function smoothScroll() {
//   lenis = new Lenis({
//     duration: 1.2,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     direction: 'vertical',
//     gestureDirection: 'vertical',
//     smoothWheel: true,
//     lerp: 0.1,
//     wheelMultiplier: 1.2
//   });

//   lenis.on('scroll', ScrollTrigger.update);

//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });

//   // Для Lenis лучше оставить 0, чтобы избежать рывков после пауз
//   gsap.ticker.lagSmoothing(0);

  
// }

function smoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    lerp: 0.1,
    wheelMultiplier: 1.2,
    // Добавь это, чтобы Lenis сразу понимал положение скролла
    autoRaf: false 
  });

  lenis.on('scroll', ScrollTrigger.update);


  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.raf(performance.now());
}
export default smoothScroll;
