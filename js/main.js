import { makePopupList } from './popup.js';
import { deactivateForm, activateForm } from './form.js';
import { addAdvertFormCheks } from './ad-form.js';

const mapCanvas = document.querySelector('#map-canvas');
const popupList = makePopupList();
const firstPopupItem = popupList.querySelectorAll('.popup');
mapCanvas.appendChild(firstPopupItem[0]);

deactivateForm('ad-form');
activateForm('ad-form');
deactivateForm('map__filters');
activateForm('map__filters');

addAdvertFormCheks();
