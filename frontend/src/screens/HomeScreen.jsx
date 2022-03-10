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
      <Hero />
      <Row className='my-5 mx-5 top-rated'>
        <Col md={5}>
          {!keyword && <ProductCarousel />}
        </Col>
        <Col md={7}>
          <h4>Top rated products:</h4>
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, expedita? Eos, voluptatum eaque nemo modi maiores recusandae? Quos ducimus velit incidunt molestiae perferendis? Nostrum eum modi debitis quos asperiores culpa reprehenderit consectetur suscipit, molestias nisi soluta, officiis perferendis id inventore, repellendus iste facilis magnam. Delectus ad sed fuga iusto repellat.
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
