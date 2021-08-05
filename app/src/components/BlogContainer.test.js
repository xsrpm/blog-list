import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import BlogContainer from './BlogContainer'

test('blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
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

  const component = render(
    <BlogContainer blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  // component.debug()
  const likesCount = component.getByText(blog.likes)
  expect(likesCount).toBeDefined()
  // console.log(prettyDOM(likesCount))

  const blogUrl = component.getByText(blog.url)
  expect(blogUrl).toBeDefined()
  // console.log(prettyDOM(blogUrl))
})
