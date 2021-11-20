<template>
  <v-app style="background-color: #f5f5f5;">
    <v-app-bar
      app color="teal lighten-4"
    >

      <v-app-bar-title class="mp htitle"> GD-Rap </v-app-bar-title>

      <v-spacer />
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
    // isAbout: false
  }),
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1&display=swap');

.mp {
  font-family: 'M PLUS 1', sans-serif;
}

</style>

<style scoped>
.htitle {
  font-weight: 800;
}
</style>