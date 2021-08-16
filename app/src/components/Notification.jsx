import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const message = useSelector((state) => state.notification)
  return (
    <article>
      <div>{message}</div>
    </article>
  )
}

export default Notification
