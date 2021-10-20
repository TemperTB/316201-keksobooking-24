const getRandomIntFromTo = (from, to) => {
  if (from < 0 || to <= from) {
    return false;
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const getRandomIntFromToWithComma = (from, to, countSignsAfterComma) => {
  if (from < 0 || to <= from) {
    return false;
  }
  return (Math.random() * (to - from) + from).toFixed(countSignsAfterComma);
};

const getRandomArrayElement = (elements) => elements[getRandomIntFromTo(0, elements.length - 1)];

const translateAdvertType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const addErrorBlock = (element, errorMessage) => {
  const block = document.createElement('div');
  block.classList.add('add-form__error');
  block.textContent = errorMessage;
  element.after(block);
};

const removeErrorBlock = (neighborBlock) => {
  if (neighborBlock.nextElementSibling) {
    neighborBlock.nextElementSibling.remove();
  }
};

const addRedBorder = (block) => {
  block.style.borderColor = '#ff0000';
};

const addGrayBorder = (block) => {
  block.style.borderColor = '#d9d9d3';
};

const hideCapacityOption = (options, numbersChildForHide) => {
  nextOption: for (let i = 0; i < options.length; i++) {
    options[i].removeAttribute('disabled');
    for (let j = 0; j < numbersChildForHide.length; j++) {
      if (i === numbersChildForHide[j]) {
        options[i].setAttribute('disabled', 'disabled');
        continue nextOption;
      }
    }
  }
};

const checkAdvertPrice = (element, min, max) => {
  const value = +element.value;
  removeErrorBlock(element);
  if (value > max) {
    addErrorBlock(element, `Макс. цена за ночь ${max} руб.`);
  } else if (value < min) {
    addErrorBlock(element, `Мин. цена за ночь ${min} руб.`);
  } else {
    element.setCustomValidity('');
    addGrayBorder(element);
  }
};

const changeAdvertMinPrice = (element, value) => {
  element.setAttribute('min', value);
  element.placeholder = value;
};


export {
  getRandomIntFromTo,
  getRandomIntFromToWithComma,
  getRandomArrayElement,
  translateAdvertType,
  addErrorBlock,
  removeErrorBlock,
  addRedBorder,
  addGrayBorder,
  hideCapacityOption,
  checkAdvertPrice,
  changeAdvertMinPrice
};
