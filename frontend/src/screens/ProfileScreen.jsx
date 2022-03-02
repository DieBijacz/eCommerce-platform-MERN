import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { getMyOrders } from '../actions/orderActions';
import Card from '../components/Card';
import { USER_DETAILS_RESET, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [messageUpdatedProfile, setMessageUpdatedProfile] = useState('')
  const [formChanged, setFormChanged] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get userDetails state from store
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // get userLogin state from store to check who is logged in
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success: successUpdateProfile } = userUpdateProfile

  const orderMyList = useSelector(state => state.orderMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

  // Check for logged in user / get details /  and fill up form fields
  useEffect(() => {
    // if there is no logged in user then navigate to log in screen
    if(!userInfo) {
      navigate('/login')
    } else {
      if(!user.name || successUpdateProfile) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        // get user details and orders
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrders())
      } else {
        // fill fields with fetched user details
        setName(user.name)
        setEmail(user.email)
      }

      if (successUpdateProfile) {
        setMessageUpdatedProfile('Profile Updated')
        setTimeout(() => {
          setMessageUpdatedProfile('')
        }, 2000);
      }
    }

    if((password === confirmPassword) && password !== '') {
      setFormChanged(true)
    } else {
      setFormChanged(false)
    }

  }, [dispatch, userInfo, user, messageUpdatedProfile, navigate, successUpdateProfile, password, confirmPassword])

  const submitHandler = (e) => {
    e.preventDefault()

    // dispach updateProfile with updeted user details
    dispatch(updateUserProfile({id: user._id, name, email, password}))
    dispatch({type: USER_DETAILS_RESET})
    }
  
  return <>
      <Meta title={'Profile'} />
      <Row>
        <Col lg={4} className='mb-4'>
        <h2>User Profile</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {messageUpdatedProfile && <Message variant='success'>{messageUpdatedProfile}</Message>}
          {loading ? <Loader /> : (       
            <Form onSubmit={submitHandler}>
            
            <FormGroup className='my-3' controlId='name'>
              <FormLabel>Username</FormLabel>
              <FormControl type='text' placeholder='Update username' value={name} onChange={(e)=> {
                setName(e.target.value)
                setFormChanged(true)
              }}></FormControl>
            </FormGroup>

            <FormGroup className='my-3' controlId='email'>
              <FormLabel>Email Address</FormLabel>
            <FormControl type='email' placeholder='Update email' value={email} onChange={(e) => {
              setEmail(e.target.value)
              setFormChanged(true)
              }}></FormControl>
            </FormGroup>

            <FormGroup className='my-3' controlId='password'>
              <FormLabel>Password</FormLabel>
              <FormControl type='password' placeholder='New password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
            </FormGroup>

            <FormGroup className='my-3' controlId='ConfirmPassword'>
              <FormLabel>Confirm password</FormLabel>
              {password !== confirmPassword && <div style={{color: 'red'}}>Password does not match!</div>}
              <FormControl type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
            </FormGroup>

            <Button disabled={!formChanged} className='my-3' type='submit' variant='primary'>Update Details</Button>

            </Form>
          )}
        </Col>
        <Col lg={8}>
          <h2>My Orders</h2>
          {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
            orders && orders.map(order => (
              <Card order={order} key={order._id} />
            ))
          )}
        </Col>
      </Row>;
    </>
};

export default ProfileScreen;
