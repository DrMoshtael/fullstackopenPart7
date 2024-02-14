import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm generates the correct details of a blog object', async () => {
  const mockCreateBlog = jest.fn()
  render(<BlogForm createBlog={mockCreateBlog} />)
  const usr = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Enter title')
  const urlInput = screen.getByPlaceholderText('Enter URL')
  const submitButton = screen.getByText('add')
  console.log('sts', titleInput, 'sd', urlInput, 'sff', submitButton)

  await usr.type(titleInput, 'Test blog1')
  await usr.type(urlInput, 'http://www.test1.com')
  await usr.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Test blog1')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://www.test1.com')
})
