<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    {{ currentPath }}
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import Explorer from '../class/Explorer';

export default {
  name: 'Header',

  created() {
    this.explorer = new Explorer();
    this.explorer.init()
      .then((response) => {
        this.currentPath = response;
      });
  },

  data() {
    return {
      currentPath: '',
    }
  }
}
</script>