import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationText, notificationDispatch] = useContext(NotificationContext)

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
      notificationDispatch({ type:'LOGIN' })
    } catch (exception) {
      notificationDispatch({ type:'LOGINERROR' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    notificationDispatch({ type:'LOGOUT' })
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.postBlog(blogObject)
      const theBlog = await blogService.getOne(blog.id)
      setBlogs(blogs.concat(theBlog))
      notificationDispatch({ type:'ADDBLOG', payload: blog })
      blogFormRef.current.toggleVisibilty()
    } catch (error) {
      console.log(error)
      notificationDispatch({ type:'ADDBLOGERROR' })
    }
  }

  const handleLikeFor = async (blog) => {
    setBlogs(
      blogs.map((blg) =>
        blg.id !== blog.id ? blg : { ...blog, likes: blog.likes + 1 },
      ),
    )
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
      <Notification />
      {!user && loginSection()}
      {user && blogSection(user)}
    </div>
  )
}

export default App
