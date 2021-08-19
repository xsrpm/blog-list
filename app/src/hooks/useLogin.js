import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../actions/loginAction'

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

  return {
    loginForm,
    resetForm,
    submitLogin,
    handleChangeLogin
  }
}

export default useLogin
