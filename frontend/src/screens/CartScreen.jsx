import React, {useEffect} from 'react';
import { Link, useNavigate, useParams, useSearchParams  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button , Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get items from store
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  // get info from url
  const productId = params.id
  const qty = searchParams.get('qty')

  useEffect(() => {
    if(productId && qty) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  const removeFromCartHandler = (id) => {
    console.log('remove');
  }

  const checkoutHandler = () => {
    navigate('/login')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                  </Col>
                </Row>

              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h4>Items: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h4>
              Total: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}$
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-grid gap-2">
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
};

export default CartScreen;
