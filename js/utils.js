
/**
 * Возвращает случайное целое число из заданного диапазона [вкючительно]
 * либо false если одно из чисел отрицательно, либо to <= from
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
 * либо false если одно из чисел отрицательно, либо to <= from
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
 * @example // returns 'Квартира'
 * translateAdvertType('flat');
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
 * Меняет цвет рамки у элемента
 * @param {Object} element - элемент
 * @param {string} color - цвет
 */
const changeBorderColor = (element, color) => {
  element.style.borderColor = color;
};

/**
 *Оставляет возможность выбора определенных пунктов выпадающего списка
 * @param {Object} options - пункты выпадающего списка
 * @param {Object[]} numbersChildForHide - значения, которые нужно оставить
 */
const hideCapacityOption = (options, values) => {
  nextOption: for (let i = 0; i < options.length; i++) {
    options[i].setAttribute('disabled', 'disabled');
    for (let j = 0; j < values.length; j++) {
      if (options[i].value === values[j]) {
        options[i].removeAttribute('disabled');
        continue nextOption;
      }
    }
  }
};

export {
  getRandomIntFromTo,
  getRandomIntFromToWithComma,
  getRandomArrayElement,
  translateAdvertType,
  addErrorBlock,
  removeErrorBlock,
  changeBorderColor,
  hideCapacityOption
};
