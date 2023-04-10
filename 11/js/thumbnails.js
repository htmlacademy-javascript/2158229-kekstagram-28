const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnail = (({ url, description, likes, comments, id }) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  return thumbnail;
});

const renderThumbnails = (thumbnails) => {
  const thumbnailsListFragment = document.createDocumentFragment();

  thumbnails.forEach((thumbnail) => {
    thumbnailsListFragment.append(renderThumbnail(thumbnail));
  });
  photosContainer.append(thumbnailsListFragment);
};

export { renderThumbnails };
