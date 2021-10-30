import { activateForm, deactivateForm } from './form.js';
import { addAdvertFormChek } from './ad-form.js';
import { loadMap, addMainPinMaker, addPinMaker } from './map.js';
import { getData } from './api.js';

deactivateForm('ad-form');
deactivateForm('map__filters');


loadMap(activateForm);
addMainPinMaker();
getData(addPinMaker, 10);


addAdvertFormChek();
