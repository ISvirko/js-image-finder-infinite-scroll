createSpinnerMarkup();
const spinner = document.querySelector('#spinner');

export default {
  show() {
    spinner.classList.remove('is-hidden');
  },

  hide() {
    spinner.classList.add('is-hidden');
  },
};

function createSpinnerMarkup() {
  const markup = `<div class="spinner-overlay is-hidden" id="spinner">
  <div class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
  </div>
  </div>`;
  document.querySelector('.container').insertAdjacentHTML('beforeend', markup);
}
