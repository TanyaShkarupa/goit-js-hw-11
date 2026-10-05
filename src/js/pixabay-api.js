import axios from 'axios';

const API_KEY = '57885931-70be65b5a26a36e09f32ff59f';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  return response.data;
};
