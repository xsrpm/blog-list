import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeLogin, login, logout } from '../actions/loginAction'

const useLogin = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const dispatch = useDispatch()

  const resetForm = () => {
    setLoginForm({ username: '', password: '' })
  }

  const submitLogin = () => {
    return dispatch(
      login({
        username: loginForm.username,
        password: loginForm.password
      })
    )
  }

  const handleChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('signedUser')
    dispatch(logout())
  }

  const initializeSignedUser = () => {
    const dispatch = useDispatch()
    const signedUser = JSON.parse(window.localStorage.getItem('signedUser'))
    dispatch(initializeLogin(signedUser))
  }

  return {
    loginForm,
    resetForm,
    submitLogin,
    handleChangeLogin,
    handleLogout,
    initializeSignedUser
  }
}

export default useLogin
