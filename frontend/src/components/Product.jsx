import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating.jsx'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='product-component-image'/>
      </Link>
      <Card.Body className='text-center'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>{product.name}</Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='div' className='d-flex justify-content-center'>
        <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
      </Card.Text>
      <Card.Text as='h3' className='d-flex justify-content-center'>${product.price}</Card.Text>
    </Card>
  )
}

export default Product
