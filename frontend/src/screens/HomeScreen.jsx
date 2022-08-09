import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBar from '../components/SearchBar.jsx'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import TopRated from '../components/TopRated'
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
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta title={'Home Page'} />
      <Hero />
      <TopRated />
      <FourIcon />
      <Image src='../images/ps5.png' alt='ps5' className='ps5' />
      <SearchBar />
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )
      }
    </>
  )
}

export default HomeScreen
