import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap'
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
    <Row className='my-3'>
      <h1>Orders:</h1>
      {loadingAllOrders ? <Loader /> : errorLoadingOrders ? <Message variant='danger'>{errorLoadingOrders}</Message> : 
        orders.map(order => (<Card order={order} key={order._id} />))    
      }     
    </Row>
  </>;
};

export default AdminOrdersListScreen;
