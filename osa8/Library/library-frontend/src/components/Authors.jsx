import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const { data, loading, error } = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setErrorMessage(messages)
    }
  })


  if (!show) return null
  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>


  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select author</option>
            {data.allAuthors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          Birthyear
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default Authors
