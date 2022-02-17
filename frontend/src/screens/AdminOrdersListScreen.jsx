import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllOrders } from '../actions/orderActions.js'
import { LinkContainer } from 'react-router-bootstrap';

const AdminOrdersListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get products from store
  const allOrders = useSelector(state => state.allOrders)
  const { loading, error, orders } = allOrders
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // redirect if user is not admin
    if(!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    } else {
      dispatch(getAllOrders())
    }
    
  }, [navigate, dispatch, userInfo])
  
  return <>
    <Row className='my-3'>
      <Col>
        <h1>Orders:</h1>
      </Col>
      <Row>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  <div>Created: {order.createdAt.substring(0,10)}</div>
                  {order.updatedAt != order.createdAt ? 
                  <div>Updated: {order.updatedAt.substring(0, 10)} </div> : ''}
                </td>
                <td>$ {order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                <td>{order.idDelivered ? order.deliveredAt.substring(0,10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm order-details-button'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody> 
        </Table>
        )}
      </Row>
    </Row>
  </>;
};

export default AdminOrdersListScreen;
