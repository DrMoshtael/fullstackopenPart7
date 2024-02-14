import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogService from '../services/blogs'

describe('blog', () => {
  let container

  beforeEach(() => {
    const user = { username: 'testerA', name: 'tester' }
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'http://www.testA.org',
      likes: 23,
      user: user,
    }

    container = render(<Blog blog={blog} user={user} />).container
  })

  test('by default renders title & author only', () => {
    const title = screen.getByText('Test title', { exact: false })
    const author = screen.getByText('Test author', { exact: false })
    const url = screen.queryByText('http://www.testA.org')
    const likes = screen.queryByText('23', { exact: false })

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders URL and likes when expanded', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const url = screen.queryByText('http://www.testA.org')
    const likes = screen.queryByText('23', { exact: false })
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})

test('like button works', async () => {
  const mockLikeHandler = jest.fn()

  const user = { username: 'testerA', name: 'tester' }
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://www.testA.org',
    likes: 23,
    user: user,
  }

  const container = render(
    <Blog blog={blog} user={user} likeHandler={mockLikeHandler} />,
  ).container

  const usr = userEvent.setup()
  const viewButton = screen.getByText('view')
  await usr.click(viewButton)
  const likeButton = container.querySelector('#like-button')
  await usr.click(likeButton)
  await usr.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
  expect(mockLikeHandler).toHaveBeenCalled()
})

//I don't pass handleLike as props to Blog and didn't want to change it just for the test.
//So I learnt about mocking the whole Component
//And how to selectively mock certain event handlers while maintaining the others
// test('like button works', async () => {
//     const usr = { username: 'testerA', name: "tester" }
//     const blog = {
//         title: 'Test title',
//         author: 'Test author',
//         url: 'http://www.testA.org',
//         likes: 23,
//         user: usr
//     }

//     // const mockLikeHandler = jest.fn()

//     // jest.mock('./Blog', () => ({
//     //     __esModule: true,
//     //     default: Blog,
//     // }))

//     const likeSpy = jest.spyOn(BlogService, 'postLike')

//     const container = render(<Blog blog={blog} user={usr} />).container

//     const user = userEvent.setup()
//     const likeButton = container.querySelector('#like-button')
//     const viewButton = screen.getByText('view')
//     await user.click(viewButton)
//     const likes = screen.queryByText('23', { exact: false })
//     expect(likes).toBeDefined()
//     await user.click(likeButton)
//     await user.click(likeButton)
//     expect(likeSpy).toHaveBeenCalled()
//     expect(likeSpy).toHaveBeCalledTimes(2)
// })
