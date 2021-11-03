import { activateForm, deactivateForm } from './form.js';
import { addAdvertFormChek } from './ad-form.js';
import { loadMap } from './map.js';


deactivateForm('ad-form');
deactivateForm('map__filters');


loadMap(activateForm);


addAdvertFormChek();
