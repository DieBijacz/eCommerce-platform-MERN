import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Message from './Message'

const Card = ({order}) => {
  const [imagesArray, setImagesArray] = useState([])

  useEffect(() => {
  }, [])

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
          <h4>Order: {order._id}</h4>
          <hr/>
          <Row>
            <Col>
              <h5>Delivery details:</h5>
              <div>{order.isDelivered ? <Message variant='success'>Delivered</Message> : <Message variant='danger'>Not delivered</Message>}</div>
              <div>{order.shippingAddress.city}</div>
              <div>{order.shippingAddress.address}</div>
              <div>{order.shippingAddress.country}</div>
              <div>{order.shippingAddress.postalCode}</div>
            </Col>
            <Col>
              <h5>Payment details:</h5>
              <div>{order.isPaid ? 'Paid' : 'Not paid'}</div>
              <div>Total price: {order.totalPrice}</div>
              <hr />
              <h5>Order Items:</h5>
              <ListGroup variant='flush'>
                {order.orderItems.map(item => (
                  <ListGroupItem key={item._id}>
                    <Link to={`/product/${item.product}`}>
                      {item.qty} x {item.name}
                    </Link>
                  </ListGroupItem>
                ))}
              </ListGroup>

            </Col>
          </Row>
          <hr/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa quibusdam iure asperiores distinctio, consectetur quas quidem totam at voluptates.
        </Col>
      </Row>
    </Container>
  )
}

export default Card