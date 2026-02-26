import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return setNotification(action.payload.dispatch, action.payload.message, action.payload.time)
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

let timeoutId = null

export const setNotification = (dispatch, message, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
                dispatch,
                message,
                time
            }
        })

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, time * 1000)
    }
 }

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext