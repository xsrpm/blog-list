import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeLogin } from './actions/loginAction'
import AppBlog from './components/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'

const AppLogin = () => {
  const signedUser = useSelector((state) => state.signedUser)
  const blogApp = () => <AppBlog />

  const login = () => (
    <LoginContainer>
      <Notification />
    </LoginContainer>
  )

  return <>{signedUser ? blogApp() : login()}</>
}

const App = () => {
  const dispatch = useDispatch()
  const signedUser = JSON.parse(window.localStorage.getItem('signedUser'))
  dispatch(initializeLogin(signedUser))
  return <AppLogin />
}

export default App
