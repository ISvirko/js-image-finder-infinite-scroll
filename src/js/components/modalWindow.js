import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function openLargeImg(e) {
  if (e.target.nodeName !== 'IMG') return;
  const largeImg = e.target.dataset.source;

  const instance = basicLightbox.create(
    `<div><img src='${largeImg}' class='largeImg'/></div>
    <button class='modal-close-btn' data-action="close-lightbox"></button>`,
  );

  instance.show();
  const closeBtn = document.querySelector('[data-action="close-lightbox"]');
  closeBtn.addEventListener('click', closeModalHandler);
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
    if (e.target === closeBtn) {
      instance.close();
    }
  }
}
