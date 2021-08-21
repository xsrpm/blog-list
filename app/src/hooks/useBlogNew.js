import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendNotification } from '../actions/notificationAction'
import { createBlog } from '../actions/blogAction'

const useBlogNew = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const submit = () => {
    const blog = {
      title,
      url
    }
    dispatch(createBlog(blog))
      .then(() => {
        setTitle('')
        setUrl('')
        formClose()
        dispatch(sendNotification(`a new blog ${blog.title} added`, 5))
      })
      .catch((error) => {
        console.log({ error })
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          dispatch(sendNotification(error.response.data, 5))
        }
      })
  }

  const formClose = () => {
    setIsOpen(false)
  }

  const formOpen = () => {
    setIsOpen(true)
  }

  const handleChangeTitle = ({ target }) => {
    setTitle(target.value)
  }
  const handleChangeUrl = ({ target }) => {
    setUrl(target.value)
  }

  return {
    title,
    url,
    isOpen,
    formClose,
    formOpen,
    handleChangeTitle,
    handleChangeUrl,
    submit
  }
}

export default useBlogNew
