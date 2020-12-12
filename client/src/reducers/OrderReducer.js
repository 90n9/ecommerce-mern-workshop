import {
  ORDER_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR
} from "../actions/types";

const INIT_STATE = {
  status: "pending",
  msg: "",
  order: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORDER_RESET: {
      return {
        ...INIT_STATE
      };
    }
    case ORDER_CREATE_SUCCESS: {
      return {
        status: "success",
        msg: "",
        order: action.payload
      }
    }
    case ORDER_CREATE_ERROR: {
      return {
        status: "error",
        msg: action.payload
      }
    }
    default:
      return state;
  }
};
