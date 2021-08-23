import React from 'react'
import { useParams } from 'react-router-dom'
import useBlog from '../../hooks/useBlog'
import Comments from '../comments/Comments'
import BlogDelete from './BlogDelete'
import BlogLike from './BlogLike'

const BlogView = () => {
  const id = useParams().id
  const { getBlogById } = useBlog()
  const blog = getBlogById(id)

  if (!blog) {
    return null
  }
  return (
    <article>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <BlogLike blog={blog} />
      <div>added by {blog.author}</div>
      <BlogDelete blog={blog} />
      <Comments blogId={blog.id} />
    </article>
  )
}

export default BlogView
