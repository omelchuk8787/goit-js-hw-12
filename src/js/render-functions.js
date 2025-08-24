import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { MAX_PAGE } from './pixabay-api';
import iziToast from 'izitoast';

const spanEl = document.querySelector('.loader');
const ulElem = document.querySelector('.gallery');
const btnLdMrEl = document.querySelector('.load-more');

if (spanEl) {
  spanEl.hidden = true;
}

const gallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt', // Вказуємо, що підписи братимуться з атрибута 'alt' зображення
  captionDelay: 250, // Затримка появи підпису
});

export function createGallery(images) {
  const markup = templatesImage(images);
  ulElem.insertAdjacentHTML('afterbegin', markup);

  gallery.refresh();
}

export function updateGallery(images) {
  const markup = templatesImage(images);
  ulElem.insertAdjacentHTML('beforeend', markup);

  gallery.refresh();
}

export function clearGallery() {
  ulElem.innerHTML = ``;
}

export function showLoader(currentPage) {
  spanEl.hidden = false;
  if (currentPage > 1) {
    spanEl.classList.add('load-more-loader');
  }
}

export function hideLoader() {
  spanEl.hidden = true;
}

export function checkVisibleLoadBtn(currentPage) {
  if (currentPage < MAX_PAGE) {
    showLoadMoreButton();
  } else if (MAX_PAGE) {
    hideLoadMoreButton();
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      color: 'blue',
      position: 'topRight',
      messageColor: 'black',
    });
  }
}

export function scrollAfterUpdate() {
  const cardEl = ulElem.querySelector('.gallery-item');

  let rect = cardEl.getBoundingClientRect();

  window.scrollBy({
    top: rect.height * 2,
    left: 0,
    behavior: 'smooth',
  });
}

function showLoadMoreButton() {
  btnLdMrEl.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  btnLdMrEl.classList.remove('is-visible');
}

function templateImage(img) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = img;
  return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a><div class="stats">
  <p class="img-rates">Likes<span>${likes}</span></p>
  <p class="img-rates">Views<span>${views}</span></p>
  <p class="img-rates">Comments<span>${comments}</span></p>
  <p class="img-rates">Downloads<span>${downloads}</span></p></div>
</li>
`;
}

function templatesImage(imgs) {
  return imgs.map(templateImage).join('\n');
}
