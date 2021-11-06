import { makePopup } from './popup.js';
import { getData } from './api.js';
import { filterAdvert, onFilterChange } from './map-filters.js';
import { debounce } from './debounce.js';

const FILTER_DELAY = 500;
const START_LAT = 35.6895;
const START_LNG = 139.692;
const map = L.map('map-canvas');
const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
  },
);
const advertAddressContainer = document.querySelector('#address');
const pinMarkersLayer = L.layerGroup().addTo(map);

/**
 * Добавляет главный маркер на карту.
 * Создает обработчик на главный маркер.
 * При добавлении в поле "Адрес (координаты)" устанавливается значение.
 * При переносе маркера в поле "Адрес (координаты)" меняется значение.
 */
const addMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 26],
  });

  mainPinMarker.setIcon(mainPinIcon);

  advertAddressContainer.value = `${mainPinMarker.getLatLng().lat}, ${mainPinMarker.getLatLng().lng}`;

  mainPinMarker.addEventListener('moveend', (evt) => {
    const markerLat = evt.target.getLatLng().lat.toFixed(5);
    const markerLng = evt.target.getLatLng().lng.toFixed(5);
    advertAddressContainer.value = `${markerLat}, ${markerLng}`;
  });

  mainPinMarker.addTo(map);
};

/**
 * Добавляет маркеры объявлений на карту.
 * Добавляет балуны при клике.
 * @param {Object[]} array - массив с данными для объявлений
 */
const addPinMarkers = (array) => {
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

    pinMarker.addTo(pinMarkersLayer);
    pinMarker.bindPopup(popup);
  });
};

/**
 * Убирает маркеры объявлений с карты
 */
const deletePinMarkers = () => {
  pinMarkersLayer.clearLayers();
};

/**
 * Загружает карту, активирует формы по окончанию.
 * Запрашивает у сервера похожие объявления.
 * Отрисовывает метку похожих объявлений на карту и добавляет фильтрацию.
 * Фильтрация производится с задержкой.
 * @param {function} activateForm - функция активации формы
 */
const loadMap = (activateForm) => {
  map.addEventListener('load', () => {
    activateForm('ad-form');
    addMainPinMarker();

    getData((data) => {
      filterAdvert(data);
      onFilterChange(debounce(() => filterAdvert(data), FILTER_DELAY));
      activateForm('map__filters');
    });
  });

  map.setView(
    {
      lat: START_LAT,
      lng: START_LNG,
    },
    12,
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

/**
 * Переносит главный маркер на начальные координаты
 */
const resetMainPinMarkerCoordinates = () => {
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
  advertAddressContainer.value = `${mainPinMarker.getLatLng().lat}, ${mainPinMarker.getLatLng().lng}`;
  map.closePopup();
};

export { loadMap, addMainPinMarker, addPinMarkers, deletePinMarkers, resetMainPinMarkerCoordinates };
