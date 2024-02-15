import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, likeHandler }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [user, dispatch] = useContext(UserContext)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
      navigate('/')
    }
  }

  let usersBlog = false
  if (blog.user.username === user.username) usersBlog = true

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer noopener">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={likeHandler} id="like-button">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        <button
          onClick={handleDelete}
          style={{ display: usersBlog ? '' : 'none' }}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
