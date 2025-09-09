import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewBlog('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={newBlog}
              onChange={event => setNewBlog(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={newAuthor}
              onChange={event => setNewAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              value={newUrl}
              onChange={event => setNewUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
