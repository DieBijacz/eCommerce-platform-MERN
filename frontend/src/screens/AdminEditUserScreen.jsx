import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserAsAdmin } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { USER_UPDATE_ASADMIN_RESET } from '../constants/userConstants';

const AdminEditUserScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [admin, setAdmin] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()

  // get user id
  const userId = params.id

  // get user from store
  const userDetails = useSelector(state => state.userDetails)
  const {loading, error, user} = userDetails

  const userUpdateAsAdmin = useSelector(state => state.userUpdateAsAdmin)
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdateAsAdmin

  useEffect(() => {
    if(!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setAdmin(user.isAdmin)
    }
  },[dispatch, user, userId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserAsAdmin({_id: userId, name, email, isAdmin: admin}))

    setTimeout(() => {
      dispatch({type: USER_UPDATE_ASADMIN_RESET})
    }, 2000);
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-primary my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User:</h1>
        {successUpdate && <Message variant='success'>User Updated</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
              {admin ? 'yes' : 'no'}
            <Form.Check type='checkbox' checked={admin} onChange={() => setAdmin(!admin)} label={admin ? 'is Admin' : 'Set as Admin'}/>
            </FormGroup>

            <Button className='my-3' type='submit' variant='primary'>Update</Button>
            
          </Form>
        )}
        <h1>User Orders:</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, iusto. A sunt ad quis quibusdam. Cum voluptas sunt, nisi corporis eaque sint maiores iste officia dolorem, nobis vel ratione laudantium aspernatur deserunt nemo minus? Optio dolorum accusantium, pariatur earum illo, aliquid facere cupiditate recusandae suscipit enim vitae, praesentium excepturi velit deleniti at similique magnam molestiae assumenda inventore fugit? Est ratione aperiam explicabo consequatur velit, qui harum aspernatur atque voluptatibus autem laudantium adipisci vero cum unde, vel dolorem iusto magni repellendus, quod reprehenderit ipsa aliquam. Architecto porro voluptatibus recusandae cupiditate? Dicta delectus, nam velit eius sed dignissimos quibusdam sint perspiciatis placeat!
      </FormContainer>
    </>
  );
};

export default AdminEditUserScreen;
