import {
  CART_ADD,
  CART_UPDATE,
  CART_DELETE,
  CART_RESET
} from "../actions/types";

const INIT_STATE = {
  carts: []
};

export default (state = INIT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case CART_ADD: {
      return {
        ...state,
        carts: (state.carts.filter(cart => cart.product.id === payload.product.id).length > 0) ?
          state.carts.map(cart => (cart.product.id === payload.product.id) ? { ...payload, qty: cart.qty + payload.qty } : cart) :
          [...state.carts, payload]
      };
    }
    case CART_UPDATE: {
      return {
        ...state,
        carts: state.carts.map(cart => (cart.product.id === payload.product.id) ? payload : cart)
      };
    }
    case CART_DELETE: {
      return {
        ...state,
        carts: state.carts.filter(cart => cart.product.id !== payload.product.id)
      };
    }
    case CART_RESET: {
      return {
        carts: []
      };
    }
    default:
      return state;
  }
};
