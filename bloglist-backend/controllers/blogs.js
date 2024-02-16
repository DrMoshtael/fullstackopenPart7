const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.token) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, user, comments } = request.body
    const new_blog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes, user, comments },
        { new: true, runValidators: true, context: 'query' })
    response.status(201).json(new_blog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const { title, author, url, likes, user, comments } = request.body
    const new_blog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes, user, comments },
        { new: true, runValidators: true, context: 'query' })
    response.status(201).json(new_blog)
})

// blogsRouter.put('/:id', async (request, response) => {
//     const blog = await Blog.findById(request.params.id)

//     const body = request.body
//     console.log("bdy",body)
//     if (!request.token) {
//         return response.status(401).json({error: 'token invalid'})
//     }

//     const user = request.user
//     console.log("usr",user)
//     const updatedBlog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//         user: user._id
//     })
//     console.log("blg",updatedBlog)
//     if (blog.user.id.toString() === user.id.toString()) {
//         const returnedBlog = await Blog.findByIdAndUpdate(
//             request.params.id,
//             updatedBlog,
//             { new: true, runValidators: true, context: 'query' })
        
//         console.log("upblg",returnedBlog)
//         // user.blogs = user.blogs.concat(updatedBlog._id)
//         // await user.save()
//         response.status(201).json(returnedBlog)
//     } else {
//         response.status(401).json( {error: 'not your blog to update'})
//     }

// })

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log('blg',blog)
    if (!request.token) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user
    console.log('usr',user)
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'token invalid' })
    }
})



module.exports = blogsRouter