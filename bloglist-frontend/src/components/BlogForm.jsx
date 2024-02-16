import { useState } from 'react'
import {
  FormGroup,
  Form,
  FormContainer,
  Label,
  Input,
  Button,
} from './StyledComponents'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>add new</h2>
      <FormContainer>
        <Form onSubmit={addBlog}>
          <FormGroup>
            <Label htmlFor="title">title:</Label>
            <Input
              type="text"
              value={title}
              id="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Enter title"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="author">author:</Label>
            <Input
              type="text"
              value={author}
              id="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="Enter author"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="url">url:</Label>
            <Input
              type="url"
              value={url}
              id="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="Enter URL"
              required
            />
          </FormGroup>
          <Button id="blogForm-button" type="submit">
            add
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default BlogForm
