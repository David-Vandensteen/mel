import axios from 'axios';
import getRoute from './getRoute';

export default class Emulator {
  static emulators () {
    return axios.get(`${getRoute()}/emulators`)
      .then((response) => {
        return response.data;
    });
  }

  static run (emulator, file) {
    return axios.post(`${getRoute()}/run`, {
      emulator,
      file,
    })
  }

  static killAll () {
    return axios.get(`${getRoute()}/emulators/kill`)
      .catch(() => 'undifined');
  }
}