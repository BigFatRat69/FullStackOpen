require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI

module.exports = { MONGODB_URI, PORT, MONGODB_TEST_URI }