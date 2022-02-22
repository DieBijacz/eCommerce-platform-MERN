import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  deleteUserReducer,
  userUpdateAsAdminReducer,
} from './reducers/userReducers'
import {
  allOrdersReducer,
  myOrdersReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: deleteUserReducer,
  usersList: usersListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateAsAdmin: userUpdateAsAdminReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: myOrdersReducer,
  allOrders: allOrdersReducer,
})

// LOCAL STORAGE
// cart items in LS
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// address in LS
const shippingAddressFromStorage = localStorage.getItem('shipping address')
  ? JSON.parse(localStorage.getItem('shipping address'))
  : []

// payment method in LS
const paymentMethodFromStorage = localStorage.getItem('payment method')
  ? JSON.parse(localStorage.getItem('payment method'))
  : {}

// user in LS
const initialUserFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// INITIAL STATE
// if there are items in LS get them as initialstate
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: initialUserFromStorage },
}

const middlewere = [thunk]

// STORE
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewere))
)

export default store
