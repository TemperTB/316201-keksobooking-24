import { addErrorBlock, removeErrorBlock, addRedBorder, addGrayBorder, hideCapacityOption } from './utils.js';

const addAdvertFormCheks = () => {
  const advertForm = document.querySelector('.ad-form');
  const advertFormSubmit = advertForm.querySelector('.ad-form__submit');
  const advertTitle = advertForm.querySelector('#title');
  const advertPrice = advertForm.querySelector('#price');
  const advertRoomNumber = advertForm.querySelector('#room_number');
  const advertCapacity = advertForm.querySelector('#capacity');
  const advertCapacityOptions = advertCapacity.querySelectorAll('option');

  hideCapacityOption(advertCapacityOptions, [0, 1, 3]); //сразу отключаем варианты выбора для квартиры

  const addCheckAdvertTitle = () => {
    const MIN_TITLE_LENGTH = 30;
    const MAX_TITLE_LENGTH = 100;

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
    const MAX_PRICE = 1000000;

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
        case '1':
          hideCapacityOption(advertCapacityOptions, [0, 1, 3]);
          break;
        case '2':
          hideCapacityOption(advertCapacityOptions, [0, 3]);
          break;
        case '3':
          hideCapacityOption(advertCapacityOptions, [3]);
          break;
        case '100':
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
      let flag = 0;
      if (!advertTitle.validity.valid) {
        addRedBorder(advertTitle);
        flag = 1;
      }
      if (!advertPrice.validity.valid) {
        addRedBorder(advertPrice);
        flag = 1;
      }

      const selectedCapacity = advertCapacity.selectedIndex;
      if (advertCapacityOptions[selectedCapacity].hasAttribute('disabled')) {
        addRedBorder(advertCapacity);
        flag = 1;
      }

      if (flag === 1) {
        evt.preventDefault();
      }
    });
  };

  addCheckAdvertTitle();
  addCheckAdvertPrice();
  addCheckAdvertCapacity();
  checkFormValidate();
};

export { addAdvertFormCheks };
