import axios from 'axios'
const baseUrl = '/api/users'

let token = ''

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
