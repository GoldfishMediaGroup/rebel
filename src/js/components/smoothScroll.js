

import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from 'gsap/all';

export let lenis;

function smoothScroll() {
  lenis = new Lenis({
    duration: 0.5,
    easing: (t) => t,
    direction: 'vertical',
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
export default smoothScroll;
