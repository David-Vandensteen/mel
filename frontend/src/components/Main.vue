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
    <v-row justify="center">
      <v-dialog v-model="selectEmulatorDialog" scrollable max-width="300px">
        <v-card>
          <v-card-title>Select Emulator</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-radio-group v-model="getEmulators" column>
              <v-radio label="Snes 9x" value="snes9x"></v-radio>
              <v-radio label="PCSX" value="pcsx"></v-radio>
              <v-radio label="PCSX2" value="pcsx2"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="selectEmuatorDialog = false">Save</v-btn>
            <!--
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
            -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    getEmulators: Function,
  },
};
</script>
