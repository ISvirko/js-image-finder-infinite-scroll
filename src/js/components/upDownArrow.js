import refs from '../refs';

function upDownArrowHandler() {
  refs.toTopBtn.classList.remove('toTopBtn');
  refs.toTopBtn.classList.add('toBottomBtn');

  if (window.pageYOffset === 0) {
    refs.toTopBtn.classList.remove('toBottomBtn');
    refs.toTopBtn.classList.add('toTopBtn');
  }

  smoothScrollHandler();
}

function smoothScrollHandler() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

export default upDownArrowHandler;
