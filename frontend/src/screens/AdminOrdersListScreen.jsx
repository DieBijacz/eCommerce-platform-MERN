import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../actions/orderActions.js'
import Card from '../components/Card';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import Meta from '../components/Meta.js';

const AdminOrdersListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get products from store
  const allOrders = useSelector(state => state.allOrders)
  const { loading: loadingAllOrders, error: errorLoadingOrders, orders } = allOrders
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    // redirect if user is not admin
    if(userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders())
    } else {
      navigate('/login')
    }
    
  }, [navigate, dispatch, userInfo])
  
  return <>
    <Meta title={'Admin Orders Control Panel'} />
    <Row className='mt-5'>
      {loadingAllOrders ? <Loader /> : errorLoadingOrders ? <Message variant='danger'>{errorLoadingOrders}</Message> : (
        <>
          <Col lg={7}>
            <Row>
              <p>Total orders: {orders && orders.length}</p>
              <Table striped bordered responsive className='table-sm'>
                <thead>
                  <tr>
                    <th className='text-center'>User</th>
                    <th className='text-center'>Paid</th>
                    <th className='text-center'>Delivered</th>
                    <th className='text-center'>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map(order => (
                    <tr key={order._id}>
                      <td className='text-center'>{order.user.name}</td>
                      <td className='text-center'>{order.isPaid ? 'paid' : 'not paid'}</td>
                      <td className='text-center'>{order.isDelivered ? 'delivered' : 'not delivered'}</td>
                      <td className='text-center'>{order.orderItems.map(item => <div><Link to={`/product/${item.product}`}>{item.qty} x {item.name}</Link></div>)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Col>
          <Col lg={5}>
            <h3>Orders:</h3>
            {loadingAllOrders ? <Loader /> : errorLoadingOrders ? <Message variant='danger'>{errorLoadingOrders}</Message> : 
              orders.map(order => (<Card order={order} key={order._id} />))    
            }     
          </Col>
        </>
      )}
    </Row>
  </>;
};

export default AdminOrdersListScreen;
