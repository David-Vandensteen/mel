<template>
  <v-container>
    <div v-for="item in items" v-bind:key="item.path">
      <li v-if="item.directory && cursor === 0"><label class="blue--text"> {{ item.name }} </label></li>
      <li v-if="!item.directory && cursor === 0"><label class="black--text"> {{ item.name }} </label></li>
    </div>
  </v-container>
</template>

<script>
import Explorer from '../class/Explorer';

export default {
  name: 'Main',

  created() {
    this.explorer = new Explorer();
    this.explorer.get()
      .then((response) => {
        this.items = response.data;
      });
  },

  data: () => ({
    items: [],
    cursor: 0,
  }),
};
</script>
