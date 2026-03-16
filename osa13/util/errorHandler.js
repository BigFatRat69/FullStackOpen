const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  res.status(400).json({
    error: 'something went wrong'
  })

  next(error)
}

module.exports = errorHandler