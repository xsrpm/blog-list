import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

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

export const setToken = (userToken) => {
  token = userToken
}
