
/**
 * Получение данных от сервера
 * @param {function} onSucess - действие с данными при их успешном получении (json)
 * @param {number} count - количество меток, которые берем для отрисовки на карте \n
 * ///! count временное значение для дз!
 */
const getData = (onSuccess, count) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data.slice(0, count));
    });
};

export { getData };
