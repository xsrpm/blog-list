import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'

const AppUser = () => {
  const { getUsers } = useUser()
  const users = getUsers()

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
