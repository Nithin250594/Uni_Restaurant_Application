import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginRoute = () => {
  const [userNameInput, setUserNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginFailureMessage, setLoginFailureMessage] = useState('')

  const onChangeUserName = event => {
    setUserNameInput(event.target.value)
  }

  const onChangePassword = event => {
    setPasswordInput(event.target.value)
  }

  const history = useHistory()

  const loginSuccessful = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }

  const loginFailure = errorMsg => {
    setLoginFailureMessage(errorMsg)
  }

  const onLogin = async event => {
    event.preventDefault()
    const userDetails = {username: userNameInput, password: passwordInput}

    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      loginSuccessful(data.jwt_token)
    } else {
      loginFailure(data.error_msg)
    }
  }

  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg">
      <h1>Uni Resto</h1>
      <form onSubmit={onLogin} className="login-form">
        <div className="login-section">
          <label htmlFor="username" className="label-name">
            UserName
          </label>
          <input
            type="text"
            placeholder="UserName"
            id="username"
            value={userNameInput}
            onChange={onChangeUserName}
            className="input-box"
          />
          <label htmlFor="password" className="label-name">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={passwordInput}
            onChange={onChangePassword}
            className="input-box"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {loginFailureMessage !== '' && (
            <p className="failure-message">*{loginFailureMessage}</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginRoute
