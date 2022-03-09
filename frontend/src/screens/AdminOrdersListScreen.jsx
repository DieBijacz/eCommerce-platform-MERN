import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../actions/orderActions.js'
import Card from '../components/Card';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import Meta from '../components/Meta.js';
import Badge from '../components/Badge.jsx';

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
  
  const handleDispatch = () => {
  }
  
  return <>
    <Meta title={'Admin Orders Control Panel'} />
    <Row className='mt-5'>
      {loadingAllOrders ? <Loader /> : errorLoadingOrders ? <Message variant='danger'>{errorLoadingOrders}</Message> : (
        <>
          <Col lg={7}>

            {/* SUMMARY */}
            <Row className='admin-order-summary mb-5'>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.length}</div>
                  <div className='summary-title'>Total orders</div>
                </div>
              </Col>
              <Col>
                <div className='summary-box shadow'>
                  <div className='summary-number'>{orders && orders.reduce((acc, o) => acc + o.orderItems.length, 0)}</div>
                  <div className='summary-title'>Total items</div>
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
            {/* <Row className='admin-order-dispatch'>
              <h3>Dispatch</h3>
              <div className='d-flex'>
                <Select type="select" onChange={(e)=>setForDispatch(e.target.value)}>
                  <option defaultValue={forDispatch} hidden>Select Order for dispatch</option>
                  {orders.map(order => <option value={order._id} key={order._id}>{order._id}</option>)}
                </Select>
                <button className='btn' onClick={handleDispatch}>DISPATCH</button>
              </div>
                {forDispatch}
            </Row> */}
          </Col>

          {/* ORDERS */}
          <Col lg={5} className='admin-orders custom-scroll'>
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
