<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container  v-for="list in lists" :key="list._id">
          <list :list="list"></list>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import List from './List'

  export default {
    data () {
      return {
        // lists : null,
      }
    },
    components: {
      List
    },
    computed:{
      lists () {
        let shownLists = this.$store.state.shownLists
        console.log(shownLists,'=================')
        if (shownLists.listKey === undefined){
          return this.$store.state.userData.categories[shownLists.catKey].lists
        } else if (shownLists.listKey !== undefined) {
          return [this.$store.state.userData.categories[shownLists.catKey].lists[shownLists.listKey]]
        }
      }
    },
    // created () {
    //    let shownLists = this.$store.state.shownLists
    //     console.log(shownLists,'=================')
    //     if (!shownLists.listKey){
    //       this.lists = this.$store.state.userData.categories[shownLists.catKey].lists
    //     } else {
    //       this.lists = [this.$store.state.userData.categories[shownLists.catKey].lists[listKey]]
    //     }
    // } 

    
  }
</script>