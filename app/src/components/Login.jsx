import React from 'react'
import PropTypes from 'prop-types'
import { sendNotification } from '../actions/notificationAction'
import useLogin from '../hooks/useLogin'
import { useDispatch } from 'react-redux'
const Login = ({ children }) => {
  const { loginForm, resetForm, submitLogin, handleChangeLogin } = useLogin()
  const dispatch = useDispatch()
  const handleSubmitLogin = (e) => {
    e.preventDefault()

    submitLogin().catch((error) => {
      resetForm()
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

  return (
    <div>
      <h2>Log in to application</h2>
      {children}
      <form onSubmit={handleSubmitLogin}>
        <div>
          <label>
            Username{' '}
            <input
              type='text'
              name='username'
              value={loginForm.username}
              onChange={handleChangeLogin}
            />
          </label>
        </div>
        <div>
          <label>
            Password{' '}
            <input
              type='password'
              name='password'
              value={loginForm.password}
              onChange={handleChangeLogin}
            />
          </label>
        </div>
        <input type='submit' value='login' />
      </form>
    </div>
  )
}

Login.propTypes = {
  children: PropTypes.node
}

export default Login
