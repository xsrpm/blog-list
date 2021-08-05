import React from 'react'
import BlogContainer from './BlogContainer'

import PropTypes from 'prop-types'

const BlogList = ({ children, blogs }) => {
  return (
    <article>
      {children}
      <h2>blogs</h2>
      <section className='list'>
        {blogs.map((blog) => (
          <BlogContainer key={blog.id} blog={blog} />
        ))}
      </section>
    </article>
  )
}

PropTypes.propTypes = {
  children: PropTypes.node,
  notificationRef: PropTypes.object.isRequired
}

export default BlogList
