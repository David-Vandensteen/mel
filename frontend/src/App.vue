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
import Explorer from './class/Explorer';

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
    const explorer = new Explorer();
    explorer.init()
      .then((currentPath) => {
        explorer.get(currentPath)
          .then((files) => {
            // eslint-disable-next-line no-console
            console.log(files);
          });
      });
  },

  data: () => ({
    //
  }),
};
</script>
