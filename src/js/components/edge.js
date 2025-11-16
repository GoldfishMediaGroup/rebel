import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
function edge() {
  const section = document.querySelector('.edge');

  if (!section) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const infoBlocks = section.querySelectorAll('.edge__info-block');
  infoBlocks[0].classList.add('isActive');
  document.querySelector('.edge__tab-slide').classList.add('isActive');

  const swiperTab = new Swiper('.edge__tab-swiper', {
    slidesPerView: 'auto',
    spaceBetween: rem(0.8),
    on: {
      slideChange: (swiper) => {
        infoBlocks.forEach((item) => {
          item.classList.remove('isActive');
        });

        infoBlocks[swiper.realIndex].classList.add('isActive');

        swiper.slides.forEach((slide, index) => {
          slide.classList.remove('isActive');
        });
        swiper.slides[swiper.realIndex].classList.add('isActive');
      }
    }
  });

  swiperTab.slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      swiperTab.slideTo(index);
      swiperTab.slides.forEach((slide, index) => {
        slide.classList.remove('isActive');
      });
      swiperTab.slides[index].classList.add('isActive');
      infoBlocks.forEach((item) => {
        item.classList.remove('isActive');
      });

      infoBlocks[index].classList.add('isActive');
    });
  });

  let scrtrg = gsap.timeline({
    scrollTrigger: {
      trigger: '.edge__tab-box',
      start: 'top 64rem',

      onEnter: () => {
        document.querySelector('.edge__tab-box').classList.add('isVisible');
      },
      onLeaveBack: () => {
        document.querySelector('.edge__tab-box').classList.remove('isVisible');
      }
    }
  });
}

export default edge;
