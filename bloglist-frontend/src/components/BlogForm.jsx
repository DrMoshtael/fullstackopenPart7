import { useState } from 'react'

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
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author"
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="url"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Enter URL"
            required
          />
        </div>
        <button id="blogForm-button" type="submit">
          add
        </button>
      </form>
    </>
  )
}

export default BlogForm
