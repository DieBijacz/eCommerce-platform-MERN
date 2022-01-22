import { CART_ADD_ITEM } from '../constants/cartConstants'

// initaial state is array of items in cart
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      // for item in current state of items
      // find if there is x(item) with x.product(id) === item.product(id)
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          // spread whatever is in state and for cartItems: spread cartItems and add new item
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    default:
      return state
  }
}
