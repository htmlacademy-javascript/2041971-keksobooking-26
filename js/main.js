import {deactivatePage} from './form.js';
import {initiateSlider} from './slider.js';
import './validation.js';
import {initFilter} from './filters.js';
import {getData} from './api.js';
import {getMap} from './map.js';
import './add-photo.js';

deactivatePage();
initiateSlider();

const getDataSuccess = (data) => {
  getMap(data);
  initFilter(data);
};

const getDataOnFail = () => {
  getMap();
};

getData(getDataSuccess, getDataOnFail);
