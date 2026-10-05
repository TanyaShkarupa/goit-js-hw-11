import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              loading="lazy"
            />
            <div class="info">
              <div class="info-item">
                <b>Likes</b>
                <span>${image.likes}</span>
              </div>
              <div class="info-item">
                <b>Views</b>
                <span>${image.views}</span>
              </div>
              <div class="info-item">
                <b>Comments</b>
                <span>${image.comments}</span>
              </div>
              <div class="info-item">
                <b>Downloads</b>
                <span>${image.downloads}</span>
              </div>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMore() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMore() {
  loadMoreButton.classList.add('is-hidden');
}
