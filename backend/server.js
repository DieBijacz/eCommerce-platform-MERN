import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import colors from 'colors'

dotenv.config()
connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

// ALL PRODUCTS
app.get('/api/products', (req, res) => {
  // res.json will convert data to json
  res.json(products)
})

// SINGLE PRODUCT
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    // .yellow.bold comes from npm colors
  )
)
