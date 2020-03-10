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
import Gamepad from './class/gamepad'

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
    // this.gamepadRemoveListeners();

    this.explorer = new Explorer();
    this.explore(this.currentPath);
    /*
    this.explorer.get(this.currentPath)
      .then((response) => {
        this.items = response;
        if (this.scope.frame > this.items.length) this.scope.frame = this.items.length;
      });
      */
    Emulator.emulators()
      .then((emulators) => {
        this.emulators = emulators;
      })
      window.addEventListener('keydown', this.keydown);
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.keydown);
  },

  methods: {
    explore: function(path) {
    this.explorer.get(path)
      .then((response) => {
        this.items = response;
        if (this.scope.frame > this.items.length) this.scope.frame = this.items.length;
      })
    },
    gamePadAddListeners: function() {
      gamepad.on('connect', e => {
        log(`controller ${e.index} connected!`);
      });
      gamepad.on('press', 'button_1', this.forward);
      gamepad.on('press', 'start', () => {
        combo.start = true;
        if (combo.select) {
          Emulator.killAll()
            .finally(() => this.gamePadAddListeners());
        }
      });
      gamepad.on('press', 'select', () => {
        combo.select = true;
        if (combo.start) {
          Emulator.killAll()
            .finally(() => this.gamePadAddListeners());
        }
      });
      gamepad.on('press', 'd_pad_up', this.up);
      gamepad.on('press', 'd_pad_down', this.down);
      gamepad.on('press', 'd_pad_left', this.left);
      gamepad.on('press', 'd_pad_right', this.right);

      gamepad.on('release', 'start', () => {
        combo.start = false;
      });

      gamepad.on('release', 'select', () => {
        combo.select = false;
      });
    },

    gamepadRemoveListeners: function() {
      gamepad.off('button_1');
      gamepad.off('d_pad_up');
      gamepad.off('d_pad_down');
      gamepad.off('d_pad_left');
      gamepad.off('d_pad_right');
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
        case 'ArrowUp':
          this.up();
          break;

        case 'ArrowDown':
          this.down();
          break;

        case 'Enter':
          this.forward();
          break;

        case 'Escape':
          this.backward();
          break;

        case 'ArrowLeft':
          this.left();
          break;

        case 'ArrowRight':
          this.right();
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
      log('forward');
      if (!this.items[this.scope.hover].directory) {
          log('launch :', this.items[this.scope.hover].name);
          Emulator.run(this.emulators[this.selectedEmulatorIndex].name ,this.items[this.scope.hover].path)
            .catch((err) => {
              error(err);
            })
      } else {
        this.explore(this.items[this.scope.hover].path);
        this.
      }
    },

    backward: function() {
      log('backward');
      if (!this.selectEmulatorDialog) {
        const currentPathSplit = this.currentPath.split('\\');
        const newPath = currentPathSplit.slice(0, currentPathSplit.length - 1).join('\\');
        this.itemsRefresh(newPath);
      } else {
        this.selectEmulatorDialog = false;
      }
    }
  },

  computed: {
    itemsTrunked: function() {
      return Explorer.trunk(this.items, this.scope.hover, this.scope.frame);
    },
  },

  data: () => ({
    currentPath: 'C:\\temp\\test',
    items: [],
    scope: { hover: 0, frame: 15 },
    selectEmulatorDialog: false,
    selectedEmulatorIndex: 0,
    emulators: [],
  }),
};
</script>
