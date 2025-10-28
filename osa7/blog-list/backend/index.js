const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const start = async () => {
  try {
    logger.info('Connecting to MongoDB...')
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}

start()
