import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

// ADD TO CART
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // fetch single item data
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // bring state of cart.cartItems with getState()
  // set it to LS as cartItems
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// REMOVE FROM CART
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// SAVE ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.getItem('shipping address') !== JSON.stringify(data) &&
    window.confirm('Do You want to save this address for future?') &&
    localStorage.setItem('shipping address', JSON.stringify(data))
}

// SAVE PAYMENT METHOD
export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })

  localStorage.getItem('payment method') !== JSON.stringify(paymentMethod) &&
    window.confirm('Do you want to save this payment method for future?') &&
    localStorage.setItem('payment method', JSON.stringify(paymentMethod))
}
