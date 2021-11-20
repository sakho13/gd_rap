import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './firebaseConfig';

Vue.config.productionTip = false

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
