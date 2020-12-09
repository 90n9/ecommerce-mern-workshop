import {
  PRODUCT_FETCH,
  PRODUCT_FETCH_SUCCESS,
  PRODUCTS_FETCH,
  PRODUCTS_FETCH_SUCCESS
} from "./types";

export const productFetch = payload => {
  return {
    type: PRODUCT_FETCH,
    payload
  };
};

export const productFetchSuccess = payload => {
  return {
    type: PRODUCT_FETCH_SUCCESS,
    payload
  };
};

export const productsFetch = () => {
  return {
    type: PRODUCTS_FETCH
  };
};

export const productsFetchSuccess = payload => {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload
  };
};
