import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  const style = {
    backgroundColor: 'aliceblue',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10
  }
  return (
    <p style={style}>
      <Link to="/users">users </Link>
      <Link to="/"> blogs </Link>
      {user.name} logged in
      <button onClick={handleLogout}> logout</button>
    </p>
  )
}

export default Navbar
