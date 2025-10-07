import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

import { rem } from '../utils/constants';

import popup from '../utils/popup';
import form from '../utils/form';
import scroll from '../utils/scroll';
import fancybox from '../utils/fancybox';

import smoothScroll from '../components/smoothScroll';
// import headerBurger from '../components/headerBurger';
import footerCookieDisclamer from '../components/footerCookieDisclamer';
import headerScroll from '../components/headerScroll';
import hero from '../components/hero';
import values from '../components/values';
import cooperations from '../components/cooperations';
import horisontal from '../components/horisontal';
import dna from '../components/dna';
import vacancies from '../components/vacancies';
import news from '../components/news';
import advantages from '../components/advantages';
import gallery from '../components/gallery';
import aboutHero from '../components/about-hero';

import '../libs/dynamic_adapt';

export const modules = {};
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  popup();
  form();
  scroll();
  fancybox();
  headerScroll();
  footerCookieDisclamer();
  smoothScroll();
  // headerBurger();
  hero();
  values();
  cooperations();
  horisontal();
  dna();
  vacancies();
  news();
  advantages();
  gallery();
  aboutHero();

});
