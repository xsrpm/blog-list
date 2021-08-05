const { Blog, getBlogs } = require('../models/blog')
const { User, deleteUsers, generateToken, createUser } = require('../models/user')
let token = ''
let user = ''

const initializeTestDb = async () => {
  await deleteUsers()
  user = await createUser('root', 'root', '1234')
  token = await generateToken(user.username, user._id)
  return { user, token }
}

const initialBlogs = [{ title: 'React patterns', url: 'https://reactpatterns.com/' }, { title: 'Go To Statement Considered Harmful', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' }]

const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon', likes: 0 })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await getBlogs()
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const adminAuthToken = () => {
  return `Bearer ${token}`
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, adminAuthToken, initializeTestDb, user
}
