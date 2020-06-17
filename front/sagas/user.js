import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI() {
	// 서버에 요청을 보내는 부분 붙이지 말 것
	return axios.post('/login'); 
}

function* login() {
	try {
		// yield call(loginAPI);
		yield delay(1000);
		yield put({ // put은 dispatch 동일
			type: LOG_IN_SUCCESS,
			data: action.data,
		});
	} catch (e) { // loginAPI 실패
		console.error(e);
		yield put({
			type: LOG_IN_FAILURE,
		});
	}
}

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signUpAPI() {
	//　サーバーへリクエスト
	return axios.post('/login');
}

function* signUp() {
	try {
		// yield call(signUpAPI);
		yield delay(2000);
		throw new Error('エラー');
		yield put({ // put을 dispatch 동일
			type: SIGN_UP_SUCCESS,
		});
	} catch (e) {
		console.error(e);
		yield put({
			type: SIGN_UP_FAILURE,
			error: e,
		});
	}
}

function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
	])
}