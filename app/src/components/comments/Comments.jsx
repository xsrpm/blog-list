import React from 'react'
import CommentList from './CommentList'
import CommentNew from './CommentNew'

const Comments = ({ blogId }) => {
  return (
    <article>
      <h2>comments</h2>
      <CommentNew blogId={blogId} />
      <CommentList blogId={blogId} />
    </article>
  )
}

export default Comments
