import React, { useState, useEffect } from 'react'
import { getAll, setToken } from '../services/blogs'
import BlogList from './BlogList'
import BlogNewContainer from './BlogNewContainer'
import Notification from './Notification'

const AppBlog = ({ user, handleLogout }) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')

  if (user !== null) {
    setToken(user.token)
  } else {
    setToken(null)
  }

  useEffect(() => {
    getAll()
      .then((body) => {
        setBlogs(body.sort((a, b) => b.likes - a.likes))
      })
      .catch((error) => {
        console.log({ error })
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.error)
          console.log(error.response.status)
          sendNotification(error.response.data.error)
        }
      })
  }, [])

  const addBlog = (blog) => {
    setBlogs([...blogs, blog])
  }

  const sendNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <>
      <article>
        <h2>Logged in as {user.username}</h2>
        <input type='button' value='logout' onClick={handleLogout} />
      </article>
      <BlogNewContainer sendNotification={sendNotification} addBlog={addBlog} />
      <BlogList blogs={blogs}>
        <Notification message={message} />
      </BlogList>
    </>
  )
}

export default AppBlog
