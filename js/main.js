import {deactivatePage, activateFilters} from './form.js';
import {initiateSlider} from './slider.js';
import './validation.js';
import {getMap} from './map.js';
import {getData} from './api.js';
import './filters.js';

deactivatePage();
initiateSlider();
const onGetDataSuccess = (data) => {
  getMap(data);
  activateFilters();
};

const onGetDataOnFail = () => {
  getMap();
};

getData(onGetDataSuccess, onGetDataOnFail);
