import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ORDER_CREATE,
} from "../actions/types";
import {
  orderCreateSuccess,
  orderCreateError,
  cartReset,
} from "../actions";

import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, retryDelay: (retryCount) => {
    return retryCount * 1000;
  }
});

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// API
const orderCreateRequest = async payload => {
  console.log("call create order with post data");
  return await axios
    .post(`${REACT_APP_API_URL}/orders`, payload)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// WORKER
function* orderCreate({ payload }) {
  try {
    const data = yield call(orderCreateRequest, payload);
    yield put(orderCreateSuccess(data));
    yield put(cartReset());
  } catch (error) {
    let errorMsg = error;
    if(error?.response?.data?.errors && error.response.data.errors.length > 0){
      errorMsg = (<ul>
        {error.response.data.errors.map(item => (<div><i class="fas fa-exclamation-triangle"></i> {item.message}</div>))}
      </ul>)
      ;
    }
    yield put(orderCreateError(errorMsg));
  }
}

// WATCHER
function* orderCreateWatcher() {
  yield takeEvery(ORDER_CREATE, orderCreate);
}

export default function* rootSaga() {
  yield all([fork(orderCreateWatcher)]);
}
