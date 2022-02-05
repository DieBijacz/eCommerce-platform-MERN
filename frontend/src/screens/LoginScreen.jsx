import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // Bring user from store
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  useEffect(() => {
    // if no user logged in then userInfo: null
    if(userInfo) {
      // if there is user logged in then he is redirected to home page
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch login action with user email and password from Form
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* Check if error comes from userLogin from store*/}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? <Loader /> : (
        <>
          <Form onSubmit={submitHandler}>

          <FormGroup className='my-3' controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
          </FormGroup>

          <Button className='my-3' type='submit' variant='primary'>Sign In</Button>

          </Form>
          
          <Row className='py-3'>
          <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
