import React, { useState } from 'react'
import { login } from '../services/login'
import PropTypes from 'prop-types'
import Login from './Login'
const LoginContainer = ({ children, sendNotification, setUser }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const handleSubmitLogin = (e) => {
    e.preventDefault()

    login({
      username: loginForm.username,
      password: loginForm.password
    })
      .then((body) => {
        console.log(body)
        window.localStorage.setItem('loggedBlogListUser', JSON.stringify(body))
        setLoginForm({ username: '', password: '' })
        setUser(body)
      })
      .catch((error) => {
        console.log({ error })
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.error)
          console.log(error.response.status)
          sendNotification(error.response.data.error)
        }
      })
  }

  const handleChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Login
      handleSubmitLogin={handleSubmitLogin}
      handleChangeLogin={handleChangeLogin}
      loginForm={loginForm}
    >
      {children}
    </Login>
  )
}

LoginContainer.propTypes = {
  setUser: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default LoginContainer
