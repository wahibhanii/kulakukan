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
console.log('inside facebook!')
  export default {
    
    data(){
      return {

      }
    },

    methods: {
      statusChangeCallback (response) {
        console.log('this is statusChangeCallback')
        console.log(response)
        console.log(this.$axios)
        this.$axios({
          method: 'post',
          url: `users/fblogin`,
          data: {
            authResponse : response.authResponse
          }
        })
        .then(loginResponse => {
          console.log('facebook login successful')
          localStorage.setItem('token', loginResponse.data.token)
          this.$store.state.isFBLoggedIn = true
        })
        .catch(err => {
          console.log(err)
        })
      },
      // checkLoginState: () => {
      //   console.log('this is checkloginState')
      //   // console.log('ini this', this)
      //   FB.getLoginStatus((response)=> {
      //     statusChangeCallback(response);
      //   });
      // }
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
          console.log(this)
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