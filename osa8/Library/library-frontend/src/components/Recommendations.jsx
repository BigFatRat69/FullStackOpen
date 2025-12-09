import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommendations = ({ show }) => {
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME)


  const favourite = meData?.me?.favouriteGenre

  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favourite },
    skip: !favourite
  })

  if (!show) return null;

  if (meLoading) return <div>loading...</div>
  if (meError) return <div>Error loading user data</div>

  if (!favourite) return <div>not logged in</div>

  if (booksLoading) return <div>loading books...</div>

  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{favourite}</strong></p>

      <ul>
        {booksData?.allBooks?.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Recommendations
