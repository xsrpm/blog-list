import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({
  notification: notificationReducer
})

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)
