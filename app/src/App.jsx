import React from 'react'
import { useDispatch } from 'react-redux'
import { initializeLogin } from './actions/loginAction'
import AppRouter from './AppRouter'

const App = () => {
  const dispatch = useDispatch()
  const signedUser = JSON.parse(window.localStorage.getItem('signedUser'))
  dispatch(initializeLogin(signedUser))
  return <AppRouter />
}

export default App
