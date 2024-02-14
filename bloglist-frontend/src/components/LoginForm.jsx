import { useState } from 'react'

const LoginForm = ({ logIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const passCredentials = (event) => {
    event.preventDefault()
    logIn({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={passCredentials}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
