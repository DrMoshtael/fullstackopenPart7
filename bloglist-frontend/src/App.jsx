import { useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'
import UserContext from './components/UserContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import usersService from './services/users'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'

const App = () => {
  const [notificationText, notificationDispatch] =
    useContext(NotificationContext)
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

  const commentMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAllUsers,
  })

  const match = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:Bid')

  if (userQuery.isError) return <p>Unable to retrieve users from the server</p>
  else if (userQuery.isLoading) return <p>Data is loading...</p>

  const users = userQuery.data

  const linkedUser = match ? users.find((u) => u.id === match.params.id) : null

  // console.log(JSON.parse(JSON.stringify(query)))

  if (query.isError) {
    return <div>blogs are not available due to server issues</div>
  } else if (query.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = query.data
  const linkedBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.Bid)
    : null

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

  const loginSection = () => (
    <div>
      <h2>log in to application</h2>
      <LoginForm logIn={logIn} />
    </div>
  )

  if (!user) {
    return (
      <div>
        <Notification />
        {loginSection()}
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <Navbar user={user} handleLogout={handleLogout} />
        <h2> blog list app</h2>
        <Routes>
          <Route
            path="/"
            element={
              <BlogList
                addBlog={addBlog}
                blogFormRef={blogFormRef}
                blogs={blogs}
                handleLikeFor={handleLikeFor}
              />
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User user={linkedUser} />} />
          <Route
            path="/blogs/:Bid"
            element={
              <Blog
                blog={linkedBlog}
                likeHandler={() => handleLikeFor(linkedBlog)}
                postComment={commentMutation}
              />
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
