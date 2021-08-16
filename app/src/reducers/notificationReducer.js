export const sendNotification = (notification, time = 4) => {
  return async (dispatch) => {
    dispatch({
      type: '@NOTIFICATION/SEND_NOTIFICATION',
      payload: {
        notification
      }
    })
    await setTimeout(() => {
      dispatch({
        type: '@NOTIFICATION/REMOVE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

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
