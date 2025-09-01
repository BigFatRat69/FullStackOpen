const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const blogsRouter = express.Router()


blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    return response.status(404).end()
  }
  blog.likes = body.likes
  blog.title = body.title
  blog.url = body.url

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter