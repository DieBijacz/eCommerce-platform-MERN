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
      <FourIcon />
      <Row>
        <h2>Top rate products:</h2>
        <Col md={8}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam a suscipit eius fugit maxime consequatur hic nobis corrupti officiis eaque blanditiis nostrum sapiente iure laudantium quod facere quasi laborum sunt, earum architecto, temporibus modi quis! Obcaecati nostrum eligendi aperiam quam ratione officia possimus impedit perspiciatis consequatur assumenda? Adipisci exercitationem iure dignissimos provident itaque officiis, porro illo minima nesciunt quisquam neque perspiciatis consectetur. Molestias odio est maiores ea ab, praesentium architecto culpa repellat quas? Tenetur aliquid vitae nisi dolorum perferendis exercitationem in mollitia dignissimos consequuntur quibusdam quisquam distinctio optio ut adipisci deserunt delectus, ab tempore repellat. Minus aliquam unde quibusdam!
        </Col>
        <Col md={4}>
          {!keyword && <ProductCarousel />}
        </Col>
      </Row>
      <h2 className='my-5'>Latest Products:</h2> 
      <SearchBar />
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
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
