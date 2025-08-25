import { getImagesByQuery, MAX_PAGE } from './js/pixabay-api';
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
    const { hits, totalHits, error } = await getImagesByQuery(query, currentPage);

    if (error) return;
    if (hits.length > 0) {
      createGallery(hits);

      // якщо всі результати влізли на одну сторінку → сховати кнопку
      if (currentPage >= MAX_PAGE) {
        hideLoadMoreButton();
        iziToast.info({
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }
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
    const { hits, error } = await getImagesByQuery(query, currentPage);

    if (error) return;
    if (hits.length > 0) {
      updateGallery(hits);
      scrollAfterUpdate();

      // якщо дійшли до останньої сторінки
      if (currentPage >= MAX_PAGE) {
        hideLoadMoreButton();
        iziToast.info({
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }
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
