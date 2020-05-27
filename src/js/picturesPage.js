import InfiniteScroll from 'infinite-scroll';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';
defaults.delay = 2000;

import { refs } from './refs.js';
import pictureItemTpl from '../templates/picture-item.hbs';
import spinner from './spinner';
import { openLargeImg } from './modalWindow';

refs.searchForm.addEventListener('submit', searchImagesHandler);
refs.galleryList.addEventListener('click', openLargeImg);
refs.toTopBtn.addEventListener('click', upDownArrowHandler);

const apiKey = '16727206-7ae7a1f614d6d42142bf6389f';

const infScroll = new InfiniteScroll(refs.galleryList, {
  responseType: 'text',
  history: false,
  path: function () {
    return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.pageIndex}&per_page=12&key=${apiKey}`;
  },
});

infScroll.inputValue = '';
spinner.show();

infScroll.on('load', response => {
  const pictures = JSON.parse(response);

  const markup = pictureItemTpl(pictures.hits);
  const proxyEl = document.createElement('div');
  proxyEl.innerHTML = markup;

  const parsedItems = proxyEl.querySelectorAll('.photo-card');
  infScroll.appendItems(parsedItems);
  spinner.hide();
});

infScroll.loadNextPage();

function searchImagesHandler(e) {
  e.preventDefault();
  clearGallery();

  const input = refs.searchForm.elements.query;
  const inputValue = input.value;
  if (!inputValue) return;
  infScroll.inputValue = inputValue;

  infScroll.option({
    path() {
      return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.pageIndex}&per_page=12&key=${apiKey}`;
    },
  });

  spinner.show();

  infScroll.on('load', response => {
    spinner.hide();
    const pictures = JSON.parse(response);

    if (pictures.hits.length < 1) {
      error('No images matching your query have been found');
      return;
    }

    const markup = pictureItemTpl(pictures.hits);
    const proxyEl = document.createElement('div');
    proxyEl.innerHTML = markup;

    const parsedItems = proxyEl.querySelectorAll('.photo-card');
    infScroll.appendItems(parsedItems);
  });

  infScroll.loadNextPage();
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
}

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
