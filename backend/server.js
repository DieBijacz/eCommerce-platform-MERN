import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middlewere/errorMiddlewere.js'

dotenv.config()
connectDB()
const app = express()

// that will allow json to be used in req body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Each route can have one or more handler functions, which are executed when the route is matched.
// app.METHOD(PATH, HANDLER)
// app is an instance of express.
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// MIDDLEWERE
// https://expressjs.com/en/guide/using-middleware.html
// ERROR HANDLING
// https://expressjs.com/en/guide/error-handling.html
// catch error middlewere
app.use(notFound)
// Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three:
// (err, req, res, next)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    // .yellow.bold comes from npm colors
  )
)
