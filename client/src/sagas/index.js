import { all } from "redux-saga/effects";
import ProductSagas from "./ProductSagas";
import OrderSagas from "./OrderSagas";

export default function* rootSaga(getState) {
  yield all([
    ProductSagas(),
    OrderSagas(),
  ]);
}
