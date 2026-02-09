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
import horisontalNew2 from '../components/horisontalNew2';
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

export const modules = {};

document.addEventListener('DOMContentLoaded', () => {
  popup();
  form();
  scroll();
  fancybox();

  headerScroll();
  footerCookieDisclamer();
  headerBurger();
  hero();
  values();
  cooperations();
  horisontalNew2();
  dna();
  vacancies();
  news();
  advantages();
  gallery();
  aboutHero();
  valuesAnim();
  managementAnim();
  edge();
  showMoreMob('.edge__info-text', 920, '435rem', '.edge__show-more');
  condsHero();
  conds();
  newsHero();
  benefits();
  brandsGallery();
  brandHeroDet();
  newsDetHero();
});



import '../libs/dynamic_adapt';
