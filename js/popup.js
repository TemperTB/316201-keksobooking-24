import { translateAdvertType } from './utils.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const popupFragment = document.createDocumentFragment();

/**
 * Изменяет "цена за ночь"
 * @param {Object} popupElement - карточка объявления
 * @param {number} price - цена
 */
const makePopupPrice = (element, price) => {
  const popupPriceBlock = element.querySelector('.popup__text--price');
  const newElement = document.createElement('span');
  newElement.textContent = '₽/ночь';
  popupPriceBlock.textContent = `${price} `;
  popupPriceBlock.appendChild(newElement);
};

/**
 * Добавляет фотографии
 * @param {Object} element - карточка объявления
 * @param {Object[]} price - массив с src к фотографиям
 */
const makePopupPhotos = (element, photos) => {
  const popupPhotos = element.querySelector('.popup__photos');
  if (photos.length === 0) {
    popupPhotos.style.display = 'none';
    return;
  }
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhoto.remove();
  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupPhotos.appendChild(photo);
  });
};

/**
 * Добавляет иконки "особенностей"
 * @param {Object} element - карточка объявления
 * @param {Object[]} features - особенности
 * @returns
 */
const makePopupFeatures = (element, features) => {
  const popupFeatures = element.querySelector('.popup__features');
  if (features.length === 0) {
    popupFeatures.style.display = 'none';
    return;
  }
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesList.forEach((popupFeaturesItem) => {
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
 * Создает карточки объявлений на основе данных с сервера
 * @param {Object[]} array - данные с сервера для создания карточек объявлений
 * @returns {Object} - карточки объявлений
 */
const makePopupList = (array) => {
  array.forEach(({ author, offer }) => {
    const popupElement = popupTemplate.cloneNode(true);
    popupElement.querySelector('.popup__title').textContent = offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.address;
    popupElement.querySelector('.popup__text--address').textContent = '';
    makePopupPrice(popupElement, offer.price);
    popupElement.querySelector('.popup__type').textContent = translateAdvertType(offer.type);
    popupElement.querySelector(
      '.popup__text--capacity'
    ).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    popupElement.querySelector(
      '.popup__text--time'
    ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    makePopupFeatures(popupElement, offer.features);
    popupElement.querySelector('.popup__description').textContent = offer.description;
    makePopupPhotos(popupElement, offer.photos);
    popupElement.querySelector('.popup__avatar').src = author.avatar;
    checkEmptyBlock(popupElement);
    popupFragment.appendChild(popupElement);
  });
  return popupFragment;
};

export { makePopupList };
