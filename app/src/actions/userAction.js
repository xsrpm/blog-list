import { getAll } from '../services/users'

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAll()
    dispatch({
      type: '@USER/INITIALIZE_USERS',
      payload: {
        users
      }
    })
    console.log('Users initialized')
  }
}
