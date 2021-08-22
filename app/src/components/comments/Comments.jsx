import React from 'react'
import CommentList from './CommentList'

const Comments = ({ comments }) => {
  return (
    <article>
      <h2>comments</h2>
      <CommentList comments={comments} />
    </article>
  )
}

export default Comments
