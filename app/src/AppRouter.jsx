import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AppBlog from './components/blogs/AppBlog'
import LoginContainer from './components/LoginContainer'
import Notification from './components/Notification'
import AppUser from './components/users/AppUser'
import UserView from './components/users/UserView'
import { logout } from './actions/loginAction'

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
          <UserView />
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

export default AppRouter
