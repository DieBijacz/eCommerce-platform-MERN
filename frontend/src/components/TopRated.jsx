import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Carousel, CarouselItem, Col, Container, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Rating from './Rating'
import { useParams } from 'react-router-dom'

const TopRated = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [qty, setQty] = useState(1)

  const topProducts = useSelector(state => state.topProducts)
  const { loading, error, products } = topProducts

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  // ADD TO CART
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Row className='my-5 top-rated'>
      <Carousel pause='hover' variant='dark'>
        {products.map(p => (
          <CarouselItem key={p._id}>
            <Link to={`/product/${p._id}`}>
              <Container>
                <Row>
                  <Col lg={6} md={9} className='image-box d-flex aligin-items-center'>
                    <Image src={p.image} alt={p.name} />
                  </Col>
                  <Col lg={6} md={3}>
                    <ListGroup variant='flush'>
                      <ListGroupItem>
                        <h3 className='text-truncate'>{p.name}</h3>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Rating value={p.rating} text={p.numReviews > 1 ? ` ${p.numReviews} reviews` : ` ${p.numReviews} review`} />
                      </ListGroupItem>
                      <ListGroupItem>
                        Price: ${p.price}
                      </ListGroupItem>
                      <ListGroupItem>
                        <div className="d-grid gap-2">
                          <Button onClick={addToCartHandler} disabled={p.countInStock === 0} className='btn' type='button'>Add To Cart</Button>
                        </div>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </Link>
          </CarouselItem>
        ))}
      </Carousel>
    </Row>
  )
}

export default TopRated