<template>
   <div 
    class="fb-login-button" 
    data-max-rows="1" data-size="large" 
    data-button-type="login_with" 
    data-show-faces="false" 
    data-auto-logout-link="true"
    data-use-continue-as="false" 
    data-scope="publish_actions, email, public_profile, user_photos "
    onlogin="location.reload()">
  </div>

</template>

<script>
import jwt from 'jsonwebtoken'
import axios from 'axios'
import store from '../vuex/index'
  export default {
    
    data(){
      return {

      }
    },

    methods: {
      statusChangeCallback (response) {
        console.log('this is statusChangeCallback')
        console.log(response)
        if (response.authResponse === undefined){
            console.log('facebook not logged in')
            if (localStorage.normalLogin == undefined){
              localStorage.removeItem('token')
            }
            this.$store.state.isFBLoggedIn = false
        } else {
          this.$axios({
            method: 'post',
            url: `users/fblogin`,
            data: {
              authResponse : response.authResponse
            }
          })
          .then(loginResponse => {
            console.log('facebook login successful')
            this.$store.state.isFBLoggedIn = true
            if (localStorage.token === undefined){
              localStorage.setItem('token', loginResponse.data.token)
            }
            this.$store.commit('setUserData')
            
          })
          .catch(err => {
            console.log(err)
          })
        } 
      }
    },
    created () {
      window.fbAsyncInit = () => {
        FB.init({
          appId: '141574106544286',
          cookie: true,
          xfbml: true,
          version: 'v2.11'
        });

        FB.AppEvents.logPageView();
        FB.getLoginStatus((response) => {
          this.statusChangeCallback(response)
        })
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    }
  }
</script>