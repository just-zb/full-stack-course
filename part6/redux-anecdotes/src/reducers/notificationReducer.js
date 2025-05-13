import {createSlice} from "@reduxjs/toolkit";

const initialState = ''
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(state, action) {
            return action.payload
        },
        clear() {
            return ''
        }
    }
})
export const setNotification = (message, time) => {
   return async dispatch => {
        dispatch(set(message))
        setTimeout(() => {
            dispatch(clear())
        }, time * 1000)
    }
}
export const {set, clear} = notificationSlice.actions
export default notificationSlice.reducer