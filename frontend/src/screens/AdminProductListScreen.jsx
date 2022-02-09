import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions.js'

const AdminProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get products from store
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  console.log(products);
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // fetch all products if logged in as admin
    if(userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
      console.log(123);
    } else {
      navigate('/login')
    }
  }, [navigate, userInfo, dispatch])

  const createProductHandler = () => {

  }

  const deleteHandler = (id) => {
    // window.confirm('Are you sure you want to delete this user?') && dispatch(deleteUser(id))
    // setTimeout(() => {
    //   dispatch({type: USER_DELETE_RESET})
    // }, 3000);
  }

  return <>
    <Row className='aligin-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-center'>
        <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i> Add Product</Button>
      </Col>
    </Row>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Table striped bordered responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Brand</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>$ {product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>
              <LinkContainer to={`/admin/edit/product/${product._id}`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-edit'></i>
                </Button>
              </LinkContainer>
              <Button className='btn-sm' onClick={() => deleteHandler(product._id)}>
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

export default AdminProductListScreen;
