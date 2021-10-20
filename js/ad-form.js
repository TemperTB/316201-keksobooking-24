import { addErrorBlock, removeErrorBlock, addRedBorder, addGrayBorder, hideCapacityOption } from './utils.js';

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

  const advertForm = document.querySelector('.ad-form');
  const advertFormSubmit = advertForm.querySelector('.ad-form__submit');
  const advertTitle = advertForm.querySelector('#title');
  const advertPrice = advertForm.querySelector('#price');
  const advertRoomNumber = advertForm.querySelector('#room_number');
  const advertCapacity = advertForm.querySelector('#capacity');
  const advertCapacityOptions = advertCapacity.querySelectorAll('option');

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

  const addCheckAdvertPrice = () => {

    advertPrice.addEventListener('input', () => {
      advertPrice.setCustomValidity(' ');
      const value = advertPrice.value;
      removeErrorBlock(advertPrice);
      if (value > MAX_PRICE) {
        addErrorBlock(advertPrice, `Макс. цена за ночь ${MAX_PRICE} руб.`);
      } else {
        advertPrice.setCustomValidity('');
        addGrayBorder(advertPrice);
      }
      advertPrice.reportValidity();
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
  addCheckAdvertPrice();
  addCheckAdvertCapacity();
  checkFormValidate();
};

export { addAdvertFormChek };
