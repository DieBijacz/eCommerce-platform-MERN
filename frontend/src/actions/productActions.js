import axios from 'axios'
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  // when its called to get products
  try {
    // send action with type of req. that will set loading to true and return []
    dispatch({ type: PRODUCT_LIST_REQUEST })

    // actual req
    // fetch data from db
    const { data } = await axios.get('/api/products')
    // dispatch will set loading to false and pass data as payload
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
