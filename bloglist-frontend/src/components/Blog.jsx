import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Button, Container, Page, List, ListItem } from './StyledComponents'

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
    const new_blog = {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user.id,
    }
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

  const keyGenerator = () => Number((Math.random() * 1000000).toFixed(0))

  return (
    <Page>
      <Container>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer noopener">
            {blog.url}
          </a>
        </div>
        <div>
          <div>{blog.likes} likes</div>
          <Button onClick={likeHandler} id="like-button">
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>

        <Button
          onClick={handleDelete}
          style={{ display: usersBlog ? '' : 'none' }}
        >
          remove
        </Button>
        <Page style={{ backgroundColor: 'white' }}>
          <h3>comments</h3>
          <CommentForm createComment={createComment} />
          <List>
            {blog.comments.map((c) => (
              <ListItem key={keyGenerator()}>{c}</ListItem>
            ))}
          </List>
        </Page>
      </Container>
    </Page>
  )
}

export default Blog
