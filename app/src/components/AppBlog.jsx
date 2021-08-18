import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../services/blogs'
import BlogList from './BlogList'
import BlogNewContainer from './BlogNewContainer'
import Notification from './Notification'
import { initializeBlogs } from '../actions/blogAction'
import { sendNotification } from '../actions/notificationAction'

const AppBlog = () => {
  const dispatch = useDispatch()
  const signedUser = useSelector((state) => state.signedUser)

  if (signedUser !== null) {
    setToken(signedUser.token)
  } else {
    setToken(null)
  }
  useEffect(() => {
    dispatch(initializeBlogs()).catch((error) => {
      console.log({ error })
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        dispatch(sendNotification(error.response.data, 5))
      }
    })
  }, [dispatch])

  return (
    <>
      <article>
        <h2>blogs</h2>
        <BlogNewContainer />
        <BlogList>
          <Notification />
        </BlogList>
      </article>
    </>
  )
}

export default AppBlog
