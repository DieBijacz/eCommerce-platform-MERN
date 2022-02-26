import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getOrderDetails, payOrder } from '../actions/orderActions.js'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2"
import { ORDER_PAY_RESET } from '../constants/orderConstants.js';

// PayPal Button https://www.npmjs.com/package/react-paypal-button-v2

const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.id

  const [sdkReady, setSdkReady] = useState(false)

  // get orderDetails from store
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  // get orderPay state
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  //   Calculate prices
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      // fetch id from backend
      const {data: clientId} = await axios.get('/api/config/paypal')

      // create PayPal script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true // If the async attribute is present, then the script will be executed asynchronously, as soon as it is available.
      script.onload = () => {
        setSdkReady(true)
      }
      // add PayPal script to body
      document.body.appendChild(script)
    }

    // Get order details from DB to be set in store state
    if(!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

    if(order) {
      if(!userInfo || order.user.name !== userInfo.name || !userInfo.isAdmin) {
        navigate('/login')
      }
    }
    
  }, [dispatch, order, orderId, successPay, userInfo, navigate])
  
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    alert("Transaction completed by " + paymentResult.payer.name.given_name);
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? <Loader /> : error || errorPay ? <Message variant='danger'>{error ?? errorPay}</Message> : (
    <>
      <Row className='my-3'>
        <Col>
          <h1>Order: {order._id}</h1>
        </Col>
        <Col>
          <div className='d-flex justify-content-md-end'>
            <Button className='btn-primary my-3' onClick={() => navigate('/profile')}>Go Back</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={7} lg={8} xl={9}>
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
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message> : <Message variant='danger'>Not Paid</Message>}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>Items: </div>
              {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={5} lg={3}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={7} lg={9}>
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
        <Col md={5} lg={4} xl={3}>
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
              {!order.isPaid && (
                <ListGroupItem>
                    {loadingPay && <Loader />}
                    {!sdkReady ? <Loader /> : (
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>

        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;
