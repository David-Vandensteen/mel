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
