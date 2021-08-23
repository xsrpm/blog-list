import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog } from '../../actions/blogAction'

const BlogDelete = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClickDelete = (title, id) => {
    const confirm = window.confirm(`Remove blog ${title}`)
    if (confirm) {
      dispatch(deleteBlog(id))
        .then((body) => {
          console.log(body)
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <button onClick={() => handleClickDelete(blog.title, blog.id)}>
      remove
    </button>
  )
}

export default BlogDelete
