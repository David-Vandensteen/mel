<template>
  <v-container>
    <div v-for="(item, index) in itemsTrunked" :key="index">
      <li>
        <label
          :class="{
            'green--text': index === scope.frame,
            'selection': index === scope.frame,
            'blue--text': item.directory || false && index !== scope.frame
          }"
        >
          {{ item.name }}
        </label>
      </li>
    </div>
  </v-container>
</template>
<style scoped>
  .selection {
    font-size: 3em;
  }
</style>
<script>

export default {
  name: 'Main',
  props: {
    items: {
      type: Array,
    },
    itemsTrunked: Array,
    scope: Object,
  }
};
</script>
