import axios from 'axios';
import config from '../config';

export default class Emulator {
  static emulators () {
    return axios.get(`${config.backend.route}/emulators`)
      .then((response) => {
        return response.data;
      });
  }

  static run (emulator, file) {
    return axios.post(`${config.backend.route}/run`, {
      emulator,
      file,
    })
  }

  static killAll () {
    return axios.get(`${config.backend.route}/emulators/kill`)
      .catch(() => 'undifined');
  }
}