import React from 'react'

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment}>{comment}</li>
      ))}
    </ul>
  )
}

export default CommentList
