import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { getMyOrders } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get userDetails state from store
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // get userLogin state from store to check who is logged in
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderMyList = useSelector(state => state.orderMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

  // Check for logged in user / get details /  and fill up form fields
  useEffect(() => {
    // if there is no logged in user then navigate to log in screen
    if(!userInfo) {
      navigate('/login')
    } else {
      if(!user.name) {
        // get user details and orders
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrders())
      } else {
        // fill fields with fetched user details
        setName(user.name)
        setEmail(user.email)
      }
    }
    setTimeout(() => {
      message && setMessage(null)
    }, 1000);

  }, [dispatch, userInfo, user, message, navigate])

  const submitHandler = (e) => {
    e.preventDefault()

    // validate new password
    if(password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      // dispach updateProfile with updeted user details
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  }

  return <Row>
    <Col lg={4} className='mb-4'>
    <h2>User Profile</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading ? <Loader /> : (       
        <Form onSubmit={submitHandler}>
        
        <FormGroup className='my-3' controlId='name'>
          <FormLabel>Username</FormLabel>
          <FormControl type='text' placeholder='Update username' value={name} onChange={(e)=> setName(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup className='my-3' controlId='email'>
          <FormLabel>Email Address</FormLabel>
         <FormControl type='email' placeholder='Update email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup className='my-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' placeholder='New password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup className='my-3' controlId='ConfirmPassword'>
          <FormLabel>Confiorm password</FormLabel>
          <FormControl type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
        </FormGroup>

        <Button className='my-3' type='submit' variant='primary'>Update Details</Button>

        </Form>
      )}
    </Col>
    <Col lg={8}>
      <h2>My Orders</h2>
      {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
        <Table stripped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.substring(20,)}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='order-details-button' variant='light'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}

              
          </tbody>
        </Table>
      )}
    </Col>
  </Row>;
};

export default ProfileScreen;
