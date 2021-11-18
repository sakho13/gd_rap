<template>
  <v-app style="background-color: #f5f5f5;">
    <v-app-bar
      app color="primary"
    >

      <v-app-bar-title> GD-Rap </v-app-bar-title>

      <v-spacer />

      <v-btn
        text
        @click="isAbout = !isAbout"
      >
        <span class="mr-2"> {{ isAbout ? "Top": "About"}} </span>
        <v-icon> mdi-information-variant </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    isAbout: false
  }),

  computed: {
    // appStyleObj: function() {
    //   if (this.$vuetify.theme.dark) {
    //     return {
    //       'background-color': '#d4d4d4'
    //     }
    //   } else {
    //     return {
    //       'background-color': '#ffffff'
    //     }
    //   }
    // }
  },

  watch: {
    isAbout: function(_n, o) {
      this.$router.push({name: o? "Top": "About"})
    }
  }
});
</script>

<style scoped>
</style>