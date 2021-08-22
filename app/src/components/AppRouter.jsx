import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppBlog from './blogs/AppBlog'
import Login from './Login'
import Notification from './Notification'
import UserList from './users/UserList'
import UserView from './users/UserView'
import useLogin from '../hooks/useLogin'
import BlogView from './blogs/BlogView'

const AppRouter = () => {
  const signedUser = useSelector((state) => state.signedUser)
  const { handleLogout } = useLogin()

  const navStyle = {
    padding: '0.5rem',
    backgroundColor: 'cornflowerblue'
  }
  const spanStyle = {
    padding: '0.25rem'
  }

  const routes = () => (
    <>
      <header style={navStyle}>
        <nav>
          <Link to='/' style={spanStyle}>
            blogs
          </Link>
          <Link to='/users' style={spanStyle}>
            users
          </Link>
          <span style={spanStyle}>Logged in as {signedUser.username}</span>
          <input type='button' value='logout' onClick={handleLogout} />
        </nav>
      </header>
      <Switch>
        <Route exact path='/users'>
          <UserList />
        </Route>
        <Route path='/users/:id'>
          <UserView />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView />
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
