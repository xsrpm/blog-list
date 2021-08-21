import React from 'react'
import BlogList from './BlogList'
import BlogNew from './BlogNew'
import Notification from '../Notification'

const AppBlog = () => {
  return (
    <article>
      <h2>blogs</h2>
      <BlogNew />
      <BlogList>
        <Notification />
      </BlogList>
    </article>
  )
}

export default AppBlog
