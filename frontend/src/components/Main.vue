<template>
  <v-container>
    <!--
    <div v-for="item in items" :key="item.path">
      <li><label :class="{ 'blue--text': item.directory, 'red--text': !item.directory }"> {{ item.name }} </label></li>
    </div>
    -->
    <div v-for="item in items" :key="item.path">
      <li><label :class="{ 'blue--text': item.directory, 'red--text': !item.directory }"> {{ item.name }} </label></li>
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
        this.itemsScoped = Explorer.trunk(items, 0, 5);
      });
  },
  data: () => ({
    items: [],
    itemsScoped: [],
    cursor: 0,
  }),
};
</script>
