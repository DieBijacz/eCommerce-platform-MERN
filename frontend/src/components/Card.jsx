import React from 'react'
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'

const Card = ({order}) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row className='justify-content-md-center border my-3 p-3 shadow card'>
        <Col>
          <div className='d-flex justify-content-center align-items-center'>
            <h5 className='text-center'>{order._id}</h5>
            {/* <button className='btn-copy-clipboard' onClick={() => navigator.clipboard.writeText(order._id)}><i className="fa-regular fa-copy"></i></button> */}
          </div>
            <hr/>
          <Row>
            <Col>
              <h5>Delivery details:</h5>
              <Row>
                  <div>{order.isDelivered ? <Message variant='success'>Delivered</Message> : <Message variant='danger'>Not delivered</Message>}</div>
                <Col>
                  <div>{order.user.name}</div>
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
              {!order.isPaid &&<button className='btn' onClick={() => navigate(`/orders/${order._id}`)}>Go to payment</button>}
            </Col>
          </Row>
          <Row>
            <hr />
            <h5>Order Items:</h5>
            <ListGroup variant='flush'>
              {order.orderItems.map(item => (
                <ListGroupItem key={item._id}>
                  <Row>
                    <Col sm={5} md={4} lg={3}>
                      <Image fluid src={item.image}></Image>
                    </Col>
                    <Col sm={7} md={8} lg={9}>
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