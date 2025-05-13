import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js";
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
//
// const getId = () => (100000 * Math.random()).toFixed(0)
//
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   let id, anecdoteToVote, votedAnecdote
//   switch (action.type) {
//     case 'VOTE':
//       id = action.payload
//       anecdoteToVote = state.find(a => a.id === id)
//       votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : votedAnecdote
//       )
//     case 'CREATE':
//       return [...state, asObject(action.payload)]
//     default:
//       return state
//   }
// }
//
// export const voteActionCreator = (id) => {
//     return {
//         type: 'VOTE',
//         payload: id
//     }
// }
//
// export const createNoteActionCreator = (content) => {
//     return {
//         type: 'CREATE',
//         payload: content
//     }
// }
//
// export default reducer
const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
        const id = action.payload
        const anecdoteToVote = state.find(a => a.id === id)
        const votedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        return state.map(anecdote =>
            anecdote.id !== id ? anecdote : votedAnecdote
        )
        },
        create(state, action) {
        state.push(action.payload)
        },
        set(state, action) {
        return action.payload
        }
    }
})
export const initializeAnecdotes = () => {
    return async dispatch => {
        dispatch(set(await anecdoteService.getAll()))
    }
}
export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
    }
}
export const voteAnecdote = (id) => {
    return async dispatch => {
        const votedAnecdote = await anecdoteService.vote(id)
        dispatch(vote(votedAnecdote.id))
    }
}
export const {vote, create,set} = anecdoteSlice.actions
export default anecdoteSlice.reducer