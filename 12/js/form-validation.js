/* Валидация формы */

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const ErrorMessages = {
  FIRST_SYMBOL_ERROR: 'Хэш-тег должен начинаться с символа # (решётка)',
  SYMBOL_ERROR: 'Хэш-теги должны содержать буквы и числа, разделяться пробелами',
  LENGTH_ERROR: `Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов`,
  COUNT_ERROR: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться',
};

const photoUploadForm = document.querySelector('.img-upload__form');
const hashtagField = photoUploadForm.querySelector('.text__hashtags');
const commentField = photoUploadForm.querySelector('.text__description');

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const getTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags;
};

const validateFirstSymbol = (value) => getTags(value).every((item) => /^#/.test(item));

const validateSymbols = (value) => getTags(value).every((item) => /^.[\wА-яЁё]+$/.test(item));

const validateLength = (value) => getTags(value).every((item) => item.length <= MAX_HASHTAG_LENGTH);

const validateCount = (value) => getTags(value).length <= MAX_HASHTAG_COUNT;

const validateUniqueness = (value) => {
  const tags = getTags(value);
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagField, validateFirstSymbol, ErrorMessages.FIRST_SYMBOL_ERROR);
pristine.addValidator(hashtagField, validateSymbols, ErrorMessages.SYMBOL_ERROR);
pristine.addValidator(hashtagField, validateLength, ErrorMessages.LENGTH_ERROR);
pristine.addValidator(hashtagField, validateCount, ErrorMessages.COUNT_ERROR);
pristine.addValidator(hashtagField, validateUniqueness, ErrorMessages.UNIQUENESS_ERROR);

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const pristineValidate = () => pristine.validate();
const pristineReset = () => pristine.reset();

export { pristineValidate, pristineReset, isTextFieldFocused };
