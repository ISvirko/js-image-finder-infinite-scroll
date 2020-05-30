import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { refs } from '../refs';

export function openLargeImg(e) {
  if (e.target.nodeName !== 'IMG') return;
  const largeImg = e.target.dataset.source;

  const instance = basicLightbox.create(
    `<div><img src='${largeImg}' class='largeImg'/></div>
    <button class='modal-close-btn' data-action="close-lightbox"></button>`,
    {
      // onShow: instance => {
      //   window.addEventListener('keyup', keybordNav);
      //   function keybordNav(e) {
      //     console.log(e.code);
      //     const allImg = refs.galleryList.querySelectorAll('img');
      //     const imagesArrSrc = [];
      //     allImg.forEach(img => imagesArrSrc.push(img));
      //     for (let i = 0; i < imagesArrSrc.length; i += 1) {
      //       if (e.code === 'ArrowRight') {
      //         console.log('next');
      //         if (i < imagesArrSrc.length - 1) {
      //           console.log(imagesArrSrc[i].dataset.source);
      //           console.log(imagesArrSrc[i + 1].dataset.source);
      //         }
      //         imagesArrSrc[i].dataset.source =
      //           imagesArrSrc[i + 1].dataset.source;
      //       }
      //       // if (e.code === 'ArrowLeft') {
      //       //   console.log('prev');
      //       //   e.target.dataset.source = imagesArrSrc[i - 1].dataset.source;
      //       // }
      //     }
      //   }
      // },
    },
  );

  instance.show();

  const closeBtn = document.querySelector('[data-action="close-lightbox"]');
  closeBtn.addEventListener('click', closeModalHandler);
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    (e.code === 'Escape' || e.target === closeBtn) && instance.close();

    window.removeEventListener('keydown', closeModalHandler);
    closeBtn.removeEventListener('click', closeModalHandler);
  }
}
