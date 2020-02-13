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
    <div class="text-center">
      <v-bottom-sheet v-model="selectEmulatorDialog" persistent>
        <v-sheet class="text-center" height="300px">
          <div class="py-3">Select Emulator</div>
            <div v-for="(emulator, index) in getEmulators" :key="index">
              {{ emulator }}
            </div>
        </v-sheet>
      </v-bottom-sheet>
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
    selectEmulatorDialog: Boolean,
    getEmulators: Array,
  },

  created () {
  },

  methods: {
  },
};
</script>
