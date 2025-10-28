const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const assert = require('node:assert')

let token
let userId

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  const savedUser = await user.save()
  userId = savedUser._id.toString()

  const loginResponse = await api.post('/api/login').send({ username: 'root', password: 'sekret' })
  token = loginResponse.body.token

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: userId }))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(e => e.title)
  assert.strictEqual(contents.includes('My Second Blog'), true)
})

test('a valid blog can be added with token', async () => {
  const newBlog = { title: 'Blog 5', author: 'Author C', url: 'http://example.com/5', likes: 11 }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const urls = blogsAtEnd.map(n => n.url)
  assert(urls.includes('http://example.com/5'))
})

test('adding a blog fails with 401 if token not provided', async () => {
  const newBlog = { title: 'Blog 6', author: 'Author D', url: 'http://example.com/6', likes: 5 }
  await api.post('/api/blogs').send(newBlog).expect(401)
})

test('a blog can be deleted by its creator', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.title))
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `Bearer ${token}`).send({ title: blogToUpdate.title, url: blogToUpdate.url, likes: blogToUpdate.likes + 1 }).expect(200).expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})
