import React from 'react'
import BlogList from './BlogList'
import BlogNewContainer from './BlogNewContainer'
import Notification from '../Notification'

const AppBlog = () => {
  return (
    <article>
      <h2>blogs</h2>
      <BlogNewContainer />
      <BlogList>
        <Notification />
      </BlogList>
    </article>
  )
}

export default AppBlog
