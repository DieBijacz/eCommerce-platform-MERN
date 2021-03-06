import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct, listProducts } from '../actions/productActions.js'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import SearchBar from '../components/SearchBar';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const AdminProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    
  // get keyword and pageNumber from URL
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  // get products from store
  const productList = useSelector(state => state.productList)
  const { loading, error, products, totalProducts, page, pages } = productList
  
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
    if(!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }
    
    successCreate ? navigate(`/admin/edit/product/${createdProduct._id}`) : dispatch(listProducts(keyword, pageNumber))

    // show delete message and reset state
    if(successDelete) {
      dispatch({type: PRODUCT_DELETE_RESET})
      setShowDeleteMessage(true)
      setTimeout(() => {
        setShowDeleteMessage(false)
      }, 3000)
    }
    
  }, [navigate, userInfo, dispatch, successCreate, createdProduct, productDelete, successDelete, keyword, pageNumber])
  
  // Create new product
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return <>
    <Meta title={'Admin Products Control Panel'} />
    <Row className='mt-5'>
      <div className='d-flex justify-content-between'>
        <h2>Products</h2>
        <Button variant='light' className='btn' onClick={createProductHandler}><i className='fas fa-plus'></i> Add New Product</Button>
      </div>
      <Row>
          <Col>
            <SearchBar params={'/admin/products'}/>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <h5>products: {products && products.length} / {totalProducts && totalProducts}</h5>
          </Col>
        </Row>
    </Row>
    {showDeleteMessage && <Message variant='success'>Product deleted</Message>}
    {loading || loadingCreate || loadingDelete ? <Loader /> : error || errorCreate || errorDelete ? <Message variant='danger'>{error ?? errorCreate ?? errorDelete}</Message> : (
      <>
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>Product</th>
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
                <td>
                  <div style={{width: '100%'}} className='d-flex justify-content-center'>
                      <Image src={product.image} alt={product.name} fluid style={{maxWidth: '100px'}} className={product.countInStock === 0 ? 'outOfStockImageCover' : undefined}/>
                  </div>
                </td>
                <td>{product.name}{product.countInStock === 0 && <div style={{color: 'red'}}>Out of stock</div>}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/edit/product/${product._id}`}>
                      <div className='d-grid gap-2'>
                        <Button variant='light' className='btn'>
                          Edit Product
                        </Button>
                      </div>
                  </LinkContainer>
                  {/* <Button className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} isAdmin={userInfo.isAdmin}/>
      </>
    )}
  </>;
};

export default AdminProductListScreen;
