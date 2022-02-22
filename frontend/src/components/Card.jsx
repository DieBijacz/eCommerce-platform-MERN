import React from 'react'
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'

const Card = ({order}) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row className='justify-content-md-center border my-3 p-3 shadow'>
        <Col md={3}>
          <Row>
            <div style={{width: '100%'}}>
              <Image src={order.orderItems[0].image} alt={order.orderItems[0].name} fluid />
            </div>
          </Row>
          <Row>
            {/* <div className='d-flex' style={{width: '100px'}}>
              <Image src={order.orderItems[0].image} alt={order.orderItems[0].name} fluid />
              <Image src={order.orderItems[0].image} alt={order.orderItems[0].name} fluid />
            </div> */}
          </Row>
        </Col>
        <Col md={9}>
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Order: {order._id}</h4>
            {/* <button className='btn-copy-clipboard' onClick={() => navigator.clipboard.writeText(order._id)}><i className="fa-regular fa-copy"></i></button> */}
          </div>
            <hr/>
          <Row>
            <Col>
              <h5>Delivery details:</h5>
              <Row>
                  <div>{order.isDelivered ? <Message variant='success'>Delivered</Message> : <Message variant='danger'>Not delivered</Message>}</div>
                <Col>
                  <div>{order.shippingAddress.city}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div>{order.shippingAddress.country}</div>
                  <div>{order.shippingAddress.postalCode}</div>
                </Col>
              </Row>
            </Col>
            <Col>
              <h5>Payment details:</h5>
              <div>{order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message> : <Message variant='danger'>Not Paid</Message>}</div>
              <div>Total price: {order.totalPrice}</div>
              {!order.isPaid &&<Button onClick={() => navigate(`/orders/${order._id}`)}>Go to payment</Button>}
            </Col>
          </Row>
          <Row>
            <hr />
            <h5>Order Items:</h5>
            <ListGroup variant='flush'>
              {order.orderItems.map(item => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col sm={5} md={3} lg={2}>
                      <Image fluid src={item.image}></Image>
                    </Col>
                    <Col sm={7} md={9} lg={10}>
                      <Link to={`/product/${item.product}`}>
                        {item.qty} x {item.name}
                      </Link>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Card