import { translateAdvertType } from './utils.js';

const popupTemplateContainer = document.querySelector('#card').content.querySelector('.popup');

/**
 * Изменяет "цена за ночь"
 * @param {Object} element - карточка объявления
 * @param {number} price - цена
 */
const makePopupPrice = (element, price) => {
  const popupPriceBlockContainer = element.querySelector('.popup__text--price');
  const newElement = document.createElement('span');
  newElement.textContent = '₽/ночь';
  popupPriceBlockContainer.textContent = `${price} `;
  popupPriceBlockContainer.appendChild(newElement);
};

/**
 * Добавляет фотографии
 * @param {Object} element - карточка объявления
 * @param {Object[]} photos - массив с src к фотографиям
 */
const makePopupPhotos = (element, photos) => {
  const popupPhotosContainer = element.querySelector('.popup__photos');
  if (!photos) {
    popupPhotosContainer.style.display = 'none';
    return;
  }
  if (photos.length === 0) {
    popupPhotosContainer.style.display = 'none';
    return;
  }
  const popupPhotoContainer = popupPhotosContainer.querySelector('.popup__photo');
  const popupPhotoClone = popupPhotoContainer.cloneNode(true);
  popupPhotoContainer.remove();
  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupPhotosContainer.appendChild(photo);
  });
};

/**
 * Добавляет иконки "особенностей"
 * @param {Object} element - карточка объявления
 * @param {Object[]} features - особенности
 * @returns
 */
const makePopupFeatures = (element, features) => {
  const popupFeaturesContainer = element.querySelector('.popup__features');
  if (!features) {
    popupFeaturesContainer.style.display = 'none';
    return;
  }
  if (features.length === 0) {
    popupFeaturesContainer.style.display = 'none';
    return;
  }
  const popupFeaturesListContainers = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesListContainers.forEach((popupFeaturesItem) => {
    const modifier = popupFeaturesItem.classList[1];
    if (!modifiers.includes(modifier)) {
      popupFeaturesItem.remove();
    }
  });
};

/**
 * Скрывает пустые блоки объявления
 * @param {Объект} element - карточка объявления
 */
const checkEmptyBlock = (element) => {
  const elementChildren = element.childNodes;
  elementChildren.forEach((child) => {
    if (child.textContent === '') {
      child.style.display = 'none';
    }
  });
};

/**
 * Создает карточку объявления по шаблону
 * @param {Object} author - данные об авторе
 * @param {Object} offer - данные о жилье
 * @returns {Object}
 */
const makePopup = (author, offer) => {
  const popupElementContainer = popupTemplateContainer.cloneNode(true);
  popupElementContainer.querySelector('.popup__title').textContent = offer.title;
  popupElementContainer.querySelector('.popup__text--address').textContent = offer.address;
  popupElementContainer.querySelector('.popup__text--address').textContent = '';
  makePopupPrice(popupElementContainer, offer.price);
  popupElementContainer.querySelector('.popup__type').textContent = translateAdvertType(offer.type);
  popupElementContainer.querySelector(
    '.popup__text--capacity',
  ).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElementContainer.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  makePopupFeatures(popupElementContainer, offer.features);
  popupElementContainer.querySelector('.popup__description').textContent = offer.description;
  makePopupPhotos(popupElementContainer, offer.photos);
  popupElementContainer.querySelector('.popup__avatar').src = author.avatar;
  checkEmptyBlock(popupElementContainer);
  return popupElementContainer;
};

export { makePopup };
