/*  Отрисовка полноразмерного изображения */

import { isEscapeKey } from './util.js';
import { renderThumbnails, photosContainer } from './thumbnails.js';


const bigPhotoPreview = document.querySelector('.big-picture__preview');
const commentsContainer = bigPhotoPreview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count'); /*hidden*/
const commentsLoaderButton = document.querySelector('.comments-loader'); /*hidden*/

const renderComment = (({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const createCommentsList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsListFragment.append(renderComment(comment));
  });
  commentsContainer.append(commentsListFragment);
};

const renderBigPhoto = ({ url, description, likes, comments }) => {
  bigPhotoPreview.querySelector('.big-picture__img img').src = url;
  bigPhotoPreview.querySelector('.big-picture__img img').alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.comments-count').textContent = comments.length;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;

  commentsContainer.innerHTML = '';
  createCommentsList(comments);
};

/*  Открытие и закрытие полноразмерного изображения  */

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPhotoClose.click();
  }
};

const openBigPhoto = (element) => {
  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  renderBigPhoto(element);

  document.addEventListener('keydown', onDocumentKeydown);
};

photosContainer.addEventListener('click', (evt) => {
  const targetThumbnail = evt.target.closest('.picture');
  if (targetThumbnail) {
    evt.preventDefault();
    const targetThumbnailId = renderThumbnails[targetThumbnail.dataset.id - 1];
    openBigPhoto(targetThumbnailId);
  }
});

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPhotoClose.addEventListener('click', closeBigPhoto);
