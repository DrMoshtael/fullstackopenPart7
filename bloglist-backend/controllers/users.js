const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const users = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body
    if (!password) return response.status(400).send({ error: 'Please provide a password' })
    else if (password.length < 4) return response.status(400).send({ error: 'Password too short' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        passwordHash,
        name
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
    await User.findOneAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = usersRouter