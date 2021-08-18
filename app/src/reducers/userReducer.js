const reducer = (state = [], action) => {
  switch (action.type) {
    case '@USER/INITIALIZE_USERS':
      return action.payload.users
    default:
      return state
  }
}

export default reducer
