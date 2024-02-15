import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const User = ({ user }) => {

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
