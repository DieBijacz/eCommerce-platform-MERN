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

  console.log(searchParams.get('qty'));

  return (
    <div>asd</div>
  )
};

export default CartScreen;
