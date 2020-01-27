import axios from 'axios';
import config from '../config';

export default class Explorer {
  init () {
    return axios.get(`${config.backend.route}/get/current-path`)
      .then((response) => {
        this.currentPath = response.data;
        return Promise.resolve(this.currentPath);
      });
  }

  get () {
    return axios.get(`${config.backend.route}/get`)
      .then((response) => {
        return Promise.resolve(response.data);
      });
  }

  static trunk (items, begin, deepth) {
    const response = [];
    let count = deepth;
    let i = 0;
    items.forEach((item) => {
      if (i >= begin && count > 0) {
        response.push(item);
        count -=1;
      }
      i += 1;
    });
    return response;
  }
}