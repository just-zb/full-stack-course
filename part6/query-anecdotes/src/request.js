import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>{
    return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
}


export const createAnecdote = anecdote =>{
    return axios.post(baseUrl, anecdote).then(res => res.data)
}


export const updateVote = anecdote => {
    return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}