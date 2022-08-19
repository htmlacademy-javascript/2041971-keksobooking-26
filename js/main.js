import './form.js';
import './validation.js';
import {getMap} from './map.js';

import {getData} from './api.js';

const onGetDataSuccess = (data) => {
  getMap(data);
};

const onGetDataOnFail = () => {
  getMap();
};

getData(onGetDataSuccess, onGetDataOnFail);
