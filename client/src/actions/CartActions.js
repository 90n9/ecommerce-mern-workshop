import {
  CART_ADD,
  CART_UPDATE,
  CART_DELETE,
  CART_RESET
} from "./types";

export const cartAdd = payload => {
  return {
    type: CART_ADD,
    payload: payload
  };
};

export const cartUpdate = payload => {
  return {
    type: CART_UPDATE,
    payload: payload
  };
};

export const cartDelete = payload => {
  return {
    type: CART_DELETE,
    payload: payload
  };
};

export const cartReset = () => {
  return {
    type: CART_RESET
  };
};