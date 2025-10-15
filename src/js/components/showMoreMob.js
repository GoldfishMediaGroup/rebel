function showMoreMob(selector, count, heightStr, selectorBtn) {
  const elems = document.querySelectorAll(selector);

  elems.forEach((elem, i) => {
    if (!elem) return;
    let text = elem.innerHTML;
    const btn = document.querySelectorAll(selectorBtn)[i]

    window.addEventListener('resize', handleResize);

    function handleResize() {
      if (window.innerWidth > 768) {
        showFullText();
      } else {
        if (elem.hasAttribute('data-short')) {
          text_crop();
        }
      }
    }

    function showFullText() {
      elem.innerHTML = text;
      elem.style.maxHeight = 'none';
    }

    function text_crop() {
      const mobileSize = count;
      elem.setAttribute('data-fulltext', text);

      if (text.length > mobileSize) {
        const croppedText = text.slice(0, mobileSize - 10);
        elem.innerHTML = croppedText + '...';
        elem.setAttribute('data-short', true);
        elem.style.maxHeight = heightStr;
      } else {
        btn.classList.add('isHidden');
      }
    }

    function expandText() {
      if (window.innerWidth > 768) {
        return;
      }

      if (elem.hasAttribute('data-short')) {
        const fullText = elem.getAttribute('data-fulltext');
        elem.innerHTML = fullText;
        elem.style.maxHeight = `${elem.scrollHeight}rem`;
        elem.removeAttribute('data-short');
        elem.parentElement.classList.add('isActive');
      } else {
        // Сворачиваем текст
        elem.style.maxHeight = heightStr;
        elem.parentElement.classList.remove('isActive');
        setTimeout(() => {
          text_crop();
        }, 300);
      }
    }

    if (window.innerWidth > 768) {
      showFullText();
    } else {
      text_crop();
    }

    btn.addEventListener('click', expandText);
  });
}


// function showMoreMob(selector, count, heightStr, selectorBtn) {
//   const elems = document.querySelectorAll(selector);

//   elems.forEach((elem, i) => {
//     if (!elem) return;
//     const text = elem.innerHTML.trim();
//     const btn = document.querySelectorAll(selectorBtn)[i];
//     if (!btn) return;

//     function showFullText() {
//       elem.innerHTML = text;
//       elem.style.maxHeight = 'none';
//     }

//     function text_crop() {
//       const mobileSize = count;
//       elem.setAttribute('data-fulltext', text);

//       if (text.length > mobileSize) {
//         const croppedText = text.slice(0, mobileSize - 10);
//         elem.innerHTML = croppedText + '...';
//         elem.setAttribute('data-short', true);
//         elem.style.maxHeight = heightStr;
//       } else {
//         // если текст полностью помещается — скрываем кнопку
//         btn.classList.add('isHidden');
//       }
//     }

//     function expandText() {
//       if (window.innerWidth > 768) return;

//       if (elem.hasAttribute('data-short')) {
//         const fullText = elem.getAttribute('data-fulltext');
//         elem.innerHTML = fullText;
//         elem.style.maxHeight = `${elem.scrollHeight}px`;
//         elem.removeAttribute('data-short');
//         elem.parentElement.classList.add('isActive');
//       } else {
//         elem.style.maxHeight = heightStr;
//         elem.parentElement.classList.remove('isActive');
//         setTimeout(() => {
//           text_crop();
//         }, 300);
//       }
//     }

//     // инициализация
//     if (window.innerWidth > 768) {
//       showFullText();
//     } else {
//       text_crop();
//     }

//     btn.addEventListener('click', expandText);
//   });
// }




export default showMoreMob;


