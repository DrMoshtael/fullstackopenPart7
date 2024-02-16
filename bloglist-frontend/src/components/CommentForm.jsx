import { useState } from 'react'

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Enter comment"
        required
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm