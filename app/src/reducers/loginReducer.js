const reducer = (state = null, action) => {
  switch (action.type) {
    case '@LOGIN/LOGIN_SUCCESS':
      return action.payload.signedUser
    case '@LOGIN/LOGOUT':
      return null
    default:
      return state
  }
}

export default reducer
