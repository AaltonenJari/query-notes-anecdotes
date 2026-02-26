import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }  
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // content should be at least 5 characters long
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long')
      return
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })

    const message = `Anecdote '${content}' created`
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm