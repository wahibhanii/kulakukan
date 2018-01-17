<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn flat color="primary" slot="activator"> <v-icon class="blue--text">person_add</v-icon> Sign Up</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Register Kulakukan</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid">
              <v-flex xs12>
                <v-text-field v-model="email" label="Email" required :rules="emailRules"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="userName" label="User Name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password" label="Password" type="password" required :rules="passwordRules"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="passwordConf" label="Repeat Password" type="password" required :rules="passwordConfRules"></v-text-field>
              </v-flex>
            </v-form>
          </v-container>
          <small>*indicates required field</small> <br/>
          <p v-if="failMessage" class="text-xs-center red--text body-2">{{failMessage}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="register">Register</v-btn>
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
        valid: false,
        dialog: false,
       userName: null,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters',
          (v) => !/^$|\s+/.test(v) || 'only one word is allowed for user name'
        ],
        email: null,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: null,
        passwordRules: [
          (v) => !!v || 'Password is required',
        ],
        passwordConf: null,
        passwordConfRules: [
          (v) => !!v || 'Password Confirmation is required',
        ],
        failMessage: null,
      }
    },
    methods : {
      register () {
        if (this.valid) {
          if (this.$data.password !== this.$data.passwordConf){
            this.$data.failMessage = 'Password not match!'
          } else {
            this.$axios({
              method: 'post',
              url: `/users`,
              data: {
                email: this.$data.email,
                password: this.$data.password,
                userName: this.$data.userName
              }
            })
            .then(signUpResponse => {
              if (signUpResponse.status === 200){
                this.$data.dialog = false
                this.$data.email = null
                this.$data.password = null
                this.$data.failMessage = null
                this.$data.userName = null

              } else if (signUpResponse.status === 202) {
                this.$data.failMessage = signUpResponse.data.message
              }
            })
            .catch(err => {
              console.log(err)
            })
          }
        } else {
          this.failMessage = 'Validation error'
        }
      }
    }
  }
</script>