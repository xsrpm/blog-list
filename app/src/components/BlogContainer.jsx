import React, { useState } from 'react'
import { like, remove } from '../services/blogs'
import PropTypes from 'prop-types'
import Blog from './Blog'
const BlogContainer = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)
  const [mount, setMount] = useState(true)
  const [likesCount, setLikesCount] = useState(blog.likes)

  const handleClickShow = () => {
    setShowMore(!showMore)
  }

  const handleClickLike = (id) => {
    like(id)
      .then((body) => {
        setLikesCount(likesCount + 1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickDelete = (title, id) => {
    const confirm = window.confirm(`Remove blog ${title}`)
    if (confirm) {
      remove(id)
        .then((body) => {
          setMount(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Blog
      blog={blog}
      likesCount={likesCount}
      handleClickLike={handleClickLike}
      handleClickDelete={handleClickDelete}
      handleClickShow={handleClickShow}
      showMore={showMore}
      mount={mount}
    />
  )
}

BlogContainer.propTypes = {
  blog: PropTypes.object.isRequired
}

export default BlogContainer
