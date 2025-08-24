import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
export let MAX_PAGE = 1;

export async function getImagesByQuery(query, page) {
  axios.defaults.baseURL = 'https://pixabay.com';
  const params = {
    key: '51707366-c8695cacd8b805538752cece0',
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const res = await axios.get('/api/', { params });
    MAX_PAGE = Math.ceil(res.data.totalHits / params.per_page);

    const images = res.data.hits;
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
  } catch (error) {
    iziToast.show({
      title: 'Error',
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      message: error.message,
    });
  }
}
