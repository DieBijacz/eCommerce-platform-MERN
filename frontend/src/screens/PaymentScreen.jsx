import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, FormGroup, FormLabel, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.js'
import { savePaymentMethod } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js';

const PaymentScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // bring shipping address from store
  const shippingAddress = useSelector(state => state.cart.shippingAddress)

  // if there is no shipping address go back to step 2
  !shippingAddress && navigate('/shipping')

  const [paymentMethod, setPaymentMethod] = useState('PayPal')


  const submitHandler = (e) => {
    e.preventDefault()
    
    // dispatch to cartActions payment method so it can be saved
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1 className='my-5'>Payment Method</h1>
        <Form onSubmit={submitHandler}>

          <FormGroup>
            <FormLabel as='legend'>Select Method</FormLabel>
            <Col>
              <FormCheck type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => {setPaymentMethod(e.target.value)}} />
            </Col>
          </FormGroup>

          <Button className='my-3' type='submit'>Countinue</Button>

        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen;
