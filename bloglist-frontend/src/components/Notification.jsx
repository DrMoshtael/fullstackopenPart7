import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const [message, dispatch] = useContext(NotificationContext)
  console.log('msg',message)
  if (message === '') {
    return null
  }
  else setTimeout(() => dispatch({ type:'NOTHING' }), 3000)

  let successful
  if (message === 'Blog failed to add' || message === 'Wrong username or password') successful = false
  else successful = true

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
