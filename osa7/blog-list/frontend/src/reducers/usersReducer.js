import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.payload
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      payload: users
    })
  }
}

export default usersReducer
