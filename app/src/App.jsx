import React from 'react'
import AppRouter from './AppRouter'
import useLogin from './hooks/useLogin'

const App = () => {
  const { initializeSignedUser } = useLogin()
  initializeSignedUser()
  return <AppRouter />
}

export default App
