import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import ProductReducer from "./ProductReducer";
import CartReducer from "./CartReducer";
import OrderReducer from "./OrderReducer";

const createRouteReducer = (history) => combineReducers({
  router: connectRouter(history),
  product: ProductReducer,
  cart: CartReducer,
  order: OrderReducer
});

export default createRouteReducer;
