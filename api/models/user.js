const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const Exception = require('../utils/exception')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.password
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

const createUser = (username, name, password) => {
  if (password.length < 3) throw new Exception('ValidationError', `User validation failed: password: Path 'password' ('${password}') is shorter than the minimum allowed length (3).`)
  const user = new User({
    username: username,
    name: name,
    password: bcrypt.hashSync(password, 10)
  })
  return user.save()
}

const getUsers = () => {
  return User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
}

const getUserById = (userId) => {
  return User.findById(userId)
}

const deleteUsers = () => {
  return User.deleteMany({})
}

const login = async (username, password) => {
  const user = await User.findOne({ username: username })
  // console.log('user', user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password.toString())
  // console.log('passwordCorrect', passwordCorrect)
  return {
    authorized: user && passwordCorrect,
    user: user
  }
}

const generateToken = (username, userId) => {
  const userForToken = {
    username: username,
    id: userId
  }
  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = { User, createUser, getUsers, deleteUsers, login, generateToken, getUserById }
