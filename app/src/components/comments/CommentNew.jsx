import React from 'react'
import useComment from '../../hooks/useComment'

const CommentNew = ({ blogId }) => {
  const { comment, submit, handleChange } = useComment()
  const handleSubmit = (e) => {
    e.preventDefault()
    submit(blogId, comment)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={handleChange}
        value={comment}
        placeholder='enter your comment...'
      />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentNew
