const blogRouter = require('express').Router()
const {
  getBlogs,
  getBlogById,
  deleteBlogByIdAndUser
} = require('../models/blog')
const {
  createBlogService,
  updateBlogByIdService,
  updateLikeByIdService,
  addBlogCommentByIdService
} = require('../services/blog')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await getBlogs()
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await getBlogById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const { title, url } = request.body
    const savedBlog = await createBlogService(title, url, request.userId)
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await deleteBlogByIdAndUser(request.params.id, request.userId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.patch('/:id', async (request, response, next) => {
  try {
    const { title, url, likes } = request.body
    const updatedBlog = await updateBlogByIdService(
      request.params.id,
      title,
      url,
      likes,
      request.userId
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.patch('/:id/like', async (request, response, next) => {
  try {
    const updatedBlog = await updateLikeByIdService(
      request.params.id,
      request.userId
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { comment } = request.body
    const updatedBlog = await addBlogCommentByIdService(
      request.params.id,
      comment
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
