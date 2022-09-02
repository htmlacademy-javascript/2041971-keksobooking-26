import {deactivatePage, activateFilters} from './form.js';
import './validation.js';
import {setFilterListener} from './filters.js';
import {getData} from './api.js';
import {getMap} from './map.js';

const onLoadedSuccess = (data) => {
  getMap(data);
  activateFilters();
  setFilterListener(data);
};

const onLoadedFail = () => {
  deactivatePage();
  getMap();
};

deactivatePage();
getData(onLoadedSuccess, onLoadedFail);
