import { useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import NotificationContext from './components/NotificationContext'
import UserContext from './components/UserContext'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'

const App = () => {
  const [notificationText, notificationDispatch] = useContext(NotificationContext)
  const [user, userDipatch] = useContext(UserContext)

  const blogFormRef = useRef()

  const query = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const queryClient = useQueryClient()

  const addBlogMutation = useMutation({
    mutationFn: blogService.postBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  // console.log(JSON.parse(JSON.stringify(query)))

  if (query.isError) {
    return <div>blogs are not available due to server issues</div>
  } else if (query.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = query.data

  const logIn = async (credentials) => {
    try {
      const theUser = await loginService.login(credentials)
      userDipatch({ type: 'LOGIN', payload: theUser })
      notificationDispatch({ type: 'LOGIN' })
    } catch (exception) {
      notificationDispatch({ type: 'LOGINERROR' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    userDipatch({ type: 'LOGOUT' })
    notificationDispatch({ type: 'LOGOUT' })
  }

  const addBlog = async (blogObject) => {
    try {
      addBlogMutation.mutate(blogObject)
      notificationDispatch({ type: 'ADDBLOG', payload: blogObject })
      blogFormRef.current.toggleVisibilty()
    } catch (error) {
      console.log(error)
      notificationDispatch({ type: 'ADDBLOGERROR' })
    }
  }

  const handleLikeFor = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    updateBlogMutation.mutate(likedBlog)
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
