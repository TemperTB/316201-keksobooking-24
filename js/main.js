import { createAdverts } from './data.js';
import { activateForm, deactivateForm } from './form.js';
import { addAdvertFormChek } from './ad-form.js';
import { loadMap, addMainPinMaker, addPinMaker } from './map.js';

deactivateForm('ad-form');
deactivateForm('map__filters');

const adverts = createAdverts();
loadMap(activateForm);
addMainPinMaker();
addPinMaker(adverts);


addAdvertFormChek();
