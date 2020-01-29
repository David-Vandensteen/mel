<template>
  <v-container>
    <div v-for="(item, index) in itemsTrunked" :key="item.path">
      <li>
        <label
          :class="{
            'red--text': index === scope.frame,
            'blue--text': item.directory && index !== scope.frame
          }"
        >
          {{ item.name }}
        </label>
      </li>
    </div>
  </v-container>
</template>

<script>
import Explorer from '../class/Explorer';
const { log } = console;

export default {
  name: 'Main',
  created () {
    this.explorer = new Explorer();
    this.explorer.get('.')
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
          log(this.items[this.scope.hover].name);
        } else {
          log('run :', this.items[this.scope.hover].name);
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
    items: [],
    scope: { hover: 0, frame: 10 },
  }),
};
</script>
