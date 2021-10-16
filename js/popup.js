import { createAdverts } from './data.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const adverts = createAdverts();

const popupFragment = document.createDocumentFragment();

const translatePopupType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const makePopupPrice = (popupElement, price) => {
  const popupPriceBlock = popupElement.querySelector('.popup__text--price');
  const newElement = document.createElement('span');
  newElement.textContent = '₽/ночь';
  popupPriceBlock.textContent = `${price} `;
  popupPriceBlock.appendChild(newElement);
};

const makePopupPhotos = (popupElement, photos) => {
  const popupPhotos = popupElement.querySelector('.popup__photos');
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

const makePopupFeatures = (popupElement, features) => {
  const popupFeatures = popupElement.querySelector('.popup__features');
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

const checkEmptyBlock = (fragment) => {
  const fragmentChildren = fragment.childNodes;
  fragmentChildren.forEach((child) => {
    if (child.textContent === '') {
      child.style.display = 'none';
    }
  });
};

const makePopupList = () => {
  adverts.forEach(({ author, offer }) => {
    const popupElement = popupTemplate.cloneNode(true);
    popupElement.querySelector('.popup__title').textContent = offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.address;
    popupElement.querySelector('.popup__text--address').textContent = '';
    makePopupPrice(popupElement, offer.price);
    popupElement.querySelector('.popup__type').textContent = translatePopupType(offer.type);
    popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
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
