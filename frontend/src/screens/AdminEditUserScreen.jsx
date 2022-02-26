import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, getUserDetails, updateUserAsAdmin } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { USER_UPDATE_ASADMIN_RESET } from '../constants/userConstants';
import { getMyOrders, getUserOrders } from '../actions/orderActions';

const AdminEditUserScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [admin, setAdmin] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  // get user id
  const userId = params.id

  // get user from store
  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  // userDelete state
  const userDelete = useSelector(state => state.userDelete)
  const { error: errorUserDelete, success: successDelete } = userDelete

  // userOrders state
  const userOrders = useSelector(state => state.userOrders)
  const {loading: loadingUserOrders, error: errorUserOrders, orders} = userOrders

  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateAsAdmin = useSelector(state => state.userUpdateAsAdmin)
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdateAsAdmin

  useEffect(() => {
    successDelete && navigate('/admin/users')

    if(userInfo && userInfo.isAdmin) {
      if(!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
        dispatch(getUserOrders(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setAdmin(user.isAdmin)
      }
    } else {
      navigate('/login')
    }

  },[dispatch, navigate, user, userId, successUpdate, successDelete, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAsAdmin({_id: userId, name, email, isAdmin: admin}))

    setTimeout(() => {
      dispatch({type: USER_UPDATE_ASADMIN_RESET})
    }, 2000);
  }
  
  const deleteHandler = (id) => {
    window.confirm('Are you sure you want to delete this user?') && dispatch(deleteUser(id))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-primary my-3'>Go Back</Link>
      <Row>
        <Col lg={4} className='mb-4'>
          <h1>Edit User:</h1>
          {successUpdate && <Message variant='success'>User Updated</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}        
          {errorUserDelete && <Message variant='danger'>{errorUserDelete}</Message>}
          {loadingUpdate && <Loader />}
          {loading ? error ? <Message variant='danger'>{error}</Message> : <Loader /> : (
            <Form onSubmit={submitHandler}>
            
              <FormGroup className='my-3' controlId='name'>
                <FormLabel>Username</FormLabel>
                <FormControl type='text' placeholder='Enter username' value={name} onChange={(e)=> setName(e.target.value)}></FormControl>
              </FormGroup>

              <FormGroup className='my-3' controlId='email'>
                <FormLabel>Email Address</FormLabel>
                <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
              </FormGroup>

              <FormGroup className='my-3' controlId='admin'>
                <Form.Check type='checkbox' checked={admin} onChange={() => setAdmin(!admin)} label={admin ? 'is Admin' : 'Set as Admin'}/>
              </FormGroup>

              <div>
                <Button className='btn' type='submit' variant='primary'>Update</Button>
                <Button variant='light' onClick={() => deleteHandler(user._id)}>
                  Delete user
                </Button>
              </div>
              
            </Form>
          )}
        </Col>
        <Col lg={8}>
          <h1>User Orders:</h1>
          {loadingUserOrders ? <Loader /> : errorUserOrders ? <Message variant='danger'>{errorUserOrders}</Message> : (
            orders.map(order => (<Card order={order} key={order._id} />))     
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminEditUserScreen;
