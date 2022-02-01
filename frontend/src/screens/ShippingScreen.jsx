import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js'
import { saveShippingAddress } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js';

const ShippingScreen = () => {
  // bring shipping address from store
  // and use it to set initial states
  const shippingAddress = useSelector(state => state.cart.shippingAddress)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // On Submit
  const submitHandler = (e) => {
    e.preventDefault()
    
    // dispatch to cartActions obj with address data
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate('/payment')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1 className='my-5'>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup required controlId='address' className='mt-3'>
            <FormLabel>Address</FormLabel>
            <FormControl type='text' required placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup required controlId='city' className='mt-3'>
            <FormLabel>City</FormLabel>
            <FormControl type='text' required placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup required controlId='postalCode' className='mt-3'>
            <FormLabel>Post Code</FormLabel>
            <FormControl type='text' required placeholder='Enter post code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup required controlId='country' className='mt-3'>
            <FormLabel>Country</FormLabel>
            <FormControl type='text' required placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)}></FormControl>
          </FormGroup>

          <Button className='my-3' type='submit'>Countinue</Button>

        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen;
