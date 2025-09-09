import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageType, setMessageType] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(initialBlogs => {
      const initialSortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(initialSortedBlogs)
    })
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessageType('Negative')
      setMessage(`Invalid Credentials`)
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog).sort((a, b) => b.likes - a.likes))
  }

  const addBlog = blogObject => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessageType('Positive')
        setMessage('New Blog was successfully added')

        if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility()
        }
      })
  }

  const deleteBlog = async (blog) => {
    blogService
      .delete(blog)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification
        messageType={messageType}
        message={message}
        clearMessage={() => setMessage(null)}
      />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedNoteappUser')
              setUser(null)
            }}
          >
            Log Out
          </button>
          {blogForm()}
        </div>
      )}

      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleLike={likeBlog}/>
        ))}
      </ul>
    </div>
  )
}

export default App
