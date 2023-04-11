const bigPhotoPreview = document.querySelector('.big-picture__preview');

const renderBigPhoto = ({ url, description, likes }) => {
  bigPhotoPreview.querySelector('.big-picture__img img').src = url;
  bigPhotoPreview.querySelector('.big-picture__img img').alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;
};

export { renderBigPhoto };
