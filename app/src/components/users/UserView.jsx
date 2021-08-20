import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { sendNotification } from '../../actions/notificationAction'
import { initializeUsers } from '../../actions/userAction'
import { setToken } from '../../services/users'

const UserView = () => {
  const id = useParams().id
  const signedUser = useSelector((state) => state.signedUser)

  setToken(signedUser.token)

  const dispatch = useDispatch()
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
  }, [])

  const user = useSelector((state) => state.users.find((u) => u.id === id))
  if (!user) {
    return null
  }
  return (
    <article>
      <h2>
        {user.name} ({user.username})
      </h2>
      <p style={{ fontWeight: 'bold' }}>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </article>
  )
}

export default UserView
