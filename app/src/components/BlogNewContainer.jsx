import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { sendNotification } from '../reducers/notificationReducer'
import { create } from '../services/blogs'

import BlogNew from './BlogNew'

const BlogNewContainer = ({ addBlog }) => {
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
    create(blog)
      .then((body) => {
        console.log({ body })
        setTitle('')
        setUrl('')
        formClose()
        dispatch(sendNotification(`a new blog ${body.title} added`, 5))
        addBlog(body)
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

BlogNewContainer.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogNewContainer
