import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from '../actions/notificationAction'
import { initializeUsers } from '../actions/userAction'
import { setToken } from '../services/users'

const useUser = () => {
  const dispatch = useDispatch()
  const signedUser = useSelector((state) => state.signedUser)

  setToken(signedUser.token)

  useEffect(() => {
    dispatch(initializeUsers()).catch((error) => {
      console.log({ error })
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        dispatch(sendNotification(error.response.data, 5))
      }
    })
  }, [dispatch])

  const getUsers = () => {
    return useSelector((state) => state.users)
  }
  const getUserById = (id) => {
    return useSelector((state) => state.users.find((u) => u.id === id))
  }

  return {
    getUsers,
    getUserById
  }
}

export default useUser
