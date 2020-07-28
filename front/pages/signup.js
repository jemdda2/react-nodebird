import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import wrapper from '../store/configureStore';

const Signup = () => {
	const dispatch = useDispatch();
	const { signUpLoading, signUpDone, me } = useSelector((state) => state.user )

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

	useEffect(() => {
		if (signUpDone) {
			Router.replace('/');
		}
	}, [signUpDone])

	const [email, onChangeEmail] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');

	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const onChangePasswordCheck = useCallback((e) =>{
		setPasswordCheck(e.target.value);
		setPasswordError(e.target.value !== password);
	}, [password])
	
	const [term, setTerm] = useState('');
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((e) =>{
		setTerm(e.target.checked);
		setTermError(false);
	}, [])

	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log(email, nickname, password);
		dispatch({
			type: SIGN_UP_REQUEST,
			data: { email, password, nickname },
		})
	}, [email, password, passwordCheck, term])

	return (
		<AppLayout>
			<Head>
				<title>会員登録 | NodeBird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-email">EMAIL</label>
					<br />
					<Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
				</div>
				<div>
					<label htmlFor="user-nick">ニックネーム</label>
					<br />
					<Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
				</div>
				<div>
					<label htmlFor="user-password">パスワード</label>
					<br />
					<Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
				</div>
				<div>
					<label htmlFor="user-password-check">パスワード確認</label>
					<br />
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>말을 잘 들을 것을 동의합니다.</Checkbox>
					{termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
				</div>
			</Form>
		</AppLayout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''; //サーバーでcookieを送る。
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END); // RequestがSuccessなるのを待ってる
  await context.store.sagaTask.toPromise();
});

export default Signup;
