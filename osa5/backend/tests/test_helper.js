const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  { title: 'My First Blog', author: 'Eetu', url: 'http://example.com', likes: 12 },
  { title: 'My Second Blog', author: 'Jaakko', url: 'http://example.com', likes: 1 }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'My Test Blog', author: 'Oskari', url: 'http://example.com/test', likes: 50 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}