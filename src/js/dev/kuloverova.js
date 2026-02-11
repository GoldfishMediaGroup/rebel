import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import 'swiper/css/bundle';

import popup from '../utils/popup';
import form from '../utils/form';
import scroll from '../utils/scroll';
import fancybox from '../utils/fancybox';

import headerBurger from '../components/headerBurger';
import footerCookieDisclamer from '../components/footerCookieDisclamer';
import headerScroll from '../components/headerScroll';
import hero from '../components/hero';
import values from '../components/values';
import cooperations from '../components/cooperations';
import horizontal from '../components/horizontal';
import dna from '../components/dna';
import vacancies from '../components/vacancies';
import news from '../components/news';
import advantages from '../components/advantages';
import gallery from '../components/gallery';
import aboutHero from '../components/about-hero';
import valuesAnim from '../components/values-anim';
import managementAnim from '../components/managementAnim';
import edge from '../components/edge';
import showMoreMob from '../components/showMoreMob';
import condsHero from '../components/conds-hero';
import conds from '../components/conds';
import newsHero from '../components/news-hero';
import benefits from '../components/benefits';
import brandsGallery from '../components/brands-gallery';
import brandHeroDet from '../components/brandHeroDet';
import newsDetHero from '../components/newsDetHero';
import smoothScroll from '../components/smoothScroll';

import '../libs/dynamic_adapt';

export const modules = {};
gsap.registerPlugin(ScrollTrigger);
smoothScroll();

document.addEventListener('DOMContentLoaded', () => {
  try {
    popup();
  } catch {}
  try {
    form();
  } catch {}
  try {
    scroll();
  } catch {}
  try {
    fancybox();
  } catch {}

  try {
    headerScroll();
  } catch {}
  try {
    footerCookieDisclamer();
  } catch {}
  try {
    headerBurger();
  } catch {}
  try {
    hero();
  } catch {}
  try {
    values();
  } catch {}
  try {
    cooperations();
  } catch {}
  try {
    horizontal();
  } catch {}
  try {
    dna();
  } catch {}
  try {
    vacancies();
  } catch {}
  try {
    news();
  } catch {}
  try {
    advantages();
  } catch {}
  try {
    gallery();
  } catch {}
  try {
    aboutHero();
  } catch {}
  try {
    valuesAnim();
  } catch {}
  try {
    managementAnim();
  } catch {}
  try {
    edge();
  } catch {}
  try {
    showMoreMob('.edge__info-text', 920, '435rem', '.edge__show-more');
  } catch {}
  try {
    condsHero();
  } catch {}
  try {
    conds();
  } catch {}
  try {
    newsHero();
  } catch {}
  try {
    benefits();
  } catch {}
  try {
    brandsGallery();
  } catch {}
  try {
    brandHeroDet();
  } catch {}
  try {
    newsDetHero();
  } catch {}
});
