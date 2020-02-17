import config from '../config';
const emulators = config.emulators;

export default class Emulator {
  constructor() {
    return Emulator.getEmulators();
  }
  static getEmulators() {
    return emulators;
  }
}