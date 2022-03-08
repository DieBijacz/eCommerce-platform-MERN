import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar.jsx'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import FourIcon from '../components/FourIcon.jsx'
import Hero from './Hero'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  // get keyword and pageNumber from URL
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  // return { loading: false, products: action.payload } from productReducers.js
  const {loading, error, products, page, pages} = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta title={'Home Page'} />
      <Row className='hero-high'>
        <Hero />
      </Row>
      <Row className='my-5' style={{minHeight: '300px'}}>
        <Col md={7} lg={8}>
        <div className='d-flex-column justify-content-center align-items-center my-3'>
          <h2>Top rated products:</h2>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem nihil illo, earum laborum esse minima, culpa fugiat, accusantium saepe tempore accusamus itaque sit quae delectus est laudantium consectetur iure tempora?
          </div>
        </div>
        </Col>
        <Col md={5} lg={4}>
          {!keyword && <ProductCarousel />}
        </Col>
      </Row>
      <FourIcon />
      <SearchBar />
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <>
            <Row>
              {products.map(product => (
                <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product}/>
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
          </>
      )
      }
    </>
  )
}

export default HomeScreen
