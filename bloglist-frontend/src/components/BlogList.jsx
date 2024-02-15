import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = ({ addBlog, blogFormRef, blogs, handleLikeFor }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
