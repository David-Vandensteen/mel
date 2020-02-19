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
        <v-sheet class="text-center" height="300">
          <v-carousel hide-delimiters :show-arrows="false" v-model="selectedEmulatorIndex" height="300">
            <v-carousel-item class="display-4"
              v-for="(emulator,i) in emulators"
              :key="i"
            >
              <div class="fill-height align-center justify-center d-flex">{{ emulator.name }}</div>
            </v-carousel-item>
          </v-carousel>
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
    selectedEmulatorIndex: Number,
    emulators: Array,
  },

  created () {
  },

  methods: {
  },
};
</script>
