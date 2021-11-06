import { addErrorBlock, removeErrorBlock, changeBorderColor, hideCapacityOption } from './utils.js';
import { resetMainPinMarkerCoordinates } from './map.js';
import { sendData } from './api.js';

const COLOR_RED = '#ff0000';
/**
 * Стандартный цвет рамок согласно макету
 */
const COLOR_MODEL = '#d9d9d3';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
/**
 * value {string} - количество комнат
 * valuesGuests {Object[]} - значения, которые могут быть выбраны в списке "Количество мест"
 */
const Rooms = {
  ONE_ROOM: {
    value: '1',
    valuesGuests: ['1'],
  },
  TWO_ROOMS: {
    value: '2',
    valuesGuests: ['1', '2'],
  },
  THREE_ROOMS: {
    value: '3',
    valuesGuests: ['1', '2', '3'],
  },
  ONE_HUNDRED_ROOMS: {
    value: '100',
    valuesGuests: ['0'],
  },
};
/**
 * [0] - тип жилья, приходящий с сервера
 * [1] - минимальная цена
 */
const Types = {
  BUNGALOW: ['bungalow', 0],
  FLAT: ['flat', 1000],
  HOTEL: ['hotel', 3000],
  HOUSE: ['house', 5000],
  PALACE: ['palace', 10000],
};

const advertFormContainer = document.querySelector('.ad-form');
const advertFormSubmitContainer = advertFormContainer.querySelector('.ad-form__submit');
const advertFormResetContainer = advertFormContainer.querySelector('.ad-form__reset');
const advertTitleContainer = advertFormContainer.querySelector('#title');
const advertAddressContainer = advertFormContainer.querySelector('#address');
const advertTypeContainer = advertFormContainer.querySelector('#type');
const advertPriceContainer = advertFormContainer.querySelector('#price');
const advertTimeInContainer = advertFormContainer.querySelector('#timein');
const advertTimeOutContainer = advertFormContainer.querySelector('#timeout');
const advertRoomNumberContainer = advertFormContainer.querySelector('#room_number');
const advertCapacityContainer = advertFormContainer.querySelector('#capacity');
const advertCapacityOptionsContainers = advertCapacityContainer.querySelectorAll('option');
const advertFeatureCheckboxesContainers = advertFormContainer.querySelectorAll('.features__checkbox');
const advertDescriptionContainer = advertFormContainer.querySelector('#description');

/**
 * Очистка формы, перенос главной метки на карте в стандартное положение
 */
const resetAdvertForm = () => {
  advertTitleContainer.value = '';
  advertTypeContainer.value = Types.FLAT[0];
  advertPriceContainer.value = '';
  advertTimeInContainer.value = '12:00';
  advertTimeOutContainer.value = '12:00';
  advertRoomNumberContainer.value = Rooms.ONE_ROOM.value;
  advertCapacityContainer.value = Rooms.ONE_ROOM.valuesGuests;
  hideCapacityOption(advertCapacityOptionsContainers, Rooms.ONE_ROOM.valuesGuests);
  advertDescriptionContainer.value = '';
  advertFeatureCheckboxesContainers.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });

  resetMainPinMarkerCoordinates();
  changeBorderColor(advertTitleContainer, COLOR_MODEL);
  changeBorderColor(advertPriceContainer, COLOR_MODEL);
  changeBorderColor(advertCapacityContainer, COLOR_MODEL);
};

/**
 * "Оживляет форму"
 */
const addAdvertFormChek = () => {
  /**
   * Добавляет обработчик ввода "заголовок объявления". При input происходит проверка на валидность
   */
  const onAdvertTypeInput = () => {
    advertTitleContainer.addEventListener('input', () => {
      advertTitleContainer.setCustomValidity(' ');
      const valueLength = advertTitleContainer.value.length;
      removeErrorBlock(advertTitleContainer);
      if (valueLength < MIN_TITLE_LENGTH) {
        addErrorBlock(advertTitleContainer, `Мин. длина заголовка - ${MIN_TITLE_LENGTH} симв.`);
      } else if (valueLength > MAX_TITLE_LENGTH) {
        addErrorBlock(advertTitleContainer, `Макс. длина заголовка - ${MAX_TITLE_LENGTH} симв.`);
      } else {
        advertTitleContainer.setCustomValidity('');
        changeBorderColor(advertTitleContainer, COLOR_MODEL);
      }
      advertTitleContainer.reportValidity();
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

  /**
   * Добавляет обработчик изменения "тип жилья".
   * При изменении "тип жилья", меняется min "цена за ночь" и сразу проверяется
   */
  const onAdvertTypeChange = () => {
    advertTypeContainer.addEventListener('change', () => {
      switch (advertTypeContainer.value) {
        case Types.BUNGALOW[0]:
          changeAdvertMinPrice(advertPriceContainer, Types.BUNGALOW[1]);
          checkAdvertPrice(advertPriceContainer, Types.BUNGALOW[1], MAX_PRICE);
          break;
        case Types.FLAT[0]:
          changeAdvertMinPrice(advertPriceContainer, Types.FLAT[1]);
          checkAdvertPrice(advertPriceContainer, Types.FLAT[1], MAX_PRICE);
          break;
        case Types.HOUSE[0]:
          changeAdvertMinPrice(advertPriceContainer, Types.HOUSE[1]);
          checkAdvertPrice(advertPriceContainer, Types.HOUSE[1], MAX_PRICE);
          break;
        case Types.PALACE[0]:
          changeAdvertMinPrice(advertPriceContainer, Types.PALACE[1]);
          checkAdvertPrice(advertPriceContainer, Types.PALACE[1], MAX_PRICE);
          break;
        case Types.HOTEL[0]:
          changeAdvertMinPrice(advertPriceContainer, Types.HOTEL[1]);
          checkAdvertPrice(advertPriceContainer, Types.HOTEL[1], MAX_PRICE);
          break;
      }
    });
  };

  /**
   * Добавляет обработчик ввода "цена за ночь".
   * При изменении "цена за ночь", происходит проверка на валидность
   */
  const onAdvertPriceInput = () => {
    advertPriceContainer.addEventListener('input', () => {
      advertPriceContainer.setCustomValidity(' ');
      checkAdvertPrice(advertPriceContainer, +advertPriceContainer.getAttribute('min'), MAX_PRICE);
      advertPriceContainer.reportValidity();
    });
  };

  /**
   * Добавляет обработчики изменения времени заезда/выезда.
   * При изменении "время заезда" - "время выезда" изменяется на такое же.
   * И наоборот, при изменении "время выезда" - меняется "время заезда".
   */
  const onAdvertTimeChange = () => {
    advertTimeInContainer.addEventListener('change', () => {
      advertTimeOutContainer.value = advertTimeInContainer.value;
    });

    advertTimeOutContainer.addEventListener('change', () => {
      advertTimeInContainer.value = advertTimeOutContainer.value;
    });
  };

  /**
   * Добавляет обрабочик изменения количества комнат.
   * При выборе "количество комнат", ограничивается выбор "количество мест"
   */
  const onAdvertRoomNumberChange = () => {
    advertRoomNumberContainer.addEventListener('change', () => {
      switch (advertRoomNumberContainer.value) {
        case Rooms.ONE_ROOM.value:
          hideCapacityOption(advertCapacityOptionsContainers, Rooms.ONE_ROOM.valuesGuests);
          break;
        case Rooms.TWO_ROOMS.value:
          hideCapacityOption(advertCapacityOptionsContainers, Rooms.TWO_ROOMS.valuesGuests);
          break;
        case Rooms.THREE_ROOMS.value:
          hideCapacityOption(advertCapacityOptionsContainers, Rooms.THREE_ROOMS.valuesGuests);
          break;
        case Rooms.ONE_HUNDRED_ROOMS.value:
          hideCapacityOption(advertCapacityOptionsContainers, Rooms.ONE_HUNDRED_ROOMS.valuesGuests);
          break;
      }

      const selectedCapacity = advertCapacityContainer.selectedIndex;
      removeErrorBlock(advertCapacityContainer);
      if (advertCapacityOptionsContainers[selectedCapacity].hasAttribute('disabled')) {
        addErrorBlock(advertCapacityContainer, 'Выберите другое');
      }
    });

    advertCapacityContainer.addEventListener('change', () => {
      removeErrorBlock(advertCapacityContainer);
      changeBorderColor(advertCapacityContainer, COLOR_MODEL);
    });
  };

  /**
   * Добавляет обработчик нажатия кнопки "Опубликовать".
   * Присходит валидация полей.
   * У полей не прошедших валидацию рамка становится красной.
   */
  const onAdvertFormSubmitClick = () => {
    advertFormSubmitContainer.addEventListener('click', (evt) => {
      let hasError = false;

      if (!advertTitleContainer.validity.valid) {
        changeBorderColor(advertTitleContainer, COLOR_RED);
        hasError = true;
      }

      if (!advertPriceContainer.validity.valid) {
        changeBorderColor(advertPriceContainer, COLOR_RED);
        hasError = true;
      }

      const selectedCapacity = advertCapacityContainer.selectedIndex;
      if (advertCapacityOptionsContainers[selectedCapacity].hasAttribute('disabled')) {
        changeBorderColor(advertCapacityContainer, COLOR_RED);
        hasError = true;
      }

      if (hasError) {
        evt.preventDefault();
      }
    });
  };

  /**
   * Добавляется обработчик нажатия кнопки 'Очистить'
   */
  const onFormResetClick = () => {
    advertFormResetContainer.addEventListener('click', (evt) => {
      evt.preventDefault();
      resetAdvertForm();
      removeErrorBlock(advertTitleContainer);
      removeErrorBlock(advertPriceContainer);
      removeErrorBlock(advertCapacityContainer);
    });
  };

  /**
   * Добавляет обработчик отправки формы.
   */
  const onFormSubmit = () => {
    advertFormContainer.addEventListener('submit', (evt) => {
      advertAddressContainer.disabled = false;
      evt.preventDefault();
      sendData(new FormData(evt.target), resetAdvertForm);
      advertAddressContainer.disabled = true;
    });
  };

  changeAdvertMinPrice(advertPriceContainer, Types.FLAT[1]); //сразу выставляем минимальную цену на жилье
  hideCapacityOption(advertCapacityOptionsContainers, Rooms.ONE_ROOM.valuesGuests); //сразу ограничиваем выбор количества гостей для 'квартиры'
  onAdvertTypeInput();
  onAdvertTypeChange();
  onAdvertPriceInput();
  onAdvertTimeChange();
  onAdvertRoomNumberChange();
  onFormResetClick();
  onAdvertFormSubmitClick();
  onFormSubmit();
};

/**
 * Добавляет предпоказ аватарки пользователя
 */
const addAvatarPreviewContainer = () => {
  const fileChooserContainer = document.querySelector('#avatar');
  const previewContainer = document.querySelector('.ad-form-header__previewContainer').querySelector('img');

  fileChooserContainer.addEventListener('change', () => {
    const file = fileChooserContainer.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewContainer.src = URL.createObjectURL(file);
    }
  });
};

/**
 * Добавляет предпоказ фотографии объявления
 */
const addImagePreviewContainer = () => {
  const fileChooserContainer = document.querySelector('#images');
  const previewContainer = document.querySelector('.ad-form__photo');

  fileChooserContainer.addEventListener('change', () => {
    const file = fileChooserContainer.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewContainer.style.background = `url('${URL.createObjectURL(file)}')`;
      previewContainer.style.backgroundSize = 'contain';
      previewContainer.style.backgroundRepeat = 'no-repeat';
      previewContainer.style.backgroundPosition = '50% 50%';
    }
  });
};

export { addAdvertFormChek, addAvatarPreviewContainer, addImagePreviewContainer };
