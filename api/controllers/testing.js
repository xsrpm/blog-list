const router = require('express').Router()
const { deleteBlogs } = require('../models/blog')
const { deleteUsers, createUser } = require('../models/user')

router.delete('/reset', async (request, response) => {
  await deleteBlogs()
  await deleteUsers()
  response.status(204).end()
})

router.post('/users', async (request, response, next) => {
  try {
    const body = request.body
    const savedUser = await createUser(body.username, body.name, body.password)
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
