import { makePopup } from './popup.js';

const map = L.map('map-canvas');

/**
 * Загружает карту, активирует формы по окончанию
 * @param {function activateForm} - функция активации формы
 */
const loadMap = (activateForm) => {
  map.addEventListener('load', () => {
    activateForm('map__filters');
    activateForm('ad-form');
  });

  map.setView(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    12,
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

/**
 * Добавляет главный маркер/
 * Создает обработчик на главный маркер.
 * При переносе маркера в поле "Адрес (координаты)" меняется значение
 */
const addMainPinMaker = () => {
  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 26],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  const advertAddress = document.querySelector('#address');
  advertAddress.value = `${mainPinMarker.getLatLng().lat}, ${
    mainPinMarker.getLatLng().lng
  }`;

  mainPinMarker.addEventListener('moveend', (evt) => {
    const markerLat = evt.target.getLatLng().lat.toFixed(5);
    const markerLng = evt.target.getLatLng().lng.toFixed(5);
    advertAddress.value = `${markerLat}, ${markerLng}`;
  });

  mainPinMarker.addTo(map);
};

/**
 * Добавляет маркеры объявлений на карту
 * Добавляет балуны и при клике
 * @param {Object[]} array - массив с данными для объявлений
 */
const addPinMaker = (array) => {
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  array.forEach(({ author, offer, location }) => {
    const pinMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    const popup = makePopup(author, offer);

    pinMarker.addTo(map);
    pinMarker.bindPopup(popup);
  });
};

export { loadMap, addMainPinMaker, addPinMaker };