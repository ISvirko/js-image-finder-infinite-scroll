import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function openLargeImg(e) {
  if (e.target.nodeName !== 'IMG') return;
  const largeImg = e.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src='${largeImg} class='largeImg' width='800' height='600'/>'`,
  );
  instance.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
