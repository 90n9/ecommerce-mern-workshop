import {
  ORDER_RESET,
  ORDER_CREATE,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
} from "./types";

export const orderReset = () => {
  return {
    type: ORDER_RESET
  };
};

export const orderCreate = payload => {
  return {
    type: ORDER_CREATE,
    payload
  };
};

export const orderCreateSuccess = payload => {
  return {
    type: ORDER_CREATE_SUCCESS,
    payload
  };
};

export const orderCreateError = payload => {
  return {
    type: ORDER_CREATE_ERROR,
    payload
  };
};