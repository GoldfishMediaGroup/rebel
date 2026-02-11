import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function horizontal() {
  const section = document.querySelector('.horizontal');

  const panels = gsap.utils.toArray('.horizontal__panel');
  const links = section.querySelectorAll('.horizontal__nav-link');
  const navSwiperEl = section.querySelector('.horizontal__nav-swiper');

  const navSwiper = new Swiper(navSwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    breakpoints: { 768: { spaceBetween: rem(3.2) } }
  });

  const masterTl = gsap.timeline();

  const brandZones = [];

  panels.forEach((panel, i) => {
    const strip = panel.querySelector('.horizontal__panel-strip');
    const items = panel.querySelectorAll('.horizontal__screen');
    const horizontalSteps = items.length - 1;

    const startTime = masterTl.duration(); // Время входа в бренд

    if (i > 0) {
      masterTl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: 'none' });
      masterTl.to(panels[i - 1], {
        opacity: 0,
        duration: 0.8,
        ease: 'none'
      }, "<");
    }

    masterTl.addLabel(`brand-${i}`);

    if (horizontalSteps > 0) {
      masterTl.to(strip, {
        x: () => -(window.innerWidth * horizontalSteps),
        duration: horizontalSteps,
        ease: 'none'
      });
    }

    const endTime = masterTl.duration(); // Время выхода из бренда

    brandZones.push({ start: startTime, end: endTime });
  });

  let currentActiveIndex = -1;

  const mainST = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${masterTl.duration() * window.innerHeight}`,
    animation: masterTl,
    scrub: true,
    pin: true,
    invalidateOnRefresh: true,
    anticipatePin: true,
    onUpdate: (self) => {
      const currentTime = self.progress * masterTl.duration();

      
      let activeIndex = brandZones.findIndex((zone) => currentTime >= zone.start - 0.1 && currentTime <= zone.end + 0.1);

    
      if (activeIndex === -1) {
        activeIndex = brandZones.reduce(
          (prev, curr, idx) =>
            Math.abs(currentTime - (curr.start + curr.end) / 2) <
            Math.abs(currentTime - (brandZones[prev].start + brandZones[prev].end) / 2)
              ? idx
              : prev,
          0
        );
      }

      if (activeIndex !== currentActiveIndex && activeIndex !== -1) {
        currentActiveIndex = activeIndex;
        updateActiveTab(activeIndex);
      }
    }
  });

  function updateActiveTab(index) {
    links.forEach((link, i) => link.classList.toggle('isActive', i === index));
    if (navSwiper) navSwiper.slideTo(index);
  }

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const scrollPos = mainST.labelToScroll(`brand-${i}`);

      gsap.to(window, { duration: 0, scrollTo: scrollPos, ease: 'power2.inOut' });
    });
  });
}

export default horizontal;
