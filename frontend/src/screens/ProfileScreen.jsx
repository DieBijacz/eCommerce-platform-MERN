import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'

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

  // Check for logged in user / get details /  and fill up form fields
  useEffect(() => {
    // if there is no logged in user then navigate to log in screen
    if(!userInfo) {
      navigate('/login')
    } else {
      if(!user.name) {
        // get user details
        dispatch(getUserDetails('profile'))
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
    <Col md={6}>
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
    <Col md={6}>
      <h2>My Orders</h2>
    </Col>
  </Row>;
};

export default ProfileScreen;
