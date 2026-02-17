import Swiper from 'swiper/bundle';
import { gsap, ScrollTrigger } from 'gsap/all';

function valuesAnim() {
  const section = document.querySelector('.values-anim');
  if (!section) return;

  const list = section.querySelector('.values-anim__list-wrapper');
  const imgSwiper = section.querySelector('.values-anim__img-swiper');
  const slidesCount = imgSwiper.querySelectorAll('.swiper-slide').length;

  gsap.registerPlugin(ScrollTrigger);

  const sliderImg = new Swiper(imgSwiper, {
    speed: 1000,
    allowTouchMove: false,
    effect: 'creative',
    creativeEffect: {
      prev: { translate: ['-20%', 0, -1] },
      next: { translate: ['100%', 0, 0] }
    }
  });

  gsap.matchMedia().add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=2300',
        pin: true,
        scrub: 1,

        onUpdate: (self) => {
          // Свайпер всё равно должен знать, когда переключаться.
          // Делим путь на равные отрезки по количеству слайдов.
          const targetIndex = Math.min(Math.floor(self.progress * slidesCount), slidesCount - 1);

          if (sliderImg.activeIndex !== targetIndex) {
            sliderImg.slideTo(targetIndex);
          }
        }
      }
    });

    tl.to(list, {
      x: () => {
        const parentWidth = list.parentElement.offsetWidth; // Видимая часть (напр. 920px)
        const scrollWidth = list.offsetWidth; // Полная ширина (напр. 1700px)
        return -(scrollWidth - parentWidth); // Сдвиг на 780px
      },
      ease: 'none'
    });
  });
}

export default valuesAnim;
