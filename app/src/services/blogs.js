import axios from 'axios'
import { config } from '../config/config'
const baseUrl = `${config.REACT_APP_API}/api/blogs`
console.log(baseUrl)
let token = null

export const getAll = () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

export const create = (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then((response) => response.data)
}

export const update = (blog, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.patch(`${baseUrl}/${id}`, blog, config)
  return request.then((response) => response.data)
}

export const like = (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.patch(`${baseUrl}/${id}/like`, null, config)
  return request.then((response) => response.data)
}

export const remove = (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export const createComment = (id, comment) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return request.then((response) => response.data)
}

export const setToken = (userToken) => {
  token = userToken
}
