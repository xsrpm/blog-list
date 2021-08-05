const { MONGO_URL } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
} = require('./utils/middleware')

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))
app.use(requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/users', tokenExtractor, userExtractor, usersRouter)
app.use('/api/blogs', tokenExtractor, userExtractor, blogRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app, mongoose }
