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
    <div>
      <v-row justify="center">
        <v-dialog v-model="running" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Emulator is running...</v-card-title>
            <v-card-text>Press Esc. \ backspace or start + select for quit Emulator</v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="text-center">
      <v-bottom-sheet v-model="selectEmulatorDialog" persistent>
        <v-sheet class="text-center" height="100">
          <v-carousel hide-delimiters :show-arrows="false" v-model="selectedEmulatorIndex" height="100">
            <v-carousel-item class="display-2 blue--text" v-for="(emulator, index) in emulators" :key="index">
              <div class="fill-height align-center justify-center d-flex black--text">{{ emulator.name }}</div>
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
    running: {
      type: Boolean,
      default: false,
    }
  },

  created () {
  },

  methods: {
  },
};
</script>
