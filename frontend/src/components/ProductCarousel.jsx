import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const topProducts = useSelector(state => state.topProducts)
  const {loading, error, products} = topProducts

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  
  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pause='hover' className='bg-light' >
      {products.map(p => (
        <CarouselItem key={p._id}>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} />
            <Carousel.Caption className='carousel-caption'>
              <h4>{p.name} ({p.price})</h4>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  )
}

export default ProductCarousel