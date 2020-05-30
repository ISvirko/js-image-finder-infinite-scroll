import InfiniteScroll from 'infinite-scroll';

import { refs } from './refs.js';
import pictureItemTpl from '../templates/picture-item.hbs';
import spinner from './components/spinner';
import { openLargeImg } from './components/modalWindow';
import { upDownArrowHandler } from './components/upDownArrow.js';

refs.searchForm.addEventListener('submit', searchImagesHandler);
refs.galleryList.addEventListener('click', openLargeImg);
refs.toTopBtn.addEventListener('click', upDownArrowHandler);

const apiKey = '16727206-7ae7a1f614d6d42142bf6389f';

const infScroll = new InfiniteScroll(refs.galleryList, {
  inputValue: '',
  responseType: 'text',
  history: false,
  path: function () {
    return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.pageIndex}&per_page=12&key=${apiKey}`;
  },
});

infScroll.inputValue = '';
infScrollOnLoad();

function infScrollOnLoad() {
  infScroll.on('load', response => {
    infScrollDisplayImgs(response);
    spinner.hide();
  });

  infScroll.loadNextPage();
  spinner.show();
}

function infScrollDisplayImgs(response) {
  const pictures = JSON.parse(response);

  renderGallery(pictures.hits);
}

function renderGallery(pics) {
  refs.galleryList.insertAdjacentHTML('beforeend', pictureItemTpl(pics));
}

function searchImagesHandler(e) {
  e.preventDefault();
  clearGallery();

  const inputValue = refs.searchForm.elements.query.value;
  if (!inputValue) return;
  infScroll.inputValue = inputValue;

  infScrollOnLoad();
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
}
