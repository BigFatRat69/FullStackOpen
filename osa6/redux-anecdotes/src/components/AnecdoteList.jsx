import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <div>
      {anecdotes.map(a =>
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
