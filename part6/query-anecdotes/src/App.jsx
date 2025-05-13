import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './request'
import {useNotificationDispatch} from './context.jsx'
const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))
    }
  })
  const handleVote = async (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

    await dispatch({ type: 'show', payload: `You voted: ${anecdote.content} !`})
    setTimeout(() => {
      dispatch({ type: 'hide' })
    }, 5000)
  }

  const result = useQuery(
      'anecdotes',
      getAnecdotes,
        {
            refetchOnWindowFocus: false,
            retry: 1,
            refetchInterval: 10000
        }
  )
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
