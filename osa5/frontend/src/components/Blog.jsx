import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const canDelete = currentUser && blog.user && blog.user.username === currentUser.username

  return (
    <div style={{ border: '1px solid black', marginBottom: '10px', padding: '5px' }} className='blog'>
      {blog.title} by {blog.author}
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'View'}
      </button>

      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button onClick={() => handleLike(blog)}>Like</button>
          </p>
          <p>Posted by: {blog.user?.username} || 'Unknown'</p>

          {canDelete && (
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
