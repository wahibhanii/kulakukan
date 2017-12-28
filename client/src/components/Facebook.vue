<template>
   <div 
    class="fb-login-button" 
    data-max-rows="1" data-size="small" 
    data-button-type="login_with" 
    data-show-faces="false" 
    data-auto-logout-link="true"
    data-use-continue-as="false" 
    data-scope="publish_actions, email, public_profile, user_photos "
    onlogin="location.reload()">
  </div>

</template>

<script>
const API_PATH="http://localhost:3000"
import jwt from 'jsonwebtoken'
console.log('inside facebook!')
  export default {
    
    data(){
      return {

      }
    },

    methods: {
      statusChangeCallback: (response) => {
        console.log('this is statusChangeCallback')
        console.log(response)
        console.log(API_PATH)
        axios({
          method: 'post',
          url: `${API_PATH}/users/fblogin`,
          data: {
            authResponse : response.authResponse
          }
        })
        .then(loginResponse => {
          console.log('facebook login successful')
          localStorage.setItem('token', loginResponse.data.token)
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
    created: () => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: '141574106544286',
          cookie: true,
          xfbml: true,
          version: 'v2.11'
        });

        FB.AppEvents.logPageView();
        FB.getLoginStatus((response) => {
          this.a.methods.statusChangeCallback(response)
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