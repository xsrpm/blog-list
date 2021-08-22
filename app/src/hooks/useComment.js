import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createComment } from '../services/blogs'
import { addBlogComment } from '../actions/blogAction'

const useComment = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const submit = (blogId) => {
    createComment(blogId, comment).then((body) => {
      dispatch(addBlogComment(blogId, comment))
    })
  }
  const handleChange = (e) => {
    setComment(e.target.value)
  }

  return {
    comment,
    submit,
    handleChange
  }
}

export default useComment
