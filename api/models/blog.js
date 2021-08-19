const mongoose = require('mongoose')
const Exception = require('../utils/exception')
const { getUserById } = require('./user')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const getBlogs = () => {
  return Blog.find({}).populate('user', { username: 1, name: 1 })
}

const getBlogById = (id) => {
  return Blog.findById(id).populate('user', { username: 1, name: 1 })
}

const deleteBlogs = () => {
  return Blog.deleteMany({})
}

const updateBlogById = (id, blog) => {
  return Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query'
  })
}

const createBlog = async (title, url, author, userId) => {
  const blog = new Blog({
    title: title,
    url: url,
    author: author,
    likes: 0,
    user: userId
  })
  return await blog.save()
}

const deleteBlogByIdAndUser = async (blogId, userId) => {
  const blog = await getBlogById(blogId)
  // console.log('userId', userId)
  // console.log('blog', blog)
  if (blog === null) throw new Exception('NotFound', 'blog not found')
  if (blog.user._id.toString() === userId) {
    await blog.remove()
    const user = await getUserById(blog.user._id.toString())
    user.blogs = user.blogs.filter((b) => b.toString() !== blogId.toString())
    await user.save()
  } else {
    throw new Exception(
      'Unauthorized',
      'Unauthorized blog delete for this user'
    )
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = {
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogByIdAndUser,
  createBlog,
  deleteBlogs
}
