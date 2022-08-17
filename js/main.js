import './form.js';
import './validation.js';
import {getMap} from './map.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

const onGetDataSuccess = (data) => {
  getMap(data);
};

getData(onGetDataSuccess, showAlert);
