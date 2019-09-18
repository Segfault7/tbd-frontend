import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import axios from 'axios';
import router from './router'
import Vuetify from 'vuetify/lib'
Vue.config.productionTip = false

require("./assets/style/style.scss");

const axiosInstance = axios.create({ //configurar para backend
  baseURL: 'http://localhost:4567'
})

Vue.prototype.$http = axiosInstance;

//Paginación
import Pagination from 'vue-pagination-2';

import vuetify from './plugins/vuetify';
Vue.component('pagination', Pagination);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
