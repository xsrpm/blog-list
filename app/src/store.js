import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  signedUser: loginReducer
})

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
