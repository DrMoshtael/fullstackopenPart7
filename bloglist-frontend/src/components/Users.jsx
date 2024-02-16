import { Link } from 'react-router-dom'
import { Table, TableHeader, TableCell } from './StyledComponents'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>User name</TableHeader>
            <TableHeader>Blogs created</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
