import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

// addToCart takes id and qty from url
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

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.getItem('shipping address') !== JSON.stringify(data) &&
    window.confirm('Do You want to save this address for future?') &&
    localStorage.setItem('shipping address', JSON.stringify(data))
}
