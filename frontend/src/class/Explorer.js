import axios from 'axios';
import config from '../config';

export default class Explorer {
  init() {
    return axios.get(`${config.backend.route}/get/current-path`)
      .then((response) => {
        this.currentPath = response.data;
        return Promise.resolve(this.currentPath);
      });
  }

  get () {
    return axios.get(`${config.backend.route}/get`);
  }
}