import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar.jsx'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  // get keyword from URL
  const keyword = params.keyword

  const productList = useSelector(state => state.productList)
  // return { loading: false, products: action.payload } from productReducers.js
  const {loading, error, products} = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
     <h1>Latest Products</h1> 
     <SearchBar />
     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
     )
     }
    </>
  )
}

export default HomeScreen
