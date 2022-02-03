import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getOrderDetails } from '../actions/orderActions.js'
import { useParams } from 'react-router-dom';

const OrderScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const orderId = params.id

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  // calculate price for items in order
  if(!loading){
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc += (item.price * item.qty), 0))
  }

  // dispatch action with orderID
  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  })

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <>
    <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>

            <ListGroupItem>
              <h2>Deliver To:</h2>
              <p>
                {order.user.name}
              </p>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              {order.isDelivered ? <Message variant='success'>Delivered {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Items: </div>
              {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {/* <ListGroupItem>
              <div className="d-grid gap-2">
                <Button type='button' disabled={order.cartItems.length === 0} onClick={payHandler}>Place Order</Button>
              </div>
              </ListGroupItem> */}
            </ListGroup>
          </Card>

        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;
