import { getRandomIntFromTo, getRandomIntFromToWithComma, getRandomArrayElement } from './utils/random.js';

const ADVERTS_COUNT = 10;

const IMAGES_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

const TITLES = ['Хрущевка', 'Сталинка', 'Румынка', 'Болгарка'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = ['Трущобы', 'Почти без тараканов', 'Царский ремонт', 'Цыганский ремонт', 'Косметика'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAdvert = () => {
  const randomIntForLat = getRandomIntFromToWithComma(35.65, 35.7, 5);
  const randomIntForLng = getRandomIntFromToWithComma(139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user${getRandomArrayElement(IMAGES_NUMBER)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomIntForLat}, ${randomIntForLng}`,
      price: getRandomIntFromTo(1, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntFromTo(1, 10),
      guests: getRandomIntFromTo(1, 10),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: FEATURES.slice(0, getRandomIntFromTo(1, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(0, getRandomIntFromTo(1, PHOTOS.length)),
    },
    location: {
      lat: randomIntForLat,
      lng: randomIntForLng,
    },
  };
};

const createAdverts = () => Array.from({ length: ADVERTS_COUNT }, createAdvert);

export { createAdverts };