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

export default {
  name: 'Main',
  created () {
    this.explorer = new Explorer();
    this.explorer.get()
      .then((response) => {
        this.items = response;
      });
  },
  computed: {
    itemsTrunked: function() {
      return Explorer.trunk(this.items, this.scope.hover, this.scope.frame);
    },
  },
  data: () => ({
    items: [],
    scope: { hover: 0, frame: 4 },
  }),
};
</script>
