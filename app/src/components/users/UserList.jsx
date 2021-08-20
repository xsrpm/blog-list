import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendNotification } from '../../actions/notificationAction'
import { initializeUsers } from '../../actions/userAction'
import { setToken } from '../../services/users'

const AppUser = () => {
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

  const users = useSelector((state) => state.users)

  return (
    <article>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name} ({user.username})
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

export default AppUser
