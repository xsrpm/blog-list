import React, { useState } from 'react'
import AppBlog from './components/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('loggedBlogListUser'))
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  const blogApp = () => <AppBlog user={user} handleLogout={handleLogout} />

  const login = () => (
    <LoginContainer setUser={setUser}>
      <Notification />
    </LoginContainer>
  )

  return <>{user ? blogApp() : login()}</>
}

export default App
