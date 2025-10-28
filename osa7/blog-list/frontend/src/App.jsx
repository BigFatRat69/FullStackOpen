import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs, createBlog, likeBlog, deleteBlog, addComment } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import loginService from './services/login'


const Menu = ({ blogs, handleLogout, handleLike, handleDelete, user, addBlog, users, dispatchAddComment }) => {
  const padding = { paddingRight: 5 }
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    color: 'black',
    gap: '3px'
  }
  return (
    <Router>
      <div style={navbarStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/users">users</Link>
        <p style={padding}>{user.username} logged in</p>
        <button style={padding} onClick={handleLogout}>Log Out</button>
      </div>
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} user={user} />} />
          <Route path="/blogs/:id" element={<BlogView blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} user={user} dispatchAddComment={dispatchAddComment}/>} />
          <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
          <Route path="/users" element={<Users users={users}/>} />
          <Route path="/users/:id" element={<User users={users} blogs={blogs} />} />
        </Routes>
    </Router>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} style={{ padding: 5, borderBottom: '1px solid #ccc' }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const users = useSelector(state => state.users)

  const dispatchAddComment = (id, comment) => {
    dispatch(addComment(id, comment))
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} logged in`, 'success'))
    } catch {
      dispatch(setNotification('Wrong credentials', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }


  const addBlog = async (blogObject) => {
    try {
      const newBlog = await dispatch(createBlog(blogObject))
      dispatch({
        type: 'ADD_BLOG_TO_USER',
        payload: newBlog
      })
      dispatch(setNotification(`A new blog "${blogObject.title}" by ${blogObject.author} added`, 'success'))
    } catch {
      dispatch(setNotification('Error creating blog', 'error'))
    }
  }


  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked "${blog.title}"`, 'success'))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`Deleted "${blog.title}"`, 'success'))
    }
  }

  if (!user) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <Menu blogs={blogs} handleLogout={handleLogout} handleLike={handleLike} handleDelete={handleDelete} user={user} addBlog={addBlog} users={users} dispatchAddComment={dispatchAddComment}/>
    </div>
  )
}

export default App
