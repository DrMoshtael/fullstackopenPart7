import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const [{ message, successful }, dispatch] = useContext(NotificationContext)
  if (message === '') {
    return null
  }
  else setTimeout(() => dispatch({ type:'NOTHING' }), 3000)

  const notificationStyle = {
    color: successful ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
