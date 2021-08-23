import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../../actions/blogAction'

const BlogLike = ({ blog }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = React.useState(blog?.likes || 0)

  useEffect(() => {
    setLikes(blog?.likes)
  }, [blog])

  const handleClickLike = (id) => {
    dispatch(likeBlog(id)).catch((err) => {
      console.log(err)
    })
    setLikes(likes + 1)
  }
  return (
    <article>
      likes <span>{likes}</span>
      <button onClick={() => handleClickLike(blog.id)}>like</button>
    </article>
  )
}

export default BlogLike
