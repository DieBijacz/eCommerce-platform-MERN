import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchOrder, getAllOrders, getOrderDetails } from '../actions/orderActions.js'
import Card from '../components/Card';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import Meta from '../components/Meta.js';
import Badge from '../components/Badge.jsx';

const AdminOrdersListScreen = () => {
  const [forDispatch, setForDispatch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get products from store
  const allOrders = useSelector(state => state.allOrders)
  const { loading: loadingAllOrders, error: errorLoadingOrders, orders } = allOrders
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderDispatch = useSelector(state => state.orderDispatch)
  const {loading: loadingDispatch, success: successDispatch, error: errorDispatch} = orderDispatch

  const orderDetails = useSelector(state => state.orderDetails)
  const {loading:loadingPreviewOrder, order, error:errorPreviewOrder} = orderDetails
  
  useEffect(() => {
    if((userInfo && userInfo.isAdmin) || successDispatch) {
      dispatch(getAllOrders())
    } else {
      // redirect if user is not admin
      navigate('/login')
    }
  }, [navigate, dispatch, userInfo, successDispatch])
  
  useEffect(() => {
    forDispatch !== '' && dispatch(getOrderDetails(forDispatch))
  }, [dispatch, forDispatch])
  
  const handleDispatch = () => {
    console.log(forDispatch)
    dispatch(dispatchOrder(forDispatch))
    setForDispatch('')
  }
  
  return <>
    <Meta title={'Admin Orders Control Panel'} />
    <Row className='mt-5'>
      {loadingAllOrders ? <Loader /> : errorLoadingOrders ? <Message variant='danger'>{errorLoadingOrders}</Message> : (
        <>
          <Col lg={8}>

            {/* SUMMARY */}
            <Row className='admin-order-summary mb-5'>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.length}</div>
                  <div className='summary-title'>Total Orders</div>
                </div>
              </Col>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.reduce((acc, o) => acc + o.orderItems.length, 0)}</div>
                  <div className='summary-title'>Total Items</div>
                </div>
              </Col>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.reduce((acc, o) => o.isPaid === true ? acc + 1 : acc + 0 ,0)}</div>
                  <div className='summary-title'>Orders Paid</div>
                </div>
              </Col>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.reduce((acc, o) => o.isDelivered === true ? acc + 1 : acc + 0 ,0)}</div>
                  <div className='summary-title'>Dispatched</div>
                </div>
              </Col>
            </Row>

            {/* TABLE */}
            <Row>
              <Table striped bordered responsive className='table-sm shadow'>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Paid</th>
                    <th>Dispatch</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map(order => (
                    <tr key={order._id}>
                      <td>{order.user.name}</td>
                      <td>{order.isPaid ? <Badge color='green' text='Paid'/>: <Badge color='#ffae00' text='Pending'/>}</td>
                      <td>{order.isDelivered ? <Badge color='green' text='Dispatched'/> : <Badge color='#bbb' text='Not Dispatched'/>}</td>
                      <td>{order.orderItems.map(item => <Link key={item._id} to={`/product/${item.product}`}>{item.qty} x {item.name}</Link>)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            {/* DISPATCH */}
            <Row className='text-center'>
              <Col>
                <h3>Dispatch</h3>
                {errorDispatch && <Message variant='danger'>{errorDispatch}</Message>}
                {loadingDispatch ? <Loader /> : (
                  <div className='d-flex justify-content-center'>
                    <select value={forDispatch} onChange={(e)=> setForDispatch(e.target.value)}>
                      <option hidden>Select Order for dispatch</option>
                      {orders.map(order => order.isPaid === true ? <option value={order._id} key={order._id}>{order._id}</option> : '')}
                    </select>
                    <button className='btn' onClick={handleDispatch}>DISPATCH</button>
                  </div>
                )}
              </Col>
              <Col>
                <div className='scaled card-preview-container'>
                  <div className='card-preview'>
                    {forDispatch !== '' && loadingPreviewOrder ? <Loader /> : order && <Card order={order}/>}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* ORDERS */}
          <Col lg={4}className='admin-orders custom-scroll'>
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
