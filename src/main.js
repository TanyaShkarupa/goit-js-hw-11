import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

const PER_PAGE = 15;

hideLoadMore();

form.addEventListener('submit', async event => {
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

  hideLoadMore();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMore();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

  form.reset();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMore();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMore();
    }

    const gallery = document.querySelector('.gallery');
    const galleryItem = gallery.querySelector('.gallery-item');

    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
