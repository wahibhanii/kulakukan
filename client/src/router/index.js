import Vue from 'vue'
import Router from 'vue-router'
import ContentHomePage from '../components/ContentHomePage'
import ContentPage from '../components/ContentPage'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'ContentHomePage',
      component: ContentHomePage
    },
    {
      path: '/content',
      name: 'ContentPage',
      component: ContentPage
    }
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    } */
  ],
})