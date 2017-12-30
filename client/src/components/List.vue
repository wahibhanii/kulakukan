<template>
  <v-layout >
    <v-flex class="mr-2">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>{{list.listName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat icon color="white">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="white">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile avatar v-for="task in list.tasks" :key="task._id">
            <v-list-tile-action>
              <v-checkbox task.isComplete></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{task.description}}</v-list-tile-title>
            </v-list-tile-content>
            <v-btn flat icon color="blue">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn flat icon color="blue" @click="deleteTask(list._id, task._id)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-list-tile>
          <v-list-tile class="pl-5">
            <v-text-field
              label="Add new task"
              v-model="newTaskDesc"
            ></v-text-field>
            <v-btn flat icon color="blue" @click="addTask(list._id, newTaskDesc)">
              <v-icon>add</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import store from '../vuex/index'
  import ListNav from './listNav'

  export default {
    
    data () {
      return {
        newTaskDesc : null,
      }
    },
    props: ['list'],
    methods : {
      addTask (listId, newTaskDesc) {
        console.log(listId, newTaskDesc)
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'post',
          url: `tasks/`,
          data: {listId: listId, description: newTaskDesc},
          headers: {token: localStorage.token}
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setUserData')
          this.newTaskDesc = null
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteTask (listId, taskId) {
        console.log(listId, taskId)
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'put',
          url: `lists/${listId}/removetask`,
          data: {taskId: taskId},
          headers: {token: localStorage.token}
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setUserData')
          this.newTaskDesc = null
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
    created () {
      this.$store.commit('setUserData')

    }
    
  }
</script>