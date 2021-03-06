import { showSuccessMessageToUser, showErrorMessageToUser } from './utils.js';
/**
 * Получение данных от сервера
 * @param {function} onSucess - действие с данными при их успешном получении (json)
 */
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => showErrorMessageToUser('get-error'));
};

/**
 * Отправка данных на сервер
 * @param {Object} body - данные для отправки
 * @param {function} resetForm - функция для очистики формы
 */
const sendData = (body, resetForm) => {
  fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        showSuccessMessageToUser();
        resetForm();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showErrorMessageToUser('error');
    });
};

export { getData, sendData };
