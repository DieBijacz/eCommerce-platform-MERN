import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middlewere/errorMiddlewere.js'

dotenv.config()
connectDB()
const app = express()

// that will allowed json to be used in req body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

// enything going to /api/products will be transeferd to productRoutes
app.use('/api/products', productRoutes)

// user routes /api/users/login => router.post('/login', authUser)
app.use('/api/users', userRoutes)

// MIDDLEWERE
// https://expressjs.com/en/guide/using-middleware.html
// ERROR HANDLING
// https://expressjs.com/en/guide/error-handling.html
// catch error middlewere
app.use(notFound)
// Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three:
// (err, req, res, next). For example:
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    // .yellow.bold comes from npm colors
  )
)
