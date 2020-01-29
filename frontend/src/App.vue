<template>
  <v-app dark>
    <v-content>
      <Header current-path = "string"/>
      <Main/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Main,
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer,
  },

  created () {
  },

  data: () => ({
    //
  }),
};
</script>
