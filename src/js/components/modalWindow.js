import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { refs } from '../refs';

function openLargeImg(e) {
  if (e.target.nodeName !== 'IMG') return;

  const instance = basicLightbox.create(
    `<div><img src='${e.target.dataset.source}' class='largeImg'/></div>
    <button class='modal-close-btn' data-action="close-lightbox"></button>`,
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

export default openLargeImg;
