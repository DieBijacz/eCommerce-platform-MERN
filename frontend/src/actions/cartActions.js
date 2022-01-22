import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

// addToCart takes id and qty from url
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // fetch single item
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
