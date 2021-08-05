import React from 'react'
import PropTypes from 'prop-types'

const Login = ({
  children,
  handleSubmitLogin,
  handleChangeLogin,
  loginForm
}) => {
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
  children: PropTypes.node,
  handleSubmitLogin: PropTypes.func,
  handleChangeLogin: PropTypes.func,
  loginForm: PropTypes.object
}

export default Login
