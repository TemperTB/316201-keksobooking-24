/**
 * Деактивация формы
 * @param {string} formClass - class формы из разметки
 */
const deactivateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('fieldset');
  form.classList.add(`${formClass}--disabled`);
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

/**
 * Активация формы
 * @param {string} formClass - class формы из разметки
 */
const activateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('fieldset');
  form.classList.remove(`${formClass}--disabled`);
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};

export { deactivateForm, activateForm };
