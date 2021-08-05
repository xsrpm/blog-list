
const loginRouter = require('express').Router()
const { login, generateToken } = require('../models/user')
const Exception = require('../utils/exception')

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const { authorized, user } = await login(body.username, body.password)
    if (!(authorized)) {
      throw new Exception('Unauthorized', 'Username or password incorrect')
    }
    const token = generateToken(user.username, user._id)
    // console.log(token)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
