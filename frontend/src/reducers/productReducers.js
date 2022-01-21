import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'
// reducer takes 2 parameters
// initial state
// and action which will be object with type:
// based on what type it is certain things will be done to set state
// action can contain payload => data like fetch products from db
// actions are called by dispachted
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // resp loading until its data is fetched
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      // resp when data is fetch send it in payload
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      // resp when fail send back error in payload
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // resp loading until its data is fetched
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      // resp when data is fetch send it in payload
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      // resp when fail send back error in payload
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
