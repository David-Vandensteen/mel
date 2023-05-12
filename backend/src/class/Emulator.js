import { exec } from 'child-process-promise';
import config from '#src/config';

const emulators = config.emulators.slice();

export default class Emulator {
  static getEmulators() {
    return emulators.filter((emulator) => emulator.enable);
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
    let cmd = `${emulator.drive} && cd "${emulator.path}" && start ${emulator.exe} ${emulator.arg || ''} "${file}"`;
    if (emulator.exe === 'demul.exe') {
      cmd = `${emulator.drive} && cd "${emulator.path}" && start ${emulator.exe} ${emulator.arg || ''}"${file}"`;
    }

    return Emulator.kill(emulator.name)
      .finally(() => exec(cmd));
  }
}
