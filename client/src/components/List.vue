<template>
  <v-layout >
    <v-flex class="mr-2">
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>{{list.listName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>
        <v-list>
          <v-list-tile avatar v-for="task in list.tasks" :key="task._id">
            <v-list-tile-action >
              <v-btn flat icon @click="checked(task.isComplete, task._id)">
                <v-icon v-if="task.isComplete==='true'">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-if="task.isComplete==='true'" class="striked">{{task.description}}</v-list-tile-title>
              <v-list-tile-title v-else>{{task.description}}</v-list-tile-title>
            </v-list-tile-content>
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
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'post',
          url: `tasks/`,
          data: {listId: listId, description: newTaskDesc},
          headers: {token: localStorage.token}
        })
        .then(response => {
          this.$store.commit('setUserData')
          this.newTaskDesc = null
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteTask (listId, taskId) {
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'put',
          url: `lists/${listId}/removetask`,
          data: {taskId: taskId},
          headers: {token: localStorage.token}
        })
        .then(response => {
          this.$store.commit('setUserData')
          this.newTaskDesc = null
        })
        .catch(err => {
          console.log(err)
        })
      },
      checked (isComplete, taskId) {
        if (isComplete === 'true') {
          this.$axios({
            method: 'put',
            url: `tasks/${taskId}/uncomplete`,
            headers: {token: localStorage.token}
          })
          .then(response => {
            this.$store.commit('setUserData')
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          this.$axios({
            method: 'put',
            url: `tasks/${taskId}/complete`,
            headers: {token: localStorage.token}
          })
          .then(response => {
            this.$store.commit('setUserData')
          })
          .catch(err => {
            console.log(err)
          })
        }
      },
      strToBoolean (str) {
        return str === 'true'
      }
    },
    created () {
      this.$store.commit('setUserData')

    }
    
  }
</script>

<style>
.striked{
  text-decoration: line-through
}
</style>