<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(category, key) in this.$store.state.userData.categories" :key="key" class="blue lighten-4 subheading">
      <div slot="header" >
        <a flat color="primary" @click="showLists(key)"><v-icon class="pr-2">folder_open</v-icon> {{category.catName}}</a>
      </div>
      <list-nav :lists="category.lists" :catId="category._id" :catKey="key"></list-nav>
    </v-expansion-panel-content>
  </v-expansion-panel>
  
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import store from '../vuex/index'
  import ListNav from './listNav'

  export default {
    data () {
      return {
        categories: [],
        newCat    : null,
      }
    },
    components: {
      ListNav
    },
    methods: {
      showLists (catKey) {
        console.log('SHOW LISTS ===============')
        this.$store.state.shownLists = {catKey:catKey }
        this.$router.push('/content')
        console.log(this.$store.state.shownLists)
      },
      
    }
    
  }
</script>