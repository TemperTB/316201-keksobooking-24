import { addErrorBlock, removeErrorBlock, changeBorderColor, hideCapacityOption } from './utils.js';

const addAdvertFormChek = () => {
  const COLOR_RED = '#ff0000';
  /**
   * Стандартный цвет рамок согласно макету
   */
  const COLOR_MODEL = '#d9d9d3';
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const Rooms = {
    ONE_ROOM: '1',
    TWO_ROOMS: '2',
    THREE_ROOMS: '3',
    ONE_HUNDRED_ROOMS: '100',
  };
  const Guests = {
    ONE_ROOM: ['1'],
    TWO_ROOMS: ['1', '2'],
    THREE_ROOMS: ['1', '2', '3'],
    ONE_HUNDRED_ROOMS: ['0'],
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
        changeBorderColor(advertTitle, COLOR_MODEL);
      }
      advertTitle.reportValidity();
    });
  };

  /**
   * Добавляет/изменяет атрибут min и placeholder
   * @param {Object} element - элемент
   * @param {number} value - значение
   */
  const changeAdvertMinPrice = (element, value) => {
    element.min = value;
    element.placeholder = value;
  };

  /**
   * Сверяет value элемента с минимальным и максимальным значением.
   * При ошибке выводит подсказку.
   * В случае отсутствия ошибки перекрашивает рамку в стандартную
   * @param {Object} element - элемент для проверки
   * @param {number} min - минимальное значение
   * @param {number} max - максимальное значение
   */
  const checkAdvertPrice = (element, min, max) => {
    const value = +element.value;
    removeErrorBlock(element);
    if (value > max) {
      addErrorBlock(element, `Макс. цена за ночь ${max} руб.`);
    } else if (value < min && value !== 0) {
      addErrorBlock(element, `Мин. цена за ночь ${min} руб.`);
    } else {
      element.setCustomValidity('');
      changeBorderColor(element, COLOR_MODEL);
    }
  };

  const addChangeAdvertPricePlaceholder = () => {
    advertType.addEventListener('change', () => {
      switch (advertType.value) {
        case Types.BUNGALOW[0]:
          changeAdvertMinPrice(1, Types.BUNGALOW[1]);
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
          hideCapacityOption(advertCapacityOptions, Guests.ONE_ROOM);
          break;
        case Rooms.TWO_ROOMS:
          hideCapacityOption(advertCapacityOptions, Guests.TWO_ROOMS);
          break;
        case Rooms.THREE_ROOMS:
          hideCapacityOption(advertCapacityOptions, Guests.THREE_ROOMS);
          break;
        case Rooms.ONE_HUNDRED_ROOMS:
          hideCapacityOption(advertCapacityOptions, Guests.ONE_HUNDRED_ROOMS);
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
      changeBorderColor(advertCapacity, COLOR_MODEL);
    });
  };

  const checkFormValidate = () => {
    advertFormSubmit.addEventListener('click', (evt) => {
      let hasError = false;

      if (!advertTitle.validity.valid) {
        changeBorderColor(advertTitle, COLOR_RED);
        hasError = true;
      }

      if (!advertPrice.validity.valid) {
        changeBorderColor(advertPrice, COLOR_RED);
        hasError = true;
      }

      const selectedCapacity = advertCapacity.selectedIndex;
      if (advertCapacityOptions[selectedCapacity].hasAttribute('disabled')) {
        changeBorderColor(advertCapacity, COLOR_RED);
        hasError = true;
      }

      if (hasError) {
        evt.preventDefault();
      }
    });
  };

  changeAdvertMinPrice(advertPrice, Types.FLAT[1]); //сразу выставляем минимальную цену на жилье
  hideCapacityOption(advertCapacityOptions, Guests.ONE_ROOM); //сразу ограничиваем выбор количества гостей для 'квартиры'
  addCheckAdvertTitle();
  addChangeAdvertPricePlaceholder();
  addCheckAdvertPrice();
  addSynchronizationTime();
  addCheckAdvertCapacity();
  checkFormValidate();
};

export { addAdvertFormChek };
