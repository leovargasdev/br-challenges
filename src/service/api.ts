import axios from 'axios'

const url = process.env.NEXTAUTH_URL || ''

const api = axios.create({
  baseURL: url + '/api/'
})

export default api
