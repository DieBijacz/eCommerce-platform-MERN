// https://expressjs.com/en/guide/error-handling.html
// catch error middlewere
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three:
// (err, req, res, next). For example:
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  // format in json
  res.json({
    // error format
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
