import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `"${action.payload}" successfully added`
    case 'TOO_FEW_LETTERS':
      return 'The anecdote must be at least 5 letters long'
    case 'VOTED':
      return `You voted for "${action.payload}"`
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
