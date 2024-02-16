import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Page } from './StyledComponents'

const BlogList = ({ addBlog, blogFormRef, blogs, handleLikeFor }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'azure',
  }

  return (
    <div>
      <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      <Page>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </div>
          ))}
      </Page>
    </div>
  )
}

export default BlogList
