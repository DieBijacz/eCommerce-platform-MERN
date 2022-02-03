import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps.js';
import Message from '../components/Message.js'
import { createOrder } from '../actions/orderActions.js'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Bring Cart from store
  const cart = useSelector(state => state.cart)

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, success, error} = orderCreate
  
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // Calculate praices
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc += (item.price * item.qty), 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))

  const placeOrderHandler = () => {
    console.log('dziala');
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  useEffect(() => {
    if(success) {
      navigate(`/orders/${order._id}`)
    }
  },[success, navigate])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          {error && <Message variant='danger'>{error}</Message>}
          <ListGroup variant='flush'>

            <ListGroupItem>
              <h2>Shipping</h2>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Address: </div>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Method: </div>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Items: </div>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={10}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <div>{item.qty}x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
                        </Col>
                      </Row>                      
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
              <div className="d-grid gap-2">
                <Button type='button' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
              </div>
              </ListGroupItem>
            </ListGroup>
          </Card>

        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;
