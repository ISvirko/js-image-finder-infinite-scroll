import { refs } from '../refs';

export function upDownArrowHandler() {
  refs.toTopBtn.classList.remove('toTopBtn');
  refs.toTopBtn.classList.add('toBottomBtn');

  if (window.pageYOffset === 0) {
    refs.toTopBtn.classList.remove('toBottomBtn');
    refs.toTopBtn.classList.add('toTopBtn');
  }

  smoothScrollHandler();
}

export function smoothScrollHandler() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}
