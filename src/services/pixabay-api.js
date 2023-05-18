const url = {
  base: 'https://pixabay.com/api/?',
  key: '36422421-bd0564bcaa73312544b4c70dc',
};

export const fetchPhotos = async (searchParams, page) => {
  return await fetch(
    `${url.base}page=${page}&key=${url.key}&q=${searchParams}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('We did not found anything. Try again'));
  });
};
