import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders correctly', () => {
  const blog = {
    title: 'xsrsys blog',
    url: 'xsrsys page',
    author: 'xsrpm',
    likes: 0,
    user: {
      username: 'xsrpm',
      name: 'cesar',
      id: '60f6589b72c9932f74ac1acb'
    },
    id: '60f6673346cc323e0ceffcb9'
  }

  const handleClickLike = jest.fn()
  const handleClickDelete = jest.fn()
  const handleClickShow = jest.fn()

  const component = render(
    <Blog blog={blog} handleClickLike={handleClickLike} handleClickDelete={handleClickDelete} handleClickShow={handleClickShow} />
  )

  // component.debug()

  const element = component.getByText(
    blog.title
  )
  expect(element).toBeDefined()
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const blog = {
    title: 'xsrsys blog',
    url: 'xsrsys page',
    author: 'xsrpm',
    likes: 0,
    user: {
      username: 'xsrpm',
      name: 'cesar',
      id: '60f6589b72c9932f74ac1acb'
    },
    id: '60f6673346cc323e0ceffcb9'
  }

  const handleClickLike = jest.fn()
  const handleClickDelete = jest.fn()
  const handleClickShow = jest.fn()

  const component = render(
    <Blog
      blog={blog} handleClickLike={handleClickLike} handleClickDelete={handleClickDelete} handleClickShow={handleClickShow} showMore={!false}
    />
  )

  // component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(handleClickLike.mock.calls).toHaveLength(2)
})
