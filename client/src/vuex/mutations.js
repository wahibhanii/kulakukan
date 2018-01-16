import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://35.186.166.229'
const mutations = {
  setUserData () {
    let userId = jwt.decode(localStorage.token)._id
    axios({
      method: 'get',
      url: `${baseURL}/users/${userId}`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.userData = response.data.data
    })
    .catch(err => {
      console.log(err)
    })
  },
  setLoginStatus () {
    if (localStorage.token && localStorage.normalLogin) {
      this.state.isLoggedIn = true
      this.commit('setUserData')
    }
  }
}

export default mutations