const PICTURE_TYPES = ['jpg', 'jpeg', 'png'];

const photoUploadButton = document.querySelector('.img-upload__input');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadUserPhoto = () => {
  const userPhoto = photoUploadButton.files[0];
  const userPhotoName = userPhoto.name.toLowerCase();

  const validateType = PICTURE_TYPES.some((type) => userPhotoName.endsWith(type));
  if (validateType) {
    photoPreview.src = URL.createObjectURL(userPhoto);
    effectsPreview.forEach((effect) => (effect.style.backgroundImage = `url(${photoPreview.src})`));
  }
};

export { uploadUserPhoto };
