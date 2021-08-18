import React from 'react'
import BlogContainer from './BlogContainer'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogList = ({ children }) => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  return (
    <article>
      {children}
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
