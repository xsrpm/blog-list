import axios from 'axios'
import { config } from '../config/config'
const baseUrl = `${config.REACT_APP_API}/api/login`
console.log(baseUrl)

export const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
