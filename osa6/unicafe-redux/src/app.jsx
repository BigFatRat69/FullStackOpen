import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const good = useSelector(state => state.good)

  const ok = useSelector(state => state.ok)
  
  const bad = useSelector(state => state.bad)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App