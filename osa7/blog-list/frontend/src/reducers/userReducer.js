const initialState = null

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    case 'ADD_BLOG_TO_USER':
      return state.map(user =>
      user.id === action.payload.user.id
      ? { ...user, blogs: user.blogs.concat(action.payload) }
      : user
      )
    default:
      return state
  }
}

export default userReducer
