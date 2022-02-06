import Axios from 'axios'
import router from '../router'

const axios = Axios.create({
  headers: {
    post: {
      dep: 'client_deb'
    }
  },
  withCredentials: true
})

axios.defaults.headers.common.dep = 'client_deb' // for all requests

axios.interceptors.response.use(null, function (err) {
  if (err.response.status === 401 || err.response.status === 500) {
    window.$cookies.remove('token')
    localStorage.removeItem('profileData')
    router.push({ name: 'register' })
  }
  return Promise.reject(err)
})

export default axios
