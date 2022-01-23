import React, {useEffect} from 'react';
import { Link, useNavigate, useParams, useSearchParams  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button , Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get items from store
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  console.log(cartItems);

  // get info from url
  const productId = params.id
  const qty = searchParams.get('qty')

  useEffect(() => {
    if(productId && qty) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>asd</div>
  )
};

export default CartScreen;
