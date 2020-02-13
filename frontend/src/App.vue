<template>
  <v-app dark>
    <v-content>
      <Header :currentPath = "currentPath" />
      <Main
        :items="items"
        :itemsTrunked="itemsTrunked"
        :scope="scope"
        :selectEmulatorDialog="selectEmulatorDialog"
        :getEmulators="getEmulators"
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
const path = path;
const { log } = console;

export default {
  name: 'App',

  components: {
    Main,
    Header,
    Footer,
  },

  created () {
    this.explorer = new Explorer();
    this.explorer.get(this.currentPath)
      .then((response) => {
        this.items = response;
        if (this.scope.frame > this.items.length) this.scope.frame = this.items.length;
      });
      window.addEventListener('keydown', this.keydown);
  },
    beforeDestroy () {
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
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
          this.enter();
          break;

        case 'Escape':
          this.escape();
          break;

        default:
          break;
      }
      (!this.items[this.scope.hover].directory) ? this.selectEmulatorDialog = true : this.selectEmulatorDialog = false;
    },
    up: function() {
      this.scope.hover = (this.scope.hover + this.items.length - 1) % this.items.length;
    },
    down: function() {
      this.scope.hover = (this.scope.hover + 1) % this.items.length;
    },
    enter: function() {
      log('enter');
      if (this.items.length > 0 && !this.selectEmulatorDialog) {
        if (this.items[this.scope.hover].directory) {
          log('browse :', this.items[this.scope.hover].name);
          this.itemsRefresh(this.items[this.scope.hover].path);
        } else {
          log('launch :', this.items[this.scope.hover].name);
          this.selectEmulatorDialog = true;
        }
      }
    },
    escape: function() {
      log('escape');
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
    getEmulators: function() {
      return ['snes', 'megadrive'];
    },
  },
  data: () => ({
    currentPath: 'C:\\temp\\test',
    items: [],
    scope: { hover: 0, frame: 15 },
    selectEmulatorDialog: false,
  }),
};
</script>
