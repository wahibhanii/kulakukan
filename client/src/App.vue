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
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>person_outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote>
              &#8220;First, solve the problem. Then, write the code.&#8221;
              
              <footer>
                <small>
                  <em>&mdash;John Johnson </em>
                </small>
              </footer>
            </blockquote>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
      <div></div>
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
        <v-list-tile v-if="!isLoggedIn">
          <v-spacer></v-spacer>
          <p>OR</p>
          <v-spacer></v-spacer>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="logout()" ><v-icon class="blue--text">exit_to_app</v-icon> Log Out</v-btn>
          <v-spacer></v-spacer>
        </v-list-tile>
        <v-list-tile v-if="!isLoggedIn">
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
  console.log('app vue scripts')
  import Facebook from './components/Facebook'
  import SignIn from './components/SignIn'
  import SignUp from './components/SignUp'
  import store from './vuex/index'

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
        title: 'kulakukan'
      }
    },
    store,

    components: {
      Facebook, SignIn, SignUp
    },
    methods: {
      logout () {
        localStorage.removeItem('token')
        this.$store.state.isLoggedIn = false
      }
    },
    computed: {
      isLoggedIn () {
        // console.log(this.$store.state.isLoggedIn, 'inithis.............')
        
        if (localStorage.token || this.$store.state.isFBLoggedIn ) {
          this.$store.state.isLoggedIn = true
        }
        return this.$store.state.isLoggedIn
      },

      isFBLoggedIn () {

        return this.$store.state.isFBLoggedIn
      }
    }
    
    

  }
    
</script>
