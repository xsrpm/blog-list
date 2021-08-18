import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../../actions/notificationAction'
import { createBlog } from '../../actions/blogAction'

import BlogNew from './BlogNew'

const BlogNewContainer = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {
      title,
      url
    }
    dispatch(createBlog(blog))
      .then(() => {
        setTitle('')
        setUrl('')
        formClose()
        dispatch(sendNotification(`a new blog ${blog.title} added`, 5))
      })
      .catch((error) => {
        console.log({ error })
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          dispatch(sendNotification(error.response.data, 5))
        }
      })
  }

  const formClose = () => {
    setIsOpen(false)
  }

  const formOpen = () => {
    setIsOpen(true)
  }

  const handleChangeTitle = ({ target }) => {
    setTitle(target.value)
  }
  const handleChangeUrl = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <BlogNew
      handleSubmit={handleSubmit}
      title={title}
      handleChangeTitle={handleChangeTitle}
      url={url}
      handleChangeUrl={handleChangeUrl}
      formClose={formClose}
      formOpen={formOpen}
      isOpen={isOpen}
    />
  )
}

export default BlogNewContainer
