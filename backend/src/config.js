export default {
  folder: process.env.MEL_ROM_FOLDER || process.env.TEMP,
  port: process.env.MEL_PORT || 8082,
  emulators: [
    {
      name: 'pcsx2',
      enable: true,
      exe: 'pcsx2.exe',
      process: 'pcsx2.exe',
      drive: 'C:',
      path: 'C:\\retro\\emulator\\Playstation2\\PCSX2 1.6.0',
      arg: '--fullscreen',
    },
    {
      name: 'ePSXe',
      enable: true,
      exe: 'ePSXe.exe',
      process: 'ePSXe.exe',
      drive: 'C:',
      path: 'C:\\RomStation\\app\\emulators\\downloads\\ePSXe\\files\\ePSXe 2.0.2 (x86)',
      arg: '--fullscreen',
    },
    {
      name: 'DEmul',
      enable: false,
      exe: 'demul.exe',
      process: 'demul.exe',
      drive: 'E:',
      path: 'E:\\emulators\\DEmul\\files\\DEmul v0.7 180428 (rev. 4) (x86)',
      arg: '-run=dc -image=',
    },
    {
      name: 'snes9x',
      enable: true,
      exe: 'snes9x-x64.exe',
      process: 'snes9x-x64.exe',
      drive: 'C:',
      path: 'C:\\RomStation\\app\\emulators\\downloads\\Snes9x\\files\\Snes9x 1.61 (x64)',
      arg: '-fullscreen',
    },
    /*
    {
      name: 'fusion',
      enable: true,
      exe: 'Fusion.exe',
      process: 'Fusion.exe',
      drive: 'C:',
      path: 'C:\\retro\\emulator\\Megadrive\\Fusion364',
      arg: '-fullscreen',
    },
    */
  ],
};
