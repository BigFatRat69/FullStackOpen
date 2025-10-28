const initialState = null

let timeoutId

export const setNotification = (text, type = 'success', duration = 5000) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { text, type }
    })

    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer
