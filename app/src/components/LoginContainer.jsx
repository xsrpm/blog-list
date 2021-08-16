import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Login from './Login'
import { login } from '../services/login'
import { sendNotification } from '../actions/notificationAction'
const LoginContainer = ({ children, setUser }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const dispatch = useDispatch()

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
          dispatch(sendNotification(error.response.data.error, 5))
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
  children: PropTypes.node
}

export default LoginContainer
