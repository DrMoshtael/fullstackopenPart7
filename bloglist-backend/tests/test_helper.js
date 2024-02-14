const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title:"Technology, Values, and the Shaping of Social Reality",
        author:"Matt Weinberg",
        url:"https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
        likes:1000
    },
    {
        title: "The Crisis of Identity",
        author: "Shahrzad Sabet",
        url:"https://bahaiworld.bahai.org/library/the-crisis-of-identity/"
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(n => n.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(n => n.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}