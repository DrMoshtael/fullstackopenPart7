import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'LOGOUT':
    return 'Logged out'
  case 'ADDBLOG':
    return `Blog '${action.payload.title}' by ${action.payload.author} added`
  case 'ADDBLOGERROR':
    return 'Blog failed to add'
  case 'LOGIN':
    return 'Successful login'
  case 'LOGINERROR':
    return 'Wrong username or password'
  case 'NOTHING':
    return ''
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [text, dispatch] = useReducer(reducer, '')
  return (
    <NotificationContext.Provider value={[text, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
