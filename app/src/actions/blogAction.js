import { create, getAll } from '../services/blogs'

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
