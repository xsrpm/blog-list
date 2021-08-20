import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useBlog from '../../hooks/useBlog'

const BlogList = ({ children }) => {
  const { getBlogs } = useBlog()
  const blogs = getBlogs()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <article>
      {children}
      <ul style={{ padding: 0 }} className='list'>
        {blogs.map((blog) => (
          <li style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

PropTypes.propTypes = {
  children: PropTypes.node,
  notificationRef: PropTypes.object.isRequired
}

export default BlogList
