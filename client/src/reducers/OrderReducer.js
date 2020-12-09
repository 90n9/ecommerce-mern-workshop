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
        ...state,
        search: action.payload
      };
    }
    case ORDER_CREATE_SUCCESS: {
      return {
        ...state,
        search: {
          searchText: "",
          page: 1,
          perPage: 100,
        }
      }
    }
    case ORDER_CREATE_ERROR: {
      return {
        ...state,
        countTotal: action.payload,
      }
    }
    default:
      return state;
  }
};
