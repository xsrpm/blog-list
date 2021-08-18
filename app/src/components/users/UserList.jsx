import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector((state) => state.users)
  return (
    <article>
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
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

export default UserList
