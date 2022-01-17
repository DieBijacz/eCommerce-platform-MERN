const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products.js')

dotenv.config()
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
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
