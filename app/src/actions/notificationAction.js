export const sendNotification = (notification = '', time = 5) => {
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
