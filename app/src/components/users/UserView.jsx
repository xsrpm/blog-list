import React from 'react'
import { useParams } from 'react-router'
import useUser from '../../hooks/useUser'

const UserView = () => {
  const id = useParams().id
  const { getUserById } = useUser()
  const user = getUserById(id)

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
