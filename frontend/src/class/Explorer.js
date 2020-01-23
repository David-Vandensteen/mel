import axios from 'axios';
import config from '../config';

export default class Explorer {
  init () {
    return new Promise((resolve, reject) => {
      axios.get(`${config.backend.route}/get/current-path`)
        .then((response) => {
          this.currentPath = response.data;
          resolve(this.currentPath);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  get () {
    return axios.get(`${config.backend.route}/get`);
  }
}