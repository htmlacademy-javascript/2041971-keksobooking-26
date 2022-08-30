import {deactivatePage, activateFilters} from './form.js';
import './validation.js';
import {initiateFilter} from './filters.js';
import {getData} from './api.js';
import {getMap} from './map.js';

const getDataSuccess = (data) => {
  getMap(data);
  activateFilters();
  initiateFilter(data);
};

const getDataOnFail = () => {
  deactivatePage();
  getMap();
};

deactivatePage();
getData(getDataSuccess, getDataOnFail);

