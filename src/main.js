import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import { clearGallery, createGallery, showLoader } from './js/render-functions';

const formEl = document.querySelector('.form');
const buttonEl = formEl.querySelector('button');

formEl.addEventListener('input', e => {
  const query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.currentTarget.elements['search-text'].value.trim();
  if (e.currentTarget.nodeName == 'BUTTON') return;
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(images => createGallery(images))
    .catch(error => console.error(error));
});
