import React, { useState } from 'react'
import { create } from '../services/blogs'
import PropTypes from 'prop-types'
import BlogNew from './BlogNew'

const BlogNewContainer = ({ sendNotification, addBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

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
        sendNotification(`a new blog ${body.title} added`)
        addBlog(body)
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
  addBlog: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired
}

export default BlogNewContainer
