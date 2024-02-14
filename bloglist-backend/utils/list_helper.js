const logger = require('../utils/logger')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentItem) => accumulator + currentItem.likes, 0)
}

const favouriteBlog = (blogs) => {
    const fav = blogs.reduce((favouriteBlog, currentBlog) =>
        favouriteBlog = favouriteBlog.likes > currentBlog.likes
            ? favouriteBlog
            : currentBlog,
        0
    )

    return fav === 0
        ? 0
        : {
            "title": fav.title,
            "author": fav.author,
            "likes": fav.likes
        }
}

const mostBlogs = (blogs) => {
    if (_.isEmpty(blogs)) return 0

    const frequencies = _.chain(blogs)
        .map(n => n.author) //array of authors
        .reduce((obj, ele) => {
            obj[ele] = (obj[ele] || 0) + 1 //Create or reference property, incrementing using short-circuit evaluation
            return obj //return authors with their frequencies
        },
            {}
        )
        .value()

    pop_author = _.maxBy(Object.keys(frequencies), author => frequencies[author]) //Parameter 1: Create array of authors; parameter 2: return frequency of each author; returns max frequency

    return { "author": pop_author, "blogs": frequencies[pop_author] }

}

const mostLikes = (blogs) => {
    if (_.isEmpty(blogs)) return 0

    const summedLikes = _.chain(blogs)
        .map(n => {
            return {[n.author] : n.likes} //Using computed property name
        })
        .reduce((obj, ele) => {
            obj[Object.keys(ele)[0]] = (obj[Object.keys(ele)[0]] || 0) + Object.values(ele)[0]
            return obj
        }, {})
        .value()
    const pop_author = _.maxBy(Object.keys(summedLikes), author => summedLikes[author])
    return {"author": pop_author, "likes": summedLikes[pop_author]}
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}