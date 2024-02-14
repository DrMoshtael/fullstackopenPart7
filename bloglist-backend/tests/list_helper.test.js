const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const blog1 = {
    "title":"Technology, Values, and the Shaping of Social Reality",
    "author":"Matt Weinberg",
    "url":"https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
    "likes":1000,
    "__v": 0
}
const blog2 = {
    "title": "The Crisis of Identity",
    "author": "Shahrzad Sabet",
    "url":"https://bahaiworld.bahai.org/library/the-crisis-of-identity/",
    "likes":950,
    "__v": 1
}

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only 1 blog equals the like of that', () => {
        expect(listHelper.totalLikes([blog1])).toBe(1000)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes([blog1,blog2])).toBe(1950)
    })
})

describe('favourite blog', () => {
    test('of an empty array is 0', () => {
        expect(listHelper.favouriteBlog([])).toBe(0)
    })

    test('when a list has only 1 blog equals that blog', () => {
        expect(listHelper.favouriteBlog([blog2])).toEqual({
            "title": blog2.title,
            "author": blog2.author,
            "likes": blog2.likes
        })
    })

    test('when a list has multiple blogs equals the blog with most likes', () => {
        expect(listHelper.favouriteBlog([blog1, blog2])).toEqual({
            "title": blog1.title,
            "author": blog1.author,
            "likes": blog1.likes
        })
    })
})

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  describe('author with most blogs', () => {
    test('when array is empty returns 0', () => {
        expect(listHelper.mostBlogs([])).toBe(0)
    })

    test('when array has 1 element returns the author of that element', () => {
        expect(listHelper.mostBlogs([blog1])).toEqual({
            "author": "Matt Weinberg",
            "blogs": 1
        })
    })

    test('when array has multiple items returns the author with most blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            "author": "Robert C. Martin",
            "blogs": 3
        })
    })
  })

  describe('Author with most likes', () => {
    test('when the array is empty returns 0', () => {
        expect(listHelper.mostLikes([])).toBe(0)
    })

    test('when there is a single entry returns that author', () => {
        expect(listHelper.mostLikes([blog1])).toEqual({
            "author": "Matt Weinberg",
            "likes": 1000
        })
    })

    test('when there are multiple entries returns most liked author', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            "author": "Edsger W. Dijkstra",
            "likes": 17
        })
    })
  })