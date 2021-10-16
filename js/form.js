const deactivateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('fieldset');
  form.classList.add(`${formClass}--disabled`);
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

const activateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  const formElements = form.querySelectorAll('fieldset');
  form.classList.remove(`${formClass}--disabled`);
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};

export { deactivateForm, activateForm };
