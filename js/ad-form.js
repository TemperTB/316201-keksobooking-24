import {
  addErrorBlock,
  removeErrorBlock,
  addRedBorder,
  addGrayBorder,
  hideCapacityOption,
  checkAdvertPrice,
  changeAdvertMinPrice
} from './utils.js';

const addAdvertFormChek = () => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const Rooms = {
    ONE_ROOM: 1,
    TWO_ROOMS: 2,
    THREE_ROOMS: 3,
    ONE_HUNDRED_ROOMS: 100,
  };
  const Types = {
    BUNGALOW: ['bungalow', 0],
    FLAT: ['flat', 1000],
    HOTEL: ['hotel', 3000],
    HOUSE: ['house', 5000],
    PALACE: ['palace', 10000],
  };

  const advertForm = document.querySelector('.ad-form');
  const advertFormSubmit = advertForm.querySelector('.ad-form__submit');
  const advertTitle = advertForm.querySelector('#title');
  const advertType = advertForm.querySelector('#type');
  const advertPrice = advertForm.querySelector('#price');
  const advertTimeIn = advertForm.querySelector('#timein');
  const advertTimeOut = advertForm.querySelector('#timeout');
  const advertRoomNumber = advertForm.querySelector('#room_number');
  const advertCapacity = advertForm.querySelector('#capacity');
  const advertCapacityOptions = advertCapacity.querySelectorAll('option');

  changeAdvertMinPrice(advertPrice, Types.FLAT[1]); //сразу добавляем атрибут min

  hideCapacityOption(advertCapacityOptions, [0, 1, 3]); //сразу отключаем варианты выбора для квартиры

  const addCheckAdvertTitle = () => {
    advertTitle.addEventListener('input', () => {
      advertTitle.setCustomValidity(' ');
      const valueLength = advertTitle.value.length;
      removeErrorBlock(advertTitle);
      if (valueLength < MIN_TITLE_LENGTH) {
        addErrorBlock(advertTitle, `Мин. длина заголовка - ${MIN_TITLE_LENGTH} симв.`);
      } else if (valueLength > MAX_TITLE_LENGTH) {
        addErrorBlock(advertTitle, `Макс. длина заголовка - ${MAX_TITLE_LENGTH} симв.`);
      } else {
        advertTitle.setCustomValidity('');
        addGrayBorder(advertTitle);
      }
      advertTitle.reportValidity();
    });
  };

  const addChangeAdvertPricePlaceholder = () => {
    advertType.addEventListener('change', () => {
      switch (advertType.value) {
        case Types.BUNGALOW[0]:
          changeAdvertMinPrice(advertPrice, Types.BUNGALOW[1]);
          checkAdvertPrice(advertPrice, Types.BUNGALOW[1], MAX_PRICE);
          break;
        case Types.FLAT[0]:
          changeAdvertMinPrice(advertPrice, Types.FLAT[1]);
          checkAdvertPrice(advertPrice, Types.FLAT[1], MAX_PRICE);
          break;
        case Types.HOUSE[0]:
          changeAdvertMinPrice(advertPrice, Types.HOUSE[1]);
          checkAdvertPrice(advertPrice, Types.HOUSE[1], MAX_PRICE);
          break;
        case Types.PALACE[0]:
          changeAdvertMinPrice(advertPrice, Types.PALACE[1]);
          checkAdvertPrice(advertPrice, Types.PALACE[1], MAX_PRICE);
          break;
        case Types.HOTEL[0]:
          changeAdvertMinPrice(advertPrice, Types.HOTEL[1]);
          checkAdvertPrice(advertPrice, Types.HOTEL[1], MAX_PRICE);
          break;
      }
    });
  };

  const addCheckAdvertPrice = () => {

    advertPrice.addEventListener('input', () => {
      advertPrice.setCustomValidity(' ');
      checkAdvertPrice(advertPrice, +advertPrice.getAttribute('min'), MAX_PRICE);
      advertPrice.reportValidity();
    });

  };

  const addSynchronizationTime = () => {
    advertTimeIn.addEventListener('change', () => {
      advertTimeOut.value = advertTimeIn.value;
    });

    advertTimeOut.addEventListener('change', () => {
      advertTimeIn.value = advertTimeOut.value;
    });
  };

  const addCheckAdvertCapacity = () => {
    advertRoomNumber.addEventListener('change', () => {
      switch (advertRoomNumber.value) {
        case Rooms.ONE_ROOM:
          hideCapacityOption(advertCapacityOptions, [0, 1, 3]);
          break;
        case Rooms.TWO_ROOMS:
          hideCapacityOption(advertCapacityOptions, [0, 3]);
          break;
        case Rooms.THREE_ROOMS:
          hideCapacityOption(advertCapacityOptions, [3]);
          break;
        case Rooms.ONE_HUNDRED_ROOMS:
          hideCapacityOption(advertCapacityOptions, [0, 1, 2]);
          break;
      }

      const selectedCapacity = advertCapacity.selectedIndex;
      removeErrorBlock(advertCapacity);
      if (advertCapacityOptions[selectedCapacity].hasAttribute('disabled')) {
        addErrorBlock(advertCapacity, 'Выберите другое');
      }
    });

    advertCapacity.addEventListener('change', () => {
      removeErrorBlock(advertCapacity);
      addGrayBorder(advertCapacity);
    });
  };

  const checkFormValidate = () => {
    advertFormSubmit.addEventListener('click', (evt) => {
      let hasError = false;

      if (!advertTitle.validity.valid) {
        addRedBorder(advertTitle);
        hasError = true;
      }

      if (!advertPrice.validity.valid) {
        addRedBorder(advertPrice);
        hasError = 1;
      }

      const selectedCapacity = advertCapacity.selectedIndex;
      if (advertCapacityOptions[selectedCapacity].hasAttribute('disabled')) {
        addRedBorder(advertCapacity);
        hasError = 1;
      }

      if (hasError) {
        evt.preventDefault();
      }
    });
  };

  addCheckAdvertTitle();
  addChangeAdvertPricePlaceholder();
  addCheckAdvertPrice();
  addSynchronizationTime();
  addCheckAdvertCapacity();
  checkFormValidate();
};

export { addAdvertFormChek };
