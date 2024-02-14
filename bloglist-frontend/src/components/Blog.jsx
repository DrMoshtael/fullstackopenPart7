import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, likeHandler }) => {
  const [collapsed, setCollapsed] = useState(true)

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

  // const handleLike = async () => {
  //   setBlogs(blogs.map(blg => blg.id !== blog.id ? blg : { ...blog, likes: ++blog.likes })) //Update immediately for a more responsive feel
  //   const likedBlog = { ...blog, likes: ++blog.likes, user: blog.user.id }
  //   await blogService.postLike(blog.id, likedBlog)
  // }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      setBlogs(blogs.filter((blg) => blg.id !== blog.id))
      await blogService.deleteBlog(blog.id)
    }
  }

  const fullView = () => {
    let usersBlog = false
    if (blog.user.username === user.username) usersBlog = true //To avoid doing an additional GET request for the user ID, just use the username which is also unique

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
