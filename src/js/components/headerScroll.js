function headerScroll() {
  const nav = document.querySelector('header');

  if (!nav) return;
  
  const navOffsetTop = nav.offsetTop;

  function handleScroll() {
    if (window.scrollY > navOffsetTop) {
      nav.classList.add('isScroll');
    } else {
      nav.classList.remove('isScroll');
    }
  }

  function handleResize() {
    window.addEventListener('scroll', handleScroll);
  }

  if (nav) {
    handleResize();
  }
}

export default headerScroll;
