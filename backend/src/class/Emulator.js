import { exec } from 'child-process-promise';
import config from '../config';

// const { log, error } = console;

const emulators = config.emulators.slice();

export default class Emulator {
  constructor() {
    return Emulator.getEmulators();
  }

  static getEmulators() {
    return emulators;
  }

  static getEmulatorByName(name) {
    return emulators.find((emulator) => emulator.name === name);
  }

  static kill(emulatorName) {
    const cmd = `taskkill /F /IM ${Emulator.getEmulatorByName(emulatorName).process}`;
    return exec(cmd)
      .catch(() => 'undefined');
  }

  static killAll() {
    const proms = [];
    emulators.forEach((emulator) => {
      proms.push(Emulator.kill(emulator.name));
    });
    return Promise.all(proms)
      .catch(() => 'undefined');
  }

  static run(emulatorName, file) {
    const emulator = Emulator.getEmulatorByName(emulatorName);
    const cmd = `"${emulator.path}" ${emulator.arg || ''} "${file}"`;
    console.log(cmd);
    return Emulator.kill(emulator.name)
      .finally(() => exec(cmd));
  }
}
