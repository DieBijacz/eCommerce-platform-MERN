import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Col, Image, Row } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

const TopRated = () => {
  const dispatch = useDispatch()

  const topProducts = useSelector(state => state.topProducts)
  const {loading, error, products} = topProducts
  
  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  useEffect(() => {
    if(!loading){
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.right', {scrollTrigger: '.top-rated', xPercent: 100, duration: 1})
      gsap.from('.left', {scrollTrigger: '.top-rated', xPercent: -100, duration: 1})
    }
  }, [loading]);
  
  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Row className='my-5 mx-5 top-rated'>
      <Col md={5} className='left'>
        <Carousel pause='hover' className='bg-light shadow'>
          {products.map(p => (
            <CarouselItem key={p._id}>
              <Link to={`/product/${p._id}`}>
                <Image src={p.image} alt={p.name}/>
                <Carousel.Caption className='carousel-caption'>
                  <h4>{p.name} ({p.price})</h4>
                </Carousel.Caption>
              </Link>
            </CarouselItem>
          ))}
        </Carousel>
      </Col>
      <Col md={7} className='right mt-5'>
        <h4>Top rated products:</h4>
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, expedita? Eos, voluptatum eaque nemo modi maiores recusandae? Quos ducimus velit incidunt molestiae perferendis? Nostrum eum modi debitis quos asperiores culpa reprehenderit consectetur suscipit, molestias nisi soluta, officiis perferendis id inventore, repellendus iste facilis magnam. Delectus ad sed fuga iusto repellat.
      </Col>
    </Row>
  )
}

export default TopRated