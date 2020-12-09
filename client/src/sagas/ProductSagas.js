import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  PRODUCT_FETCH,
  PRODUCTS_FETCH,
} from "../actions/types";
import {
  productFetchSuccess,
  productsFetchSuccess,
} from "../actions";
// import { showErrorMessage } from "../../actions/NotifyActions";
// import { authorizationHeader, getErrorMessage, getFilterUrl } from "../../util/apiUtil";
import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, retryDelay: (retryCount) => {
    return retryCount * 1000;
  }
});

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// API
const productFetchRequest = async payload => {
  return await axios
    .get(`${REACT_APP_API_URL}/products/${payload}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const productsFetchRequest = async () => {
  return await axios
    .get(`${REACT_APP_API_URL}/products`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// WORKER
function* productFetch({ payload }) {
  try {
    const data = yield call(productFetchRequest, payload);
    yield put(productFetchSuccess(data));
  } catch (error) {
    // yield put(showErrorMessage(getErrorMessage(error)));
  }
}

function* productsFetch() {
  try {
    console.log("call products fetch");
    const data = yield call(productsFetchRequest);
    yield put(productsFetchSuccess(data));
  } catch (error) {
    // yield put(showErrorMessage(getErrorMessage(error)));
  }
}

// WATCHER
function* productFetchWatcher() {
  // yield takeEvery(PRODUCT_FETCH, productFetch);
}

function* productsFetchWatcher() {
  yield takeEvery(PRODUCTS_FETCH, productsFetch);
}

export default function* rootSaga() {
  yield all([fork(productFetchWatcher)]);
  yield all([fork(productsFetchWatcher)]);
}
