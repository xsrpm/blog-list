import React from 'react'
import useBlogNew from '../../hooks/useBlogNew'

const BlogNew = () => {
  const {
    title,
    url,
    isOpen,
    formClose,
    formOpen,
    handleChangeTitle,
    handleChangeUrl,
    handleSubmit
  } = useBlogNew()

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

export default BlogNew
