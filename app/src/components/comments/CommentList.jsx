import React from 'react'
import { useSelector } from 'react-redux'

const CommentList = ({ blogId }) => {
  const comments = useSelector(
    (state) => state.blogs.find((blog) => blog.id === blogId).comments
  )
  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </ul>
  )
}

export default CommentList
