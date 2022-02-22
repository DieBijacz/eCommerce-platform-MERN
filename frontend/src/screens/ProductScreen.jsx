import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProductDetails } from '../actions/productActions' 
import { Link, useParams, useNavigate } from 'react-router-dom'
import {Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  // get createReview state from store
  const productReview = useSelector(state => state.productReview)
  const {loading: loadingProductReview, success: successCreateProductReview, error: errorCreteProductReview} = productReview

  // logged in User
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link to='/' className='btn btn-primary my-3'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Row>
            <Col lg={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col lg={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={product.rating} text={product.numReviews > 1 ? ` ${product.numReviews} reviews` : ` ${product.numReviews} review`} />
                </ListGroupItem>
                <ListGroupItem>
                  Price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col lg={3}>
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

                  {/* STOCK QTY */}
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <div className="d-grid gap-2">
                      <Button onClick={addToCartHandler} disabled={product.countInStock === 0} className='btn' type='button'>Add To Cart</Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews:</h2>
              {product.reviews.length === 0 ? 'No reviews' : (
                <ListGroup variant='flush'>
                  {product.reviews.map(r => (
                    <ListGroupItem key={r._id}>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h5>{r.name}</h5>
                        <div>
                          <Rating value={r.rating}/>
                          <p>{r.createdAt.substring(0, 10)}</p>
                        </div>
                      </div>
                      <p>{r.comment}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={6}>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dignissimos iusto consequuntur ad corrupti quod perspiciatis commodi quos excepturi nemo tempore debitis inventore, mollitia accusamus at optio? A, aliquid soluta cumque eligendi vel, asperiores, illum dolore non accusantium eum veniam? Similique nihil numquam corrupti voluptate aliquid atque! Veniam, similique labore!
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
