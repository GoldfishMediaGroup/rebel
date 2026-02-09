import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function horisontalNew2() {
  const section = document.querySelector('.horisontal');
  if (!section) return;

  const panels = gsap.utils.toArray('.horisontal__panel');
  const links = section.querySelectorAll('.horisontal__nav-link');
  const navSwiperEl = section.querySelector('.horisontal__nav-swiper');

  const navSwiper = new Swiper(navSwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    breakpoints: { 768: { spaceBetween: rem(3.2) } }
  });

  const masterTl = gsap.timeline();
  // Массив объектов с началом и концом каждого бренда в таймлайне
  const brandZones = [];

  panels.forEach((panel, i) => {
    const strip = panel.querySelector('.horisontal__panel-strip');
    const items = panel.querySelectorAll('.horisontal__screen');
    const horizontalSteps = items.length - 1;

    const startTime = masterTl.duration(); // Время входа в бренд

    // 1. ВЕРТИКАЛЬНЫЙ НАЕЗД
    if (i > 0) {
      masterTl.fromTo(panel, 
        { yPercent: 100 }, 
        { yPercent: 0, duration: 1, ease: 'none' }
      );
    }

    // Метка для скролла по клику (панель уже наехала)
    masterTl.addLabel(`brand-${i}`);

    // 2. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ
    if (horizontalSteps > 0) {
      masterTl.to(strip, {
        x: () => -(window.innerWidth * horizontalSteps),
        duration: horizontalSteps,
        ease: 'none'
      });
    }

    const endTime = masterTl.duration(); // Время выхода из бренда

    // Сохраняем зону: таб i должен быть активен, пока время внутри [startTime, endTime]
    brandZones.push({ start: startTime, end: endTime });
  });

  let currentActiveIndex = -1;

  const mainST = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${masterTl.duration() * window.innerHeight}`,
    animation: masterTl,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    anticipatePin: true,
    onUpdate: (self) => {
      const currentTime = self.progress * masterTl.duration();
      
      // Ищем бренд, в чью зону попадает currentTime
      let activeIndex = brandZones.findIndex(zone => 
        currentTime >= zone.start - 0.1 && currentTime <= zone.end + 0.1
      );

      // Если мы в "мертвой зоне" между брендами, берем ближайший
      if (activeIndex === -1) {
        activeIndex = brandZones.reduce((prev, curr, idx) => 
          Math.abs(currentTime - (curr.start + curr.end) / 2) < 
          Math.abs(currentTime - (brandZones[prev].start + brandZones[prev].end) / 2) ? idx : prev
        , 0);
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
      
      gsap.to(window, { duration: 0.8, scrollTo: scrollPos, ease: "power2.inOut" });
    });
  });
}

export default horisontalNew2;