import React from 'react'
import { useSelector } from 'react-redux'
import AppBlog from './components/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'

const App = () => {
  const signedUser = useSelector((state) => state.signedUser)

  const blogApp = () => <AppBlog user={signedUser} />

  const login = () => (
    <LoginContainer>
      <Notification />
    </LoginContainer>
  )

  return <>{signedUser ? blogApp() : login()}</>
}

export default App
