const url = {
  base: 'https://pixabay.com/api/?',
  key: '36422421-bd0564bcaa73312544b4c70dc',
};

export const fetchPhotos = () => {
  return fetch(
    `${url.base}key=${url.key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Something wrong. Try again'));
  });
};

export const fetchPhotosWithParams = (searchParams, page) => {
  return fetch(
    `${url.base}page=${page}&key=${url.key}&q=${searchParams}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('We did not found anything. Try again'));
  });
};

const api = {
  fetchPhotos,
  fetchPhotosWithParams,
};

export default api;
