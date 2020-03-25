<template>
  <v-app dark>
    <v-content>
      <Header :currentPath = "currentPath" />
      <Main
        :items="items"
        :itemsTrunked="itemsTrunked"
        :scope="scope"
        :selectEmulatorDialog="selectEmulatorDialog"
        :emulators="emulators"
        :selectedEmulatorIndex="selectedEmulatorIndex"
        :running="running"
      />
      <Footer/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Explorer from './class/Explorer';
import Emulator from './class/Emulator';
import Gamepad from './class/gamepad';
import config from './config';

const path = path;
const { log, error } = console;
const gamepad = new Gamepad();
const combo = { start: false, select: false };

export default {
  name: 'App',

  components: {
    Main,
    Header,
    Footer,
  },

  created () {
    this.gamePadAddListeners();
    this.gamePadAddComboListers();
    this.explorer = new Explorer();
    this.explore(this.currentPath);
    Emulator.emulators()
      .then((emulators) => {
        this.emulators = emulators;
      })
      window.addEventListener('keydown', this.keydown);
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.keydown);
    this.gamepadRemoveListeners();
  },

  methods: {
    explore: function(path) {
    this.explorer.get(path)
      .then((response) => {
        log('explore', path);
        this.items = response;
        this.scope = { hover: 0 , frame: 10 };
        this.currentPath = path;
        if (this.scope.frame > this.items.length) this.scope.frame = this.items.length;
      })
    },

    gamePadAddComboListers: function() {
      gamepad.on('press', 'start', () => {
        combo.start = true;
        if (combo.select) this.stop();
        log(combo);
      });
      gamepad.on('press', 'select', () => {
        combo.select = true;
        if (combo.start) this.stop();
        log(combo);
      });
      gamepad.on('release', 'start', () => {
        combo.start = false;
      });
      gamepad.on('release', 'select', () => {
        combo.select = false;
      });
    },

    gamePadAddListeners: function() {
      gamepad.on('connect', e => {
        log(`controller ${e.index} connected!`);
      });
      gamepad.on('press', 'button_1', this.forward);
      gamepad.on('press', 'd_pad_up', this.up);
      gamepad.on('press', 'd_pad_down', this.down);
      gamepad.on('press', 'd_pad_left', this.left);
      gamepad.on('press', 'd_pad_right', this.right);
    },

    gamepadRemoveListeners: function() {
      gamepad.off('press');
      this.gamePadAddComboListers();
    },

    itemsRefresh: function(path) {
      this.currentPath = path;
      this.explorer.get(this.currentPath)
        .then((response) => {
          this.items = response;
        });
    },

    keydown: function(event) {
      switch (event.key) {
        case 'Enter':
          this.forward();
          break;

        case 'Escape':
          this.backward();
          break;

        case 'Backspace':
          this.backward();
          break;

        case 'q':
          this.stop();
          break;

        default:
          break;
      }
    },

    up: function() {
      this.scope.hover = (this.scope.hover + this.items.length - 1) % this.items.length;
      (!this.items[this.scope.hover].directory) ? this.selectEmulatorDialog = true : this.selectEmulatorDialog = false;
    },

    down: function() {
      this.scope.hover = (this.scope.hover + 1) % this.items.length;
      (!this.items[this.scope.hover].directory) ? this.selectEmulatorDialog = true : this.selectEmulatorDialog = false;
    },

    left: function() {
      this.selectedEmulatorIndex = (this.selectedEmulatorIndex + this.emulators.length - 1) % this.emulators.length;
    },

    right: function() {
      this.selectedEmulatorIndex = (this.selectedEmulatorIndex + 1) % this.emulators.length;
    },

    forward: function() {
      if (!this.items[this.scope.hover].directory) {
        this.start();
      } else {
        this.explore(this.items[this.scope.hover].path);
      }
    },

    backward: function() {
      if (!this.selectEmulatorDialog && !this.running) {
        const currentPathSplit = this.currentPath.split('\\');
        const newPath = currentPathSplit.slice(0, currentPathSplit.length - 1).join('\\');
        this.explore(newPath);
      } else {
        this.selectEmulatorDialog = false;
      }
      if (this.running) this.stop();
    },

    start: function() {
      log('start');
      log('emulator:', this.emulators[this.selectedEmulatorIndex].name)
      log('file:', this.items[this.scope.hover].name);
      Emulator.run(this.emulators[this.selectedEmulatorIndex].name ,this.items[this.scope.hover].path)
        .catch((err) => {
          error(err);
        })
        .then(() => {
          this.gamepadRemoveListeners()
          this.running = true;
        });
    },

    stop: function() {
      Emulator.killAll()
        .finally(() => {
          this.gamePadAddListeners()
          this.running = false;
        });
    },
  },

  computed: {
    itemsTrunked: function() {
      return Explorer.trunk(this.items, this.scope.hover, this.scope.frame);
    },
  },

  data: () => ({
    currentPath: config.browse,
    items: [],
    scope: { hover: 0, frame: 10 },
    selectEmulatorDialog: false,
    selectedEmulatorIndex: 0,
    emulators: [],
    running: false,
  }),
};
</script>
