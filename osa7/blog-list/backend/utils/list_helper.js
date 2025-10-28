/* eslint-disable no-unused-vars */
var _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0 ) {
    return null
  }
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogsCount = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(Object.keys(authorBlogsCount), (author) => authorBlogsCount[author])

  return {
    'author': mostBlogsAuthor,
    'blogs': authorBlogsCount[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorLikesCount = _.reduce(blogs, (result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + blog.likes
    return result
  }, {})

  const mostLikedAuthor = _.maxBy(Object.keys(authorLikesCount), author => authorLikesCount)

  return {
    author: mostLikedAuthor,
    likes: authorLikesCount[mostLikedAuthor]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}