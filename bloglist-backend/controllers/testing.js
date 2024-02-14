testingRouter = require('express').Router()
Blog = require('../models/blog')
User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

module.exports = testingRouter