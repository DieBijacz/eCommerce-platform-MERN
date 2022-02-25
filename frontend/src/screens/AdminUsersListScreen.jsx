import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions.js'
import SearchBar from '../components/SearchBar';
import { USER_DELETE_RESET } from '../constants/userConstants';
import { useState } from 'react';

const AdminUsersListScreen = () => {
  const [showSuccessDeleteMessage, setShowSuccessDeleteMessage] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  
  // get keyword from URL
  const keyword = params.keyword

  // get users from store
  const usersList = useSelector(state => state.usersList)
  const { loading, error, users } = usersList
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // userDelete state
  const userDelete = useSelector(state => state.userDelete)
  const { error: errorUserDelete, success: successDelete } = userDelete

  useEffect(() => {
    if (successDelete) {
      setShowSuccessDeleteMessage(true)
      dispatch({type: USER_DELETE_RESET})
      setTimeout(() => {
        setShowSuccessDeleteMessage(false)
      }, 3000)
    }

    if(userInfo && userInfo.isAdmin) { // when logged in as admin
      dispatch(listUsers(keyword)) // fetch users from db to be set in store
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, keyword])

  return <>
    <h1>Users</h1>
    <SearchBar params={'/admin/users'}/>
    {showSuccessDeleteMessage && <Message variant='success'>User removed</Message>}
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Table striped bordered responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>{user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
              <td>
                <LinkContainer to={`/admin/edit/user/${user._id}`}>
                  <Button variant='light' className='btn'>
                    Edit user
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>;
};

export default AdminUsersListScreen;
