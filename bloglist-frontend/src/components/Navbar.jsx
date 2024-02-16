import { Link } from 'react-router-dom'
import { NavStyle, Button } from './StyledComponents'

const Navbar = ({ user, handleLogout }) => {
  const style = {
    backgroundColor: 'aliceblue',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  }
  return (
    <NavStyle>
      <Link to="/users">users </Link>
      <Link to="/"> blogs </Link>
      {user.name} logged in
      <Button onClick={handleLogout}>
        {' '}
        logout
      </Button>
    </NavStyle>
  )
}

export default Navbar
