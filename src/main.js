import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import { routes } from './routes.js';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

