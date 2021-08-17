import { login as loginService } from '../services/login'

export const login = (credentials) => {
  return async (dispatch) => {
    const signedUser = await loginService(credentials)
    dispatch(loginSuccess(signedUser))
  }
}

const loginSuccess = (signedUser) => {
  return {
    type: '@LOGIN/LOGIN_SUCCESS',
    payload: {
      signedUser
    }
  }
}

export const logout = () => {
  return {
    type: '@LOGIN/LOGOUT'
  }
}
