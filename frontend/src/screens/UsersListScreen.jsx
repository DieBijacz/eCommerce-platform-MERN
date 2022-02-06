import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions.js'

const UsersListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get users from store
  const usersList = useSelector(state => state.usersList)
  const { loading, error, users } = usersList
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) { // when logged in as admin
      dispatch(listUsers()) // fetch users from db to be set in store
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  const deleteHandler = (id) => {
    console.log(id);
  }

  return <>
    <h1>Users</h1>
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
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button className='btn-sm' onClick={() => deleteHandler(user._id)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>;
};

export default UsersListScreen;