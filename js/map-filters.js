import { addPinMarkers, deletePinMarkers } from './map.js';

const COUNT_ADVERTS = 10;
const DEFAULT_SETTING = 'any';
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

const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRoom = filterForm.querySelector('#housing-rooms');
const filterGuest = filterForm.querySelector('#housing-guests');
const filterFeature = filterForm.querySelector('.map__features');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

/**
 * Фильтрует массив данных сервера по текущим выбранным фильтрам
 * @param {Object} {offer} - данные объявления с сервера
 * @returns {boolean}
 */
const filterConfig = ({ offer }) => {
  let isApproach = true;

  if (filterType.value !== DEFAULT_SETTING && offer.type !== filterType.value) {
    isApproach = false;
  }

  switch (filterPrice.value) {
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

  if (filterRoom.value !== DEFAULT_SETTING && offer.rooms.toString() !== filterRoom.value) {
    isApproach = false;
  }

  if (filterGuest.value === '0' && offer.guests < 4) {
    isApproach = false;
  } else if (
    filterGuest.value !== DEFAULT_SETTING &&
    filterGuest.value !== '0' &&
    offer.guests.toString() !== filterGuest.value
  ) {
    isApproach = false;
  }

  filterFeatures.forEach((element) => {
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
  filterType.addEventListener('change', () => {
    cb();
  });
  filterPrice.addEventListener('change', () => {
    cb();
  });
  filterRoom.addEventListener('change', () => {
    cb();
  });
  filterGuest.addEventListener('change', () => {
    cb();
  });
  filterFeature.addEventListener('change', () => {
    cb();
  });
};

export { filterAdvert, onFilterChange };
