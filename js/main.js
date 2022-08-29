import {deactivatePage} from './form.js';
import './validation.js';
import {initFilter} from './filters.js';
import {getData} from './api.js';
import {getMap} from './map.js';

const getDataSuccess = (data) => {
  getMap(data);
  initFilter(data);
};

const getDataOnFail = () => {
  getMap();
};

deactivatePage();
getData(getDataSuccess, getDataOnFail);

