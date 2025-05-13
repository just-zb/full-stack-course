// import {createNoteActionCreator} from "../reducers/anecdoteReducer.js";
import {createAnecdote} from "../reducers/anecdoteReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const content = e.target.anecdote.value
                e.target.anecdote.value = ''
                dispatch(createAnecdote(content))
                // show the notification for 5 seconds
                dispatch(setNotification(`you created '${content}'`, 5))
            }}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm