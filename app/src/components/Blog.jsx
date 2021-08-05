import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  likesCount = 0,
  handleClickLike,
  handleClickDelete,
  handleClickShow,
  showMore = false,
  mount = true
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailsBlog = () => {
    return (
      <article>
        <div>{blog.url}</div>
        <div>
          likes <span>{likesCount}</span>
          <button onClick={() => handleClickLike(blog.id)}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={() => handleClickDelete(blog.title, blog.id)}>
          remove
        </button>
      </article>
    )
  }
  const blogBody = () => (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={handleClickShow}>{showMore ? 'hide' : 'view'}</button>
      {showMore ? detailsBlog() : ''}
    </div>
  )

  return <>{mount && blogBody()}</>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likesCount: PropTypes.number,
  handleClickLike: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickShow: PropTypes.func.isRequired,
  showMore: PropTypes.bool,
  mount: PropTypes.bool
}

export default Blog
