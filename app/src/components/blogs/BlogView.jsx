import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBlog from '../../hooks/useBlog'
import Comments from '../comments/Comments'

const BlogView = () => {
  const id = useParams().id
  const { getBlogById, like, remove } = useBlog()
  const blog = getBlogById(id)

  console.log(blog)
  const [likes, setLikes] = React.useState(blog?.likes || 0)

  useEffect(() => {
    setLikes(blog?.likes)
  }, [blog])

  const handleClickLike = (id) => {
    like(id)
    setLikes(likes + 1)
  }

  const handleClickDelete = (title, id) => {
    const confirm = window.confirm(`Remove blog ${title}`)
    if (confirm) {
      remove(title, id)
    }
  }
  if (!blog) {
    return null
  }
  return (
    <article>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <article>
        likes <span>{likes}</span>
        <button onClick={() => handleClickLike(blog.id)}>like</button>
      </article>
      <div>added by {blog.author}</div>
      <button onClick={() => handleClickDelete(blog.title, blog.id)}>
        remove
      </button>
      <Comments blogId={blog.id} />
    </article>
  )
}

export default BlogView
