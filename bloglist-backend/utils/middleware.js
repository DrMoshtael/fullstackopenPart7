const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.message === 'CastError') {
        return response
            .status(400)
            .send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response
            .status(400)
            .json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authHeader = request.get('authorization')

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.replace('Bearer ', '')

        request.token = token
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        req.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = {
    errorHandler,
    requestLogger,
    tokenExtractor,
    userExtractor
}