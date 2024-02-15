import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user, likeHandler }) => {
  const [collapsed, setCollapsed] = useState(true)

  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const fullView = () => {
    let usersBlog = false
    if (blog.user.username === user.username) usersBlog = true

    return (
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={likeHandler} id="like-button">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
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

  return (
    <div className="Blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleCollapse}>{collapsed ? 'view' : 'hide'}</button>
      {!collapsed && fullView()}
    </div>
  )
}

export default Blog
