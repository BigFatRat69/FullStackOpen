import { useParams } from 'react-router-dom'
import { useState } from 'react'

const BlogView = ({ blogs, handleLike, handleDelete, user, dispatchAddComment }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) return null

  const canDelete = user && blog.user && blog.user.username === user.username

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatchAddComment(blog.id, comment)
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </p>
      <p>
        Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>Added by {blog.user ? blog.user.name : 'Unknown'}</p>
      {canDelete && <button onClick={() => handleDelete(blog)}>delete</button>}

      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add comment</button>
      </form>

      <ul>
        {blog.comments && blog.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
