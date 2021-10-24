import { createAdverts } from './data.js';
import { makePopupList } from './popup.js';
import { deactivateForm, activateForm } from './form.js';
import { addAdvertFormChek } from './ad-form.js';


const adverts = createAdverts();
console.log(adverts);
const popupList = makePopupList(adverts);
const popupItems = popupList.querySelectorAll('.popup');
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popupItems[0]);

deactivateForm('ad-form');
activateForm('ad-form');
deactivateForm('map__filters');
activateForm('map__filters');

addAdvertFormChek();
