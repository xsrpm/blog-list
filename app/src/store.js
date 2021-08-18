import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  signedUser: loginReducer,
  users: userReducer
})

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
