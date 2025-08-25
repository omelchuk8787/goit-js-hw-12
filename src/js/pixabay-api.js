import axios from 'axios'; 
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export let MAX_PAGE = 1;

export async function getImagesByQuery(query, page) {
  axios.defaults.baseURL = 'https://pixabay.com';
  const params = {
    key: '49676421-fbb984ce693a0b40b5728e81f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const res = await axios.get('/api/', { params });

    const { total, totalHits, hits } = res.data;

    // розрахунок максимальної сторінки
    MAX_PAGE = Math.ceil(totalHits / params.per_page);

    // якщо немає зображень
    if (!hits || hits.length === 0) {
      iziToast.warning({
        title: '❌',
        message: 'Sorry, no images match your search query. Please try again!',
        color: 'red',
        position: 'topRight',
        messageColor: 'white',
        titleColor: 'white',
      });

      return { total, totalHits, hits: [], error: null };
    }

    return { total, totalHits, hits, error: null };

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
    });

    return { total: 0, totalHits: 0, hits: [], error: error.message };
  }
}
