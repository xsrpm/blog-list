import { login as loginService } from '../services/login'

export const login = (credentials) => {
  return async (dispatch) => {
    const signedUser = await loginService(credentials)
    window.localStorage.setItem('signedUser', JSON.stringify(signedUser))
    dispatch(loginSuccess(signedUser))
  }
}

const loginSuccess = (signedUser) => ({
  type: '@LOGIN/LOGIN_SUCCESS',
  payload: {
    signedUser
  }
})

export const logout = () => {
  return {
    type: '@LOGIN/LOGOUT'
  }
}

export const initializeLogin = (signedUser) => {
  return {
    type: '@LOGIN/INITIALIZE_LOGIN',
    payload: {
      signedUser
    }
  }
}
