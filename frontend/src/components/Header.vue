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
export default {
  name: 'Header',
  props: {
    currentPath: {
      type: String,
      default: '.',
    }
  }
}
</script>