import axios from 'axios'

const API_URL = 'http://localhost:8095/api/auth/'

class AuthService {
  async login(user) {
    const response = await axios.post(API_URL + 'signin', {
      username: user.username,
      password: user.password
    })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
