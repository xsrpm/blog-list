import React from 'react'
import { useSelector } from 'react-redux'
import CommentList from './CommentList'
import CommentNew from './CommentNew'

const Comments = ({ blogId }) => {
  const comments = useSelector(
    (state) => state.blogs.find((blog) => blog.id === blogId).comments || []
  )

  return (
    <article>
      <h2>comments</h2>
      <CommentNew blogId={blogId} />
      <CommentList comments={comments} />
    </article>
  )
}

export default Comments
