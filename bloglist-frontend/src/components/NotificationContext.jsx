import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGOUT':
    return { message: 'Logged out', successful: true }
  case 'ADDBLOG':
    return { message: `Blog '${action.payload.title}' by ${action.payload.author} added`, successful: true }
  case 'ADDBLOGERROR':
    return { message: 'Blog failed to add', successful: false }
  case 'LOGIN':
    return { message: 'Successful login', successful: true }
  case 'LOGINERROR':
    return { message: 'Wrong username or password', successful: false }
  case 'NOTHING':
    return { message: '', successful: true }
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [text, dispatch] = useReducer(reducer, { message: '', successful: true })
  return (
    <NotificationContext.Provider value={[text, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
