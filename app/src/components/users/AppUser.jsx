import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendNotification } from '../../actions/notificationAction'
import { initializeUsers } from '../../actions/userAction'
import { setToken } from '../../services/users'
import UserList from './UserList'

const AppUser = () => {
  const dispatch = useDispatch()
  const signedUser = useSelector((state) => state.signedUser)

  if (signedUser !== null) {
    setToken(signedUser.token)
  } else {
    setToken(null)
  }

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

  return (
    <article>
      <h2>Users</h2>
      <UserList />
    </article>
  )
}

export default AppUser
