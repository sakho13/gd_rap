import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseConfig } from './firebaseConfig';

Vue.config.productionTip = false

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const LogEvent = logEvent
export const Analytics = analytics

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
