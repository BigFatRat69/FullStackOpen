require('dotenv').config()

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

module.exports = { MONGODB_URI, PORT }