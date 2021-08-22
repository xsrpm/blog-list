import { create, getAll, like, remove } from '../services/blogs'

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await create(blog)
    console.log({ newBlog })
    dispatch({
      type: '@BLOG/CREATE',
      payload: {
        blog: newBlog
      }
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch({
      type: '@BLOG/INITIALIZE_BLOGS',
      payload: {
        blogs
      }
    })
    console.log('Blogs initialized')
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await remove(blogId)
    dispatch({
      type: '@BLOG/DELETE_BLOG',
      payload: {
        blogId
      }
    })
  }
}

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    await like(blogId)
    dispatch({
      type: '@BLOG/LIKE_BLOG',
      payload: {
        blogId
      }
    })
  }
}

export const addBlogComment = (blogId, comment) => {
  return async (dispatch) => {
    await like(blogId)
    dispatch({
      type: '@BLOG/NEW_COMMENT',
      payload: {
        blogId,
        comment
      }
    })
  }
}
