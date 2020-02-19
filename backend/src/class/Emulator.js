import config from '../config';
import { exec } from 'child-process-promise';

const emulators = config.emulators;

export default class Emulator {
  constructor() {
    return Emulator.getEmulators();
  }
  static getEmulators() {
    return emulators;
  }

  static run(name) {
    const emulator = emulators.find(emulator => emulator.name === name);
    return exec(emulator.path)
  }
}