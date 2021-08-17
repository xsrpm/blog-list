import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Login from './Login'
import { sendNotification } from '../actions/notificationAction'
import { login } from '../actions/loginAction'
const LoginContainer = ({ children }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const dispatch = useDispatch()

  const handleSubmitLogin = (e) => {
    e.preventDefault()

    dispatch(
      login({
        username: loginForm.username,
        password: loginForm.password
      })
    ).catch((error) => {
      setLoginForm({ username: '', password: '' })
      console.log({ error })
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.error)
        console.log(error.response.status)
        dispatch(
          sendNotification(error.response.data?.error || error.response.data, 5)
        )
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
  children: PropTypes.node
}

export default LoginContainer
