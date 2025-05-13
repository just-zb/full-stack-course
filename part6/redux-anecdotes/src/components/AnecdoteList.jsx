// import {voteActionCreator} from "../reducers/anecdoteReducer.js";
import {voteAnecdote} from "../reducers/anecdoteReducer.js";
import { useSelector, useDispatch } from 'react-redux'
import {setNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(
        ({anecdotes,filter})=>{
            if (filter === '') {
                return anecdotes
            }
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    )
    console.log(anecdotes)
    return (
        <div>
            {/*anecdotes is immutable*/}
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => {
                                dispatch(voteAnecdote(anecdote.id))
                                // show the notification for 5 seconds
                                dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
                            }}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}
export default AnecdoteList