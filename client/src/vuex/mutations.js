import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://localhost:3000'
const mutations = {
  setUserData () {
    console.log('set user data . . . .')
    let userId = jwt.decode(localStorage.token)._id
    axios({
      method: 'get',
      url: `${baseURL}/users/${userId}`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.userData = response.data.data
      console.log(this.state.userData)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export default mutations