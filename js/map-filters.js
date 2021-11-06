import { addPinMarkers, deletePinMarkers } from './map.js';

const COUNT_ADVERTS = 10;
const DEFAULT_SETTING = 'any';
const MAX_COUNT_GUESTS = 3;
const Price = {
  LOW: {
    min: 0,
    max: 10000,
  },
  MIDDLE: {
    min: 10000,
    max: 50000,
  },
  HIGH: {
    min: 50000,
    max: Infinity,
  },
};

const filterFormContainer = document.querySelector('.map__filters');
const filterTypeContainer = filterFormContainer.querySelector('#housing-type');
const filterPriceContainer = filterFormContainer.querySelector('#housing-price');
const filterRoomContainer = filterFormContainer.querySelector('#housing-rooms');
const filterGuestContainer = filterFormContainer.querySelector('#housing-guests');
const filterFeatureContainer = filterFormContainer.querySelector('.map__features');
const filterFeaturesContainers = filterFormContainer.querySelectorAll('.map__checkbox');

/**
 * Фильтрует массив данных сервера по текущим выбранным фильтрам
 * @param {Object} {offer} - данные объявления с сервера
 * @returns {boolean}
 */
const filterConfig = ({ offer }) => {
  let isApproach = true;

  if (filterTypeContainer.value !== DEFAULT_SETTING && offer.type !== filterTypeContainer.value) {
    isApproach = false;
  }

  switch (filterPriceContainer.value) {
    case 'any':
      break;
    case 'low':
      if (offer.price < Price.LOW.min || offer.price > Price.LOW.max) {
        isApproach = false;
      }
      break;
    case 'middle':
      if (offer.price < Price.MIDDLE.min || offer.price > Price.MIDDLE.max) {
        isApproach = false;
      }
      break;
    case 'high':
      if (offer.price < Price.HIGH.min) {
        isApproach = false;
      }
      break;
  }

  if (filterRoomContainer.value !== DEFAULT_SETTING && offer.rooms.toString() !== filterRoomContainer.value) {
    isApproach = false;
  }

  if (filterGuestContainer.value === '0' && offer.guests <= MAX_COUNT_GUESTS) {
    isApproach = false;
  } else if (
    filterGuestContainer.value !== DEFAULT_SETTING &&
    filterGuestContainer.value !== '0' &&
    offer.guests.toString() !== filterGuestContainer.value
  ) {
    isApproach = false;
  }

  filterFeaturesContainers.forEach((element) => {
    if (element.checked) {
      if (typeof offer['features'] === 'undefined') {
        isApproach = false;
      } else if (!offer.features.includes(element.value)) {
        isApproach = false;
      }
    }
  });

  return isApproach;
};

/**
 * Фильтрует входные данные с сервера для отображения на карте.
 * @param {Object[]} data
 */
const filterAdvert = (data) => {
  const dataAfterFilter = data.filter(filterConfig);
  deletePinMarkers();
  addPinMarkers(dataAfterFilter.slice(0, COUNT_ADVERTS));
};

/**
 * Добавляет обработчики для фильтрации объявлений на карте.
 * @param {function} cb - функция для фильтрации данных
 */
const onFilterChange = (cb) => {
  filterTypeContainer.addEventListener('change', () => {
    cb();
  });
  filterPriceContainer.addEventListener('change', () => {
    cb();
  });
  filterRoomContainer.addEventListener('change', () => {
    cb();
  });
  filterGuestContainer.addEventListener('change', () => {
    cb();
  });
  filterFeatureContainer.addEventListener('change', () => {
    cb();
  });
};

export { filterAdvert, onFilterChange };
