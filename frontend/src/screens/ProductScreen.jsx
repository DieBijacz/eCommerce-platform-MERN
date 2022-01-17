import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, ListGroupItem, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
  const [product, setProduct] = useState({})  
  const params = useParams()

  useEffect(() => {
    // FETCH SINGLE PRODUCT
    const fetchProduct = async () => {
      // fetch data based on url
      const {data} = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])

  return (
    <>
      <Link to='/' className='btn btn-primary my-3'>Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
            </ListGroupItem>
            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button disabled={product.countInStock === 0} className='btn' type='button'>Add To Cart</Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

      </Row>

    </>
  )
}

export default ProductScreen
