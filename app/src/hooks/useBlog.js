import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../actions/blogAction'
import { sendNotification } from '../actions/notificationAction'
import { setToken } from '../services/blogs'

const useBlog = () => {
  const dispatch = useDispatch()
  const signedUser = useSelector((state) => state.signedUser)

  setToken(signedUser.token)

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

  const getBlogs = () => {
    return useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  }

  const getBlogById = (id) => {
    return useSelector((state) => state.blogs.find((blog) => blog.id === id))
  }

  return { getBlogs, getBlogById }
}

export default useBlog
