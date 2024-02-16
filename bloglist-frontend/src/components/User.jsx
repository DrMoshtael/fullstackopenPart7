import { List, ListItem } from './StyledComponents'

const User = ({ user }) => {

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
