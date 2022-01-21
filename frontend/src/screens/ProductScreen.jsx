import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProductDetails } from '../actions/productActions' 
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, ListGroupItem, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch])

  return (
    <>
      <Link to='/' className='btn btn-primary my-3'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
            </ListGroupItem>
            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button disabled={product.countInStock === 0} className='btn' type='button'>Add To Cart</Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )
      }

    </>
  )
}

export default ProductScreen
