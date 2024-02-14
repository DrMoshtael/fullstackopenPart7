const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
var loggedInToken = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

beforeAll(async () => {
    await User.deleteMany({})

    //Create a user
    const user = {
        "username": "testX",
        "password": "passX",
        "name": "testerX"
    }
    await api
        .post('/api/users')
        .send(user)

    //Get token by logging in
    const credentials = {
        "username": "testX",
        "password": "passX"
    }
    const res = await api
        .post('/api/login')
        .send(credentials)

    loggedInToken = 'Bearer ' + res.body.token
})

describe('Creating a new user', () => {


    test('succeeds if conditions are met', async () => {
        const user = {
            "username": "test1",
            "password": "pass1",
            "name": "tester1"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()

        const usernames = usersAfter.map(n => n.username)
        expect(usernames).toContain('test1')
    })

    test('fails if the username is too short', async () => {
        const user = {
            "username": "te",
            "password": "pass2",
            "name": "tester2"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect(res => expect(res.body.error).toContain('is shorter than the minimum allowed length'))
    })

    test('fails if the password is too short', async () => {
        const user = {
            "username": "test3",
            "password": "pa",
            "name": "tester3"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect(res => expect(res.body.error).toContain('Password too short'))
    })
})

describe('login', () => {
    test('succeeds for correct credentials', async () => {
        const credentials = {
            "username": "testX",
            "password": "passX"
        }
        const res = await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
    })
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('missing likes defaults to zero', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[1].likes).toBe(0)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const blog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }

        await api
            .post('/api/blogs')
            .set('Authorization', loggedInToken)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfter.map(n => n.title)
        expect(titles).toContain('React patterns')
    })

    test('a missing title results in 400', async () => {
        const blog = {
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5
        }

        await api
            .post('/api/blogs')
            .set('Authorization', loggedInToken)
            .send(blog)
            .expect(400)

    })

    test('a missing url results in 400', async () => {
        const blog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set('Authorization', loggedInToken)
            .send(blog)
            .expect(400)
    })
})

describe('updating a blog', () => {
    test('a valid update is successful', async () => {
        const updated_blog = {
            title: "Technology, Values, and the Shaping of Social Reality",
            author: "Matt Weinberg",
            url: "https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
            likes: 1001,
        }

        const blogsAtStart = await helper.blogsInDb()

        await api
            .put(`/api/blogs/${blogsAtStart[0].id}`)
            .send(updated_blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(blogsAtStart).toHaveLength(blogsAtStart.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        //Post a blog to delete (the insertion of blogs doesn't work as it wasn't posted by a user)
        const blog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
        }
        await api
            .post('/api/blogs')
            .set('Authorization', loggedInToken)
            .send(blog)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[3]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', loggedInToken)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})




afterAll(async () => {
    await mongoose.connection.close()
})