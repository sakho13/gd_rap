import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#c8c8c8",
      },
      dark: {
        primary: "#9e9e9e",
      }
    },
    dark: false
  }
});