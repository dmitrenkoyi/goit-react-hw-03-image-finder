function fetchImages(imgName, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '21948624-31b67ed2e94e468d71d1f3d1d';

  return fetch(
    `${BASE_URL}?q=${imgName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No image with name ${imgName}`));
  });
}

const api = {
  fetchImages,
};

export default api;
