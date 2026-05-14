import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test ('show url, likes and username after clicking the button', async () => {
const blog = {
    title: 'sjbdsgke',
    author: 'ajfbekjgb',
    url: 'adjbfkwe',
    likes: 2,
    user: {username: 'asjnbkwfe', name: 'skdjbgkwe' }
  }

  render(<Blog blog={blog} handleLike={() => {}}
  user={{ username: 'asjnbkwfe'}} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('adjbfkwe', { exact: false})).toBeDefined()
  expect(screen.getByText( 2, { exact: false})).toBeDefined()
  expect(screen.getByText('skdjbgkwe', { exact: false})).toBeDefined()
})

test ('when like is pressed twice funktio is called twice', async () => {
    const blog = {
        title: 'sjbdsgke',
        author: 'ajfbekjgb',
        url: 'adjbfkwe',
        likes: 2,
        user: {username: 'asjnbkwfe', name: 'skdjbgkwe' }
      }
    
      const mockHandler = vi.fn()

      render(<Blog blog={blog} handleLike={mockHandler}
      user={{ username: 'asjnbkwfe'}} />)
      
      const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

      const likeButton = screen.getByText('like')
      await user.click(likeButton)
      await user.click(likeButton)
      expect(mockHandler).toHaveBeenCalled(2)
    
    })