const bigPhotoPreview = document.querySelector('.big-picture__preview');

const renderBigPhoto = ({ url, description, likes }) => {
  const bigPhotoImg = bigPhotoPreview.querySelector('.big-picture__img img');
  bigPhotoImg.src = url;
  bigPhotoImg.alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;
};

export { renderBigPhoto };
