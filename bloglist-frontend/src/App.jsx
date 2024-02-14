import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const theUser = JSON.parse(userJSON)
      setUser(theUser)
      blogService.setToken(theUser.token)
    }
  }, [])

  const logIn = async (credentials) => {
    try {
      const theUser = await loginService.login(credentials)
      blogService.setToken(theUser.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(theUser))
      setUser(theUser)
      setSuccess(true)
      setNotificationMessage('Successful login')
      setTimeout(() => setNotificationMessage(null), 2000)
    } catch (exception) {
      setSuccess(false)
      setNotificationMessage('Wrong username or password')
      setTimeout(() => setNotificationMessage(null), 2000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setSuccess(true)
    setNotificationMessage('Logged out')
    setTimeout(() => setNotificationMessage(null), 2000)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.postBlog(blogObject)
      const theBlog = await blogService.getOne(blog.id) //Exercise 5.8 solution 1
      setBlogs(blogs.concat(theBlog))
      // const blogs = await blogService.getAll() //Exercise 5.8 solution 2
      // setBlogs(blogs)
      setSuccess(true)
      setNotificationMessage(
        `A new blog, '${blog.title}' by ${blog.author} added`,
      )
      setTimeout(() => setNotificationMessage(null), 3000)
      blogFormRef.current.toggleVisibilty()
    } catch (error) {
      console.log(error)
      setSuccess(false)
      setNotificationMessage('Blog failed to add')
      setTimeout(() => setNotificationMessage(null), 3000)
    }
  }

  const handleLikeFor = async (blog) => {
    setBlogs(
      blogs.map((blg) =>
        blg.id !== blog.id ? blg : { ...blog, likes: blog.likes + 1 },
      ),
    ) //Update immediately for a more responsive feel
    const likedBlog = { ...blog, likes: ++blog.likes, user: blog.user.id }
    await blogService.postLike(blog.id, likedBlog)
  }

  const blogSection = (user) => (
    <div>
      <h2> blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            likeHandler={() => handleLikeFor(blog)}
          />
        ))}
    </div>
  )

  const loginSection = () => (
    <div>
      <h2>log in to application</h2>
      <LoginForm logIn={logIn} />
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} successful={success} />
      {!user && loginSection()}
      {user && blogSection(user)}
    </div>
  )
}

export default App
