<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile @click="goHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <cat-nav></cat-nav>
        <v-list-tile class="teal lighten-4 pt-3 pl-2">
          <v-icon class="pr-3">create_new_folder</v-icon>
          <v-text-field
            label="Add new category"
            v-model="newCatName"
          ></v-text-field>
          <v-btn flat icon color="blue" @click="addCategory">
            <v-icon>add</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped" class="blue darken-2" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      
      <v-toolbar-title v-text="title" class="hidden-xs-only"@click="getUserData"></v-toolbar-title>
      <v-icon>playlist_add_check</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{userName}}</v-toolbar-title>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>person_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
       <router-view :key="$route.fullPath"></router-view>
    </v-content>

    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="title">User Account</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-divider></v-divider>
        </v-list-tile>
        <v-list-tile v-if="!isLoggedIn && !isFBLoggedIn">
          <sign-in></sign-in>
          <sign-up></sign-up>
        </v-list-tile>
        <v-list-tile v-if="!isFBLoggedIn && !isLoggedIn">
          <v-spacer></v-spacer>
          <p>OR</p>
          <v-spacer></v-spacer>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn && !isFBLoggedIn">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="logout()" ><v-icon class="blue--text">exit_to_app</v-icon> Log Out</v-btn>
          <v-spacer></v-spacer>
        </v-list-tile>
        <v-list-tile v-show="!isLoggedIn">
          <v-spacer></v-spacer>
          <facebook></facebook>
          <v-spacer></v-spacer>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Facebook from './components/Facebook'
  import SignIn from './components/SignIn'
  import SignUp from './components/SignUp'
  import CatNav from './components/CatNav'
  import store from './vuex/index'
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: '{ kulakukan }',
        newCatName: null
      }
    },
    store,

    components: {
      Facebook, SignIn, SignUp, CatNav
    },
    methods: {
      goHome (){
        this.$router.push('/home')
      },
      logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('normalLogin')
        this.$store.state.isLoggedIn = false
        location.reload()
      },
      getUserData () {
        let userId = jwt.decode(localStorage.token)._id
        this.$axios({
          method: 'get',
          url: `users/${userId}`,
          headers: {token: localStorage.token}
        })
        .then(response => {
          this.$store.state.userData = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      addCategory () {
        this.$axios({
          method: 'post',
          url: `categories/`,
          data: {catName: this.newCatName},
          headers: {token: localStorage.token}
        })
        .then(response => {
          this.newCatName = null
          this.$store.commit('setUserData')
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.state.isLoggedIn
      },

      isFBLoggedIn () {
        return this.$store.state.isFBLoggedIn
      },

      userName() {
        if (this.$store.state.isFBLoggedIn || this.$store.state.isLoggedIn) {
          let decoded = jwt.decode(localStorage.token)
          return decoded.userName
        } else {
          return 'Guest'
        }
      }
    },
    created () {
      this.$store.commit('setLoginStatus')
      this.$router.push('/home')
    }
    
    

  }
    
</script>
