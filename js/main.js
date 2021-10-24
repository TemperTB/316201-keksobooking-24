import { makePopupList } from './popup.js';
import { deactivateForm, activateForm } from './form.js';
import { addAdvertFormChek } from './ad-form.js';

const mapCanvas = document.querySelector('#map-canvas');
const popupList = makePopupList();
const popupItems = popupList.querySelectorAll('.popup');
mapCanvas.appendChild(popupItems[0]);

deactivateForm('ad-form');
activateForm('ad-form');
deactivateForm('map__filters');
activateForm('map__filters');

addAdvertFormChek();
