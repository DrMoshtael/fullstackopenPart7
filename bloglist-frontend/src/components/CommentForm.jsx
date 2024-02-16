import { useState } from 'react'
import { Form, Input, Button } from './StyledComponents'

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createComment(comment)
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Enter comment"
        required
      />
      <Button type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm