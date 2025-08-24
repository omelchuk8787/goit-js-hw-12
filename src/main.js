import { getImagesByQuery } from './js/pixabay-api';
import {
  checkVisibleLoadBtn,
  clearGallery,
  createGallery,
  hideLoader,
  scrollAfterUpdate,
  showLoader,
  updateGallery,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const btnLdMrEl = document.querySelector('.load-more');

let currentPage;
let query;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    return iziToast.info({
      message: 'Введіть запит',
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
    });
  }
  clearGallery();
  hideLoadMoreButton();
  currentPage = 1;

  try {
    showLoader(currentPage);
    const images = await getImagesByQuery(query, currentPage);

    if (images.length !== 0) {
      createGallery(images);
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
    checkVisibleLoadBtn(currentPage);
  }
});

btnLdMrEl.addEventListener('click', async e => {
  currentPage += 1;
  hideLoadMoreButton();
  try {
    showLoader(currentPage);
    const images = await getImagesByQuery(query, currentPage);
    if (images.length > 0) {
      updateGallery(images);
      scrollAfterUpdate();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
    checkVisibleLoadBtn(currentPage);
  }
});
