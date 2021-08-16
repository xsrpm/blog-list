const reducer = (state = '', action) => {
  switch (action.type) {
    case '@NOTIFICATION/SEND_NOTIFICATION':
      return action.payload.notification
    case '@NOTIFICATION/REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default reducer
