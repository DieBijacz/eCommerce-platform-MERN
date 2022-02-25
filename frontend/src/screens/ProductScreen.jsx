import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProductReview, getProductDetails, updateProductReview } from '../actions/productActions' 
import { Link, useParams, useNavigate } from 'react-router-dom'
import {Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_UPDATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState('0')
  const [comment, setComment] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  // get product details from store
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  // get productCreateReview state from store
  const productCreateReview = useSelector(state => state.productCreateReview)
  const {loading: loadingProductReview, success: successCreateProductReview, error: errorCreteProductReview} = productCreateReview
  
  // get productUpdateReview state from store
  const productUpdateReview = useSelector(state => state.productUpdateReview)
  const {loading: loadingUpdatedProductReview, success: successUpdatedProductReview, error: errorUpdatedProductReview} = productUpdateReview

  // logged in User
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  useEffect(() => {
    !userInfo && navigate('/login')

    // if there is no product in store => fetch it from db and set in state
    if(!product._id || successCreateProductReview || successUpdatedProductReview) {
      dispatch(getProductDetails(params.id))
    }

    if(successCreateProductReview) {
      setShowMessage('Review Added. Thank you')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      setTimeout(() => {
        setShowMessage('')
      }, 2000)
    }

    if(successUpdatedProductReview) {
      setShowMessage('Review Updated')
      dispatch({type: PRODUCT_UPDATE_REVIEW_RESET})
      setTimeout(() => {
        setShowMessage('')
      }, 2000)
    }

    // check if user have commented this product before
    if(userInfo && product.reviews.some(r => r.user === userInfo._id)) {
      const prevReview = product.reviews.filter(r => r.user === userInfo._id)[0]
      setAlreadyReviewed(true)
      setRating(prevReview.rating)
      setComment(prevReview.comment)
    }
  }, [dispatch, navigate, params, userInfo, product, successCreateProductReview, successUpdatedProductReview])

  // ADD TO CART
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  // SUBMIT FORM
  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    if(alreadyReviewed) {
      dispatch(updateProductReview(params.id, {rating, comment}))
    } else {
      dispatch(createProductReview(params.id, {rating, comment}))
    }
  }

  return (
    <>
      <Link to='/' className='btn btn-primary my-3'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Row>

            {/* PRODUCT */}

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

            {/* PRODUCT */}
            {/* PRICE // ADD TO CART */}

            <Col lg={3} className='my-3'>
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

            {/* PRICE // ADD TO CART */}
            {/* REVIEW SECITON */}

          <Row className='my-3'>
            <Col lg={6} className='my-3'>
              <h2>{alreadyReviewed ? 'Update review:' : 'Write review:'}</h2>
              {(errorCreteProductReview || errorUpdatedProductReview) && <Message variant='danger'>{errorCreteProductReview ?? errorUpdatedProductReview}</Message>}
              {showMessage && <Message variant={showMessage.startsWith('Review') ? 'success' : 'danger'}>{showMessage}</Message>}

              {!userInfo ? <h5>You are not logged in. Please <Link to='/login'>Log In</Link> first.</h5> : (
                <Form onSubmit={reviewSubmitHandler}>
                  <FormGroup controlId='rating'>
                    <FormLabel>Rating</FormLabel>
                    <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value='0'>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Exelent</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId='comment'>
                    <FormLabel>Comment</FormLabel>
                    <FormControl as='textarea' rows='5' value={comment} onChange={(e) => setComment(e.target.value)}></FormControl>
                  </FormGroup>
                  <Button type='submit' disabled={(rating === '0')|| (comment === '')} className='my-3'>{alreadyReviewed ? 'Update' : 'Submit'}</Button>
                </Form>
              )}
            </Col>
            <Col lg={6} className='my-3'>
              <h2>Reviews:</h2>
              {(loadingProductReview || loadingUpdatedProductReview) ? <Loader /> : (
                product.reviews.length === 0 ? 'No reviews' : (
                  <ListGroup variant='flush'>
                    {(product && userInfo) && product.reviews.map(r => (
                      <ListGroupItem key={r._id} style={{backgroundColor: `${r.user === userInfo._id && '#eee'}`}}>
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
                )
              )}
            </Col>

            {/* REVIEW SECITON */}

          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
