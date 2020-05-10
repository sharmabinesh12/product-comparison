import {  all } from 'redux-saga/effects';
import { productWatcher } from './productSaga';

export default function* rootSaga() {
  yield all([
    productWatcher()
  ])
}
