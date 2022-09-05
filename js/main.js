import {deactivatePage} from './form.js';
import './validation.js';
import {activateFilters, setFilterChange} from './filters.js';
import {getData} from './api.js';
import {getMap} from './map.js';

const onLoadedSuccess = (data) => {
  getMap(data);
  activateFilters(data);
  setFilterChange();
};

const onLoadedFail = () => {
  deactivatePage();
  getMap();
};

deactivatePage();
getData(onLoadedSuccess, onLoadedFail);
