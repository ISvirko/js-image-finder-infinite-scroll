import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import refs from './refs.js';

const masonryInstance = new Masonry('.grid', {
  columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
  gutter: 10,
  percentPosition: true,
  transitionDuration: '0.3s',
});

function addMasonryLayout(pictures) {
  const elements = pictures.hits.map(pic => makeGridItem(pic));
  refs.gallery.append(...elements);
  masonryInstance.addItems(elements);

  onImagesLoaded();
}

function onImagesLoaded() {
  imagesLoaded('.grid').on(
    'progress',
    masonryInstance.layout.bind(masonryInstance),
  );
}

function makeGridItem(pic) {
  const div = document.createElement('div');
  div.classList.add('grid-item');
  div.innerHTML = gridItemMarkup(pic);
  return div;
}

function gridItemMarkup(pic) {
  return `
  <div class="photo-card">
  <img src="${pic.webformatURL}" data-source="${pic.largeImageURL}" width='360' />

  <div class="stats">
    <p class="stats-item">
        <i class="material-icons">thumb_up</i>
        ${pic.likes}
    </p>
    <p class="stats-item">
        <i class="material-icons">visibility</i>
        ${pic.views}
    </p>
    <p class="stats-item">
        <i class="material-icons">comment</i>
        ${pic.comments}
    </p>
    <p class="stats-item">
        <i class="material-icons">cloud_download</i>
        ${pic.downloads}
    </p>
  </div>
  <a href='${pic.pageURL}' target='_blank' rel='noopener norefferer'>Open in the source</a>
  </div>
  `;
}

export default addMasonryLayout;
