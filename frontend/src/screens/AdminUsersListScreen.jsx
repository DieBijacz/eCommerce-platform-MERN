import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions.js'
import SearchBar from '../components/SearchBar';
import { USER_DELETE_RESET } from '../constants/userConstants';
import { useState } from 'react';
import Meta from '../components/Meta';

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
  }, [dispatch, navigate, userInfo, keyword, successDelete])

  return <>
    <Meta title={'Admin Users Control Panel'} />
    <h1>Users</h1>
    {showSuccessDeleteMessage && <Message variant='success'>User removed</Message>}
    {loading ? <Loader /> : (error || errorUserDelete) ? <Message variant='danger'>{error ?? errorUserDelete}</Message> : (
      <>
        <Row>
          <Col>
            <SearchBar params={'/admin/users'}/>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <h5>users: {users && users.length}</h5>
          </Col>
        </Row>
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th className='text-center'>ID</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Email</th>
              <th className='text-center'>Admin</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className='text-center'>{user._id}</td>
                <td className='text-center'>{user.name}</td>
                <td className='text-center'><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td className='text-center'>{user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                <td>
                  <LinkContainer to={`/admin/edit/user/${user._id}`}>
                    <div className='d-grid gap-2'>
                      <Button variant='light' className='btn'>
                        Edit user
                      </Button>
                    </div>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )}
  </>;
};

export default AdminUsersListScreen;
