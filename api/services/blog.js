const { createBlog, updateBlogById, getBlogById } = require('../models/blog')
const { getUserById } = require('../models/user')
const Exception = require('../utils/exception')

const createBlogService = async (title, url, userId) => {
  const user = await getUserById(userId)
  if (user === null) {
    throw new Exception(
      'Unauthorized',
      `the user with the id:'${userId}' does not exist`
    )
  }
  const savedBlog = await createBlog(title, url, user.username, userId)
  user.blogs = user.blogs.concat(savedBlog._id)
  // console.log('user', user)
  await user.save()
  return savedBlog
}

const updateBlogByIdService = async (blogId, title, url, likes, userId) => {
  const user = await getUserById(userId)
  const blog = await getBlogById(blogId)
  if (blog === null) {
    throw new Exception(
      'BadRequest',
      `the blog with the id:'${blogId}' does not exist`
    )
  }
  const savedBlog = await updateBlogById(blogId, {
    title: title || blog.title,
    author: user.username,
    url: url || blog.url,
    likes: likes || blog.likes
  })
  return savedBlog
}

const updateLikeByIdService = async (blogId, userId) => {
  const user = await getUserById(userId)
  const blog = await getBlogById(blogId)
  if (blog === null) {
    throw new Exception(
      'BadRequest',
      `the blog with the id:'${blogId}' does not exist`
    )
  }
  const savedBlog = await updateBlogById(blogId, {
    title: blog.title,
    author: user.username,
    url: blog.url,
    likes: blog.likes + 1
  })
  return savedBlog
}

module.exports = {
  createBlogService,
  updateBlogByIdService,
  updateLikeByIdService
}
