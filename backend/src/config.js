import snes9x from './emulators/snes9x';
import pcsx2 from './emulators/pcsx2';
import pcsx2Window from './emulators/pcsx2Window';
import fceux from './emulators/fceux';

export default {
  folder: process.env.FOLDER || process.env.TEMP,
  port: process.env.PORT || 3000,
  emulators: [
    snes9x,
    fceux,
    pcsx2,
    pcsx2Window,
  ],
};
