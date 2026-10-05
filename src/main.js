import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

loadMoreButton.classList.add('is-hidden');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  loadMoreButton.classList.add('is-hidden');

  clearGallery();
  showLoader();

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return;
      }

      createGallery(data.hits);

      if (currentPage * 15 < data.totalHits) {
        loadMoreButton.classList.remove('is-hidden');
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again later!',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
});

loadMoreButton.addEventListener('click', () => {
  currentPage += 1;

  showLoader();
  loadMoreButton.classList.add('is-hidden');

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      createGallery(data.hits);

      if (currentPage * 15 < data.totalHits) {
        loadMoreButton.classList.remove('is-hidden');
      }

      const galleryItems = document.querySelectorAll('.gallery-item');

      if (galleryItems.length > 0) {
        galleryItems[galleryItems.length - data.hits.length].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again later!',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
