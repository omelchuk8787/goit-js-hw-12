import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader } from './render-functions';

export function getImagesByQuery(query) {
  axios.defaults.baseURL = 'https://pixabay.com';
  const params = {
    key: '49676421-fbb984ce693a0b40b5728e81f',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
    page: 1,
  };
  return axios
    .get('/api/', { params })
    .then(res => {
      const images = res.data.hits;
      console.log(images);
      if (images && Array.isArray(images) && images.length > 0) {
        return images;
      } else {
        return iziToast.show({
          title: '❌',
          message:
            'Sorry, there are no images matching <br> your search query. Please try again!',
          color: 'red',
          position: 'topRight',
          messageColor: 'white',
          titleColor: 'white',
        });
      }
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: error.message,
      });
    })
    .finally(() => {
      hideLoader();
    });
}
