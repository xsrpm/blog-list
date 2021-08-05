const jwt = require('jsonwebtoken')
const logger = require('./logger')
const Exception = require('./exception')

// const morgan = require('morgan')
// morgan.token('body', (req, res) => JSON.stringify(req.body))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const requestLogger = (request, response, next) => {
  if (!process.env.LOGGER_OFF) {
    logger.info('---------------------------------------------------------------------------')
    logger.info('---------------------------------------------------------------------------')
    logger.info(request.headers)
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
  }
  next()
}

const unknownEndpoint = (request, response, next) => {
  try {
    throw new Exception('NotFound', 'unknown endpoint')
  } catch (error) {
    next(error)
  }
}

const errorHandler = (error, request, response, next) => {
  if (!process.env.LOGGER_OFF) {
    logger.error('error.name', error.name)
    logger.error('error.message:', error.message)
  }
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'BadRequest') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'Unauthorized') {
    return response.status(401).json({
      error: error.message
    })
  } else if (error.name === 'NotFound') {
    return response.status(404).json({
      error: error.message
    })
  } else {
    return response.status(500).json({ error: error.message })
  }
}

const tokenExtractor = (request, response, next) => {
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1]
      request.token = token
      next()
    } else {
      throw new Exception('Unauthorized', 'missing authorization header')
    }
  } catch (error) {
    next(error)
  }
}

const userExtractor = (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      logger.info('decodedToken', decodedToken)
      request.user = decodedToken.user
      request.userId = decodedToken.id
      next()
    } else {
      throw new Exception('Unauthorized', 'missing token')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
