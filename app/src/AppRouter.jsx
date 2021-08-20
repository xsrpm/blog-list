import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppBlog from './components/blogs/AppBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import AppUser from './components/users/AppUser'
import UserView from './components/users/UserView'
import useLogin from './hooks/useLogin'

const AppRouter = () => {
  const { handleLogout, signedUser } = useLogin()

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
    <Login>
      <Notification />
    </Login>
  )

  return <Router>{signedUser ? routes() : login()}</Router>
}

export default AppRouter
