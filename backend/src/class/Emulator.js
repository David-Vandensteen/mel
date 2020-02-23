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

  static getEmulatorByName(name) {
    return emulators.find(emulator => emulator.name === name);
  }

  static kill(emulatorName) {
    const cmd = `taskkill /F /IM ${Emulator.getEmulatorByName(emulatorName).process}`;
    return exec(cmd)
      .catch();
  }

  static killAll() {

  }

  static run(emulatorName, file) {
    const emulator = Emulator.getEmulatorByName(emulatorName);
    const cmd = `"${emulator.path}" ${emulator.arg || ''} "${file}"`;
    return Emulator.kill(emulator.name)
      .finally(() => {
        return exec(cmd)
      })
  }
}