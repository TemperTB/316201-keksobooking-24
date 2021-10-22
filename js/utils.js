
/**
 * Возвращает случайное целое число из заданного диапазона [вкючительно]
 * @param {number} from - нижний диапазон
 * @param {number} to - верхний диапазон
 * @returns {number} - целое число
 */
const getRandomIntFromTo = (from, to) => {
  if (from < 0 || to <= from) {
    return false;
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

/**
 * Возвращает случайное целое число из заданного диапазона (не включая верхний диапазон) с заданным количеством знаков после запятой
 * @param {number} from - нижний диапазон
 * @param {number} to - верхний диапазон
 * @param {number} countSignsAfterComma - количество знаков после запятой
 * @returns {number}
 */
const getRandomIntFromToWithComma = (from, to, countSignsAfterComma) => {
  if (from < 0 || to <= from) {
    return false;
  }
  return (Math.random() * (to - from) + from).toFixed(countSignsAfterComma);
};

/**
 * Возвращает случаный элемент массива
 * @param {Object[]} elements - массив
 * @returns - cлучаный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomIntFromTo(0, elements.length - 1)];

/**
 * Переводит тип жилья в объявлении в читабельном для пользователя виде
 * @param {string} type - данные от сервера
 * @example
 * // returns 'Квартира'
 * translateAdverttype('flat');
 * @returns {string}
 */
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

/**
 * Добавляет под элементом блок, в котором содержится подсказка об ошибке
 * @param {Object} element - элемент, после которого нужного поставить блок в разметке
 * @param {string} errorMessage - подсказка
 */
const addErrorBlock = (element, errorMessage) => {
  const block = document.createElement('div');
  block.classList.add('add-form__error');
  block.textContent = errorMessage;
  element.after(block);
};

/**
 * Удаляет блок, в котором содержится подсказка об ошибке
 * @param {Object} previousBlock - элемент, после которого расположен блок с ошибкой в разметке (сосед)
 */
const removeErrorBlock = (previousElement) => {
  if (previousElement.nextElementSibling) {
    previousElement.nextElementSibling.remove();
  }
};

/**
 * Меняет цвет рамки у элемента на красный (#ff0000)
 * @param {Object} element
 */
const addRedBorder = (element) => {
  element.style.borderColor = '#ff0000';
};

/**
 * Меняет цвет рамки у элемента на серый (#d9d9d3)
 * @param {Object} element
 */
const addGrayBorder = (element) => {
  element.style.borderColor = '#d9d9d3';
};


const hideCapacityOption = (options, numbersChildForHide) => {
  tag: for (let i = 0; i < options.length; i++) {
    options[i].removeAttribute('disabled');
    for (let j = 0; j < numbersChildForHide.length; j++) {
      if (i === numbersChildForHide[j]) {
        options[i].setAttribute('disabled', 'disabled');
        continue tag;
      }
    }
  }
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
  hideCapacityOption
};
