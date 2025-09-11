import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })
})


test('renders content', () => {
  const blog = {
    title: 'Test blog 1',
    author: 'Tester 1',
    likes: '0'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test blog', { exact: false })
  expect(element).toBeDefined()
})

test('Does not render content', () => {
  const blog = {
    title: 'Test blog 1',
    author: 'Tester 1',
    likes: '0'
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('Delete', { exact: false })
  expect(element).toBeDefined()
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')
  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'Testing a form...')
  await user.type(authorInput, 'Tester')
  await user.type(urlInput, 'http://example.com')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing a form...')
})