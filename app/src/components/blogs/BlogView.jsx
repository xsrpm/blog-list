import React from 'react'
import { useParams } from 'react-router-dom'
import useBlog from '../../hooks/useBlog'
import Comments from '../comments/Comments'
import BlogLike from './BlogLike'

const BlogView = () => {
  const id = useParams().id
  const { getBlogById, remove } = useBlog()
  const blog = getBlogById(id)

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
      <BlogLike blog={blog} />
      <div>added by {blog.author}</div>
      <button onClick={() => handleClickDelete(blog.title, blog.id)}>
        remove
      </button>
      <Comments blogId={blog.id} />
    </article>
  )
}

export default BlogView
