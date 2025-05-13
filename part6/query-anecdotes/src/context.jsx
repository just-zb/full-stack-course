import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "show":
            return action.payload
        case "hide":
            return ''
        default:
            return state
    }
}

const Context = createContext()

export const NotificationContextProvider = ({children}) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <Context.Provider value={[notification, notificationDispatch] }>
            {children}
        </Context.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(Context)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(Context)
    return notificationAndDispatch[1]
}

export default Context