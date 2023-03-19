import { getPhotos } from './data.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = getPhotos();
const thumbnailsListFragment = document.createDocumentFragment();

thumbnails.forEach(({ url, likes, comments }) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsListFragment.appendChild(thumbnail);
});

photosContainer.appendChild(thumbnailsListFragment);
