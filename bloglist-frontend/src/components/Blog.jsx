import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ blog, likeHandler, postComment }) => {
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

  const createComment = (comment) => {
    const new_blog = { ...blog, comments: blog.comments.concat(comment), user: blog.user.id }
    postComment.mutate(new_blog)
  }

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

  const keyGenerator = () => (
    Number((Math.random() * 1000000).toFixed(0))
  )

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
        <h3>comments</h3>
        <CommentForm createComment={createComment} />
        <ul>
          {blog.comments.map((c) => (
            <li key={keyGenerator()}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
