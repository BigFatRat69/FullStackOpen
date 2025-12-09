import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries.js'
import { useState } from "react";

const Books = ({ show }) => {
  if (!show) return null

  const result = useQuery(ALL_BOOKS)

  const [filter, setFilter] = useState(null)

  if (result.loading) return <div>loading...</div>
  if (result.error) return <div>Error: {result.error.message}</div>

  const allGenres = result.data.allBooks
  .flatMap((b) => b.genres)
  const uniqueGenres = [...new Set(allGenres)]

  const booksToShow = filter
    ? result.data.allBooks.filter(b => b.genres.includes(filter))
    : result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          {booksToShow.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author?.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        ))}
      </div>
      <button onClick={() => setFilter(null)}>Reset filter</button>
    </div>
  )
}


export default Books
