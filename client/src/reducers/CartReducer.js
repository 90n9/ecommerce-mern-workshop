import {
  CART_ADD,
  CART_UPDATE,
  CART_DELETE,
  CART_RESET
} from "../actions/types";

const LOCALSTORAGE_ECOMCART = 'ecomcart'
const ecomCart = localStorage.getItem(LOCALSTORAGE_ECOMCART);

const INIT_STATE = (ecomCart) ? JSON.parse(ecomCart) : {
  carts: []
};

export default (state = INIT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case CART_ADD: {
      const newState = {
        ...state,
        carts: (state.carts.filter(cart => cart.product.id === payload.product.id).length > 0) ?
          state.carts.map(cart => (cart.product.id === payload.product.id) ? { ...payload, qty: cart.qty + payload.qty } : cart)
            .filter(cart => cart.qty > 0) :
          [...state.carts, payload]
      };
      localStorage.setItem(LOCALSTORAGE_ECOMCART, JSON.stringify(newState));
      return newState;
    }
    case CART_UPDATE: {
      const newState = {
        ...state,
        carts: state.carts.map(cart => (cart.product.id === payload.product.id) ? payload : cart)
          .filter(cart => cart.qty > 0)
      };
      localStorage.setItem(LOCALSTORAGE_ECOMCART, JSON.stringify(newState));
      return newState;
    }
    case CART_DELETE: {
      const newState = {
        ...state,
        carts: state.carts.filter(cart => cart.product.id !== payload.product.id)
      };
      localStorage.setItem(LOCALSTORAGE_ECOMCART, JSON.stringify(newState));
      return newState;
    }
    case CART_RESET: {
      const newState = {
        carts: []
      };
      localStorage.setItem(LOCALSTORAGE_ECOMCART, JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
