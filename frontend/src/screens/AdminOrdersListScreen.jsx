import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllOrders } from '../actions/orderActions.js'

const AdminOrdersListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)

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
    }
    
    dispatch(getAllOrders())
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
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.isPaid ? 'paid' : ' not paid'}</td>
                <td>{order.isPaid ? 'paid' : ' not paid'}</td>
                <td>{order.isPaid ? 'paid' : ' not paid'}</td>
                <td>{order.isPaid ? 'paid' : ' not paid'}</td>
                <td>{order.isPaid ? 'paid' : ' not paid'}</td>
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
