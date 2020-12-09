import {
  PRODUCT_FETCH_SUCCESS,
  PRODUCTS_FETCH_SUCCESS,
} from "../actions/types";

const INIT_STATE = {
  product: {},
  products: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS: {
      return {
        ...state,
        product: action.payload
      };
    }
    case PRODUCTS_FETCH_SUCCESS: {
      return {
        ...state,
        products: action.payload
      };
    }
    default:
      return state;
  }
};
