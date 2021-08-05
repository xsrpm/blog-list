import React, { useState } from 'react'
import AppBlog from './components/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('loggedBlogListUser'))
  )
  const [message, setMessage] = useState('')

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  const sendNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const blogApp = () => (
    <AppBlog user={user} handleLogout={handleLogout} />
  )

  const login = () => (
    <LoginContainer setUser={setUser} sendNotification={sendNotification}>
      <Notification message={message} />
    </LoginContainer>
  )

  return (<>{user ? blogApp() : login()}</>)
}

export default App
