<template>
  <v-app dark>
    <v-content>
      <Header/>
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
    // eslint-disable-next-line vue/no-unused-components
    Main,
    // eslint-disable-next-line vue/no-unused-components
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
