const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne()  
    const blog = await Blog.create({ ...req.body, date: new Date(), userId: user.id })
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      await blog.destroy()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).end()
    }
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router