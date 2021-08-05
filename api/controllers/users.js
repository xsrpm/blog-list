const usersRouter = require('express').Router()
const { createUser, getUsers } = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const savedUser = await createUser(body.username, body.name, body.password)
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await getUsers()
  response.json(users)
})

module.exports = usersRouter
