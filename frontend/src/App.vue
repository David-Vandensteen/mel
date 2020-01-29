<template>
  <v-app dark>
    <v-content>
      <Header :currentPath = "currentPath" />
      <Main :items = "items" :itemsTrunked = "itemsTrunked" :scope = "scope"/>
      <Footer/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Explorer from './class/Explorer';
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
      });
      window.addEventListener('keydown', this.keydown);
  },
    beforeDestroy () {
    window.removeEventListener('keydown', this.keydown);
  },
  methods: {
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

        default:
          break;
      }
    },
    up: function() {
      this.scope.hover = (this.scope.hover + this.items.length - 1) % this.items.length;
    },
    down: function() {
      this.scope.hover = (this.scope.hover + 1) % this.items.length;
    },
    enter: function() {
      log('enter');
      if (this.items.length > 0) {
        if (this.items[this.scope.hover].directory) {
          log('browse :', this.items[this.scope.hover].name);
          this.explorer.get(`${this.currentPath}\\${this.items[this.scope.hover].name}`)
            .then((response) => {
              this.items = response;
            })
        } else {
          log('launch :', this.items[this.scope.hover].name);
        }
      }
    },
  },
  computed: {
    itemsTrunked: function() {
      return Explorer.trunk(this.items, this.scope.hover, this.scope.frame);
    },
  },
  data: () => ({
    currentPath: '.',
    items: [],
    scope: { hover: 0, frame: 10 },
  }),
};
</script>
