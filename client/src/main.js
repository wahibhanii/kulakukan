import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './vuex/index'
import axios from 'axios'
import 'vuetify/dist/vuetify.css'


Vue.use(Vuetify)
console.log('main.js')
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
