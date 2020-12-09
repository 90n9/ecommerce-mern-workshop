import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ORDER_CREATE,
} from "../actions/types";
import {
  orderCreateSuccess,
  orderCreateError,
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
const orderCreateRequest = async payload => {
  return await axios
    .get(`${REACT_APP_API_URL}/order/${payload}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// WORKER
function* orderCreate({ payload }) {
  try {
    console.log("call order create");
    const data = yield call(orderCreateRequest, payload);
    yield put(orderCreateSuccess(data));
  } catch (error) {
    console.log(error);
    // yield put(orderCreateError(error));
  }
}

// WATCHER
function* orderCreateWatcher() {
  yield takeEvery(ORDER_CREATE, orderCreate);
}

export default function* rootSaga() {
  yield all([fork(orderCreateWatcher)]);
}
