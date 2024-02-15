import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'

const Users = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAllUsers,
  })

  if (query.isError) return <p>Unable to retrieve users from the server</p>
  else if (query.isLoading) return <p>Data is loading...</p>

  const users = query.data

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
