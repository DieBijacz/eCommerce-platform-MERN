import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, Form, Button, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

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

  const [showUpdateMessage, setShowUpdateMessage] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  //get product id from url
  const productId = params.id
  
  // get user from store
  const {userInfo} = useSelector(state => state.userLogin)

  // get product from store to be edited
  const productDetails = useSelector(state => state.productDetails)
  const {loading: loadingProduct, error: errorProduct, product} = productDetails

  // get from state updated product
  const productUpdate = useSelector(state => state.productUpdate)
  const {loading: loadingUpdateProduct, error: errorUpdateProduct, success: successUpdate} = productUpdate

  useEffect(() => {
    // if user is not admin redirect to home page
    (!userInfo || !userInfo.isAdmin) && navigate('/')

    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch(listProductDetails(productId))
      setShowUpdateMessage(true)
    }  

    setName(product.name)
    setPrice(product.price)
    setImage(product.image)
    setBrand(product.brand)
    setCategory(product.category)
    setCountInStock(product.countInStock)
    setDescription(product.description)

    showUpdateMessage && setTimeout(() => {
      setShowUpdateMessage(false)
    }, 3000);

  }, [dispatch, navigate, userInfo, productId, product, successUpdate, showUpdateMessage])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId, //id so it can be addedd in url in action
      name,
      price,
      brand,
      category,
      description,
      countInStock,
      image,
    }))
  }

  const uploadFileHandler = async (e) => {
    e.preventDefault();

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // data is gonna be formated path to that file
      const {data} = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-primary my-3'>Go Back</Link>
      {showUpdateMessage && <Message variant='success'>Product Updated</Message>}
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
          <h3 style={{color:'red'}}>to do: add rating here</h3>
        </Col>
        <Col md={7}>
          <h1>Edit Product:</h1>
          <h4 style={{color: 'grey'}}>{product._id}</h4>

          {(loadingProduct || loadingUpdateProduct) ? <Loader /> : (errorProduct || errorUpdateProduct) ? <Message variant='danger'>{errorProduct ?? errorUpdateProduct}</Message> : (
            <Form onSubmit={submitHandler}>
            
            <FormGroup className='my-3' controlId='name'>
              <FormLabel>Username</FormLabel>
              <FormControl type='text' placeholder='Enter username' value={name} onChange={(e)=> setName(e.target.value)}></FormControl>
            </FormGroup>

            <FormGroup className='my-3' controlId='price'>
              <FormLabel>Price</FormLabel>
              <FormControl type='number' value={price} onChange={(e)=> setPrice(e.target.value)}></FormControl>
            </FormGroup>

            <FormGroup className='my-3'>
              <FormLabel>Images</FormLabel>
              <FormControl type='text' placeholder='Image URL' value={image} onChange={(e)=> setImage(e.target.value)}></FormControl>
              <FormControl type='file' id='image-file' formlabel='Choose files' onChange={uploadFileHandler} />
              {uploading && <Loader />}
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

            <Button type='submit' variant='primary'>Update Product</Button>

            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminEditProductScreen;
