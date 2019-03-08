import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import VueWaypoint from "vue-waypoint";

// Waypoint plugin
Vue.use(VueWaypoint);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
