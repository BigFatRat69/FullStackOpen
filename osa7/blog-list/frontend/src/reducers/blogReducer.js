import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map(b => (b.id !== updated.id ? b : updated))
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    addCommentToBlog(state, action) {
      const updated = action.payload
      return state.map(b => (b.id !== updated.id ? b : updated))
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, addCommentToBlog } = blogSlice.actions


export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = blog => async (dispatch, getState) => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
  const users = getState().users
  const user = users.find(u => u.id === newBlog.user.id)

  if (user) {
    const updatedUser = { ...user, blogs: user.blogs.concat(newBlog) }
    dispatch({
      type: 'INIT_USERS',
      payload: users.map(u => (u.id === user.id ? updatedUser : u))
    })
  }

  return newBlog
}

export const likeBlog = blog => async dispatch => {
  const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id || blog.user }
  const returnedBlog = await blogService.update(blog.id, updatedBlog)
  dispatch(updateBlog(returnedBlog))
}

export const deleteBlog = id => async dispatch => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export const addComment = (id, comment) => async dispatch => {
  const updatedBlog = await blogService.addComment(id, comment)
  dispatch(addCommentToBlog(updatedBlog))
}

export default blogSlice.reducer
