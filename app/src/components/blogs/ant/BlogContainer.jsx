import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../../actions/blogAction'
import Blog from './Blog'
const BlogContainer = ({ blog }) => {
  const dispatch = useDispatch()
  const [showMore, setShowMore] = useState(false)
  const [mount] = useState(true)
  const [likesCount, setLikesCount] = useState(blog.likes)

  const handleClickShow = () => {
    setShowMore(!showMore)
  }

  const handleClickLike = (id) => {
    dispatch(likeBlog(id)).catch((err) => {
      console.log(err)
    })
    setLikesCount(likesCount + 1)
  }

  const handleClickDelete = (title, id) => {
    const confirm = window.confirm(`Remove blog ${title}`)
    if (confirm) {
      dispatch(deleteBlog(id)).catch((err) => {
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
