import { all, delay, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분 * 붙이지 말 것
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function signUpAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* signUp() {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function followAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/api/follow');
}

function* follow(action) {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: FOLLOW_FAILURE,
      error: e,
    });
  }
}

function unfollowAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/api/unfollow');
}

function* unfollow(action) {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: e,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}


export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}