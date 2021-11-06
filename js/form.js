/**
 * Деактивация формы
 * @param {string} formClass - class формы из разметки
 */
const deactivateForm = (formClass) => {
  const formContainer = document.querySelector(`.${formClass}`);
  const formElementsContainers = formContainer.querySelectorAll('fieldset');
  formContainer.classList.add(`${formClass}--disabled`);
  formElementsContainers.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

/**
 * Активация формы
 * @param {string} formClass - class формы из разметки
 */
const activateForm = (formClass) => {
  const formContainer = document.querySelector(`.${formClass}`);
  const formElementsContainers = formContainer.querySelectorAll('fieldset');
  formContainer.classList.remove(`${formClass}--disabled`);
  formElementsContainers.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};

export { deactivateForm, activateForm };
