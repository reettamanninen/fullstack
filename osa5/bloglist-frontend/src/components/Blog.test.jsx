import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'sjbdsgke',
    author: 'ajfbekjgb',
    url: 'adjbfkwe',
    likes: 2,
    user: {username: 'asjnbkwfe', name: 'skdjbgkwe' }
  }

  render(<Blog blog={blog} handleLike={() => {}}
  user={{ username: 'asjnbkwfe'}} />)

  expect(screen.getByText('sjbdsgke', { exact: false})).toBeDefined()
  expect(screen.getByText('ajfbekjgb', { exact: false})).toBeDefined()
})