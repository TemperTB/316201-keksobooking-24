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

const advertForm = document.querySelector('.ad-form');
const advertFormSubmit = advertForm.querySelector('.ad-form__submit');
const advertFormReset = advertForm.querySelector('.ad-form__reset');
const advertTitle = advertForm.querySelector('#title');
const advertAddress = advertForm.querySelector('#address');
const advertType = advertForm.querySelector('#type');
const advertPrice = advertForm.querySelector('#price');
const advertTimeIn = advertForm.querySelector('#timein');
const advertTimeOut = advertForm.querySelector('#timeout');
const advertRoomNumber = advertForm.querySelector('#room_number');
const advertCapacity = advertForm.querySelector('#capacity');
const advertCapacityOptions = advertCapacity.querySelectorAll('option');
const advertFeatureCheckboxes = advertForm.querySelectorAll('.features__checkbox');
const advertDescription = advertForm.querySelector('#description');

/**
 * Очистка формы, перенос главной метки на карте в стандартное положение
 */
const resetAdvertForm = () => {
  advertTitle.value = '';
  advertType.value = Types.FLAT[0];
  advertPrice.value = '';
  advertTimeIn.value = '12:00';
  advertTimeOut.value = '12:00';
  advertRoomNumber.value = Rooms.ONE_ROOM.value;
  advertCapacity.value = Rooms.ONE_ROOM.valuesGuests;
  hideCapacityOption(advertCapacityOptions, Rooms.ONE_ROOM.valuesGuests);
  advertDescription.value = '';
  advertFeatureCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });

  resetMainPinMarkerCoordinates();
  changeBorderColor(advertTitle, COLOR_MODEL);
  changeBorderColor(advertPrice, COLOR_MODEL);
  changeBorderColor(advertCapacity, COLOR_MODEL);
};

/**
 * "Оживляет форму"
 */
const addAdvertFormChek = () => {
  /**
   * Добавляет обработчик ввода "заголовок объявления". При input происходит проверка на валидность
   */
  const onAdvertTypeInput = () => {
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

  /**
   * Добавляет обработчик изменения "тип жилья".
   * При изменении "тип жилья", меняется min "цена за ночь" и сразу проверяется
   */
  const onAdvertTypeChange = () => {
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

  /**
   * Добавляет обработчик ввода "цена за ночь".
   * При изменении "цена за ночь", происходит проверка на валидность
   */
  const onAdvertPriceInput = () => {
    advertPrice.addEventListener('input', () => {
      advertPrice.setCustomValidity(' ');
      checkAdvertPrice(advertPrice, +advertPrice.getAttribute('min'), MAX_PRICE);
      advertPrice.reportValidity();
    });
  };

  /**
   * Добавляет обработчики изменения времени заезда/выезда.
   * При изменении "время заезда" - "время выезда" изменяется на такое же.
   * И наоборот, при изменении "время выезда" - меняется "время заезда".
   */
  const onAdvertTymeChange = () => {
    advertTimeIn.addEventListener('change', () => {
      advertTimeOut.value = advertTimeIn.value;
    });

    advertTimeOut.addEventListener('change', () => {
      advertTimeIn.value = advertTimeOut.value;
    });
  };

  /**
   * Добавляет обрабочик изменения количества комнат.
   * При выборе "количество комнат", ограничивается выбор "количество мест"
   */
  const onAdvertRoomNumberChange = () => {
    advertRoomNumber.addEventListener('change', () => {
      switch (advertRoomNumber.value) {
        case Rooms.ONE_ROOM.value:
          hideCapacityOption(advertCapacityOptions, Rooms.ONE_ROOM.valuesGuests);
          break;
        case Rooms.TWO_ROOMS.value:
          hideCapacityOption(advertCapacityOptions, Rooms.TWO_ROOMS.valuesGuests);
          break;
        case Rooms.THREE_ROOMS.value:
          hideCapacityOption(advertCapacityOptions, Rooms.THREE_ROOMS.valuesGuests);
          break;
        case Rooms.ONE_HUNDRED_ROOMS.value:
          hideCapacityOption(advertCapacityOptions, Rooms.ONE_HUNDRED_ROOMS.valuesGuests);
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

  /**
   * Добавляет обработчик нажатия кнопки "Опубликовать".
   * Присходит валидация полей.
   * У полей не прошедших валидацию рамка становится красной.
   */
  const onAdvertFormSubmitClick = () => {
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

  /**
   * Добавляется обработчик нажатия кнопки 'Очистить'
   */
  const onFormResetClick = () => {
    advertFormReset.addEventListener('click', (evt) => {
      evt.preventDefault();
      resetAdvertForm();
      removeErrorBlock(advertTitle);
      removeErrorBlock(advertPrice);
      removeErrorBlock(advertCapacity);
    });
  };

  /**
   * Добавляет обработчик отправки формы.
   */
  const OnFormSubmit = () => {
    advertForm.addEventListener('submit', (evt) => {
      advertAddress.disabled = false;
      evt.preventDefault();
      sendData(new FormData(evt.target), resetAdvertForm);
      advertAddress.disabled = true;
    });
  };

  changeAdvertMinPrice(advertPrice, Types.FLAT[1]); //сразу выставляем минимальную цену на жилье
  hideCapacityOption(advertCapacityOptions, Rooms.ONE_ROOM.valuesGuests); //сразу ограничиваем выбор количества гостей для 'квартиры'
  onAdvertTypeInput();
  onAdvertTypeChange();
  onAdvertPriceInput();
  onAdvertTymeChange();
  onAdvertRoomNumberChange();
  onFormResetClick();
  onAdvertFormSubmitClick();
  OnFormSubmit();
};

/**
 * Добавляет предпоказ аватарки пользователя
 */
const addAvatarPreview = () => {
  const fileChooser = document.querySelector('#avatar');
  const preview = document.querySelector('.ad-form-header__preview').querySelector('img');

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

/**
 * Добавляет предпоказ фотографии объявления
 */
const addImagePreview = () => {
  const fileChooser = document.querySelector('#images');
  const preview = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.style.background = `url('${URL.createObjectURL(file)}')`;
      preview.style.backgroundSize = 'contain';
      preview.style.backgroundRepeat = 'no-repeat';
      preview.style.backgroundPosition = '50% 50%';
    }
  });
};

export { addAdvertFormChek, addAvatarPreview, addImagePreview };
