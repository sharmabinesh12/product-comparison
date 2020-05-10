
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import * as dataAccess from '../../../utils/ajax';
import {
    GET_PRODUCTS
}
  from '../actions/action_types';
import { getProductsSuccess, getProductsError } from '../actions/productAction';

const fetchData = async (url) =>
  await dataAccess.get(url);

export function* getProducts(param) {
  const url = "http://www.mocky.io/v2/5e9ebdaa2d00007800cb7697";
  try {
    const response = yield call(fetchData, url);
    yield put(getProductsSuccess(response.products));
    
  } catch (error) {
    yield put(getProductsError(error))
  }
}

export function* productWatcher() {
  yield takeEvery(GET_PRODUCTS, getProducts);
}
