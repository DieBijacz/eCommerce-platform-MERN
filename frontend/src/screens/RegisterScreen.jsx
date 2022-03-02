import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import Meta from '../components/Meta';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // Bring user from store
  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, userInfo} = userRegister

  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    // validate password
    if(password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      // DISPATCH REGISTER
      dispatch(register(name, email, password))
    }
  }

  return <>
    <Meta title={'Register'} />
    <FormContainer>
      <h1>Register</h1>
      {/* Check if error comes from userLogin from store*/}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading ? <Loader /> : (
        <>
          <Form onSubmit={submitHandler}>
          
          <FormGroup className='my-3' controlId='name'>
            <FormLabel>Username</FormLabel>
            <FormControl type='text' placeholder='Enter username' value={name} onChange={(e)=> setName(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='email'>
           <FormLabel>Email Address</FormLabel>
           <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='password'>
           <FormLabel>Password</FormLabel>
           <FormControl type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='ConfirmPassword'>
           <FormLabel>Confiorm password</FormLabel>
           <FormControl type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
          </FormGroup>

          <Button className='my-3' type='submit' variant='primary'>Register</Button>

          </Form>

          <Row className='py-3'>
          <Col>
          Already registered? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
          </Col>
          </Row>
        </>
      )}
    </FormContainer>
  </>
};

export default RegisterScreen;
