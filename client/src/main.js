import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import store from './vuex/index'
import axios from 'axios'
import 'vuetify/dist/vuetify.css'


let baseURL = 'http://localhost:3000'
Vue.use(Vuetify)
Vue.use(router)
console.log('main.js')
Vue.prototype.$axios = axios.create({
  baseURL: baseURL
})



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
