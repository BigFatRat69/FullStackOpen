// eslint-disable-next-line no-unused-vars
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('totalLikes returns the sum of likes', () => {
  const blogs = [
    { title: 'My First Blog', author: 'Eetu', url: 'http://example.com', likes: 12 },
    { title: 'My Second Blog', author: 'Jaakko', url: 'http://example.com', likes: 1 },
    { title: 'My Third Blog', author: 'Toni', url: 'http://example.com', likes: 50 }
  ]

  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 63)
})

test('favouriteBlog returns the blog with most likes', () => {
  const blogs = [
    { title: 'My First Blog', author: 'Eetu', url: 'http://example.com', likes: 12 },
    { title: 'My Second Blog', author: 'Jaakko', url: 'http://example.com', likes: 1 },
    { title: 'My Third Blog', author: 'Toni', url: 'http://example.com', likes: 50 }
  ]

  const result = listHelper.favouriteBlog(blogs)
  assert.deepStrictEqual(result, { title: 'My Third Blog', author: 'Toni', url: 'http://example.com', likes: 50 })
})

test('mostBlogs returns the author with most blogs', () => {
  const blogs = [
    { title: 'Blog 1', author: 'Author A', url: 'http://example.com/1', likes: 5 },
    { title: 'Blog 2', author: 'Author B', url: 'http://example.com/2', likes: 10 },
    { title: 'Blog 3', author: 'Author A', url: 'http://example.com/3', likes: 15 }
  ]

  const result = listHelper.mostBlogs(blogs)
  assert.deepStrictEqual(result, { author: 'Author A', blogs: 2 })
})

test('mostLikes returns most liked author', () => {
  const blogs = [
    { title: 'Blog 1', author: 'Author A', url: 'http://example.com/1', likes: 5 },
    { title: 'Blog 2', author: 'Author B', url: 'http://example.com/2', likes: 10 },
    { title: 'Blog 3', author: 'Author A', url: 'http://example.com/3', likes: 15 }
  ]

  const result = listHelper.mostLikes(blogs)
  assert.deepStrictEqual(result, { author: 'Author A', likes: 20 })
})