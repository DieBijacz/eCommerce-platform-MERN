import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions.js'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

const AdminProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)

  // get products from store
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  
  // current logged in user
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, success: successDelete, error:errorDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { loading:loadingCreate, success: successCreate, product: createdProduct, error:errorCreate } = productCreate

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})
    
    // redirect if user is not admin
    !userInfo.isAdmin && navigate('/login')
    
    successCreate ? navigate(`/admin/edit/product/${createdProduct._id}`) : dispatch(listProducts())

    // show delete message and reset state
    if(successDelete && !loading) {
      dispatch({type: PRODUCT_DELETE_RESET})
      setShowDeleteMessage(true)
      setTimeout(() => {
        setShowDeleteMessage(false)
      }, 3000)
    }
    
  }, [navigate, userInfo, dispatch, successCreate, createdProduct, productDelete, successDelete])
  
  // Create new product
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  // Delete product
  const deleteHandler = (id) => {
    window.confirm('Are you sure you want to delete this user?') && dispatch(deleteProduct(id))
  }

  return <>
    <Row className='my-3'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='d-flex justify-content-md-end'>
        <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i> Add Product</Button>
      </Col>
    </Row>
    {showDeleteMessage && <Message variant='success'>Product deleted</Message>}
    {loading || loadingCreate || loadingDelete ? <Loader /> : error || errorCreate || errorDelete ? <Message variant='danger'>{error ?? errorCreate ?? errorDelete}</Message> : (
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
