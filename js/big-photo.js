/*  Отрисовка полноразмерного изображения */

import { isEscapeKey } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const COMMENTS_BLOCK = 5;

const bigPhotoPreview = document.querySelector('.big-picture__preview');
const commentsContainer = bigPhotoPreview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoaderButton = bigPhoto.querySelector('.comments-loader');
const photosContainer = document.querySelector('.pictures');

let commentsLoaded = 0;
let comments = [];

const renderComment = (({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const renderComments = () => {
  commentsLoaded += COMMENTS_BLOCK;

  if (commentsLoaded >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaded = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsLoaded; i++) {
    const commentElement = renderComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
  commentsCount.innerHTML = `${commentsLoaded} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const renderBigPhoto = ({ url, description, likes }) => {
  bigPhotoPreview.querySelector('.big-picture__img img').src = url;
  bigPhotoPreview.querySelector('.big-picture__img img').alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;
};

/*  Открытие и закрытие полноразмерного изображения  */

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const openBigPhoto = (element) => {
  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigPhoto(element);
  comments = element.comments;
  commentsLoaded = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

photosContainer.addEventListener('click', (evt) => {
  const targetThumbnail = evt.target.closest('.picture');
  if (targetThumbnail) {
    evt.preventDefault();
    const targetThumbnailId = renderThumbnails.find((item) => item.id === Number(targetThumbnail.dataset.id));
    openBigPhoto(targetThumbnailId);
  }
});

const onCommentsLoaderButtonClick = () => renderComments();
commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);

function closeBigPhoto() {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPhotoClose.addEventListener('click', closeBigPhoto);
