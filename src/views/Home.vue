<template>
  <v-container>
    <h1>テスト</h1>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Home',

    data() {
      return {
        data: new Date()
      }
    },

    beforeMount() {
      //
    },

    computed: {
      //
    }
  })
</script>
