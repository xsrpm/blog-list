import axios from 'axios'
import { config } from '../config/config'
const baseUrl = `${config.REACT_APP_API}/api/users`
console.log(baseUrl)
let token = null

export const getAll = () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

export const setToken = (userToken) => {
  token = userToken
}
