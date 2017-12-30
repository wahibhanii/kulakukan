<template>
  <v-layout row>
    <v-flex>
      <v-card >
        <v-list subheader v-for="(list, key) in lists" :key="key">
          <v-list-tile @click="showList(catKey, key)" >
            <v-list-tile-action>
              <v-list-tile-title class="pl-3"><v-icon class="pr-2">label_outline</v-icon> {{list.listName}}</v-list-tile-title>
            </v-list-tile-action>
            <v-spacer></v-spacer>
            <v-btn flat icon color="red" @click="deleteList(catId, list._id)" >
              <v-icon color="red accent-1">delete</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
        <v-list-tile class="pl-4 pt-3">
        <v-text-field
            label="Add new list"
            v-model="newListName"
          ></v-text-field>
          <v-btn flat icon color="blue" @click="addList(newListName,catId)">
            <v-icon>add</v-icon>
          </v-btn>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile >
        <v-btn flat color="red" @click="deleteCategory(catId)" >
          <v-icon class="pr-2" color="red">delete</v-icon>
          Delete category
        </v-btn>
        </v-list-tile>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import store from '../vuex/index'

  export default {
    data () {
      return {
        newListName: null
      }
    },
    props: ['lists', 'catId', 'catKey'
    ],
    methods : { 
      showList (catKey, listKey) {
        this.$store.state.shownLists = {catKey: catKey, listKey : listKey}
        this.$router.push('/content')
        console.log(this.$store.state.shownLists)
      },
      addList(newListName, catId) {
        console.log (newListName, catId)
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'post',
          url: `lists/`,
          data: {catId: catId, listName: newListName},
          headers: {token: localStorage.token}
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setUserData')
          this.newListName = null
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteList(catId, listId) {
        console.log(catId, listId)
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'put',
          url: `categories/${catId}/removelist`,
          data: {listId: listId},
          headers: {token: localStorage.token}
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setUserData')
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteCategory (catId) {
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'put',
          url: `users/${userId}/removecat`,
          data: {catId: catId},
          headers: {token: localStorage.token}
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setUserData')
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>