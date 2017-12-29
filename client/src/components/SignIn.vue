<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn flat color="primary" slot="activator"><v-icon class="blue--text">exit_to_app</v-icon> Sign In</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Sign-In to Kulakukan</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small> <br/>
          <p v-if="failMessage" class="text-xs-center red--text body-2">{{failMessage}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Sign In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'

  export default {
    data () {
      return {
        dialog: false,
        email:  null,
        password: null,
        failMessage: null,
      }
    },
    methods : {
      save () {
        console.log('saving')
        
        console.log(this.$data.email)
        console.log(this.$data.password)
        this.$axios({
          method: 'post',
          url: `/users/login`,
          data: {
            email: this.$data.email,
            password: this.$data.password
          }
        })
        .then(loginResponse => {
          console.log('login...')
          console.log(loginResponse)
          if (loginResponse.status === 200) {
            this.$data.dialog = false
            this.$data.email = null
            this.$data.password = null
            this.$data.failMessage = null
            localStorage.setItem('token', loginResponse.data.token)
            this.$store.state.isLoggedIn = true

          } else if (loginResponse.status === 204) {
            this.$data.failMessage = 'User not Found'
            this.$data.email = null
            this.$data.password = null
          } else if (loginResponse.status === 202) {
            this.$data.failMessage = 'Wrong Password'
            this.$data.password = null
          }
          
          // localStorage.setItem('token', loginResponse.data.token)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>