import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAll, setToken } from '../services/blogs'
import BlogList from './BlogList'
import BlogNewContainer from './BlogNewContainer'
import Notification from './Notification'
import { sendNotification } from '../reducers/notificationReducer'

const AppBlog = ({ user, handleLogout }) => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()

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
          dispatch(sendNotification(error.response.data.error, 5))
        }
      })
  }, [])

  const addBlog = (blog) => {
    setBlogs([...blogs, blog])
  }

  return (
    <>
      <article>
        <h2>Logged in as {user.username}</h2>
        <input type='button' value='logout' onClick={handleLogout} />
      </article>
      <BlogNewContainer addBlog={addBlog} />
      <BlogList blogs={blogs}>
        <Notification />
      </BlogList>
    </>
  )
}

export default AppBlog
