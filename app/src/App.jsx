import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { initializeLogin, logout } from './actions/loginAction'
import AppBlog from './components/blogs/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'
import AppUser from './components/users/AppUser'
import UserViewContainer from './components/users/UserView'

const AppRouter = () => {
  const signedUser = useSelector((state) => state.signedUser)
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('signedUser')
    dispatch(logout())
  }
  const routes = () => (
    <>
      <header>
        <h1>bloglist</h1>
        <p>Logged in as {signedUser.username}</p>
        <input type='button' value='logout' onClick={handleLogout} />
      </header>
      <Switch>
        <Route exact path='/users'>
          <AppUser />
        </Route>
        <Route path='/users/:id'>
          <UserViewContainer />
        </Route>
        <Route path='/'>
          <AppBlog />
        </Route>
      </Switch>
    </>
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
