import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer.js'

const AdminEditProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  
  //get product id from url
  const productId = params.id
  
  // get user from store
  const {userInfo} = useSelector(state => state.userLogin)

  // get product from store
  const productDetails = useSelector(state => state.productDetails)
  const {loading: loadingProduct, error: errorProduct, product} = productDetails

  useEffect(() => {
    // if user is not admin redirect to home page
    !userInfo.isAdmin && navigate('/')
    
    if(!product.name || product._id !== productId){
      // get product details from db
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setCategory(product.category)
      setBrand(product.brand)
      setDescription(product.description)
      setCountInStock(product.countInStock)
    }
  },[dispatch, navigate, product, productId, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(updateUserAsAdmin({_id: userId, name, email, isAdmin: admin}))

    // setTimeout(() => {
    //   dispatch({type: USER_UPDATE_ASADMIN_RESET})
    // }, 2000);
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-primary my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit Product:</h1>
        {/* {successUpdate && <Message variant='success'>User Updated</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />} */}
        {loadingProduct ? errorProduct ? <Message variant='danger'>{errorProduct}</Message> : <Loader /> : (
          <Form onSubmit={submitHandler}>
          
          <FormGroup className='my-3' controlId='name'>
            <FormLabel>Username</FormLabel>
            <FormControl type='text' placeholder='Enter username' value={name} onChange={(e)=> setName(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='price'>
            <FormLabel>Price</FormLabel>
            <FormControl type='number' value={price} onChange={(e)=> setPrice(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='name'>
            <FormLabel>Images</FormLabel>
            <FormControl type='text' placeholder='Image URL' value={image} onChange={(e)=> setImage(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='brand'>
            <FormLabel>Brand</FormLabel>
            <FormControl type='text' placeholder='Brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='category'>
            <FormLabel>Category</FormLabel>
            <FormControl type='text' placeholder='Category' value={category} onChange={(e)=> setCategory(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='countInStock'>
            <FormLabel>Count in stock</FormLabel>
            <FormControl type='number' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup className='my-3' controlId='description'>
            <FormLabel>Description</FormLabel>
            <FormControl type='text' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)}></FormControl>
          </FormGroup>

          <Button type='submit' variant='primary'>Update</Button>

          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminEditProductScreen;
