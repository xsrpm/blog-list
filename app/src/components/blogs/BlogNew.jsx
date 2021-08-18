import React from 'react'
import PropTypes from 'prop-types'

const BlogNew = ({
  handleSubmit,
  title,
  handleChangeTitle,
  url,
  handleChangeUrl,
  formClose,
  formOpen,
  isOpen = false
}) => {
  const formClosed = () => {
    return <button onClick={formOpen}>create new blog</button>
  }
  const formOpened = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h2>create new</h2>
          <div>
            <label>
              title:{' '}
              <input name='title' value={title} onChange={handleChangeTitle} />
            </label>
          </div>
          <div>
            <label>
              url: <input name='url' value={url} onChange={handleChangeUrl} />
            </label>
          </div>
          <button>create</button>
        </form>
        <button onClick={formClose}>cancel</button>
      </>
    )
  }
  return <article>{isOpen ? formOpened() : formClosed()}</article>
}

BlogNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  handleChangeUrl: PropTypes.func.isRequired,
  formClose: PropTypes.func.isRequired
}

export default BlogNew
