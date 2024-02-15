import { createContext, useReducer } from 'react'
import blogService from '../services/blogs'

const UserContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN': {
    const theUser = action.payload
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(theUser))
    blogService.setToken(theUser.token)
    return theUser
  }
  case 'LOGOUT': {
    window.localStorage.removeItem('loggedBlogappUser')
    return null
  }
  default:
    return state
  }
}

export const UserContextProvider = (props) => {
  let theUser = window.localStorage.getItem('loggedBlogappUser')
  if (theUser) {
    theUser = JSON.parse(theUser)
    blogService.setToken(theUser.token)
  } else theUser = null
  const [user, dispatch] = useReducer(reducer, theUser)
  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext