function footerCookieDisclamer() {
  const cookie = document.querySelector('.cookie');
  const cookieBtn = document.querySelector('.cookie__btn');


  if (!cookie) return;

  cookieBtn.addEventListener('click', () => {
    cookie.classList.remove('cookie--show');
  });

}

export default footerCookieDisclamer;

