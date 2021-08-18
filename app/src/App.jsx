import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { initializeLogin } from './actions/loginAction'
import AppBlog from './components/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'

const AppRouter = () => {
  const signedUser = useSelector((state) => state.signedUser)
  const routes = () => (
    <Switch>
      <Route path='/'>
        <AppBlog />
      </Route>
    </Switch>
  )

  const login = () => (
    <LoginContainer>
      <Notification />
    </LoginContainer>
  )

  return <Router>{signedUser ? routes() : login()}</Router>
}

const App = () => {
  const dispatch = useDispatch()
  const signedUser = JSON.parse(window.localStorage.getItem('signedUser'))
  dispatch(initializeLogin(signedUser))
  return <AppRouter />
}

export default App
