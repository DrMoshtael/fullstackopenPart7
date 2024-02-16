import { useState } from 'react'
import {
  Form,
  Label,
  Input,
  FormGroup,
  FormContainer,
  Button,
} from './StyledComponents'

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
    <FormContainer>
      <Form onSubmit={passCredentials}>
        <FormGroup>
          <Label htmlFor="username">username</Label>
          <Input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </FormGroup>
        <Button id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginForm
